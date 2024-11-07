import { instance } from '@/contexts/axios';

export const getProductCategories = async () => {
    const categories = await instance
        .get('/admin/categories')
        .then(({ data }) => {
            return data?.categories;
        });
    return categories;
};

export const getOneProductCategory = async (id) => {
    const category = await instance
        .get(`/admin/categories/${id}`)
        .then((res) => res.data);

    return category;
};

export const createProductCategory = async (data) => {
    const category = await instance
        .post(`/admin/categories`, {
            ...data,
        })
        .then((res) => res.data);
    return category;
};

export const deleteProductCategory = async (id) => {
    await instance.delete('/admin/categories', {
        data: {
            categoryId: id,
        },
    });
};

export const updateProductCategory = async (data) => {
    await instance.patch(`/admin/categories`, {
        ...data,
    });
};
