'use client';
import LoginCard from '@/components/login/login-card';
import { useAuth, useAuthStore } from '@/store/auth-store';
const HomePage = () => {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <LoginCard />
        </div>
    );
};

export default HomePage;
