import express from 'express';
const router = express.Router();
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
  forgotPassword, // Import de forgotPassword
} from '../controllers/userController.js';

import { protect, admin } from '../middleware/authMiddleware.js';

// Route pour enregistrer un utilisateur ou obtenir tous les utilisateurs (pour les admins)
router.route('/').post(registerUser).get(protect, admin, getUsers);

// Route pour déconnecter un utilisateur
router.post('/logout', logoutUser);

// Route pour l'authentification d'un utilisateur
router.post('/login', authUser);

// Route pour mot de passe oublié
router.post('/forgotpassword', forgotPassword); // Nouvelle route pour forgotPassword

// Routes pour le profil de l'utilisateur
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

// Routes pour la gestion des utilisateurs spécifiques par ID (admin requis)
router
  .route('/:id')
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser);

export default router;
