import API from '@/lib/api';

export const createLinkToken = async (payload: { userId: string }) => {
  const response = await API.post('/create-link-token', payload);
  return response.data;
};

export const exchangePublicToken = async (payload: { public_token: string; userId: string }) => {
  const response = await API.post('/exchange-public-token', payload);
  return response.data;
};