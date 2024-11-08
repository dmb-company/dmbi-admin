import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useToast } from '../ui/use-toast';
import { Form, FormField, FormItem } from '../ui/form';
import { Input } from '../ui/input';
import ImageUpload from '../common/image-upload';
import { formatHandle, uploadFile, uploadFiles } from '@/lib/utils';

const NewCollectionCard = () => {
    const { toast } = useToast();
    const createCollection = useAdminCreateCollection();
    const [isLoading, setIsLoading] = useState(false);
    const form = useForm({
        defaultValues: {
            title: '',
            image: '',
        },
    });

    const [files, setFiles] = useState([]);

    const handleCreateCollection = (title, image) => {
        const handle = formatHandle(title);
        createCollection.mutate(
            {
                title,
                handle,
                metadata: {
                    image: image,
                },
            },
            {
                onSuccess: ({ collection }) => {
                    console.log(collection);
                    toast({
                        title: 'Tạo mới bộ sưu tập thành công',
                        description: `Bộ sưu tập ${collection.title} đã được tạo`,
                    });
                    setIsLoading(false);
                    form.reset();
                    setFiles([]);
                },
                onError: (error) => {
                    console.log('error', error);
                    toast({
                        title: 'Đã có lỗi xảy ra',
                        description: 'Vui lòng thử lại',
                    });
                },
            }
        );
    };

    return (
        <div>
            <Form {...form}>
                <form className="space-y-4">
                    <FormField
                        control={form.control}
                        name="category-name"
                        render={({ field }) => (
                            <FormItem>
                                <label htmlFor="title">Tên bộ sưu tập</label>
                                <Input
                                    id="collection-title"
                                    placeholder="Bộ sưu tập mới"
                                    {...form.register('title', {
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
                            await uploadFile(files).then((url) => {
                                console.log(url);
                                handleCreateCollection(data['title'], url);
                            });
                        })}
                        className="btn btn-primary w-full"
                    >
                        {isLoading && (
                            <span className="loading loading-spinner"></span>
                        )}
                        Tạo bộ sưu tập
                    </button>
                </form>
            </Form>
        </div>
    );
};

export default NewCollectionCard;
