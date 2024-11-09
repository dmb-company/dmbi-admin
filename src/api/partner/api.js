import { instance } from '@/contexts/axios';

export const getPartners = async () => {
    const partners = await instance
        .get('/admin/partners')
        .then(({ data }) => {
            return data?.partners;
        })
        .catch((error) => {
            console.error('Error: ', error);
        });
    return partners;
};

export const getPartner = async (id) => {
    const partner = await instance
        .get(`/admin/partners/${id}`)
        .then((res) => {
            setTimeout(() => {
                console.log('timeout');
            }, 5000);
            return res.data;
        })
        .catch((error) => {
            console.error('Error: ', error);
        });
    return partner;
};

export const createPartner = async (partner) => {
    const newPartner = await instance
        .post('/admin/partners', partner)
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            console.error('Error: ', error);
        });
    return newPartner;
};

export const deletePartner = async (id) => {
    const partner = await instance
        .delete(`/admin/partners/${id}`)
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            console.error('Error: ', error);
        });
    return partner;
};
