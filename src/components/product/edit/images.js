'use client';
import DialogComponent from '@/components/common/dialog';
import ImageUpload from '@/components/common/image-upload';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import { uploadFiles } from '@/lib/utils';
import { PencilLineIcon } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const EditImages = ({ handleUpdate }) => {
    const { toast } = useToast();
    const form = useForm();
    const [images, setImages] = useState([]);
    return (
        <DialogComponent
            triggerButton={
                <button className="mr-2">
                    <PencilLineIcon size={16} />
                </button>
            }
            title="Đổi ảnh sản phẩm"
            size="lg"
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(async () => {
                        toast({
                            title: 'Đang cập nhật ảnh sản phẩm...',
                        });
                        const images_urls = await uploadFiles(images).then(
                            (res) => res.map((image) => image.url)
                        );
                        console.log(images_urls);
                        handleUpdate({
                            images: {
                                images: images_urls,
                            },
                        });
                    })}
                    className="grid gap-4"
                >
                    <ImageUpload
                        multiple
                        files={images}
                        setFiles={setImages}
                        label="Hỉnh ảnh sản phẩm"
                        description="Ảnh mô tả sản phẩm"
                    />
                    <Button type="submit">Lưu</Button>
                </form>
            </Form>
        </DialogComponent>
    );
};

export default EditImages;
