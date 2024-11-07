import { instance } from '@/contexts/axios';

export const getProducts = async () => {
    const products = await instance.get('/admin/products').then(({ data }) => {
        return data?.products;
    });

    return products;
};

export const getOneProduct = async (id) => {
    const product = await instance
        .get(`/admin/products/${id}`)
        .then(({ data }) => {
            return data;
        });

    return product;
};

export const deleteProduct = async (id) => {
    await instance
        .delete('/admin/products', {
            data: {
                productId: id,
            },
        })
        .then(({ data }) => {
            return data;
        });
};

export const createProduct = async (data) => {
    await instance
        .post('/admin/products', {
            ...data,
        })
        .then(({ data }) => {
            return data;
        });
};
