"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import BankCard from "@/components/BankCard";
import HeaderBox from "@/components/HeaderBox";
import { Spinner } from "@/components/ui/loadingspinner";
import { getData } from "@/services/data";
import { useGlobalStore } from "@/store/globalStore";
import { useAddBank } from "@/services/addBank";

const MyBanks = () => {
  const accounts = useGlobalStore((state) => state.accounts);
  const setAccounts = useGlobalStore((state) => state.setAccounts);
  const user = useGlobalStore((state) => state.user);
  const setUser = useGlobalStore((state) => state.setUser);
  const setSelectedAccountId = useGlobalStore((state) => state.setSelectedAccountId);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(accounts.length === 0);

  const { handleAddBank, plaidLoading } = useAddBank(); // ✅ use hook

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
      } catch {
        setError("Failed to load accounts.");
      } finally {
        setLoading(false);
      }
    };
    fetchAccounts();
  }, []);

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

    <section className="my-banks">
      <div className="flex items-center justify-between">
        <HeaderBox
          title="Your Banks"
          subtext="All your connected bank accounts"
        />

        {/* Add Bank Button for mobile */}
        <div className="flex justify-end md:hidden">
          <button
            type="button"
            className="flex gap-2 items-center"
            onClick={handleAddBank}
            disabled={plaidLoading}
          >
            <Image src="/icons/plus.svg" width={20} height={20} alt="plus" />
            <h2 className="text-14 font-semibold text-gray-600">Add Bank</h2>
            {plaidLoading && (
              <Spinner size="small" show className="ml-2 text-blue-600" />
            )}
          </button>
        </div>
      </div>

      {/* Bank Cards */}
      <div className="flex flex-wrap gap-6 mt-6">
        {accounts.map((acc) => (
          <BankCard
            key={acc._id}
            account={acc}
            userName={`${user?.firstName || "Guest"} ${user?.lastName || ""}`}
            showBalance={true}
          />
        ))}
      </div>
    </section >
  );
};

export default MyBanks;