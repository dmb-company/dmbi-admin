import { Label } from '@/components/ui/label';
import { Combobox } from '@/components/common';
import { useEffect, useState } from 'react';

const ProductTagsSelector = ({ tags, setTags, oldTags }) => {
    const [selectedTags, setSelectedTags] = useState([]);
    const { product_tags, isLoading } = useAdminProductTags();

    useEffect(() => {
        setTags(
            product_tags
                ?.filter((pt) => selectedTags.includes(pt.value))
                .map((tag) => ({
                    id: tag.id,
                    value: tag.value,
                }))
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedTags]);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (!isLoading && !product_tags) {
        return;
    }

    const options = product_tags?.map((c) => ({
        label: c.value,
        value: c.id,
    }));

    return (
        <div className="grid w-full grid-cols-1 space-y-2">
            <Label className="text-sm font-semibold">Tags</Label>
            <Combobox
                list={product_tags.map((tag) => ({
                    id: tag.id,
                    value: tag.value,
                }))}
                oldList={oldTags?.map((tag) => ({
                    id: tag.id,
                    value: tag.value,
                }))}
                setList={setSelectedTags}
            />
        </div>
    );
};

export default ProductTagsSelector;
