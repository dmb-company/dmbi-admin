import axios from 'axios';

import { getAuth, useToken } from '@/store/auth-store';
import { QueryClient } from '@tanstack/react-query';

const BASE_URL = 'https://dmb-api.onrender.com/admin'

const token = getAuth().token;

axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

export const instance = axios.create({
    baseURL: BASE_URL,
});
