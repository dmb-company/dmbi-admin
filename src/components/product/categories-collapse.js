import { useState } from 'react';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '../ui/collapsible';

const CategoriesCollapse = ({ categories }) => {
    const [isOpen, setIsOpen] = useState(false);
    if (!categories) return;
    return (
        <Collapsible>
            <CollapsibleTrigger>{categories[0]?.name}</CollapsibleTrigger>
            <CollapsibleContent>
                <ul>
                    {categories.map((category) => (
                        <li key={category.id}>{category.name}</li>
                    ))}
                </ul>
            </CollapsibleContent>
        </Collapsible>
    );
};

export default CategoriesCollapse;
