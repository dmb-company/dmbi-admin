import { instance } from '@/contexts/axios';

export const getProducts = async () => {
    const products = await instance
        .get('/products')
        .then(({ data }) => {
            console.log(data);
            return data?.products;
        })
        .catch((err) => {
            console.log(err);
        });

    return products;
};
