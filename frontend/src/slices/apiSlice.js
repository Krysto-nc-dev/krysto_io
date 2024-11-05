import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from './constants';

// Types de tags si tu les utilises dans d'autres appels API
const tagTypes = [
  'User',
  // ajoute d'autres tags si nécessaire
];

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    // Ajouter ici les en-têtes globaux
    headers.set('Content-Type', 'application/json');
    
    // Exemple d'ajout d'un en-tête Authorization si tu utilises un token
    const token = localStorage.getItem('token'); // ou une autre méthode pour obtenir le token
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    
    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes,
  endpoints: (builder) => ({}), // tes endpoints seront ajoutés ici
});
