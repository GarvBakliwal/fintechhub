"use client";

import HeaderBox from '@/components/HeaderBox';
import { Pagination } from '@/components/Pagination';
import TransactionsTable from '@/components/TransactionsTable';
import { formatAmount } from '@/lib/utils';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

const TransactionHistory = () => {
  const searchParams = useSearchParams(); // Access searchParams using useSearchParams
  const id = searchParams.get('id'); // Get the 'id' query parameter
  const page = searchParams.get('page'); // Get the 'page' query parameter

  const [accountsData, setAccountsData] = useState([]);
  const [account, setAccount] = useState<any>(null);
  const [currentTransactions, setCurrentTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user data from the JSON file
        const response = await fetch('/user-data.json');
        const data = await response.json();

        // Assuming the JSON contains user and account data
        setAccountsData(data.accounts);

        const appwriteItemId = id || data.accounts[0]?.id;
        const selectedAccount = data.accounts.find(
          (acc: any) => acc.id === appwriteItemId
        );

        setAccount(selectedAccount);

        const currentPage = Number(page) || 1;
        const rowsPerPage = 10;
        const totalPages = Math.ceil(selectedAccount.transactions.length / rowsPerPage);

        const indexOfLastTransaction = currentPage * rowsPerPage;
        const indexOfFirstTransaction = indexOfLastTransaction - rowsPerPage;

        setCurrentTransactions(
          selectedAccount.transactions.slice(indexOfFirstTransaction, indexOfLastTransaction)
        );
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id, page]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!account) {
    return <p>No account found.</p>;
  }

  const currentPage = Number(page) || 1;
  const rowsPerPage = 10;
  const totalPages = Math.ceil(account.transactions.length / rowsPerPage);

  return (
    <div className="transactions">
      <div className="transactions-header">
        <HeaderBox
          title="Transaction History"
          subtext="See your bank details and transactions."
        />
      </div>

      <div className="space-y-6">
        <div className="transactions-account">
          <div className="flex flex-col gap-2">
            <h2 className="text-18 font-bold text-white">{account.name}</h2>
            <p className="text-14 text-blue-25">{account.officialName}</p>
            <p className="text-14 font-semibold tracking-[1.1px] text-white">
              ●●●● ●●●● ●●●● {account.mask}
            </p>
          </div>

          <div className="transactions-account-balance">
            <p className="text-14">Current balance</p>
            <p className="text-24 text-center font-bold">
              {formatAmount(account.currentBalance)}
            </p>
          </div>
        </div>

        <section className="flex w-full flex-col gap-6">
          <TransactionsTable transactions={currentTransactions} />
          {totalPages > 1 && (
            <div className="my-4 w-full">
              <Pagination totalPages={totalPages} page={currentPage} />
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default TransactionHistory;