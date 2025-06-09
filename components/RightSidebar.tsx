import Image from "next/image";
import Link from "next/link";
import React from "react";
import BankCard from "./BankCard";
import { countTransactionCategories } from "@/lib/utils";
import Category from "./Category";
import { useGlobalStore } from "@/store/globalStore";
import { Account, CategoryCount } from "@/types/index";

const RightSidebar = () => {
  const user = useGlobalStore((state) => state.user);
  const accounts = useGlobalStore((state) => state.accounts);
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
          <Link href="/" className="flex gap-2">
            <Image src="/icons/plus.svg" width={20} height={20} alt="plus" />
            <h2 className="text-14 font-semibold text-gray-600">Add Bank</h2>
          </Link>
        </div>
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