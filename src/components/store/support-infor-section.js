'use client';
import React from 'react';
import { CardTitle } from '../ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '../ui/table';

import EditSupportInfor from './edit-support-infor';

const SupportInforSection = ({ store, handleUpdate }) => {
    return (
        <div className="space-y-5 py-10">
            <div className="flex items-center space-x-1">
                <CardTitle>
                    <span>Thông tin hỗ trợ</span>
                    <EditSupportInfor
                        store={store}
                        handleUpdate={handleUpdate}
                    />
                </CardTitle>
            </div>
            <div className="w-2/3 space-y-6">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[300px]">Tiêu đề</TableHead>
                            <TableHead className="">Bài viết</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {store?.metadata?.support_info?.map((item, index) => {
                            return (
                                <TableRow key={index}>
                                    <TableCell className="min-w-[300px] font-medium">
                                        {item.label}
                                    </TableCell>
                                    <TableCell>{item.value}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default SupportInforSection;
