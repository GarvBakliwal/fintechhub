"use client";

import Image from "next/image";
import { useEffect } from "react";
import BankCard from "@/components/BankCard";
import HeaderBox from "@/components/HeaderBox";
import { Spinner } from "@/components/ui/loadingspinner";
import { useGlobalStore } from "@/store/globalStore";
import { useAddBank } from "@/services/addBank";
import ServerError from "@/components/ui/servererror";
import { useData } from "@/hooks/useData";

const MyBanks = () => {
  const { data, isLoading, error: queryError } = useData();
  const accounts = (data?.accounts || []);
  const user = useGlobalStore((state) => state.user);
  const setSelectedAccountId = useGlobalStore((state) => state.setSelectedAccountId);

  const { handleAddBank, plaidLoading } = useAddBank();

  useEffect(() => {
    if (data && !useGlobalStore.getState().selectedAccountId) {
      const firstAccountId = data.accounts?.[0]?.id || data.accounts?.[0]?.accountId || '';
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
  if (queryError)
    return (
      <ServerError
        title="Banks not loading"
        message="Unable to fetch your bank accounts right now."
      />
    );

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
        {accounts.map((acc: any) => (
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