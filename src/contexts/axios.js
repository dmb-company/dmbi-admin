import axios from 'axios';
import { REFRESH_TOKEN, TOKEN } from '@/config/constant';

const BASE_URL = process.env.NEXT_PUBLIC_BE_URL;

export const instance = axios.create({
    baseURL: BASE_URL,
});

// set token to axios request
instance.interceptors.request.use(
    (config) => {
        // get token from localStorage
        const token = localStorage.getItem(TOKEN);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (err) => Promise.reject(err)
);

instance.interceptors.response.use(
    (response) => {
        return response;
    },
    (err) => {
        const originalRequest = err.config;
        const { status, data = {} } = err?.response;
        if (data?.message === 'Token has expired') {
            const res = refreshTokenFunction();
            if (res.status === 200) {
                return instance(originalRequest);
            }
        }
        return Promise.reject(err);
    }
);

const refreshTokenFunction = () => {
    const res = instance
        .post('/refreshToken', {
            refreshToken: localStorage.getItem(REFRESH_TOKEN),
        })
        .then(({ data }) => {
            if (data?.token) {
                console.log('Set new token');
                localStorage.setItem(TOKEN, data?.token);
            }
            axios.defaults.headers.Authorization = `Bearer ${data?.token}`;
            return data?.token;
        })
        .catch((err) => {
            console.log('AXIOS ERR: ', err);
            return err;
        });
    return res;
};
