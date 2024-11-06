import path from 'path';
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
app.use(cors({
  origin: isProduction ? process.env.prodBaseUrl : process.env.devBaseUrl,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Authorization', 'Content-Type', 'Accept']
}));

// Middleware pour les cookies
app.use(cookieParser());

// Middleware d'options pour les requêtes CORS
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*'); // Permettre toutes les origines (temporaire pour le débogage)
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Authorization, Content-Type, Accept');
  res.sendStatus(204);
});

// Définition des routes API
app.use('/api/users', userRoutes);

const __dirname = path.resolve();

// Configuration de Multer pour téléversement des fichiers
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  }
});

const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|gif/;
  const mimetype = filetypes.test(file.mimetype);
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  if (mimetype && extname) {
    return cb(null, true);
  }
  cb('Error: Images Only!');
};

const upload = multer({
  storage,
  fileFilter
});

// Route pour téléverser une image
app.post('/api/upload', upload.single('cover'), (req, res) => {
  res.send({
    message: 'Image téléchargée avec succès',
    image: `/${req.file.filename}`
  });
});

// Serveur de fichiers statiques pour les uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configuration de Nodemailer pour envoi d'email
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD
  }
});

// Route exemple pour envoi d'email
app.post('/api/send-email', async (req, res) => {
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

// Configuration de production pour servir le frontend
if (isProduction) {
  // Servir les fichiers statiques du frontend
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  // Route pour toutes les routes non-API (SPA fallback)
  app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('API is running in development mode...');
  });
}

// Middlewares de gestion des erreurs
app.use(notFound);
app.use(errorHandler);

// Lancement du serveur
app.listen(port, () => {
  console.log(`Server running on port ${port} in ${isProduction ? 'Production' : 'Development'} mode`);
});
