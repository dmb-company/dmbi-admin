import React, { useEffect, useState } from 'react';
import { MultiSelect } from 'react-multi-select-component';
import { Combobox } from '@/components/common';

const CategoriesSelector = ({ categories, setCategories, oldCategories }) => {
    const [selectedCategories, setSelectedCategories] = useState([]);
    const { product_categories, isLoading } = useAdminProductCategories();

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

    if (isLoading) {
        return <p>Loading...</p>;
    }

    const options = product_categories?.map((c) => ({
        label: c.name,
        value: c.id,
    }));

    return (
        <div className="grid grid-cols-1 space-y-2">
            <label className="text-sm font-semibold">Danh mục</label>
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
        </div>
    );
};

export default CategoriesSelector;
