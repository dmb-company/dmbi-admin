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

const EditThumbnail = ({ handleUpdate }) => {
    const form = useForm();
    const { toast } = useToast();
    const [thumbnail, setThumbnail] = useState([]);
    return (
        <DialogComponent
            triggerButton={
                <button className="mr-2">
                    <PencilLineIcon size={16} />
                </button>
            }
            title="Đổi ảnh đại diện"
            size="md"
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(async () => {
                        toast({
                            title: 'Đang cập nhật ảnh đại diện...',
                        });
                        const thumbnail_url = await uploadFiles(thumbnail).then(
                            (res) => res[0].url
                        );
                        console.log(thumbnail_url);
                        handleUpdate({ thumbnail: thumbnail_url });
                    })}
                    className="grid gap-4"
                >
                    <ImageUpload
                        files={thumbnail}
                        setFiles={setThumbnail}
                        label="Thumbnail"
                        description="Ảnh đại diện của sản phẩm"
                    />
                    <Button type="submit">Lưu</Button>
                </form>
            </Form>
        </DialogComponent>
    );
};

export default EditThumbnail;
