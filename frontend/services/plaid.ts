import API from '@/lib/api';

export const createLinkToken = async () => {
  const res = await API.post(
    "/create-link-token",
    {},
    {
      withCredentials: true,
    }
  );

  console.log("[FRONTEND] Link Token Response:", res.data);

  return res.data;
};

export const exchangePublicToken = async ({
  public_token,
}: {
  public_token: string;
}) => {
  console.log("[FRONTEND] Exchanging public_token:", public_token);

  const res = await API.post(
    "/exchange-public-token",
    { public_token },
    {
      withCredentials: true,
    }
  );

  console.log("[FRONTEND] Exchange Token Response:", res.data);

  return res.data;
};