import API from '@/lib/api';

export const createLinkToken = async () => {
  const token = localStorage.getItem('token');
  console.log('[FRONTEND] JWT Token:', token);

  const res = await API.post('/create-link-token', {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
  console.log('[FRONTEND] Link Token Response:', res.data);

  return res.data;
};

export const exchangePublicToken = async ({ public_token }: { public_token: string }) => {
  const token = localStorage.getItem('token');
  console.log('[FRONTEND] Exchanging public_token:', public_token);
  console.log('[FRONTEND] JWT Token:', token);

  const res = await API.post('/exchange-public-token', {
    public_token,
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });

  console.log('[FRONTEND] Exchange Token Response:', res.data);

  return res.data;
};