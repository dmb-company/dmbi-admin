'use client';
import { Layout } from '@/components/layout';
import LoginCard from '@/components/login/login-card';
import { useAuth, useAuthStore } from '@/store/auth-store';
const HomePage = () => {
    const { token } = useAuth();
    console.log(token);
    return (
        <div className="flex min-h-screen items-center justify-center">
            test
            <LoginCard />
        </div>
    );
};

export default HomePage;
