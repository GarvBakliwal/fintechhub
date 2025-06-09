"use client";
import BankCard from '@/components/BankCard';
import HeaderBox from '@/components/HeaderBox';
import { useGlobalStore } from '@/store/globalStore';

const MyBanks = () => {
  const accounts = useGlobalStore((state) => state.accounts);
  const user = useGlobalStore((state) => state.user);

  return (
    <section className="flex">
      <div className="my-banks">
        <HeaderBox
          title="My Bank Accounts"
          subtext="Effortlessly manage your banking activities."
        />

        <div className="space-y-4">
          <h2 className="header-2">Your cards</h2>
          <div className="flex flex-wrap gap-6">
            {accounts.map((account) => (
              <BankCard
                key={account._id || account.accountId}
                account={account}
                userName={`${user?.firstName || "Guest"} ${user?.lastName || ""}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyBanks;