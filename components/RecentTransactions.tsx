"use client";

import { useEffect, useState } from "react";
import { useGlobalStore } from "@/store/globalStore";
import { Account } from "@/types/index";
import Link from "next/link";

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
  const transactions = allTransactions.filter(
    (txn) => txn.accountId === selectedAccount?.accountId || txn.accountId === selectedAccount?._id
  );
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
      <div className="flex border-b mb-4">
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
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm mt-2">
          <thead>
            <tr className="text-gray-500 border-b">
              <th className="py-2 px-3 text-left">Transaction</th>
              <th className="py-2 px-3 text-left">Amount</th>
              <th className="py-2 px-3 text-left">Status</th>
              <th className="py-2 px-3 text-left">Date</th>
              <th className="py-2 px-3 text-left">Channel</th>
              <th className="py-2 px-3 text-left">Category</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-400">
                  No transactions found.
                </td>
              </tr>
            )}
            {transactions.map((txn) => (
              <tr key={txn.transactionId} className="border-b last:border-0">
                <td className="py-2 px-3">{txn.name}</td>
                <td className={`py-2 px-3 font-medium ${txn.amount < 0 ? "text-red-500" : "text-green-600"}`}>
                  {txn.amount < 0 ? "-" : "+"}${Math.abs(txn.amount).toFixed(2)}
                </td>
                <td className="py-2 px-3">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${txn.pending ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"}`}>
                    {txn.pending ? "Processing" : "Success"}
                  </span>
                </td>
                <td className="py-2 px-3">{txn.date}</td>
                <td className="py-2 px-3">{txn.payment_channel || "Other"}</td>
                <td className="py-2 px-3">
                  <span className="inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
                    {txn.category || "Uncategorized"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default RecentTransactions;