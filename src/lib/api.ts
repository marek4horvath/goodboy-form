import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://frontend-assignment-api.goodrequest.dev',
  headers: { 'Content-Type': 'application/json' },
});

export const getShelters = () => api.get('/shelters');
export const getStats = () => api.get('/donations/stats');
export const postDonation = (payload: any) => api.post('/donations', payload);
