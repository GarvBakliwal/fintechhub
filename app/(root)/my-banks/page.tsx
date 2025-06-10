"use client";
import BankCard from '@/components/BankCard';
import HeaderBox from '@/components/HeaderBox';
import { Spinner } from '@/components/ui/loadingspinner';
import { getData } from '@/services/data';
import { useGlobalStore } from '@/store/globalStore';
import { useEffect, useState } from 'react';

const MyBanks = () => {
  const accounts = useGlobalStore((state) => state.accounts);
  const setAccounts = useGlobalStore((state) => state.setAccounts);
  const user = useGlobalStore((state) => state.user);
  const setUser = useGlobalStore((state) => state.setUser);
  const setSelectedAccountId = useGlobalStore((state) => state.setSelectedAccountId);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(accounts.length === 0);

  useEffect(() => {
    if (accounts.length > 0) {
      setLoading(false);
      return;
    }
    const fetchAccounts = async () => {
      try {
        const data = await getData();
        setAccounts(data.accounts || []);
        setUser(data.user);
        const firstAccountId = data.accounts?.[0]?.id || data.accounts?.[0]?.accountId || '';
        setSelectedAccountId(firstAccountId);
      } catch (err) {
        setError('Failed to load accounts.');
      } finally {
        setLoading(false);
      }
    };
    fetchAccounts();
  }, [accounts.length, setAccounts, setSelectedAccountId]);

    if (loading)
      return (
        <div className="flex items-center justify-center min-h-screen w-full bg-white">
          <Spinner size="large" show className="text-blue-600">
            <span className="mt-4 text-lg font-semibold text-blue-700">Loading…</span>
          </Spinner>
        </div>
      );
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <section className="flex">
      <div className="my-banks">
        <HeaderBox
          title="My Bank Accounts"
          subtext="Effortlessly manage your banking activities."
        />

        <div className="space-y-4">
          <h2 className="header-2">Your cards</h2>
          <div className="flex flex-wrap gap-6">
            {accounts.map((account) => (
              <BankCard
                key={account._id || account.accountId}
                account={account}
                userName={`${user?.firstName || "Guest"} ${user?.lastName || ""}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyBanks;