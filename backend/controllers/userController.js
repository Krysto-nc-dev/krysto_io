import crypto from 'crypto';
import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js';
import ErrorResponse from '../utils/errorResponse.js';
import sendEmail from '../utils/sendEmail.js';

// @desc Auth user & get token
// @route POST /api/users/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    sendTokenResponse(user, 200, res);
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

  const user = await User.create({ name, lastname, email, password });

  if (user) {
    sendTokenResponse(user, 201, res);

    const message = `Bonjour ${name} ${lastname}, ...` // Contenu de l'email
    try {
      await sendEmail({ email: user.email, subject: 'Bienvenue sur Krysto.io!', message });
      console.log(`Email de bienvenue envoyé à ${user.email}`);
    } catch (error) {
      console.error(`Erreur lors de l'envoi de l'email : ${error.message}`);
    }
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
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    expires: new Date(0), // Expire immédiatement
  });
  res.status(200).json({ message: 'Vous êtes déconnecté' });
});

// @desc      Reset password
// @route     PUT /api/users/resetpassword/:resettoken
// @access    Public
const resetPassword = asyncHandler(async (req, res, next) => {
  const resetPasswordToken = crypto.createHash('sha256').update(req.params.resettoken).digest('hex');
  const user = await User.findOne({ resetPasswordToken, resetPasswordExpire: { $gt: Date.now() } });

  if (!user) {
    return next(new ErrorResponse('Token non valide', 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  sendTokenResponse(user, 200, res);
});

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();
  const options = {
    maxAge: process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  };

  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    token,
  });
};

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
  updatePassword,
  forgotPassword,
  resetPassword,
};
