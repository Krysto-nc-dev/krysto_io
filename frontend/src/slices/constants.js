export const BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://api.krysto.io'
  : 'http://localhost:4000';

export const USERS_URL = `${BASE_URL}/users`;
export const PRODUCTS_URL = `${BASE_URL}/products`;
export const RECYCLABLE_PRODUCTS_URL = `${BASE_URL}/recyclable-products`;
export const PLASTIC_COLORS_URL = `${BASE_URL}/plastic-colors`
export const PLASTIC_TYPES_URL = `${BASE_URL}/plastic-types`
export const DOLIBAR_URL = 'https://krystotest-erp.square.nc/api/index.php';
export const DOLIBARR_API_KEY = 'eqhTZrONIar69OQ16r3I0861z3BtOsRe';
