'use client';

import { useEffect, useState } from 'react';
import HeaderBox from '@/components/HeaderBox';
import RecentTransactions from '@/components/RecentTransactions';
import RightSidebar from '@/components/RightSidebar';
import TotalBalanceBox from '@/components/TotalBalanceBox';
import { getData } from '@/services/data';
import { useGlobalStore } from '@/store/globalStore';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page] = useState(1);

  // Zustand store values
  const user = useGlobalStore((state) => state.user);
  const accounts = useGlobalStore((state) => state.accounts);
  const setSelectedAccountId = useGlobalStore((state) => state.setSelectedAccountId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData();
        useGlobalStore.getState().setAllData(data);
        const firstAccountId = data.accounts?.[0]?.id || data.accounts?.[0]?.accountId || '';
        setSelectedAccountId(firstAccountId);
      } catch (err) {
        console.error(err);
        setError('Failed to load data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [setSelectedAccountId]);

  const selectedAccountId = useGlobalStore((state) => state.selectedAccountId);
  const selectedAccount = accounts.find(
    (acc: any) => acc.id === selectedAccountId || acc.accountId === selectedAccountId
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!accounts || accounts.length === 0) return <p>No accounts found.</p>;

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={user?.firstName || 'Guest'}
            subtext="Access and manage your account and transactions efficiently."
          />

          <TotalBalanceBox
            accounts={accounts}
            totalBanks={accounts.length}
            totalCurrentBalance={accounts.reduce(
              (sum: number, acc: any) => sum + acc.current_balance,
              0
            )}
          />
        </header>

        <RecentTransactions />
      </div>

      <RightSidebar
        user={user}
        transactions={selectedAccount?.transactions || []}
        banks={accounts.slice(0, 2)}
      />
    </section>
  );
};

export default Home;