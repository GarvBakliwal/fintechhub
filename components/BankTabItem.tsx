"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { cn, formUrlQuery } from "@/lib/utils";
import { useGlobalStore } from "@/store/globalStore";

interface BankTabItemProps {
  account: { id: string; name: string };
}

export const BankTabItem = ({ account }: BankTabItemProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedAccountId = useGlobalStore((state) => state.selectedAccountId);
  const setSelectedAccountId = useGlobalStore((state) => state.setSelectedAccountId);
  const isActive = selectedAccountId;

  const handleBankChange = () => {
    setSelectedAccountId(account.id);
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "id",
      value: account.id,
    });
    router.push(newUrl, { scroll: false });
  };

  return (
    <div
      onClick={handleBankChange}
      className={cn("banktab-item", {
        "border-blue-600": isActive,
      })}
    >
      <p
        className={cn("text-16 line-clamp-1 flex-1 font-medium text-gray-500", {
          "text-blue-600": isActive,
        })}
      >
        {account.name}
      </p>
    </div>
  );
};