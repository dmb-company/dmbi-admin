'use client';

import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';

const Combobox = ({ list, setList, oldList }) => {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState(
        oldList?.map((item) => item.value) || []
    );

    React.useEffect(() => {
        setList([...value]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="justify-start pr-4"
                >
                    <ChevronsUpDown className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                    <span className="truncate">
                        {list?.length > 0
                            ? list
                                  .filter((item) => value.includes(item.value))
                                  .map((item) => item.value)
                                  .join(', ')
                            : 'Chọn mục...'}
                    </span>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0">
                <Command>
                    <CommandInput placeholder="Tìm kiếm..." />
                    <CommandList>
                        <CommandEmpty>Không có mục nào được chọn</CommandEmpty>
                        <CommandGroup>
                            {list?.map((item) => (
                                <CommandItem
                                    key={item.value}
                                    value={item.value}
                                    onSelect={(currentItem) => {
                                        value.includes(currentItem)
                                            ? setValue((pre) =>
                                                  pre.filter(
                                                      (item) =>
                                                          item !== currentItem
                                                  )
                                              )
                                            : setValue((pre) => [
                                                  ...pre,
                                                  currentItem,
                                              ]);
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            'mr-2 h-4 w-4',
                                            value.includes(item.value)
                                                ? 'opacity-100'
                                                : 'opacity-0'
                                        )}
                                    />
                                    {item.value}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

export default Combobox;
