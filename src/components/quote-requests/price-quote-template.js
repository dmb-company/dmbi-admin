'use client';
import {
    useDeletePriceRequest,
    usePriceRequests,
    useUpdatePriceRequest,
} from '@/api/price-requests/hook';
import { Layout } from '../layout';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '../ui/table';
import { formatDate } from '@/lib/utils';
import { Trash } from 'lucide-react';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '../ui/tooltip';
import { Button } from '../ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../ui/select';

const PriceQuoteTemplate = () => {
    const { data: priceRequests } = usePriceRequests();
    const { mutate: deletePriceRequest } = useDeletePriceRequest();
    const { mutate: updatePriceRequest } = useUpdatePriceRequest();

    const handleDelete = (id) => {
        deletePriceRequest(id);
    };
    const handleUpdate = (id, status) => {
        updatePriceRequest({ id, status });
    };

    return (
        <Layout>
            <Card>
                <CardHeader>
                    <CardTitle>Price Quote</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="w-full overflow-auto">
                        <Table className="w-full border-collapse">
                            <TableHeader>
                                <TableRow className="bg-muted">
                                    <TableHead className="w-[5%] p-2 text-left font-bold">
                                        STT
                                    </TableHead>
                                    <TableHead className="w-[10%] p-2 text-left font-bold">
                                        Thời gian
                                    </TableHead>
                                    <TableHead className="w-[15%] p-2 text-left font-bold">
                                        Tên khách hàng
                                    </TableHead>
                                    <TableHead className="w-[15%] p-2 text-left font-bold">
                                        Sản phẩm
                                    </TableHead>
                                    <TableHead className="w-[10%] p-2 text-left font-bold">
                                        SĐT
                                    </TableHead>
                                    <TableHead className="w-[15%] p-2 text-left font-bold">
                                        Email
                                    </TableHead>
                                    <TableHead className="w-[10%] p-2 text-left font-bold">
                                        Ghi chú
                                    </TableHead>
                                    <TableHead className="w-[10%] p-2 text-left font-bold">
                                        Trạng thái
                                    </TableHead>
                                    <TableHead className="w-[10%] p-2 text-left font-bold">
                                        Hành động
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {priceRequests?.map((request, index) => (
                                    <TableRow
                                        key={request.id}
                                        className="border-b transition-colors hover:bg-muted/50"
                                    >
                                        <TableCell className="p-2">
                                            {index + 1}
                                        </TableCell>
                                        <TableCell className="p-2">
                                            {formatDate(request.created_at)}
                                        </TableCell>
                                        <TableCell className="p-2 font-medium">
                                            {request.customerName}
                                        </TableCell>
                                        <TableCell className="max-w-[160px] truncate p-2">
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger>
                                                        {request.product}
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>{request.product}</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        </TableCell>
                                        <TableCell className="p-2">
                                            {request.customerPhone}
                                        </TableCell>
                                        <TableCell className="max-w-[120px] truncate p-2">
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger>
                                                        {request.customerEmail}
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>
                                                            {
                                                                request.customerEmail
                                                            }
                                                        </p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        </TableCell>
                                        <TableCell className="max-w-[120px] truncate p-2">
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger>
                                                        {request.detail}
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>{request.detail}</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        </TableCell>
                                        <TableCell className="p-2">
                                            <Select
                                                defaultValue={request.status}
                                                onValueChange={(value) => {
                                                    handleUpdate(
                                                        request.id,
                                                        value
                                                    );
                                                }}
                                            >
                                                <SelectTrigger className="w-[130px]">
                                                    <SelectValue placeholder="Chọn trạng thái" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="pending">
                                                        Đang chờ
                                                    </SelectItem>
                                                    <SelectItem value="processing">
                                                        Đang xử lý
                                                    </SelectItem>
                                                    <SelectItem value="completed">
                                                        Hoàn thành
                                                    </SelectItem>
                                                    <SelectItem value="cancelled">
                                                        Đã hủy
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </TableCell>
                                        <TableCell className="p-2">
                                            <Button
                                                variant="destructive"
                                                size="icon"
                                                onClick={() =>
                                                    handleDelete(request.id)
                                                }
                                            >
                                                <Trash size={16} />
                                                <span className="sr-only">
                                                    Delete
                                                </span>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </Layout>
    );
};

export default PriceQuoteTemplate;
