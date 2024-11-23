import React from 'react';
import { CardTitle } from '../ui/card';
import EditPolicy from './edit-policy';

const Policy = ({ store, handleUpdate }) => {
    return (
        <div className="space-y-5 py-10">
            <div className="flex items-center space-x-1">
                <CardTitle>Chính sách hỗ trợ sản phẩm</CardTitle>
                <EditPolicy store={store} handleUpdate={handleUpdate} />
            </div>
            <ul className="space-y-2">
                {store?.metadata?.policy?.map((item, index) => {
                    return <li key={index}>{item?.title}</li>;
                })}
            </ul>
        </div>
    );
};

export default Policy;
