import { useQuery } from '@tanstack/react-query';
import { getData } from '@/services/data';

export const useData = () => {
    return useQuery({
        queryKey: ['financial-data'],
        queryFn: getData,
    });
};
