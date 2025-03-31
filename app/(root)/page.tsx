import HeaderBox from '@/components/HeaderBox';
import RecentTransactions from '@/components/RecentTransactions';
import RightSidebar from '@/components/RightSidebar';
import TotalBalanceBox from '@/components/TotalBalanceBox';

const Home = async ({ searchParams: { id, page } }: SearchParamProps) => {
  const currentPage = Number(page as string) || 1;

  let loggedIn, accountsData, account, selectedAccountId: string;

  try {
    // Fetch user data from the JSON file
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user-data.json`, { cache: 'no-store' });
    console.log('Fetch response:', response);

    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }

    const data = await response.json();
    console.log('Fetched data:', data);

    // Extract user and accounts data
    loggedIn = data.user;
    accountsData = data.accounts;

    if (!accountsData || accountsData.length === 0) {
      return <p>No accounts found.</p>;
    }

    // Determine the selected account
    selectedAccountId = (id as string) || accountsData[0]?.id;
    account = accountsData.find((acc: any) => acc.id === selectedAccountId);
  } catch (error) {
    console.error('Error fetching user data:', error);
    return <p>Error loading data. Please try again later.</p>;
  }

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={loggedIn?.firstName || 'Guest'}
            subtext="Access and manage your account and transactions efficiently."
          />

          <TotalBalanceBox
            accounts={accountsData}
            totalBanks={accountsData.length}
            totalCurrentBalance={accountsData.reduce(
              (sum: number, acc: any) => sum + acc.currentBalance,
              0
            )}
          />
        </header>

        <RecentTransactions
          accounts={accountsData}
          transactions={account?.transactions || []}
          selectedAccountId={selectedAccountId}
          page={currentPage}
        />
      </div>

      <RightSidebar
        user={loggedIn}
        transactions={account?.transactions || []}
        banks={accountsData?.slice(0, 2)}
      />
    </section>
  );
};

export default Home;