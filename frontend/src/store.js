// import { configureStore } from '@reduxjs/toolkit'
// import { apiSlice } from './slices/apiSlice'
// import authSliceReducer from './slices/authSlice'

// const store = configureStore({
//   reducer: {
//     [apiSlice.reducerPath]: apiSlice.reducer,

//     auth: authSliceReducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(apiSlice.middleware),
//   devTools: true,
// })

// export default store


import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './slices/apiSlice';
import { dolibarrApiSlice } from './slices/apiSlice'; // Assurez-vous d'importer dolibarrApiSlice
import authSliceReducer from './slices/authSlice';

const store = configureStore({
  reducer: {
    // Ajouter les reducers pour chaque API
    [apiSlice.reducerPath]: apiSlice.reducer,
    [dolibarrApiSlice.reducerPath]: dolibarrApiSlice.reducer,
    auth: authSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware, dolibarrApiSlice.middleware), // Ajouter les middlewares des deux APIs
  devTools: true,
});

export default store;
