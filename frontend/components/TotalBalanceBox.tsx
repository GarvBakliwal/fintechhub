import { useData } from "@/hooks/useData";
import AnimatedCounter from './AnimatedCounter';
import DoughnutChart from './DoughnutChart';
import { Account } from "@/types";

const TotalBalanceBox = () => {
  const { data } = useData();
  const accounts = (data?.accounts || []) as Account[];
  const totalBanks = accounts.length;
  const totalCurrentBalance = accounts.reduce(
    (sum: number, acc: Account) => sum + Number(acc.current_balance),
    0
  );

  return (
    <section className="total-balance">
      {/* Doughnut Chart Section */}
      <div className="total-balance-chart">
        <DoughnutChart accounts={accounts} />
      </div>

      {/* Bank Accounts and Total Balance Section */}
      {totalBanks > 0 ? (
        <div className="flex flex-col gap-6">
          <h2 className="header-2">Bank Accounts: {totalBanks}</h2>

          <div className="flex flex-col gap-2">
            <p className="total-balance-label">Total Current Balance</p>

            <div className="total-balance-amount flex-center gap-2">
              <AnimatedCounter amount={totalCurrentBalance} />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          <h2 className="header-2">No bank accounts connected yet</h2>

          <div className="flex flex-col gap-2">
            <p className="total-balance-label">
              Please Connect a Account to View Balance
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default TotalBalanceBox;