'use client';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { MedusaProvider } from 'medusa-react';
import { QueryClient } from '@tanstack/react-query';

const inter = Inter({ subsets: ['latin'] });
const queryClient = new QueryClient();

const MedusaClient = ({ children }) => {
    return (
        <MedusaProvider
            queryClientProviderProps={{ client: queryClient }}
            baseUrl={
                'https://dmb-api.onrender.com'
            }
        >
            {children}
        </MedusaProvider>
    );
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Toaster />
                <MedusaClient>{children}</MedusaClient>
            </body>
        </html>
    );
}
