"use client";
import HeaderBox from '@/components/HeaderBox';
import PaymentTransferForm from '@/components/PaymentTransferForm';
import { Spinner } from '@/components/ui/loadingspinner';
import { getData } from '@/services/data';
import { useGlobalStore } from '@/store/globalStore';
import { useEffect, useState } from 'react';

const Transfer = () => {
  const accounts = useGlobalStore((state) => state.accounts);
  const setAccounts = useGlobalStore((state) => state.setAccounts);
  const setSelectedAccountId = useGlobalStore((state) => state.setSelectedAccountId);
  const setUser = useGlobalStore((state)=>state.setUser)
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
        setUser(data.user)
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
    <section className="payment-transfer">
      <HeaderBox
        title="Payment Transfer"
        subtext="Please provide any specific details or notes related to the payment transfer"
      />

      <section className="size-full pt-5">
        <PaymentTransferForm />
      </section>
    </section>
  );
};

export default Transfer;