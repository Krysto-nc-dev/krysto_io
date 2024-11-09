// // import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// // import { BASE_URL, DOLIBAR_URL } from './constants.js';

// // // Définition des tags pour le cache des endpoints
// // const tagTypes = ['Product', 'User'];

// // // Configuration de la requête de base pour l'API principale
// // const baseQuery = fetchBaseQuery({
// //   baseUrl: BASE_URL,
// //   credentials: 'include', // Permet d'inclure les cookies dans chaque requête
// //   prepareHeaders: (headers, { getState }) => {
// //     const token = getState().auth?.token;
// //     if (token) {
// //       headers.set('Authorization', `Bearer ${token}`);
// //     }
// //     return headers;
// //   },
// // });

// // // Configuration de la requête de base pour l'API Dolibarr avec gestion de l'API key
// // const doliBaseQuery = fetchBaseQuery({
// //   baseUrl: DOLIBAR_URL,
// //   credentials: 'include', // Permet d'inclure les cookies si nécessaire
// //   prepareHeaders: (headers) => {
// //     // Ajout de la clé API pour Dolibarr dans l'en-tête
// //     headers.set('DOLAPIKEY', 'eqhTZrONIar69OQ16r3I0861z3BtOsRe');
// //     headers.set('Content-Type', 'application/json'); // Définir le type de contenu si requis par Dolibarr
// //     return headers;
// //   },
// // });

// // // API principale avec les tags définis pour la gestion du cache
// // export const apiSlice = createApi({
// //   reducerPath: 'api', // Facultatif : définit un chemin unique dans le store Redux
// //   baseQuery,
// //   tagTypes,
// //   endpoints: (builder) => ({}), // Les endpoints seront injectés dans d'autres fichiers
// // });

// // // API Dolibarr avec un baseQuery spécifique pour la clé API et la gestion des requêtes
// // export const dolibarrApiSlice = createApi({
// //   reducerPath: 'dolibarrApi', // Identifiant unique pour Dolibarr dans le store
// //   baseQuery: doliBaseQuery,
// //   tagTypes: [], // Pas de tags définis pour Dolibarr, à ajuster si nécessaire
// //   endpoints: (builder) => ({
// //     // Exemple d'endpoint pour Dolibarr - à adapter selon vos besoins
    
// //   }),
// // });


// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { BASE_URL, DOLIBAR_URL } from './constants.js';

// // Définition des tags pour le cache des endpoints
// const tagTypes = ['Product', 'User'];

// // Configuration de la requête de base pour l'API principale
// const baseQuery = fetchBaseQuery({
//   baseUrl: BASE_URL,
//   credentials: 'include', // Permet d'inclure les cookies dans chaque requête
//   prepareHeaders: (headers, { getState }) => {
//     const token = getState().auth?.token;
//     if (token) {
//       headers.set('Authorization', `Bearer ${token}`);
//     }
//     return headers;
//   },
// });

// // Configuration de la requête de base pour l'API Dolibarr avec gestion de la clé API
// const doliBaseQuery = fetchBaseQuery({
//   baseUrl: DOLIBAR_URL,
//   credentials: 'include', // Permet d'inclure les cookies si nécessaire
//   prepareHeaders: (headers) => {
//     // Ajout de la clé API pour Dolibarr dans l'en-tête
//     headers.set('DOLAPIKEY', 'eqhTZrONIar69OQ16r3I0861z3BtOsRe');
//     headers.set('Accept', 'application/json'); // Définir le type de réponse attendu
//     headers.set('Content-Type', 'application/json'); // Définir le type de contenu si requis par Dolibarr
//     return headers;
//   },
// });

// // API principale avec les tags définis pour la gestion du cache
// export const apiSlice = createApi({
//   reducerPath: 'api', // Facultatif : définit un chemin unique dans le store Redux
//   baseQuery,
//   tagTypes,
//   endpoints: (builder) => ({}), // Les endpoints seront injectés dans d'autres fichiers
// });

// // API Dolibarr avec un baseQuery spécifique pour la clé API et la gestion des requêtes
// export const dolibarrApiSlice = createApi({
//   reducerPath: 'dolibarrApi', // Identifiant unique pour Dolibarr dans le store
//   baseQuery: doliBaseQuery,
//   tagTypes: [], // Pas de tags définis pour Dolibarr, à ajuster si nécessaire
//   endpoints: (builder) => ({
//     // Endpoint pour récupérer la liste des thirdparties
//     getThirdparties: builder.query({
//       query: () => 'index.php/thirdparties?sortfield=t.rowid&sortorder=ASC&limit=100',
//     }),
//   }),
// });

// // Exportez les hooks pour l'API Dolibarr
// export const { useGetThirdpartiesQuery } = dolibarrApiSlice;


import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL, DOLIBAR_URL } from './constants';

// Configuration de la requête de base pour l'API principale
const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: 'include', // Inclure les cookies dans chaque requête
});

// Configuration de la requête de base pour l'API Dolibarr sans ajout d'en-tête
const doliBaseQuery = fetchBaseQuery({
  baseUrl: DOLIBAR_URL,
  credentials: 'include',
  prepareHeaders: (headers) => {
    headers.append('Accept', 'application/json'); // Demander la réponse en JSON
    headers.append('Content-Type', 'application/json'); // Type de contenu attendu
    return headers;
  },
 
});

// API principale avec les tags définis pour la gestion du cache
export const apiSlice = createApi({
  reducerPath: 'api', // Définit un chemin unique dans le store Redux
  baseQuery,
  tagTypes: ['Simulation', 'User', 'Comment'],
  endpoints: (builder) => ({}), // Les endpoints seront injectés dans d'autres fichiers
});

// API Dolibarr avec un baseQuery pour gérer les requêtes et la clé API directement dans l'URL
export const dolibarrApiSlice = createApi({
  reducerPath: 'dolibarrApi',
  baseQuery: doliBaseQuery,
  tagTypes: ['ThirdParty'],
  endpoints: (builder) => ({
    // Endpoint pour récupérer la liste des thirdparties en ajoutant la clé API directement dans l'URL
    getThirdparties: builder.query({
      query: () => '/thirdparties?DOLAPIKEY=eqhTZrONIar69OQ16r3I0861z3BtOsRe&sortfield=t.rowid&sortorder=ASC&limit=100',
    }),
  }),
});

// Export des hooks pour utiliser l'endpoint dans les composants React
export const { useGetThirdpartiesQuery } = dolibarrApiSlice;
