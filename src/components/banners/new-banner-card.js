import { useCreateBanner } from '@/api/banners/hook';
import { useToast } from '../ui/use-toast';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { useForm } from 'react-hook-form';
import ImageUpload from '../common/image-upload';
import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Check, ChevronsUpDown } from 'lucide-react';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '../ui/command';
import { cn, uploadFile } from '@/lib/utils';
import { useProducts } from '@/api/products/hook';

const NewBannerCard = () => {
    const form = useForm({});
    const { toast } = useToast();
    const [filesPC, setFilesPC] = useState([]);
    const [filesMB, setFilesMB] = useState([]);
    const { mutate: createBanner } = useCreateBanner();
    const { data: products, isLoading, error } = useProducts();
    console.log(products);

    const handleCreateBanner = (data) => {
        createBanner(data, {
            onSuccess: () => {
                toast({
                    title: 'Đã tạo mới banner',
                });
            },
            onError: () => {
                toast({
                    title: 'Đã có lỗi xảy ra',
                });
            },
        });
    };

    const createPayload = async (data) => {
        return {
            image_pc: await uploadFile(filesPC),
            image_mobile: await uploadFile(filesMB),
            product_id: products.find(
                (product) => product.title === data.product_title
            )?.id,
        };
    };

    const onSubmit = async (data) => {
        toast({
            title: 'Đang tạo...',
        });
        handleCreateBanner(await createPayload(data));
    };
    return (
        <div>
            <Form {...form}>
                <form
                    className="space-y-5"
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <ImageUpload
                        files={filesPC}
                        setFiles={setFilesPC}
                        label="Hình ảnh (Máy tính)"
                        description="Banner hiển thị ở Màn hình máy tính"
                    />
                    <ImageUpload
                        files={filesMB}
                        setFiles={setFilesMB}
                        label="Hình ảnh (Điện thoại)"
                        description="Banner hiển thị ở Màn hình điện thoại"
                    />

                    <FormField
                        control={form.control}
                        name="product_title"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Language</FormLabel>
                                <Popover className="">
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                className={cn(
                                                    'w-full justify-between',
                                                    !field.title &&
                                                        'text-muted-foreground'
                                                )}
                                            >
                                                {field.value
                                                    ? products?.find(
                                                          (product) =>
                                                              product.title ===
                                                              field.value
                                                      )?.title
                                                    : 'Chọn sản phẩm'}
                                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-full p-0">
                                        <Command>
                                            <CommandInput placeholder="Tìm kiếm..." />
                                            <CommandList>
                                                <CommandEmpty>
                                                    Không tìm thấy sản phẩm.
                                                </CommandEmpty>
                                                <CommandGroup>
                                                    {products?.map(
                                                        (product) => (
                                                            <CommandItem
                                                                value={
                                                                    product.title
                                                                }
                                                                key={product.id}
                                                                onSelect={() => {
                                                                    form.setValue(
                                                                        'product_title',
                                                                        product.title
                                                                    );
                                                                }}
                                                            >
                                                                <Check
                                                                    className={cn(
                                                                        'mr-2 h-4 w-4',
                                                                        product.title ===
                                                                            field.value
                                                                            ? 'opacity-100'
                                                                            : 'opacity-0'
                                                                    )}
                                                                />
                                                                {product.title}
                                                            </CommandItem>
                                                        )
                                                    )}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                            </FormItem>
                        )}
                    />
                    <Button className="my-2">Tạo mới</Button>
                </form>
            </Form>
        </div>
    );
};

export default NewBannerCard;
