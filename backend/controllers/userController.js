import crypto from 'crypto';
import asyncHandler from '../middleware/asyncHandler.js';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';
import ErrorResponse from '../utils/errorResponse.js';
import sendEmail from '../utils/sendEmail.js';
import { welcomeEmailTemplate, resetPasswordTemplate } from '../utils/emailsTemplate.js';

// @desc Auth user & get token
// @route POST /api/users/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      isAdmin: user.isAdmin,
      role: user.role,
    });
  } else {
    res.status(401);
    throw new Error("Le mot de passe ou l'email est incorrect");
  }
});

// @desc Register a new user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, lastname, email, password } = req.body;

  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error('Cet utilisateur existe déjà');
  }

  const user = await User.create({
    name,
    lastname,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);

    const message = welcomeEmailTemplate(user.name, user.lastname);

    try {
      await sendEmail({
        email: user.email,
        subject: 'Bienvenue sur Krysto.io!',
        message,
        isHtml: true, // Utilise le template HTML
      });
      console.log(`Email de bienvenue envoyé à ${user.email}`);
    } catch (error) {
      console.error(`Erreur lors de l'envoi de l'email : ${error.message}`);
    }

    res.status(201).json({
      _id: user._id,
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      isAdmin: user.isAdmin,
      role: user.role,
    });
  } else {
    res.status(400);
    throw new Error('Données invalides');
  }
});

// @desc Logout user / clear cookie
// @route POST /api/users/logout
// @access Private
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: 'Vous êtes déconnecté' });
});

// @desc Get user profile
// @route GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  if (!req.user || !req.user._id) {
    res.status(400).json({ message: 'Information utilisateur manquante dans la requête' });
    return;
  }

  const user = await User.findById(req.user._id);

  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      isAdmin: user.isAdmin,
      role: user.role,
    });
  } else {
    res.status(404);
    throw new Error('Utilisateur introuvable');
  }
});

// @desc update profile
// @route PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      lastname: updatedUser.lastname,
      role: updatedUser.role,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('Utilisateur introuvable');
  }
});

// @desc Get users
// @route GET /api/users
// @access Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
});

// @desc Get user by id
// @route GET /api/users/:id
// @access Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404);
    throw new Error('Utilisateur introuvable');
  }
});

// @desc Delete user
// @route DELETE /api/users/:id
// @access Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    if (user.isAdmin) {
      res.status(400);
      throw new Error('Vous ne pouvez pas supprimer un administrateur');
    }
    await user.deleteOne({ _id: user._id });
    res.status(201).json({ message: 'Utilisateur supprimé' });
  } else {
    res.status(404);
    throw new Error('Utilisateur introuvable');
  }
});

// @desc Update user
// @route PUT /api/users/:id
// @access Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.role = req.body.role || user.role;
    user.lastname = req.body.lastname || user.lastname;
    user.isAdmin = Boolean(req.body.isAdmin);

    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      lastname: updatedUser.lastname,
      isAdmin: updatedUser.isAdmin,
      role: updatedUser.role,
    });
  } else {
    res.status(404);
    throw new Error('Utilisateur introuvable');
  }
});

// @desc Forgot password
// @route POST /api/users/forgotpassword
// @access Public
const forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorResponse('There is no user with that email', 404));
  }

  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  const resetUrl = `${req.protocol}://${req.get('host')}/api/users/resetpassword/${resetToken}`;
  const message = resetPasswordTemplate(resetUrl);

  try {
    await sendEmail({
      email: user.email,
      subject: 'Demande de réinitialisation de mot de passe',
      message,
      isHtml: true, // Utilise le template HTML
    });

    res.status(200).json({ success: true, data: 'Email envoyé avec succès.' });
  } catch (err) {
    console.log(err);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorResponse("L'e-mail n'a pas été envoyé. Merci de réessayer.", 500));
  }
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
  forgotPassword,
};
