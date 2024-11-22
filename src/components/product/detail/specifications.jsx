import React from 'react';
import EditSpecifications from './edit-specifications';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

const Specifications = ({ product, handleUpdate }) => {
    return (
        <div>
            <h2 className="my-2 flex items-center text-xl font-semibold">
                <EditSpecifications
                    product={product}
                    handleUpdate={handleUpdate}
                />
                Thông số kỹ thuật
            </h2>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Nhãn</TableHead>
                        <TableHead className="w-[300px]">Chi tiết</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell className="font-medium">Model</TableCell>
                        <TableCell>{product?.metadata?.model}</TableCell>
                    </TableRow>
                    {product?.metadata?.specifications?.map((item, index) => {
                        return (
                            <TableRow key={index}>
                                <TableCell className="font-medium">
                                    {item?.title}
                                </TableCell>
                                <TableCell>{item?.value}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
};

export default Specifications;
