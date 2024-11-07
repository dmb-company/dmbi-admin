'use client';

import { Layout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { set, useForm } from 'react-hook-form';
import CategoriesSelector from './categories-selector';
import { useState } from 'react';
import ImageUpload from '@/components/common/image-upload';
import TextEditor from '@/components/common/text-editor';
import {
    formatHandle,
    formatNumber,
    uploadFile,
    uploadFiles,
} from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';
import Spinner from '@/components/common/spinner';
import ProductTagsSelector from './product-tags-selector';
import { useCreateProduct } from '@/api/products/hook';

const NewProductTemplate = () => {
    // Image state
    const { toast } = useToast();
    const [images, setImages] = useState([]);
    const [thumbnail, setThumbnail] = useState([]);
    const [tags, setTags] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [description, setDescription] = useState('');
    const [specifications, setSpecifications] = useState([]);

    const form = useForm({
        defaultValues: {
            title: '',
            originCountry: '',
            collection_id: '',
            tags: '',
            metadata: {
                guarantee: '',
                technology: '',
                inventory: '',
                model: '',
                uses: '',
                price: '',
            },
        },
    });

    const createPayload = async (data) => {
        const newTags =
            data.tags &&
            data.tags.split(',').map((tag) => ({
                value: tag.trim(),
            }));

        const tagValues =
            newTags.length > 0
                ? newTags.concat(
                      tags?.map((tag) => {
                          if (tag.value.length === 0) {
                              return;
                          }
                          return {
                              id: tag.id,
                              value: tag.value,
                          };
                      })
                  )
                : tags?.map((tag) => {
                      if (tag.value.length === 0) {
                          return;
                      }
                      return {
                          id: tag.id,
                          value: tag.value,
                      };
                  });
        return {
            title: data.title,
            description: description,
            tags: tagValues,
            categories: categories,
            // images: await uploadFiles(images),
            originCountry: data.originCountry,
            // thumbnail: await uploadFile(thumbnail),
            metadata: {
                uses: data.metadata.uses,
                model: data.metadata.model,
                price: data.metadata.price,
                guarantee: data.metadata.guarantee,
                technology: data.metadata.technology,
                inventory: data.metadata.inventory,
                specifications: specifications,
            },
        };
    };

    const { mutate: createProduct } = useCreateProduct();

    const handleCreateProduct = async (productData) => {
        await createPayload(productData).then((res) => {
            console.log(res);
            createProduct(res, {
                onSuccess: () => {
                    toast({
                        title: 'Đã tạo thành công sản phẩm!',
                    });
                },
                onError: () => {
                    toast({
                        title: 'Đã có lỗi xảy ra!',
                    });
                },
            });
        });
    };

    return (
        <Layout>
            {isLoading && (
                <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
                    <Spinner />
                </div>
            )}
            <Card>
                <CardHeader>
                    <CardTitle>Tạo sản phẩm mới</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit((data) => {
                                handleCreateProduct(data);
                            })}
                            className="space-y-8"
                        >
                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Tên sản phẩm</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Sản phẩm chăm sóc gia mặt"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="metadata.model"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Model</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Sản phẩm chăm sóc gia mặt"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                                control={form.control}
                                name="metadata.uses"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Ứng dụng</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Xử lý khí thải máy hút khói hàn, máy cắt kim loại, máy cắt CNC"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="metadata.guarantee"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Bảo hành</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="12 tháng"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="originCountry"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Xuất xứ</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Việt Nam"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="metadata.technology"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Công nghệ</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="HEPA"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="metadata.inventory"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Tồn kho</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="100"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <ProductTagsSelector
                                    tags={tags}
                                    setTags={setTags}
                                />
                                <FormField
                                    control={form.control}
                                    name="tags"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Tags</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Sản phẩm bán chạy, Hàng mới về,..."
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="metadata.price"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Giá</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder={formatNumber(
                                                        6888000
                                                    )}
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <CategoriesSelector
                                    categories={categories}
                                    setCategories={setCategories}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <ImageUpload
                                    files={thumbnail}
                                    setFiles={setThumbnail}
                                    label="Thumbnail"
                                    description="Ảnh đại diện của sản phẩm"
                                />
                                <ImageUpload
                                    multiple
                                    files={images}
                                    setFiles={setImages}
                                    label="Hỉnh ảnh sản phẩm"
                                    description="Ảnh mô tả sản phẩm"
                                />
                            </div>
                            <TextEditor
                                description={description}
                                setDescription={setDescription}
                            />

                            <Button type="submit">Tạo mới</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </Layout>
    );
};

export default NewProductTemplate;
