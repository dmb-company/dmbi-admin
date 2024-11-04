import { useQuery } from '@tanstack/react-query';
import { getProducts } from './api';
import { staleTime, cacheTime } from '@/contexts/constants';

export const useProducts = () => {
    return useQuery(['products'], getProducts, {
        staleTime,
        cacheTime,
        onError: (err) => {
            console.log('Error fetching products: ', err);
        },
    });
};
