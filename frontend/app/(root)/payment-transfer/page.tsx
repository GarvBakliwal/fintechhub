"use client";

import HeaderBox from '@/components/HeaderBox';
import PaymentTransferForm from '@/components/PaymentTransferForm';
import { Spinner } from '@/components/ui/loadingspinner';
import ServerError from '@/components/ui/servererror';
import { useGlobalStore } from '@/store/globalStore';
import { useEffect } from 'react';
import { useData } from '@/hooks/useData';

const Transfer = () => {
  const { data, isLoading, error } = useData();
  const setSelectedAccountId = useGlobalStore((state) => state.setSelectedAccountId);

  useEffect(() => {
    if (data && !useGlobalStore.getState().selectedAccountId) {
      const firstAccountId = data.accounts?.[0]?._id || data.accounts?.[0]?.accountId || '';
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
        title="Transfer service unavailable"
        message="Don't worry — your money is safe. Try again shortly."
      />
    );

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