'use client';

import { uploadImagesToCloudinary } from '@/lib/cloudinary';
import dynamic from 'next/dynamic';
import { Label } from '../ui/label';

const FroalaEditorView = dynamic(
    () => import('react-froala-wysiwyg/FroalaEditorView'),
    { ssr: false }
);

const FroalaEditor = dynamic(
    async () => {
        const values = await Promise.all([
            import('react-froala-wysiwyg'), // must be first import since we are doing values[0] in return
            import('froala-editor/js/plugins.pkgd.min.js'),
            import('froala-editor/css/froala_style.min.css'),
            import('froala-editor/css/froala_editor.pkgd.min.css'),
        ]);
        return values[0];
    },
    {
        loading: () => <p>LOADING!!!</p>,
        ssr: false,
    }
);

const TextEditor = ({
    description = '',
    setDescription,
    label = 'Mô tả sản phẩm',
}) => {
    const config = {
        events: {
            'image.beforeUpload': async function (images) {
                await uploadImagesToCloudinary(Array.from(images))
                    .then((data) => {
                        // Insert the image into the editor
                        this.image.insert(
                            data[0].secure_url,
                            false,
                            null,
                            this.image.get(),
                            null
                        );

                        // Optionally add data attributes to the image
                        const $img = this.image.get();
                        $img.attr('data-id', data.public_id);
                    })
                    .catch((error) => {
                        console.error('Image upload error:', error);
                    });

                // Prevent the default image upload
                return false;
            },
        },
    };

    return (
        <div className="space-y-2">
            <Label htmlFor="description">{label}</Label>
            <FroalaEditor
                model={description}
                tag="textarea"
                config={config}
                onModelChange={(e) => {
                    setDescription(e);
                    console.log(e);
                }}
            />
        </div>
    );
};

export default TextEditor;
