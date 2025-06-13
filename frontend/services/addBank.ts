import { useState, useCallback, useEffect } from "react";
import { usePlaidLink } from "react-plaid-link";
import { createLinkToken, exchangePublicToken } from "@/services/plaid";
import { getData } from "@/services/data";
import { useGlobalStore } from "@/store/globalStore";

export const useAddBank = () => {
  const [linkToken, setLinkToken] = useState<string | null>(null);
  const [plaidLoading, setPlaidLoading] = useState(false);
  const setAccounts = useGlobalStore((state) => state.setAccounts);

  const onSuccess = useCallback(
    async (public_token: string) => {
      await exchangePublicToken({ public_token });
      const data = await getData();
      setAccounts(data.accounts || []);
      window.location.reload();
    },
    [setAccounts]
  );

  const { open, ready } = usePlaidLink({
    token: linkToken || '',
    onSuccess,
    onExit: (err) => {
      if (err) console.warn("[PLAID] Link exited with error:", err);
    },
  });

  useEffect(() => {
    if (linkToken && ready) open();
  }, [linkToken, ready, open]);

  const handleAddBank = async () => {
    setPlaidLoading(true);
    try {
      const data = await createLinkToken();
      setLinkToken(data.linkToken);
    } catch {
      setLinkToken(null);
    } finally {
      setPlaidLoading(false);
    }
  };

  return { handleAddBank, plaidLoading };
};