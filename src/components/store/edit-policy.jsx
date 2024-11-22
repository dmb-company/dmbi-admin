'use client';

import { useState } from 'react';
import { useToast } from '../ui/use-toast';
import { DialogComponent, MultipleInput } from '../common';
import { PencilLineIcon } from 'lucide-react';
import { Button } from '../ui/button';

const EditPolicy = ({ handleUpdate, store }) => {
    const { toast } = useToast();
    const [policy, setPolicy] = useState(store?.metadata?.policy);

    return (
        <DialogComponent
            triggerButton={
                <button className="mr-2">
                    <PencilLineIcon size={16} />
                </button>
            }
            title="Chỉnh sửa chính sách"
            size="lg"
        >
            <MultipleInput data={policy} setData={setPolicy} />
            <Button
                type="button"
                size="lg"
                className="mt-5 w-full"
                onClick={() => {
                    handleUpdate({
                        metadata: {
                            policy: policy,
                        },
                    });
                }}
            >
                Lưu
            </Button>
        </DialogComponent>
    );
};

export default EditPolicy;
