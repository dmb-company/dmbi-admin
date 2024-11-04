'use client';
import { useSession } from '@/api/session/hook';
import LoginCard from '@/components/login/login-card';
import { useRouter } from 'next/navigation';
const HomePage = () => {
    const router = useRouter();
    const { err, isLoading, data } = useSession();
    if (!isLoading && data) {
        router.push('/products');
    }
    return (
        <div className="flex min-h-screen items-center justify-center">
            <LoginCard />
        </div>
    );
};

export default HomePage;
