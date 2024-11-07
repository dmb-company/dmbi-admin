import { staleTime, cacheTime } from '@/contexts/constants';
import { useQuery } from '@tanstack/react-query';
import { getProductCategories } from './api';

export const useProductCategories = () => {
    return useQuery(['product-categories'], getProductCategories, {
        staleTime,
        cacheTime,
        onError: (err) => {
            console.log('Error fetching product categories: ', err);
        },
    });
};

export const useDeleteProductCategory = () => {};

export const useCategory = () => {};

export const useUpdateCategory = () => {};
