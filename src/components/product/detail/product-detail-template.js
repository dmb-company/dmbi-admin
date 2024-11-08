/* eslint-disable @next/next/no-img-element */
'use client';
import Spinner from '@/components/common/spinner';
import { Layout } from '@/components/layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
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
import { useProduct, useUpdateProduct } from '@/api/products/hook';

const ProductDetailTemplate = ({ params }) => {
    const { toast } = useToast();
    const { isLoading, error, data: product } = useProduct(params.id);
    const { mutate: updateProduct } = useUpdateProduct(params.id);

    console.log(product);

    const handleUpdate = async (data) => {
        updateProduct(data, {
            onSuccess: () => {
                toast({
                    title: 'Đã cập nhật thành công sản phẩm!',
                });
            },
            onError: () => {
                toast({
                    title: 'Đã có lỗi xảy ra!',
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
                        <Badge className={`${'bg-green-500'}`}>Mở bán</Badge>
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
                                categories={product?.categories}
                                tags={product?.tags}
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
                                images={product?.images?.images}
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
