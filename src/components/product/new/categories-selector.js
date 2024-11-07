import React, { useEffect, useState } from 'react';
import { Combobox } from '@/components/common';
import { useProductCategories } from '@/api/product-categories/hook';

const CategoriesSelector = ({ categories, setCategories, oldCategories }) => {
    const {
        isLoading,
        error,
        data: product_categories,
    } = useProductCategories();

    const [selectedCategories, setSelectedCategories] = useState([]);

    useEffect(() => {
        setCategories(
            product_categories
                ?.filter((category) =>
                    selectedCategories.includes(category.name)
                )
                .map((category) => ({
                    id: category.id,
                }))
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCategories]);

    if (!isLoading && !product_categories) {
        return <div>Err</div>;
    }

    const options = product_categories?.map((c) => ({
        label: c.name,
        value: c.id,
    }));

    return (
        <div className="grid grid-cols-1 space-y-2">
            <label className="text-sm font-semibold">Danh mục</label>
            {product_categories && (
                <Combobox
                    list={product_categories?.map((category) => ({
                        id: category.id,
                        value: category.name,
                    }))}
                    oldList={oldCategories?.map((category) => ({
                        id: category.id,
                        value: category.name,
                    }))}
                    setList={setSelectedCategories}
                />
            )}
        </div>
    );
};

export default CategoriesSelector;
