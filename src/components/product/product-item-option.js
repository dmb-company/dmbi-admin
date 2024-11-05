import {
    Ellipsis,
    FolderOpenDot,
    LockKeyhole,
    LockKeyholeOpen,
    Trash,
} from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import Link from 'next/link';
import { useToast } from '../ui/use-toast';
import { useDeleteProduct } from '@/api/products/hook';
import { revalidatePath } from 'next/cache';
import { useRouter } from 'next/navigation';

const ProductItemOptions = ({ id, status }) => {
    const { toast } = useToast();
    const { mutate: deleteProduct } = useDeleteProduct();

    const handleUpdate = (data) => {
        updateProduct.mutate(data, {
            onSuccess: ({ product }) => {
                toast({
                    title: 'Cập nhật sản phẩm thành công',
                });
            },
        });
    };

    const handleDelete = () => {
        deleteProduct(id, {
            onSuccess: () => {
                toast({
                    title: 'Đã xóa thành công sản phẩm!',
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
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Ellipsis />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>
                    <Link
                        href={`/products/${id}`}
                        className="flex items-center justify-center space-x-1"
                    >
                        <FolderOpenDot size={16} />
                        <span>Xem sản phẩm</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    {status === 'draft' ? (
                        <button
                            onClick={() =>
                                handleUpdate({
                                    status: 'published',
                                })
                            }
                            className="flex items-center justify-center space-x-1"
                        >
                            <LockKeyholeOpen size={16} />
                            <span>Đăng sản phẩm</span>
                        </button>
                    ) : (
                        <button
                            onClick={() =>
                                handleUpdate({
                                    status: 'draft',
                                })
                            }
                            className="flex items-center justify-center space-x-1"
                        >
                            <LockKeyhole size={16} />
                            <span>Hủy đăng sản phẩm</span>
                        </button>
                    )}
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <button
                        onClick={handleDelete}
                        className="flex items-center justify-center space-x-1 text-red-600"
                    >
                        <Trash size={16} />
                        <span>Xóa sản phẩm</span>
                    </button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ProductItemOptions;
