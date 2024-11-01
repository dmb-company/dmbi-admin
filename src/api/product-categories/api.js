import { instance } from '@/contexts/axios';

export const getProductCategories = async () => {
    const categories = await instance
        .get('/categories')
        .then(({ data }) => {
            return data?.categories;
        })
        .catch((err) => console.log(err));
    return categories;
};
