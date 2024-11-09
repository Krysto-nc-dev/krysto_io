// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// import { BASE_URL, DOLIBAR_URL } from './constants.js'

// // Si Event, PlasticColor, PlasticType, Recipes, Veilles sont des chaînes de caractères
// const tagTypes = [
//   'Product',
//   'User',

// ]

// const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL })
// const doliBaseQuery = fetchBaseQuery({ baseUrl: DOLIBAR_URL })

// export const apiSlice = createApi({
//   baseQuery,
//   tagTypes,
//   endpoints: (builder) => ({}),
// })

// export const dolibarrApiSlice = createApi({
//   baseQuery: doliBaseQuery,
//   tagTypes: [],
//   endpoints: (builder) => ({}),
// })


import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL, DOLIBAR_URL } from './constants.js';

// Définition des tags pour le cache des endpoints
const tagTypes = ['Product', 'User'];

// Configuration de la requête de base pour l'API principale
const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: 'include', // Permet d'inclure les cookies dans chaque requête
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth?.token;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

// Configuration de la requête de base pour l'API Dolibarr
const doliBaseQuery = fetchBaseQuery({
  baseUrl: DOLIBAR_URL,
  credentials: 'include', // Permet d'inclure les cookies dans chaque requête
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth?.token;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

// API principale avec les tags définis pour la gestion du cache
export const apiSlice = createApi({
  reducerPath: 'api', // Facultatif : définit un chemin unique dans le store Redux
  baseQuery,
  tagTypes,
  endpoints: (builder) => ({}), // Les endpoints seront injectés dans d'autres fichiers
});

// API Dolibarr avec un baseQuery spécifique
export const dolibarrApiSlice = createApi({
  reducerPath: 'dolibarrApi', // Facultatif : identifiant unique pour Dolibarr dans le store
  baseQuery: doliBaseQuery,
  tagTypes: [], // Pas de tags définis pour Dolibarr, à ajuster si nécessaire
  endpoints: (builder) => ({}), // Les endpoints seront également injectés ailleurs
});
