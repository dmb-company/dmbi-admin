import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deletePriceRequest, getPriceRequests } from './api';
import { staleTime, cacheTime } from '@/contexts/constants';

export const usePriceRequests = () => {
    return useQuery(['price-requests'], getPriceRequests, {
        staleTime,
        cacheTime,
        onError: (error) => {
            console.error('Error fetching price requests:', error);
        },
    });
};

export const useDeletePriceRequest = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deletePriceRequest,
        onSuccess: () => {
            queryClient.invalidateQueries('price-requests');
        },
        onError: (error) => {
            console.error('Error deleting price request:', error);
        },
    });
};