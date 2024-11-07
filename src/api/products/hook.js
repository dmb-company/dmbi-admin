import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
    createProduct,
    deleteProduct,
    getOneProduct,
    getProducts,
} from './api';
import { staleTime, cacheTime } from '@/contexts/constants';
import { useRouter } from 'next/navigation';

export const useProducts = () => {
    return useQuery(['products'], getProducts, {
        staleTime,
        cacheTime,
        onError: (err) => {
            console.log('Error fetching products: ', err);
        },
    });
};

export const useDeleteProduct = () => {
    const router = useRouter();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteProduct,
        onSuccess: () => {
            router.refresh();
            queryClient.invalidateQueries('products');
        },
        onError: (error) => {
            console.log('Error deleting product', error);
        },
    });
};

export const useCreateProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createProduct,
        onSuccess: () => {
            queryClient.invalidateQueries('products');
        },
        onError: (error) => {
            console.error('Error creating product: ', error);
        },
    });
};

export const useProduct = (id) => {
    return useQuery(['product', id], () => getOneProduct(id), {
        staleTime,
        cacheTime,
        onError: (err) => {
            console.error('Error fetching one product: ', err);
        },
    });
};
