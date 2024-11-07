'use client';
import { TextEditor } from '@/components/common';
import DialogComponent from '@/components/common/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { PencilLineIcon, ViewIcon } from 'lucide-react';
import { useState } from 'react';

const EditDescription = ({ handleUpdate, description: content }) => {
    const { toast } = useToast();
    const [description, setDescription] = useState(content);
    return (
        <div>
            <DialogComponent
                title="Chỉnh sửa mô tả sản phẩm"
                size="xl"
                triggerButton={
                    <button className="btn btn-outline btn-primary flex items-center justify-center space-x-2">
                        <PencilLineIcon size={16} />
                        <span>Chỉnh sửa</span>
                    </button>
                }
            >
                <div className="space-y-2">
                    <TextEditor
                        description={description}
                        setDescription={setDescription}
                    />
                    <Button
                        onClick={() => {
                            toast({
                                title: 'Đang cập nhật mô tả sản phẩm...',
                            });
                            handleUpdate({ description: description });
                        }}
                        size="lg"
                        className="w-full"
                    >
                        Lưu
                    </Button>
                </div>
            </DialogComponent>
        </div>
    );
};

export default EditDescription;
