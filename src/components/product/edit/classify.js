'use client';
import DialogComponent from '@/components/common/dialog';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { PencilLineIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import CollectionSelector from '../new/collection-selector';
import CategoriesSelector from '../new/categories-selector';
import { useToast } from '@/components/ui/use-toast';
import ProductTagsSelector from '../new/product-tags-selector';
import { Combobox } from '@/components/common';
import { useProductCategories } from '@/api/product-categories/hook';

const EditClassify = ({
    handleUpdate,
    categories: oldCategories,
    tags: oldTags,
}) => {
    const { toast } = useToast();
    const [tags, setTags] = useState([]);
    const [categories, setCategories] = useState([]);
    const form = useForm({
        defaultValues: {},
    });

    const createPayload = (data) => {
        return {
            categories: categories,
            tags: tags,
        };
    };

    return (
        <DialogComponent
            triggerButton={
                <button className="mr-2">
                    <PencilLineIcon size={16} />
                </button>
            }
            title="Đổi tên sản phẩm"
            size="lg"
        >
            <div className="space-y-2">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit((data) => {
                            toast({
                                title: 'Đang cập nhật sản phẩm...',
                            });
                            handleUpdate(createPayload(data));
                        })}
                        className="grid grid-cols-2 gap-4"
                    >
                        <CategoriesSelector
                            categories={categories}
                            setCategories={setCategories}
                            oldCategories={oldCategories}
                        />
                        <ProductTagsSelector
                            tags={tags}
                            setTags={setTags}
                            oldTags={oldTags}
                        />
                        <Button type="submit" size="lg" className="col-span-2">
                            Lưu
                        </Button>
                    </form>
                </Form>
            </div>
        </DialogComponent>
    );
};

export default EditClassify;
