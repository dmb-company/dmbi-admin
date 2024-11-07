export async function uploadImageCloudinary(images) {
    const formData = new FormData();

    // convert to webp
    const webpImage = await convertToWebP(images[0]);

    formData.append('file', webpImage);

    formData.append('upload_preset', 'preset-next-test');

    return await fetch(
        'https://api.cloudinary.com/v1_1/dt3rk0j3l/image/upload',
        {
            method: 'POST',
            body: formData,
        }
    )
        .then((response) => response.json())
        .then((data) => {
            return data;
        })
        .catch((error) => {
            console.error('Image upload error:', error);
        });
}

// Helper function to convert an image file to WebP
async function convertToWebP(imageFile) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);

                // Convert to WebP and set quality
                canvas.toBlob(
                    (blob) => {
                        if (blob) {
                            resolve(
                                new File(
                                    [blob],
                                    imageFile.name.replace(
                                        /\.[^/.]+$/,
                                        '.webp'
                                    ),
                                    { type: 'image/webp' }
                                )
                            );
                        } else {
                            reject(new Error('Conversion to WebP failed.'));
                        }
                    },
                    'image/webp',
                    0.8
                ); // Set quality here (0.8 is 80% quality)
            };
            img.src = event.target.result;
        };
        reader.onerror = reject;
        reader.readAsDataURL(imageFile);
    });
}
