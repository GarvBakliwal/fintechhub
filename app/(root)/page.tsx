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

  const setSelectedAccountId = useGlobalStore((state) => state.setSelectedAccountId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData();
        useGlobalStore.getState().setAllData(data);
        const firstAccountId = data.accounts?.[0]?.id || data.accounts?.[0]?.accountId || '';
        setSelectedAccountId(firstAccountId);
      } catch (err) {
        setError('Failed to load data.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [setSelectedAccountId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox />
          <TotalBalanceBox />
        </header>
        <RecentTransactions />
      </div>
      <RightSidebar />
    </section>
  );
};

export default Home;