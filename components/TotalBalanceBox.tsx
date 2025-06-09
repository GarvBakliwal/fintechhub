import { useGlobalStore } from "@/store/globalStore";
import AnimatedCounter from './AnimatedCounter';
import DoughnutChart from './DoughnutChart';
import { Account } from "@/types";

const TotalBalanceBox = () => {
  const accounts = useGlobalStore((state) => state.accounts);
  const totalBanks = accounts.length;
  const totalCurrentBalance = accounts.reduce(
    (sum: number, acc: Account) => sum + acc.current_balance,
    0
  );

  return (
    <section className="total-balance">
      {/* Doughnut Chart Section */}
      <div className="total-balance-chart">
        <DoughnutChart accounts={accounts} />
      </div>

      {/* Bank Accounts and Total Balance Section */}
      <div className="flex flex-col gap-6">
        <h2 className="header-2">Bank Accounts: {totalBanks}</h2>
        <div className="flex flex-col gap-2">
          <p className="total-balance-label">Total Current Balance</p>
          <div className="total-balance-amount flex-center gap-2">
            <AnimatedCounter amount={totalCurrentBalance} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TotalBalanceBox;