import API from '@/lib/api';

export const createLinkToken = async () => {
  const token = localStorage.getItem('token');
  const res = await API.post(
    "/create-link-token",
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return res.data;
};

export const exchangePublicToken = async ({
  public_token,
}: {
  public_token: string;
}) => {
  const token = localStorage.getItem('token');
  const res = await API.post(
    "/exchange-public-token",
    { public_token },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return res.data;
};