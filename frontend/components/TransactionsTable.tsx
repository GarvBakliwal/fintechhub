"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { transactionCategoryStyles } from "@/constants";
import {
  cn,
  formatAmount,
  formatDateTime,
  getTransactionStatus,
  removeSpecialCharacters,
} from "@/lib/utils";
import { CategoryBadgeProps, Transaction } from "@/types";

const CategoryBadge = ({ category }: CategoryBadgeProps) => {
  const {
    borderColor,
    backgroundColor,
    textColor,
    chipBackgroundColor,
  } =
    transactionCategoryStyles[
    category as keyof typeof transactionCategoryStyles
    ] || transactionCategoryStyles.default;

  return (
    <div className={cn("category-badge", borderColor, chipBackgroundColor)}>
      <div className={cn("size-2 rounded-full", backgroundColor)} />
      <p className={cn("text-[12px] font-medium", textColor)}>{category}</p>
    </div>
  );
};

const TransactionsTable = ({ transactions }: { transactions: Transaction[] }) => {
  if (!transactions.length) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-gray-500">
        <p className="text-lg font-semibold">No transactions yet</p>
        <p className="text-sm">Your transactions will appear here</p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden">
      <div className="w-full">
        <Table>
          <TableHeader className="bg-[#f9fafb]">
            <TableRow>
              <TableHead className="px-2">Transaction</TableHead>
              <TableHead className="px-2">Amount</TableHead>
              <TableHead className="px-2">Status</TableHead>
              <TableHead className="px-2">Date</TableHead>
              <TableHead className="px-2 max-md:hidden">Channel</TableHead>
              <TableHead className="px-2 max-md:hidden">Category</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {transactions.map((t: Transaction) => {
              const status = getTransactionStatus(new Date(t.date));
              const amount = formatAmount(t.amount);
              const isDebit = t.amount < 0;

              return (
                <TableRow
                  key={t.transactionId}
                  className={cn(
                    isDebit ? "bg-[#FFFBFA]" : "bg-[#F6FEF9]",
                    "!hover:bg-none !border-b-DEFAULT"
                  )}
                >
                  <TableCell className="max-w-[250px] pl-2 px-2">
                    <h1 className="text-14 truncate font-semibold text-[#344054]">
                      {removeSpecialCharacters(t.name)}
                    </h1>
                  </TableCell>

                  <TableCell
                    className={cn(
                      "pl-2 px-2 font-semibold",
                      isDebit ? "text-[#f04438]" : "text-[#039855]"
                    )}
                  >
                    {amount}
                  </TableCell>

                  <TableCell className="pl-2 px-2">
                    <CategoryBadge category={status} />
                  </TableCell>

                  <TableCell className="min-w-32 pl-2 px-2">
                    {formatDateTime(new Date(t.date)).dateTime}
                  </TableCell>

                  <TableCell className="pl-2 px-2 capitalize min-w-24 max-md:hidden">
                    {t.payment_channel}
                  </TableCell>

                  <TableCell className="pl-2 px-2 max-md:hidden">
                    <CategoryBadge category={t.category} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TransactionsTable;