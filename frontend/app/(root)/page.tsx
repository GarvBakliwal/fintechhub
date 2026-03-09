'use client';

import { useEffect } from 'react';
import HeaderBox from '@/components/HeaderBox';
import RecentTransactions from '@/components/RecentTransactions';
import RightSidebar from '@/components/RightSidebar';
import TotalBalanceBox from '@/components/TotalBalanceBox';
import { useData } from '@/hooks/useData';
import { useGlobalStore } from '@/store/globalStore';
import { Spinner } from '@/components/ui/loadingspinner'; // adjust the path if needed
import ServerError from '@/components/ui/servererror';

const Home = () => {
  const setSelectedAccountId = useGlobalStore((state) => state.setSelectedAccountId);

  const { data, isLoading, error } = useData();

  useEffect(() => {
    if (data) {
      const firstAccountId =
        data.accounts?.[0]?.id ||
        data.accounts?.[0]?.accountId ||
        "";
      setSelectedAccountId(firstAccountId);
    }
  }, [data, setSelectedAccountId]);

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen w-full bg-white">
        <Spinner size="large" show className="text-blue-600">
          <span className="mt-4 text-lg font-semibold text-blue-700">Loading…</span>
        </Spinner>
      </div>
    );
  if (error)
    return (
      <ServerError
        title="Dashboard unavailable"
        message="We couldn't load your financial overview. Please try again."
      />
    );
  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox type='greeting' title='Welcome' />
          <TotalBalanceBox />
        </header>
        <RecentTransactions />
      </div>
      <RightSidebar />
    </section>
  );
};

export default Home;