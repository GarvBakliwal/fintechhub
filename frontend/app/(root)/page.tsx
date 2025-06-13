'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import HeaderBox from '@/components/HeaderBox';
import RecentTransactions from '@/components/RecentTransactions';
import RightSidebar from '@/components/RightSidebar';
import TotalBalanceBox from '@/components/TotalBalanceBox';
import { getData } from '@/services/data';
import { useGlobalStore } from '@/store/globalStore';
import { Spinner } from '@/components/ui/loadingspinner'; // adjust the path if needed

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const setSelectedAccountId = useGlobalStore((state) => state.setSelectedAccountId);
  const router = useRouter();

  useEffect(() => {
    // Check for JWT token in localStorage
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token) {
      router.replace('/sign-in');
      return;
    }

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
  }, [setSelectedAccountId, router]);


  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen w-full bg-white">
        <Spinner size="large" show className="text-blue-600">
          <span className="mt-4 text-lg font-semibold text-blue-700">Loading…</span>
        </Spinner>
      </div>
    );
  if (error) return <p>{error}</p>;

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