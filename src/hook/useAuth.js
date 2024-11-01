import { BASE_URL, REFRESH_TOKEN, TOKEN } from '@/config/constant';
import { useAuthStore } from '@/store/auth-store';
import axios from 'axios';
import { useEffect, useState } from 'react';

export const useAuth = () => {
    const [err, setErr] = useState(null);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { setToken, removeToken } = useAuthStore();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setUser({
                token,
            });
            setToken(token);
        }
    }, [setToken]);

    const login = async (email, password) => {
        setIsLoading(true);
        setErr(null);
        try {
            await axios
                .post(`${BASE_URL}/admin/login`, {
                    email,
                    password,
                })
                .then((res) => {
                    const accessToken = res?.data?.data?.accessToken;
                    const refreshToken = res?.data?.data?.refreshToken;

                    setToken(accessToken);
                    setIsLoading(false);
                    localStorage.setItem(TOKEN, accessToken);
                    localStorage.setItem(REFRESH_TOKEN, refreshToken);

                    setUser({
                        token: res.data.accessToken,
                    });
                    return res;
                });
        } catch (error) {
            setIsLoading(false);
            setErr(error);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        removeToken();
        setUser(null);
    };

    return {
        user,
        isLoading,
        err,
        login,
        logout,
    };
};
