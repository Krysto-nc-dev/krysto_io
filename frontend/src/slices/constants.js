export const BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://api.krysto.io'
  : 'http://localhost:4000';

export const USERS_URL = `${BASE_URL}/users`;
export const DOLIBAR_URL = 'https://crm.krysto.nc/api/index.php';
export const DOLIBARR_API_KEY = 'IQhnZ7jq08asIF2RZVkxRJ03a918T5um';
