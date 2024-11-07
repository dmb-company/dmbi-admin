import { staleTime, cacheTime } from '@/contexts/constants';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
    createProductCategory,
    deleteProductCategory,
    getOneProductCategory,
    getProductCategories,
} from './api';

export const useProductCategories = () => {
    return useQuery(['product-categories'], getProductCategories, {
        staleTime,
        cacheTime,
        onError: (err) => {
            console.log('Error fetching product categories: ', err);
        },
    });
};

export const useProductCategory = (id) => {
    return useQuery(['product-category'], () => getOneProductCategory(id), {
        staleTime,
        cacheTime,
        onError: (err) => {
            console.log('Error when fetching product category: ', err);
        },
    });
};

export const useCreateProductCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createProductCategory,
        onSuccess: () => {
            queryClient.invalidateQueries('product-category');
        },
        onError: (error) => {
            console.error('Error create product category: ', error);
        },
    });
};

export const useDeleteProductCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteProductCategory,
        onSuccess: () => {
            queryClient.invalidateQueries('product-category');
        },
        onError: (error) => {
            console.error('Error delete product category: ', error);
        },
    });
};

export const useCategory = () => {};

export const useUpdateCategory = () => {};
