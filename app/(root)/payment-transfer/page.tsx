"use client";
import HeaderBox from '@/components/HeaderBox';
import PaymentTransferForm from '@/components/PaymentTransferForm';
import { useGlobalStore } from '@/store/globalStore';

const Transfer = () => {
  const accounts = useGlobalStore((state) => state.accounts);

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