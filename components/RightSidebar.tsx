import Image from "next/image";
import React, { useState, useCallback, useEffect } from "react";
import BankCard from "./BankCard";
import { countTransactionCategories } from "@/lib/utils";
import Category from "./Category";
import { useGlobalStore } from "@/store/globalStore";
import { Account, CategoryCount } from "@/types/index";
import { usePlaidLink } from 'react-plaid-link';
import { createLinkToken, exchangePublicToken } from "@/services/plaid";
import { getData } from "@/services/data";
import { Spinner } from "@/components/ui/loadingspinner";

const RightSidebar = () => {
  const user = useGlobalStore((state) => state.user);
  const accounts = useGlobalStore((state) => state.accounts);
  const setAccounts = useGlobalStore((state) => state.setAccounts);
  const selectedAccountId = useGlobalStore((state) => state.selectedAccountId);

  const selectedAccount = accounts.find(
    (acc: Account) => acc._id === selectedAccountId || acc.accountId === selectedAccountId
  );
  const banks = accounts.slice(0, 2);
  const allTransactions = useGlobalStore((state) => state.transactions);
  const transactions = allTransactions.filter(
    (txn) => txn.accountId === selectedAccount?.accountId || txn.accountId === selectedAccount?._id
  );
  const categories: CategoryCount[] = countTransactionCategories(transactions);

  const [linkToken, setLinkToken] = useState<string | null>(null);
  const [plaidLoading, setPlaidLoading] = useState(false);

  const onSuccess = useCallback(
    async (public_token: string) => {
      await exchangePublicToken({ public_token });
      try {
        const data = await getData();
        setAccounts(data.accounts || []);
      } catch (err) {
        console.error(err);
      }
      window.location.reload();
    },
    [setAccounts]
  );

  const { open, ready } = usePlaidLink({
    token: linkToken || '',
    onSuccess,
    onExit: (err) => {
      if (err) {
        console.warn('[PLAID] Link exited with error:', err);
      }
    },
  });
  useEffect(() => {
    if (linkToken && ready) {
      open();
    }
  }, [linkToken, ready, open]);

  const handleAddBank = async () => {
    setPlaidLoading(true);
    try {
      const data = await createLinkToken();
      setLinkToken(data.linkToken);
    } catch (err) {
      setLinkToken(null);
    } finally {
      setPlaidLoading(false);
    }
  };

  return (
    <aside className="right-sidebar">
      {/* Profile Section */}
      <section className="flex flex-col pb-8">
        <div className="profile-banner" />
        <div className="profile">
          <div className="profile-img">
            <span className="text-5xl font-bold text-blue-500">
              {user?.firstName?.[0] || "U"}
            </span>
          </div>
          <div className="profile-details">
            <h1 className="profile-name">
              {user?.firstName || "Guest"} {user?.lastName || ""}
            </h1>
            <p className="profile-email">{user?.email || "guest@example.com"}</p>
          </div>
        </div>
      </section>

      {/* Banks Section */}
      <section className="banks">
        <div className="flex w-full justify-between">
          <h2 className="header-2">My Banks</h2>
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

        {/* Banks UI */}
        {banks?.length > 0 && (
          <div className="relative flex flex-1 flex-col items-center justify-center gap-5">
            <div className="relative z-10">
              <BankCard
                key={banks[0]._id}
                account={banks[0]}
                userName={`${user?.firstName || "Guest"} ${user?.lastName || ""}`}
                showBalance={false}
              />
            </div>
            {banks[1] && (
              <div className="absolute right-0 top-8 z-0 w-[90%]">
                <BankCard
                  key={banks[1]._id}
                  account={banks[1]}
                  userName={`${user?.firstName || "Guest"} ${user?.lastName || ""}`}
                  showBalance={false}
                />
              </div>
            )}
          </div>
        )}

        {/* Categories Section */}
        <div className="mt-8">
          <h2 className="font-semibold text-base mb-3">Top categories</h2>
          <div className="flex flex-col gap-3">
            {categories.map((category) => (
              <Category key={category.name} category={category} />
            ))}
          </div>
        </div>
      </section>
    </aside>
  );
};

export default RightSidebar;