import React from 'react';
import { EditClassify } from '../edit';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

const Classify = ({ categories, tags, handleUpdate }) => {
    return (
        <div>
            <h2 className="my-2 flex items-center text-xl font-semibold">
                <EditClassify
                    handleUpdate={handleUpdate}
                    categories={categories}
                    tags={tags}
                />
                Phân loại
            </h2>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label>Danh mục: </Label>
                    <span>
                        {categories
                            ?.map((category) => category.name)
                            .join(', ')}
                    </span>
                </div>

                <div>
                    <Label>Tags: </Label>
                    <span className="space-x-2">
                        {tags?.map((tag) => (
                            <Badge key={tag.id} className={'bg-lime-600'}>
                                {tag.value}
                            </Badge>
                        ))}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Classify;
