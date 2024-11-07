'use client';
import { set, useForm } from 'react-hook-form';
import { useState } from 'react';
import { Form, FormField, FormItem } from '../ui/form';
import { Input } from '../ui/input';
import ImageUpload from '../common/image-upload';
import { formatHandle, uploadFile, uploadFiles } from '@/lib/utils';
import { useToast } from '../ui/use-toast';
import { useCreateProductCategory } from '@/api/product-categories/hook';
const NewCategory = () => {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const { mutate: createProductCategory } = useCreateProductCategory();

    const form = useForm({
        defaultValues: {
            name: '',
            image: '',
        },
    });

    const [files, setFiles] = useState([]);
    const [handle, setHandle] = useState('');

    const handleCreateCategory = (name, image) => {
        const handle = formatHandle(name);
        createProductCategory(
            {
                name,
                handle,
                metadata: {
                    image: image,
                },
            },
            {
                onSuccess: () => {
                    toast({
                        title: 'Tạo mới danh mục thành công',
                        description: `Danh mục mới đã được tạo`,
                    });
                    setIsLoading(false);
                    form.reset();
                    setFiles([]);
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
                        name="category-name"
                        render={({ field }) => (
                            <FormItem>
                                <label htmlFor="name">Tên danh mục</label>
                                <Input
                                    id="category-name"
                                    placeholder="Danh mục mới"
                                    {...form.register('category-name', {
                                        required: true,
                                    })}
                                />
                            </FormItem>
                        )}
                    />
                    <ImageUpload files={files} setFiles={setFiles} />
                    <button
                        onClick={form.handleSubmit(async (data) => {
                            setIsLoading(true);
                            await uploadFiles(files)
                                .then((res) => res[0].url)
                                .then((url) => {
                                    handleCreateCategory(
                                        data['category-name'],
                                        url
                                    );
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

export default NewCategory;
