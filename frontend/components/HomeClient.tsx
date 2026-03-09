'use client';

import { useEffect } from 'react';
import HeaderBox from '@/components/HeaderBox';
import RecentTransactions from '@/components/RecentTransactions';
import RightSidebar from '@/components/RightSidebar';
import TotalBalanceBox from '@/components/TotalBalanceBox';
import { useData } from '@/hooks/useData';
import { useGlobalStore } from '@/store/globalStore';
import ServerError from '@/components/ui/servererror';

const HomeClient = () => {
    const setSelectedAccountId = useGlobalStore((state) => state.setSelectedAccountId);
    const setUser = useGlobalStore((state) => state.setUser);
    const { data, error } = useData();

    useEffect(() => {
        if (data?.user) {
            setUser(data.user);
        }
    }, [data?.user, setUser]);

    useEffect(() => {
        if (data && !useGlobalStore.getState().selectedAccountId) {
            const firstAccountId =
                data.accounts?.[0]?._id ||
                data.accounts?.[0]?.accountId ||
                "";
            setSelectedAccountId(firstAccountId);
        }
    }, [data, setSelectedAccountId]);

    if (error)
        return (
            <ServerError
                title="Dashboard unavailable"
                message="We couldn't load your financial overview. Please try again."
            />
        );

    return (
        <section className="home">
            <div className="home-content">
                <header className="home-header">
                    <HeaderBox type='greeting' title='Welcome' />
                    <TotalBalanceBox />
                </header>
                <RecentTransactions />
            </div>
            <RightSidebar />
        </section>
    );
};

export default HomeClient;
