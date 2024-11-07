import { FormField, FormItem, FormLabel } from '../ui/form';
import { useEffect, useState } from 'react';
import TooltipComponent from './tooltip';
const ImageUpload = ({
    multiple = false,
    files,
    setFiles,
    label = 'Hình ảnh',
    description = '',
}) => {
    const [preview, setPreview] = useState([]);

    useEffect(() => {
        if (files) {
            setPreview(files.map((file) => URL.createObjectURL(file)));
        }
        return () => {
            setPreview(['']);
        };
    }, [files]);

    const handleUpload = (e) => {
        const files = Array.from(e.target.files);
        setFiles(files);
        setPreview(files.map((file) => URL.createObjectURL(file)));
    };

    return (
        <div className="space-y-4">
            <FormField
                name={`image${multiple ? 's' : ''}`}
                render={({ field }) => (
                    <FormItem>
                        <TooltipComponent content={description}>
                            <FormLabel>{label}</FormLabel>
                        </TooltipComponent>
                        <input
                            id={`image${multiple ? 's' : ''}`}
                            type="file"
                            multiple={multiple}
                            placeholder="https://example.com/image.jpg"
                            className="max-w-sx file-input file-input-bordered file-input-info w-full bg-white text-gray-600"
                            onChange={handleUpload}
                        />
                    </FormItem>
                )}
            />
            {multiple ? (
                <div className="grid grid-cols-6 gap-4">
                    {files &&
                        preview.map((image) => (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                key={image}
                                src={image}
                                alt="Preview"
                                className="w-full rounded-lg border border-gray-300 object-cover"
                            />
                        ))}
                </div>
            ) : (
                <div className="flex flex-wrap gap-4">
                    {files &&
                        preview.map((image) => (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                key={image}
                                src={image}
                                alt="Preview"
                                className="w-full rounded-lg border border-gray-300 object-cover"
                            />
                        ))}
                </div>
            )}
        </div>
    );
};

export default ImageUpload;
