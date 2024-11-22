'use client';
import { DialogComponent, MultipleInput } from '@/components/common';
import { Button } from '@/components/ui/button';
import { PencilLineIcon } from 'lucide-react';
import { useState } from 'react';

const EditSpecifications = ({ product, handleUpdate }) => {
    const [specifications, setSpecifications] = useState(
        product?.metadata?.specifications
    );

    return (
        <DialogComponent
            triggerButton={
                <button className="mr-2">
                    <PencilLineIcon size={16} />
                </button>
            }
            title="Thông số kỹ thuật"
            size="lg"
        >
            <MultipleInput data={specifications} setData={setSpecifications} />
            <Button
                type="button"
                size="lg"
                className="mt-5 w-full"
                onClick={() => {
                    handleUpdate({
                        metadata: {
                            specifications: specifications,
                        },
                    });
                }}
            >
                Lưu
            </Button>
        </DialogComponent>
    );
};

export default EditSpecifications;
