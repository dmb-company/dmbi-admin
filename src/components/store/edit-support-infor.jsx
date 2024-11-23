'use client';

import { useState } from 'react';
import { useToast } from '../ui/use-toast';
import { DialogComponent, MultipleInput2 } from '../common';
import { PencilLineIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { useBlogPosts } from '@/api/blog/hook';

const EditSupportInfor = ({ handleUpdate, store }) => {
    const { toast } = useToast();
    const { data: posts, isLoading } = useBlogPosts();
    const [info, setInfo] = useState(store?.metadata?.support_info);

    return (
        <DialogComponent
            triggerButton={
                <button className="mr-2">
                    <PencilLineIcon size={16} />
                </button>
            }
            title="Chỉnh sửa thông tin hỗ trợ"
            size="lg"
        >
            <MultipleInput2 data={info} setData={setInfo} posts={posts} />
            <Button
                type="button"
                size="lg"
                className="mt-5 w-full"
                onClick={() => {
                    handleUpdate({
                        metadata: {
                            support_info: info,
                        },
                    });
                }}
            >
                Lưu
            </Button>
        </DialogComponent>
    );
};

export default EditSupportInfor;
