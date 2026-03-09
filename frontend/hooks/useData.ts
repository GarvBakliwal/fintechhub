import { useQuery } from '@tanstack/react-query';
import { getData } from '@/services/data';
import { Account, Transaction, User } from '@/types';

export const useData = () => {
    return useQuery<{ accounts: Account[], transactions: Transaction[], user: User }>({
        queryKey: ['financial-data'],
        queryFn: () => getData(),
    });
};
