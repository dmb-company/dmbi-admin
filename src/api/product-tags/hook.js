import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createProductTag, getProductTags } from './api';
import { staleTime, cacheTime } from '@/contexts/constants';

export const useProductTags = () => {
    return useQuery(['product-tags'], getProductTags, {
        staleTime,
        cacheTime,
        onError: (err) => {
            console.log('Error fetching product tags: ', err);
        },
    });
};

export const useCreateProductTag = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createProductTag,
        onSuccess: () => {
            queryClient.invalidateQueries('product-tags');
        },
        onError: (error) => {
            console.error('Error creating product tag: ', error);
        },
    });
};
