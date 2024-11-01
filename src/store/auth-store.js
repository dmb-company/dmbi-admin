import { create } from 'zustand';

export const useAuthStore = create((set) => ({
    token: '',
    setToken: (newToken) =>
        set((state) => ({
            token: newToken,
        })),
    removeToken: () =>
        set(() => ({
            token: '',
        })),
}));
