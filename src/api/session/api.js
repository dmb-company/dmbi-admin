import { instance } from '@/contexts/axios';

export const getSession = async () => {
    const session = await instance
        .get('/auth/session')
        .then((res) => res)
        .catch((err) => console.log(err));
    return session;
};
