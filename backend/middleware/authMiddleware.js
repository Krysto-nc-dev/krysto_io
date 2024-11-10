import jwt from 'jsonwebtoken'
import asyncHandler from './asyncHandler.js'
import User from '../models/userModel.js'

// Protect routes
const protect = asyncHandler(async (req, res, next) => {
  console.log("Cookies reçus dans la requête:", req.cookies);
  let token

  token = req.cookies.token

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.user = await User.findById(decoded.userId).select('-password')
      next()
    } catch (error) {
      res.status(401)
      throw new Error('Token non valide')
    }
  } else {
    res.status(401)
    throw new Error('Non autorisé, pas de token')
  }
})

// Admin middleware
const admin = (req, res, next) => {
  if (req.user && req.user.role === 'Admin') {
    next()
  } else {
    res.status(401)
    throw new Error("Vous devez être administrateur pour accéder à cette ressource")
  }
}

export { protect, admin }
