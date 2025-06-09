"use client";

import HeaderBox from '@/components/HeaderBox';
import { Pagination } from '@/components/Pagination';
import TransactionsTable from '@/components/TransactionsTable';
import { formatAmount } from '@/lib/utils';
import { BankDropdown } from "@/components/BankDropdown";
import { useGlobalStore } from '@/store/globalStore';
import { useRouter, useSearchParams } from 'next/navigation';

const ROWS_PER_PAGE = 10;

const TransactionHistory = () => {
  const accounts = useGlobalStore((state) => state.accounts);
  const transactions = useGlobalStore((state) => state.transactions);
  const setSelectedAccountId = useGlobalStore((state) => state.setSelectedAccountId);
  const selectedAccountId = useGlobalStore((state) => state.selectedAccountId);
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get('page')) || 1;

  const handleBankChange = (id: string) => {
    setSelectedAccountId(id);
    const params = new URLSearchParams(searchParams.toString());
    params.set("id", id);
    params.set("page", "1"); // Reset to first page on bank change
    router.push(`?${params.toString()}`);
  };

  // Find the selected account
  const selectedAccount =
    accounts.find(
      (acc) => acc.accountId === selectedAccountId || acc._id === selectedAccountId
    ) || accounts[0];

  if (!selectedAccount) {
    return <p>No account found.</p>;
  }

  // Filter transactions for this account
  const accountTransactions = transactions.filter(
    (txn) =>
      txn.accountId === selectedAccount.accountId ||
      txn.accountId === selectedAccount._id
  );

  const totalPages = Math.ceil(accountTransactions.length / ROWS_PER_PAGE);
  const indexOfLastTransaction = page * ROWS_PER_PAGE;
  const indexOfFirstTransaction = indexOfLastTransaction - ROWS_PER_PAGE;
  const currentTransactions = accountTransactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

  return (
    <div className="transactions">
      <div className="transactions-header">
        <HeaderBox
          title="Transaction History"
          subtext="See your bank details and transactions."
        />
      </div>

      <div className="my-4">
        <BankDropdown
          accounts={accounts}
          setValue={(_ :string, id:string) => handleBankChange(id)}
          otherStyles="w-full max-w-xs"
        />
      </div>

      <div className="space-y-6">
        <div className="transactions-account">
          <div className="flex flex-col gap-2">
            <h2 className="text-18 font-bold text-white">{selectedAccount.name}</h2>
            <p className="text-14 text-blue-25">{selectedAccount.official_name}</p>
            <p className="text-14 font-semibold tracking-[1.1px] text-white">
              ●●●● ●●●● ●●●● {selectedAccount.mask}
            </p>
          </div>

          <div className="transactions-account-balance">
            <p className="text-14">Current balance</p>
            <p className="text-24 text-center font-bold">
              {formatAmount(Number(selectedAccount.current_balance) || 0)}
            </p>
          </div>
        </div>

        <section className="flex w-full flex-col gap-6">
          <TransactionsTable  />
          {totalPages > 1 && (
            <div className="my-4 w-full">
              <Pagination totalPages={totalPages} page={page} />
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default TransactionHistory;