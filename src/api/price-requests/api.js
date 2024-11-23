import { instance } from '@/contexts/axios';

export const getPriceRequests = async () => {
    const priceRequests = await instance
        .get('/admin/price-requests')
        .then(({ data }) => {
            return data.requests;
        })
        .catch((error) => {
            console.error('Error: ', error);
        });
    return priceRequests;
};

export const deletePriceRequest = async (id) => {
    const deletedRequest = await instance
        .delete(`/admin/price-requests/${id}`)
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            console.error('Error: ', error);
        });
    return deletedRequest;
};

export const updatePriceRequest = async ({ id, status }) => {
    await instance
        .put(`/admin/price-requests/${id}`, {
            status,
        })
        .then((res) => res)
        .catch((err) => console.log(err));
};
