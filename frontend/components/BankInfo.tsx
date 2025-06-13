"use client";

import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { useGlobalStore } from "@/store/globalStore";
import {
  cn,
  formUrlQuery,
  formatAmount,
  getAccountTypeColors,
} from "@/lib/utils";
import { AccountTypes, BankInfoProps } from "@/types";
const BankInfo = ({
  account,
  type,
}: BankInfoProps & { type: string }) => {
  const selectedAccountId = useGlobalStore((state) => state.selectedAccountId);
  const isActive = selectedAccountId === account?._id;
  
  const router = useRouter();
  const handleBankChange = () => {
    const newUrl = formUrlQuery({
      params: useSearchParams.toString(),
      key: "id",
      value: account?._id,
    });
    router.push(newUrl, { scroll: false });
    router
  };

  const colors = getAccountTypeColors(account?.subtype as AccountTypes);

  // ✅ Gracefully get the current balance
  const rawBalance =
    account?.current_balance ??
    0;

  const formattedBalance = formatAmount(Number(rawBalance) || 0);

  return (
    <div
      onClick={handleBankChange}
      className={cn(`bank-info ${colors.bg}`, {
        "shadow-sm border-blue-700": type === "card" && isActive,
        "rounded-xl": type === "card",
        "hover:shadow-sm cursor-pointer": type === "card",
      })}
    >
      <figure
        className={`flex-center h-fit rounded-full bg-blue-100 ${colors.lightBg}`}
      >
        <Image
          src="/icons/connect-bank.svg"
          width={20}
          height={20}
          alt={account.subtype}
          className="m-2 min-w-5"
        />
      </figure>
      <div className="flex w-full flex-1 flex-col justify-center gap-1">
        <div className="bank-info_content">
          <h2
            className={`text-16 line-clamp-1 flex-1 font-bold text-blue-900 ${colors.title}`}
          >
            {account.name}
          </h2>
          {type === "full" && (
            <p
              className={`text-12 rounded-full px-3 py-1 font-medium text-blue-700 ${colors.subText} ${colors.lightBg}`}
            >
              {account.subtype}
            </p>
          )}
        </div>

        {/* ✅ Show safe formatted balance */}
        <p className={`text-16 font-medium text-blue-700 ${colors.subText}`}>
          {formattedBalance}
        </p>
      </div>
    </div>
  );
};

export default BankInfo;