'use client';
import { useEffect } from 'react';
import { Button } from '../ui/button';
import { PlusCircleIcon, Trash } from 'lucide-react';
import { Input } from '../ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { useForm } from 'react-hook-form';

const MultipleInput = ({ setData, data = [] }) => {
    const form = useForm({
        defaultValues: {
            data: [...data],
        },
    });

    useEffect(() => {
        setData(form.getValues('data'));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [form.watch('data')]);

    const handleRemove = (index) => {
        const currentData = form.getValues('data');
        currentData.splice(index, 1);
        form.setValue('data', currentData);
    };

    const handleAdd = () => {
        const currentData = form.getValues('data');
        form.setValue('data', [
            ...currentData,
            {
                title: '',
                value: '',
            },
        ]);
    };

    return (
        <Form {...form}>
            <form className="mx-auto max-w-screen-lg space-y-3">
                {data?.length > 0 && (
                    <div className="space-y-3">
                        {data?.map((item, index) => (
                            <div
                                key={index}
                                className="grid grid-cols-12 items-end gap-3"
                            >
                                <div className="col-span-11 grid grid-cols-2 gap-5">
                                    <FormField
                                        control={form.control}
                                        name={`data.${index}.title`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Nhãn</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Nhãn A"
                                                        {...field}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name={`data.${index}.value`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Giá trị</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Giá trị"
                                                        {...field}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <Button
                                    type="button"
                                    onClick={() => handleRemove(index)}
                                    variant="outline"
                                >
                                    <Trash size={20} />
                                </Button>
                            </div>
                        ))}
                    </div>
                )}
                <Button
                    type="button"
                    variant="outline"
                    onClick={handleAdd}
                    className="w-full space-x-2"
                >
                    <PlusCircleIcon />
                    <span>Thêm</span>
                </Button>
            </form>
        </Form>
    );
};

export default MultipleInput;
