import React from 'react';
import { useToast } from '../ui/use-toast';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useDeleteProductCategory } from '@/api/product-categories/hook';

const CategoryDeleteButton = ({ id }) => {
    const { toast } = useToast();
    const { mutate: deleteCategory } = useDeleteProductCategory();

    const handleDelete = () => {
        deleteCategory(id, {
            onSuccess: () => {
                toast({
                    title: 'Xóa thành công',
                });
            },
            onError: ({ id }) => {
                toast({
                    title: 'Xóa thất bại',
                });
            },
        });
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger className="mx-auto mt-[2px] h-[30px] w-full rounded bg-red-400 py-[4px] text-center align-middle">
                Xóa
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Bạn có muốn xóa danh mục này?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Thao tác này không thể hoàn lại!
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="inline-block">
                    <AlertDialogCancel className="inline w-[49%] bg-gray-300">
                        Không
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={() => {
                            handleDelete();
                        }}
                        className="inline w-[49%]"
                    >
                        Có
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default CategoryDeleteButton;
