/* eslint-disable @next/next/no-img-element */
'use client';
import Spinner from '@/components/common/spinner';
import { Layout } from '@/components/layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { useAdminProduct, useAdminUpdateProduct } from 'medusa-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { EditName } from '../edit';
import {
    Classify,
    Description,
    GeneralInfo,
    Images,
    Thumbnail,
} from '../detail';

const ProductDetailTemplate = ({ params }) => {
    const { toast } = useToast();
    const { product, isLoading } = useAdminProduct(params.id);
    const updateProduct = useAdminUpdateProduct(params.id);
    console.log(product);

    const handleUpdate = (data) => {
        updateProduct.mutate(data, {
            onSuccess: ({ product }) => {
                toast({
                    title: 'Cập nhật sản phẩm thành công',
                });
            },
            onError: (error) => {
                toast({
                    title: 'Cập nhật sản phẩm thất bại',
                });
            },
        });
    };

    return (
        <Layout>
            <Card>
                <CardHeader>
                    <div className="mb-2 flex items-center justify-between">
                        <CardTitle>
                            <EditName handleUpdate={handleUpdate} />
                            {product?.title}
                        </CardTitle>
                        <Badge
                            className={`${
                                product?.status === 'published'
                                    ? 'bg-green-500'
                                    : 'bg-red-500'
                            }`}
                        >
                            {product?.status}
                        </Badge>
                    </div>
                    <Separator />
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div>
                            <Spinner />
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <GeneralInfo
                                product={product}
                                handleUpdate={handleUpdate}
                            />
                            <Classify
                                collection={product?.collection}
                                categories={product?.categories}
                                handleUpdate={handleUpdate}
                            />
                        </div>
                    )}
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Mô tả</CardTitle>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div>
                            <Spinner />
                        </div>
                    ) : (
                        <Description
                            description={product?.description}
                            handleUpdate={handleUpdate}
                        />
                    )}
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Media</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-1">
                            <Thumbnail
                                thumbnail={product?.thumbnail}
                                handleUpdate={handleUpdate}
                            />
                        </div>
                        <div className="col-span-2">
                            <Images
                                images={product?.images}
                                handleUpdate={handleUpdate}
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Layout>
    );
};

export default ProductDetailTemplate;
