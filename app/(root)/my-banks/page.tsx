"use client"
import BankCard from '@/components/BankCard';
import HeaderBox from '@/components/HeaderBox';
import React, { useEffect, useState } from 'react';

const MyBanks = () => {
  const [accounts, setAccounts] = useState([]);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user data from the JSON file
        const response = await fetch('/user-data.json');
        const data = await response.json();

        // Assuming the JSON contains user and account data
        setUserName(data.user.firstName);
        setAccounts(data.accounts);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

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
            {accounts.map((account: any) => (
              <BankCard
                key={account.id}
                account={account}
                userName={userName}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyBanks;