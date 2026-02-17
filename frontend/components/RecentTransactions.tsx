"use client";

import { useEffect, useState } from "react";
import { useGlobalStore } from "@/store/globalStore";
import { Account } from "@/types/index";
import Link from "next/link";
import TransactionsTable from "./TransactionsTable";

const RecentTransactions = () => {
  const accounts = useGlobalStore((state) => state.accounts) as Account[];
  const setSelectedAccountId = useGlobalStore((state) => state.setSelectedAccountId);

  // Use global selectedAccountId as the source of truth
  const selectedAccountId = useGlobalStore((state) => state.selectedAccountId);
  const [activeTab, setActiveTab] = useState(selectedAccountId || accounts[0]?.accountId || accounts[0]?._id || "");

  // When activeTab changes, update the global store
  useEffect(() => {
    setSelectedAccountId(activeTab);
  }, [activeTab, setSelectedAccountId]);

  const selectedAccount = accounts.find(
    (acc) => acc.accountId === activeTab || acc._id === activeTab
  );
  const allTransactions = useGlobalStore((state) => state.transactions);
  const transactions = allTransactions
    .filter(
      (txn) =>
        txn.accountId === selectedAccount?.accountId ||
        txn.accountId === selectedAccount?._id
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) // latest first
    .slice(0, 10);
  if (!transactions.length) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-gray-500">
        <p className="text-lg font-semibold">No recent transactions yet</p>
        <p className="text-sm">Your recent transactions will appear here</p>
      </div>
    );
  }
  return (
    <section className="recent-transactions">
      <header className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Recent transactions</h2>
        <Link
          href={`/transaction-history/?id=${activeTab}`}
          className="text-blue-600 font-medium hover:underline"
        >
          View all
        </Link>
      </header>

      {/* Tabs */}
      <div className="recent-transactions-tablist">
        {accounts.map((account) => (
          <button
            key={account.accountId || account._id}
            className={`px-4 py-2 -mb-px border-b-2 font-medium transition-colors ${(account.accountId === activeTab || account._id === activeTab)
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-gray-500 hover:text-blue-600"
              }`}
            onClick={() => setActiveTab(account.accountId || account._id)}
          >
            {account.name || account.official_name}
          </button>
        ))}
      </div>

      {/* Account summary */}
      {selectedAccount && (
        <div className="flex items-center bg-blue-50 rounded-lg px-4 py-2 mb-2">
          <span className="font-semibold text-blue-700 mr-2">{selectedAccount.name}</span>
          <span className="text-blue-700">${Number(selectedAccount.current_balance).toFixed(2)}</span>
          <span className="ml-auto text-xs text-blue-400 capitalize">{selectedAccount.subtype}</span>
        </div>
      )}

      {/* Transactions Table */}
      <TransactionsTable transactions={transactions} />
    </section>
  );
};

export default RecentTransactions;