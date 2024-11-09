'use client';

import { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { useToast } from '../ui/use-toast';
import { uploadFile } from '@/lib/utils';
import { TextEditor } from '../common';

const EditStore = ({ name = '', about = '', handleUpdate }) => {
    const form = useForm({
        defaultValues: {
            name: name,
            metadata: {
                about: about,
            },
        },
    });
    const { toast } = useToast();
    const [aboutContent, setAboutContent] = useState(about);

    const onSubmit = (data) => {
        toast({
            title: 'Đang cập nhật...',
        });
        handleUpdate(createPayload(data));
    };

    const createPayload = (data) => {
        return {
            name: data.name,
            metadata: {
                about: aboutContent,
            },
        };
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tên cửa hàng</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="DMB Industrial"
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <TextEditor
                    description={aboutContent}
                    setDescription={setAboutContent}
                    label="Giới thiệu"
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
};

export default EditStore;
