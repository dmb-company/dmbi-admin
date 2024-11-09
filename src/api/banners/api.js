import { instance } from '@/contexts/axios';

export const getBanners = async () => {
    const banners = await instance
        .get('/admin/banners')
        .then(({ data }) => {
            return data?.banners;
        })
        .catch((err) => {
            console.log(err);
        });
    return banners;
};

export const createBanner = async (data) => {
    const banner = await instance
        .post('/admin/banners', data)
        .then((response) => {
            return response.data;
        })
        .catch((err) => {
            console.log('Error when create new banner');
        });
    return banner;
};

export const deleteBanner = async (id) => {
    const banner = await instance
        .delete(`/admin/banners/${id}`)
        .then((response) => {
            return response.data;
        })
        .catch((err) => {
            console.log('Đã có lỗi xảy ra');
        });

    return banner;
};
