import { useEffect, useState } from 'react';
import { getSession } from './api';

export const useSession = () => {
    const [err, setErr] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchSession = async () => {
            setIsLoading(true);
            await getSession()
                .then(({ data }) => {
                    setIsLoading(false);
                    setData(data);
                    return data;
                })
                .then((data) => {
                    setData((pre) => data);
                    return data;
                })
                .catch((err) => {
                    setIsLoading(false);
                    console.log(err);
                    setErr(err);
                });
        };
        fetchSession();
    }, []);

    return {
        err,
        isLoading,
        data,
    };
};
