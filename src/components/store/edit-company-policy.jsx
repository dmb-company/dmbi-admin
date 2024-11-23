'use client';

import { useState } from 'react';
import { useToast } from '../ui/use-toast';
import { DialogComponent, MultipleInput2 } from '../common';
import { PencilLineIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { useBlogPosts } from '@/api/blog/hook';

const EditCompanyPolicy = ({ handleUpdate, store }) => {
    const { toast } = useToast();
    const { data: posts, isLoading } = useBlogPosts();
    const [policy, setPolicy] = useState(store?.metadata?.company_policy);

    return (
        <DialogComponent
            triggerButton={
                <button className="mr-2">
                    <PencilLineIcon size={16} />
                </button>
            }
            title="Chỉnh sửa chính sách công ty"
            size="lg"
        >
            <MultipleInput2 data={policy} setData={setPolicy} posts={posts} />
            <Button
                type="button"
                size="lg"
                className="mt-5 w-full"
                onClick={() => {
                    handleUpdate({
                        metadata: {
                            company_policy: policy,
                        },
                    });
                }}
            >
                Lưu
            </Button>
        </DialogComponent>
    );
};

export default EditCompanyPolicy;
