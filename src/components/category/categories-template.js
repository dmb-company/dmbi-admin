'use client';
import NewCategory from '@/components/category/new-category';
import DialogComponent from '@/components/common/dialog';
import { Layout } from '@/components/layout';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { formatDate } from '@/lib/utils';
import { CirclePlus, Ellipsis, PlusCircle } from 'lucide-react';
import CategoryItemOptions from '@/components/category/category-item-option';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';
import { useToast } from '../ui/use-toast';
import { useProductCategories } from '@/api/product-categories/hook';

const CategoriesTemplate = () => {
    const { toast } = useToast();
    const {
        isLoading,
        error,
        data: product_categories,
    } = useProductCategories();

    return (
        <Layout>
            <Card>
                <CardHeader>
                    <div className="flex justify-between">
                        <CardTitle className="inline-flex text-left">
                            Các danh mục
                        </CardTitle>
                        <div>
                            <DialogComponent
                                className="inline-flex text-right"
                                title="Tạo mới danh mục"
                                triggerButton={
                                    <button className="btn btn-outline btn-primary">
                                        <PlusCircle size={24} />
                                        Tạo danh mục mới
                                    </button>
                                }
                                size="md"
                            >
                                <NewCategory />
                            </DialogComponent>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    {
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-1/12">
                                        STT
                                    </TableHead>
                                    <TableHead className="w-1/5">
                                        Mã ID
                                    </TableHead>
                                    <TableHead className="w-1/5">
                                        Tên danh mục
                                    </TableHead>
                                    <TableHead className="w-1/5">
                                        Handle
                                    </TableHead>
                                    <TableHead className="w-1/5">
                                        Ngày khởi tạo
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {product_categories?.map((category, index) => (
                                    <TableRow key={category.id}>
                                        <TableCell className="w-1/12">
                                            <Link
                                                href={`/categories/${category.id}`}
                                                key={category.id}
                                            >
                                                <p>{index + 1}</p>
                                            </Link>
                                        </TableCell>
                                        <TableCell className="max-w-[120px] truncate pr-[40px]">
                                            <Link
                                                href={`/categories/${category.id}`}
                                                key={category.id}
                                            >
                                                {category.id}
                                            </Link>
                                        </TableCell>
                                        <TableCell className="max-w-[140px] truncate pr-[40px]">
                                            <Link
                                                href={`/categories/${category.id}`}
                                                key={category.id}
                                            >
                                                {category.name}
                                            </Link>
                                        </TableCell>
                                        <TableCell className="max-w-[140px] truncate pr-[40px]">
                                            <Link
                                                href={`/categories/${category.id}`}
                                                key={category.id}
                                            >
                                                {category.handle}
                                            </Link>
                                        </TableCell>
                                        <TableCell className="w-[140px] pr-[40px]">
                                            {formatDate(category.created_at)}
                                        </TableCell>
                                        <TableCell>
                                            <CategoryItemOptions
                                                id={category.id}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                            <TableFooter></TableFooter>
                        </Table>
                    }
                </CardContent>
            </Card>
        </Layout>
    );
};

export default CategoriesTemplate;
