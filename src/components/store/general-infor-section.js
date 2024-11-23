import React from 'react';
import { CardTitle } from '../ui/card';
import EditAddress from './edit-address';
import { Label } from '../ui/label';
import EditHotline from './edit-hotline';
import EditSupportHotline from './edit-support-hotline';

const GeneralInforSection = ({ store, handleUpdate }) => {
    return (
        <div className="space-y-5 py-10">
            <div className="flex items-center space-x-1">
                <CardTitle>Thông tin chung</CardTitle>
            </div>
            <div>
                <div className="pb-5">
                    <EditAddress store={store} handleUpdate={handleUpdate} />
                    <Label className="text-lg">Địa chỉ</Label>
                </div>
                {store?.metadata?.address?.map((a, i) => {
                    return (
                        <div
                            key={i}
                            className="grid grid-cols-3 gap-5 border-t py-2"
                        >
                            <p className="col-span-1">{a.title}</p>
                            <p className="col-span-2">{a.value}</p>
                        </div>
                    );
                })}
            </div>
            <div>
                <div className="flex items-center space-x-1 pb-5">
                    <EditHotline store={store} handleUpdate={handleUpdate} />
                    <div className="flex items-center space-x-2">
                        <Label className="text-lg">Hotline: </Label>
                        <span>{store?.metadata?.hotline}</span>
                    </div>
                </div>
            </div>
            <div>
                <div className="flex items-center space-x-1 pb-5">
                    <EditSupportHotline handleUpdate={handleUpdate} />
                    <div className="flex items-center space-x-2">
                        <Label className="text-lg">
                            Hotline hỗ trợ kỹ thuật:{' '}
                        </Label>
                        <span>{store?.metadata?.support_hotline}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GeneralInforSection;
