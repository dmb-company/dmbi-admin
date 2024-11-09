import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getStore, updateStore } from './api';
import { staleTime, cacheTime } from '@/contexts/constants';

export const useAdminStore = () => {
    return useQuery(['store'], getStore, {
        staleTime,
        cacheTime,
        onError: (err) => {
            console.log(err);
        },
    });
};

export const useUpdateStore = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateStore,
        onSuccess: () => {
            queryClient.invalidateQueries('store');
        },
        onError: (err) => {
            console.log(err);
        },
    });
};
