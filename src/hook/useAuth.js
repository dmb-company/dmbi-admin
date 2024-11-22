import { BASE_URL, REFRESH_TOKEN, TOKEN } from '@/config/constant';
import { useAuthStore } from '@/store/auth-store';
import axios from 'axios';
import { useEffect, useState } from 'react';

export const useAuth = () => {
    const [err, setErr] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { setToken, removeToken } = useAuthStore();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setToken(token);
        }
    }, [setToken]);

    const login = async (email, password) => {
        setIsLoading(true);
        setErr(false);
        try {
            await axios
                .post(`${process.env.NEXT_PUBLIC_BE_URL}/admin/login`, {
                    email,
                    password,
                })
                .then((res) => {
                    const accessToken = res?.data?.data?.accessToken;
                    const refreshToken = res?.data?.data?.refreshToken;

                    setToken(accessToken);
                    localStorage.setItem(TOKEN, accessToken);
                    localStorage.setItem(REFRESH_TOKEN, refreshToken);

                    setErr(false);
                    return res;
                });
            // delay login time for best user experience
            await new Promise((resolve) => setTimeout(resolve, 2000)).then(
                () => {
                    setIsLoading(false);
                }
            );
        } catch (error) {
            setIsLoading(false);
            setErr(true);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        removeToken();
    };

    return {
        isLoading,
        err,
        login,
        logout,
    };
};
