# Krysto.io Application

Bienvenue dans le projet **Krysto.io**. Cette application est une plateforme de gestion intégrée, construite avec un backend en Node.js/Express et un frontend en React. Le projet utilise Redux pour la gestion de l'état global et Tailwind CSS pour le design.

## Prérequis

- [Node.js](https://nodejs.org/) version LTS
- [MongoDB](https://www.mongodb.com/) pour la base de données
- [PM2](https://pm2.keymetrics.io/) pour le déploiement en production du backend

## Installation

Clonez le projet :

```bash
git clone https://github.com/votre-utilisateur/krysto.io.git
cd krysto.io
```

Installez les dépendances pour le backend et le frontend :

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

## Variables d'Environnement

Créez un fichier `.env` dans le répertoire `backend` avec les variables suivantes :

```plaintext
NODE_ENV=development
PORT=4000

MONGO_URI_DEV=<votre-mongo-uri-dev>
MONGO_URI_PROD=<votre-mongo-uri-prod>

JWT_SECRET=<votre-secret-jwt>
JWT_EXPIRE=30d

DOLAPIKEY=<votre-api-key-dolibarr>
DOLIBARR_API_URL=<url-de-votre-api-dolibarr>

SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_EMAIL=support@krysto.io
SMTP_PASSWORD=<votre-mot-de-passe-smtp>
FROM_NAME="L'équipe de Krysto"
FROM_EMAIL=support@krysto.io

prodBaseUrl=https://api.krysto.io
devBaseUrl=http://localhost:4000
```

## Lancer l'Application en Développement

### Backend

Dans le répertoire `backend`, lancez le serveur en mode développement :

```bash
npm run dev
```

Le backend sera accessible à `http://localhost:4000`.

### Frontend

Dans le répertoire `frontend`, lancez l'application en mode développement :

```bash
npm start
```

Le frontend sera accessible à `http://localhost:3000`.

## Scripts Disponibles

### Backend

- `npm start` : Démarre le serveur en production.
- `npm run dev` : Démarre le serveur en mode développement avec `nodemon` pour le rechargement automatique.
- `npm run data:import` : Importe les données initiales dans la base MongoDB.
- `npm run data:destroy` : Supprime les données de la base MongoDB.

### Frontend

- `npm start` : Démarre le frontend en mode développement.
- `npm run build` : Construit l'application React pour la production dans le dossier `build`.
- `npm run test` : Exécute les tests en mode interactif.

## Déploiement en Production

### Backend

1. **Build du Frontend** : Dans le dossier `frontend`, construisez l'application pour la production :

   ```bash
   npm run build
   ```

2. **Copie des fichiers** : Transférez les fichiers de `frontend/build` sur le VPS dans le répertoire souhaité.

3. **Démarrage avec PM2** : Démarrez le backend avec PM2 :

   ```bash
   pm2 start server.js --name krysto_backend
   pm2 save
   pm2 startup
   ```

### Configuration de Nginx

Configurez Nginx pour servir le frontend et proxifier les requêtes backend. Voici un exemple de configuration pour Nginx :

```nginx
server {
    listen 80;
    server_name krysto.io www.krysto.io;

    location / {
        root /chemin/vers/frontend/build;
        try_files $uri /index.html;
    }

    location /api/ {
        proxy_pass http://localhost:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### HTTPS avec Certbot

Pour sécuriser le site avec HTTPS :

```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d krysto.io -d www.krysto.io
```

Certbot configurera automatiquement Nginx pour rediriger le trafic HTTP vers HTTPS.

## Fonctionnalités

- **Authentification JWT** : Connexion sécurisée avec JSON Web Tokens.
- **API Dolibarr** : Intégration avec l'API Dolibarr pour gérer les opérations de l'entreprise.
- **Notifications par Email** : Envoi d'emails via SMTP pour les notifications et alertes.
- **Gestion des utilisateurs** : Création, modification, et suppression de profils utilisateurs.

## Technologies Utilisées

- **Backend** : Node.js, Express, MongoDB, JWT, Nodemailer
- **Frontend** : React, Redux, Tailwind CSS, Axios
- **Outils de Déploiement** : PM2, Nginx, Certbot (Let’s Encrypt)

## Contributions

Les contributions sont les bienvenues ! N'hésitez pas à forker le projet et à proposer des pull requests.

## License

Ce projet est sous licence MIT. Consultez le fichier [LICENSE](LICENSE) pour plus de détails.
