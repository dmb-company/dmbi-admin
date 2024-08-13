'use client';

import { uploadImageCloudinary } from '@/lib/cloudinary';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const FroalaEditorView = dynamic(
    () => import('react-froala-wysiwyg/FroalaEditorView'),
    { ssr: false }
);

const FroalaEditor = dynamic(
    async () => {
        const values = await Promise.all([
            import('react-froala-wysiwyg'), // must be first import since we are doing values[0] in return
            import('froala-editor/js/plugins/image.min.js'),
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

const TextEditor = () => {
    const [value, setValue] = useState('');

    const config = {
        events: {
            'image.beforeUpload': async function (images) {
                await uploadImageCloudinary(images)
                    .then((data) => {
                        // Insert the image into the editor
                        this.image.insert(
                            data.secure_url,
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
        <div>
            <FroalaEditor
                model={value}
                tag="textarea"
                config={config}
                onModelChange={(e) => {
                    setValue(e);
                    console.log(e);
                }}
            />
            <FroalaEditorView model={value} />
        </div>
    );
};

export default TextEditor;