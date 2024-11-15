import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '../ui/input';
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from '../ui/form';
import { set, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useToast } from '../ui/use-toast';
import { useAuth } from '@/hook/useAuth';
import { Loader2, Lock, User } from 'lucide-react';
import { Button } from '../ui/button';
import { resolve } from 'styled-jsx/css';
import { useState } from 'react';

const LoginCard = () => {
    const router = useRouter();
    const { err, isLoading, login } = useAuth();

    const { toast } = useToast();

    const form = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const handleLogin = async ({ email, password }) => {
        await login(email, password).then((res) => {
            if (!isLoading && !err) {
                // router.push('/products');
            }
            return res;
        });
    };

    return (
        <Card className="mx-auto w-[400px] shadow-lg">
            <CardHeader className="space-y-1">
                <div className="mb-2 flex items-center justify-center">
                    <Lock className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-center text-2xl font-bold">
                    DMB Industrial
                </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleLogin)}
                        className="space-y-4"
                    >
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tên đăng nhập</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                value=""
                                                className="pl-10"
                                                placeholder="shop@gmail.com"
                                                {...field}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Mật khẩu</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                className="pl-10"
                                                type="password"
                                                placeholder="********"
                                                value=""
                                                {...field}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {err && (
                            <FormMessage className="text-center">
                                Tên đăng nhập hoặc mật khẩu không đúng
                            </FormMessage>
                        )}
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Đang xử lý
                                </>
                            ) : (
                                'Đăng nhập'
                            )}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};

export default LoginCard;
