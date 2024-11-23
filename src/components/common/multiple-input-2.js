'use client';
import { useEffect } from 'react';
import { Button } from '../ui/button';
import { Check, ChevronsUpDown, PlusCircleIcon, Trash } from 'lucide-react';
import { Input } from '../ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { useForm } from 'react-hook-form';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '../ui/command';
import { cn } from '@/lib/utils';

const MultipleInput2 = ({ setData, data = [], posts = [] }) => {
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
                label: '',
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
                                        name={`data.${index}.label`}
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
                                            <FormItem className="flex flex-col">
                                                <FormLabel className="mb-2.5">
                                                    Giá trị
                                                </FormLabel>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <FormControl>
                                                            <Button
                                                                variant="outline"
                                                                role="combobox"
                                                                className={cn(
                                                                    'justify-between',
                                                                    !field.value &&
                                                                        'text-muted-foreground'
                                                                )}
                                                            >
                                                                {field.value
                                                                    ? posts?.find(
                                                                          (
                                                                              item
                                                                          ) =>
                                                                              item.title ===
                                                                              field.value
                                                                      )?.title
                                                                    : 'Select post'}
                                                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="p-0">
                                                        <Command>
                                                            <CommandInput placeholder="Search post..." />
                                                            <CommandList>
                                                                <CommandEmpty>
                                                                    Không tìm
                                                                    thấy bài
                                                                    viết.
                                                                </CommandEmpty>
                                                                <CommandGroup>
                                                                    {posts?.map(
                                                                        (
                                                                            post
                                                                        ) => (
                                                                            <CommandItem
                                                                                value={
                                                                                    post.title +
                                                                                    '|' +
                                                                                    post.id
                                                                                }
                                                                                key={
                                                                                    post.title
                                                                                }
                                                                                onSelect={() => {
                                                                                    form.setValue(
                                                                                        `data.${index}.value`,
                                                                                        post.title
                                                                                    );
                                                                                    form.setValue(
                                                                                        `data.${index}.id`,
                                                                                        post.id
                                                                                    );
                                                                                }}
                                                                            >
                                                                                <Check
                                                                                    className={cn(
                                                                                        'mr-2 h-4 w-4',
                                                                                        post.title ===
                                                                                            field.value
                                                                                            ? 'opacity-100'
                                                                                            : 'opacity-0'
                                                                                    )}
                                                                                />
                                                                                {
                                                                                    post.title
                                                                                }
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

export default MultipleInput2;
