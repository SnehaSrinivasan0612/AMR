const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://amr-production-8fab.up.railway.app/'  // Replace with your Railway URL
  : 'http://localhost:5000';

export default API_URL; 