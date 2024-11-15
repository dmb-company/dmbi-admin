/* eslint-disable @next/next/no-img-element */
'use client';
import Link from 'next/link';
import { Layout } from '../layout';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Eye, PlusCircle, Trash } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '../ui/table';
import { useBlogPosts, useDeleteBlogPost } from '@/api/blog/hook';
import Spinner from '../common/spinner';
import { useToast } from '../ui/use-toast';

const BlogTemplate = () => {
    const { toast } = useToast();
    const { mutate: deletePost } = useDeleteBlogPost();
    const { data: posts, isLoading } = useBlogPosts();

    const handleDeletePost = (id) => {
        toast({
            title: 'Đang xóa bài viết...',
        });
        deletePost(id, {
            onSuccess: () => {
                toast({
                    title: 'Đã xóa bài viết',
                });
            },
            onError: (error) => {
                toast({
                    title: 'Đã xảy ra lỗi',
                });
            },
        });
    };
    return (
        <Layout>
            {isLoading ? (
                <div className="flex h-screen items-center justify-center">
                    <Spinner />
                </div>
            ) : (
                <Card>
                    <CardHeader>
                        <div className="flex justify-between">
                            <div>
                                <CardTitle>Bài viết</CardTitle>
                            </div>
                            <div>
                                <Link href="/blog/new" className="w-full">
                                    <button className="btn btn-outline btn-primary">
                                        <PlusCircle size={20} />
                                        Tạo bài viết mới
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">
                                        STT
                                    </TableHead>
                                    <TableHead className="w-[350px]">
                                        Banner
                                    </TableHead>
                                    <TableHead>Tiêu đề</TableHead>
                                    <TableHead className="text-right"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {posts?.map((post, index) => (
                                    <TableRow key={post.id}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>
                                            <img
                                                src={post.image}
                                                alt={post.title}
                                                className="h-[200px] w-full rounded-lg border-2 object-cover"
                                            />
                                        </TableCell>
                                        <TableCell>{post.title}</TableCell>
                                        <TableCell className="space-x-2 text-right">
                                            <Link href={`/blog/${post.id}`}>
                                                <button className="btn btn-primary">
                                                    <Eye size={20} />
                                                </button>
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    handleDeletePost(post.id);
                                                }}
                                                className="btn btn-outline btn-error"
                                            >
                                                <Trash size={20} />
                                            </button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            )}
        </Layout>
    );
};

export default BlogTemplate;
