import { instance } from '@/contexts/axios';

export const getProductTags = async () => {
    const tags = await instance
        .get('/admin/tags')
        .then((res) => res?.data?.tags);
    return tags;
};

export const createProductTag = async (tagName) => {
    const tag = await instance
        .post('/admin/tags', {
            value: tagName,
        })
        .then(({ data }) => data);
    return tag;
};
