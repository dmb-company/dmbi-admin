import { instance } from '@/contexts/axios';

export const getStore = async () => {
    const res = instance.get('/store').then(({ data }) => data.data[0]);
    return res;
};

export const updateStore = async (data) => {
    const res = instance
        .patch(`/admin/store`, {
            ...data,
        })
        .then((res) => res.data);

    return res;
};
