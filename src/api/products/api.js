import { instance } from '@/contexts/axios';

export const getProducts = async () => {
    const products = await instance.get('/admin/products').then(({ data }) => {
        return data?.products;
    });

    return products;
};
