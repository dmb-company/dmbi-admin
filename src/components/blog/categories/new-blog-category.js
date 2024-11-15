'use client';
import { set, useForm } from 'react-hook-form';
import { useState } from 'react';
import { Form, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import ImageUpload from '@/components/common/image-upload';
import { formatHandle, uploadFile } from '@/lib/utils';
import { useCreateBlogCategory } from '@/api/blog/hook';
import { useToast } from '@/components/ui/use-toast';
const NewBlogCategory = () => {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const { mutate: createBlogCategory } = useCreateBlogCategory();

    const form = useForm({
        defaultValues: {
            title: '',
            description: '',
        },
    });

    const [files, setFiles] = useState([]);

    const handleCreateBlogCategory = ({ title, description, image }) => {
        createBlogCategory(
            {
                title,
                description,
                image,
            },
            {
                onSuccess: () => {
                    toast({
                        title: 'Tạo mới danh mục thành công',
                        description: `Danh mục ${name} đã được tạo`,
                    });
                    setIsLoading(false);
                    // form.reset();
                    // setFiles([]);
                },
            }
        );
    };

    return (
        <div className="relative">
            <Form {...form}>
                <form className="space-y-4">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <label htmlFor="title">Tên danh mục</label>
                                <Input
                                    id="title"
                                    placeholder="Danh mục mới"
                                    {...form.register('title', {
                                        required: true,
                                    })}
                                />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <label htmlFor="description">
                                    Mô tả danh mục
                                </label>
                                <Input
                                    id="description"
                                    placeholder="Mô tả danh mục"
                                    {...form.register('description', {
                                        required: false,
                                    })}
                                />
                            </FormItem>
                        )}
                    />
                    <ImageUpload files={files} setFiles={setFiles} />
                    <button
                        onClick={form.handleSubmit(async (data) => {
                            setIsLoading(true);
                            await uploadFile(files).then((url) => {
                                handleCreateBlogCategory({
                                    ...data,
                                    image: url,
                                });
                            });
                        })}
                        className="btn btn-primary w-full"
                    >
                        {isLoading && (
                            <span className="loading loading-spinner"></span>
                        )}
                        Tạo danh mục
                    </button>
                </form>
            </Form>
        </div>
    );
};

export default NewBlogCategory;
