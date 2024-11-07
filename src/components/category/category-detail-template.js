/* eslint-disable @next/next/no-img-element */
'use client';
import DialogComponent from '@/components/common/dialog';
import ImageUpload from '@/components/common/image-upload';
import { Layout } from '@/components/layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormField, FormItem } from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import { formatDate, uploadFiles } from '@/lib/utils';
import { Pencil } from 'lucide-react';
import { Input } from '@/components/ui/input';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
    useProductCategory,
    useUpdateCategory,
} from '@/api/product-categories/hook';

const CategoryDetailTemplate = ({ params }) => {
    const { toast } = useToast();
    const {
        isLoading: isCategoryLoading,
        error,
        data: product_category,
    } = useProductCategory(params.id);
    const { mutate: updateProductCategory, isLoading: isUpdateLoading } =
        useUpdateCategory();

    const form = useForm({
        defaultValues: {
            name: product_category?.name,
            image: product_category?.metadata?.image,
        },
    });

    const [files, setFiles] = useState([]);
    const [isSaving, setIsSaving] = useState(false);

    const handleUpdateCategory = (categoryId, name, image) => {
        setIsSaving(true);
        const data = {
            categoryId,
            name,
            ...(image && {
                metadata: {
                    image,
                },
            }),
        };

        console.log(data);
        updateProductCategory(data, {
            onSuccess: () => {
                setIsSaving(false);
                toast({
                    title: 'Cập nhật thành công!',
                });
            },
            onError: () => {
                toast({
                    title: 'Đã có lỗi xảy ra!',
                });
            },
        });
    };

    useEffect(() => {
        if (!product_category) return;
        form.setValue('name', product_category?.name);
        // form.setValue('image', product_category.metadata.image);
    }, [isCategoryLoading, product_category, form]);

    return (
        <Layout>
            <Card className="relative">
                <div className="absolute right-4 top-4 z-20">
                    <DialogComponent
                        title={'Thay đổi ảnh'}
                        size="md"
                        triggerButton={
                            <button className="btn btn-square bg-green-500/30 hover:bg-green-500/50">
                                <Pencil size={15} />
                            </button>
                        }
                    >
                        <Form {...form}>
                            <form>
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <label htmlFor="name">
                                                Tên danh mục
                                            </label>
                                            <Input
                                                id="name"
                                                placeholder="Danh mục mới"
                                                {...form.register('name', {
                                                    required: true,
                                                })}
                                            />
                                        </FormItem>
                                    )}
                                />

                                <ImageUpload
                                    files={files}
                                    setFiles={setFiles}
                                />
                                <button
                                    className="btn btn-primary w-full"
                                    onClick={form.handleSubmit(async (data) => {
                                        setIsSaving(true);
                                        const url = await uploadFiles(files)
                                            .then((res) => res[0]?.url)
                                            .then((url) => {
                                                return url;
                                            });
                                        handleUpdateCategory(
                                            params.id,
                                            data['name'],
                                            url
                                        );
                                    })}
                                >
                                    {isSaving && (
                                        <span className="loading loading-spinner"></span>
                                    )}
                                    Lưu thay đổi
                                </button>
                            </form>
                        </Form>
                    </DialogComponent>
                </div>
                <CardHeader>
                    <CardTitle>{product_category?.name}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="relative flex flex-col space-y-4">
                        <div className="flex items-center space-x-2">
                            <div className="font-semibold">Handle: </div>
                            <span>{product_category?.handle}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="font-semibold">Ngày tạo: </div>
                            <span>
                                {formatDate(product_category?.created_at)}
                            </span>
                        </div>
                        <div className="relative overflow-hidden rounded-lg border-2 border-gray-400">
                            <img
                                src={product_category?.metadata?.image}
                                alt="category-image"
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Layout>
    );
};

export default CategoryDetailTemplate;
