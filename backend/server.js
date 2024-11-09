import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import multer from 'multer';
import nodemailer from 'nodemailer';

dotenv.config();
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';

// Définition de __dirname et __filename pour un module ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 4000;

// Affiche l'environnement actuel
console.log(`L'application est en mode ${isProduction ? 'Production' : 'Développement'}`);

// Connexion à la base de données
connectDB();

const app = express();

// Middleware pour parsing des requêtes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuration CORS en fonction de l'environnement
const allowedOrigins = [
  'http://localhost:3000', // Pour le développement en local
  'https://krysto.io',     // Domaine principal en production
  'https://api.krysto.io'  // Sous-domaine API en production
];

app.use(cors({
  credentials: true,
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'La politique CORS ne permet pas l\'accès depuis cette origine.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Authorization', 'Content-Type', 'Accept']
}));

// Middleware pour les cookies
app.use(cookieParser());

// Middleware pour les requêtes OPTIONS (pré-vol) avec CORS
app.options('*', cors(), (req, res) => {
  res.sendStatus(204);
});

// Définition des routes API
app.get('/', (req, res) => {
  res.send('API is running');
});
app.use('/users', userRoutes);
app.use('/products', productRoutes);

// Gestion des téléversements avec Multer
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  }
});
const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|gif/;
  const mimetype = filetypes.test(file.mimetype);
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  if (mimetype && extname) {
    return cb(null, true);
  }
  cb('Erreur : uniquement des images (JPEG, PNG, GIF) sont autorisées.');
};
const upload = multer({ storage, fileFilter });
app.post('/upload', upload.single('cover'), (req, res) => {
  res.send({
    message: 'Image téléchargée avec succès',
    image: `/uploads/${req.file.filename}`
  });
});

// Serveur de fichiers statiques pour les uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configuration de Nodemailer pour l'envoi d'email
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD
  }
});

app.post('/send-email', async (req, res) => {
  try {
    const info = await transporter.sendMail({
      from: `"${process.env.FROM_NAME}" <${process.env.FROM_EMAIL}>`,
      to: req.body.to,
      subject: req.body.subject,
      text: req.body.text,
      html: req.body.html
    });
    res.json({ message: 'Email envoyé avec succès', info });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de l\'envoi de l\'email', error });
  }
});

// Middleware de gestion des erreurs
app.use(notFound);
app.use(errorHandler);

// Lancement du serveur
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port} en mode ${isProduction ? 'Production' : 'Développement'}`);
});
