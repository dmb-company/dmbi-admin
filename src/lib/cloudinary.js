export async function uploadImagesToCloudinary(images) {
    const uploadPromises = images.map(async (image) => {
        const formData = new FormData();

        // Convert to WebP
        const webpImage = await convertToWebP(image);

        formData.append('file', webpImage);
        formData.append('upload_preset', 'preset-next-test');

        // Upload image to Cloudinary
        return fetch('https://api.cloudinary.com/v1_1/dt3rk0j3l/image/upload', {
            method: 'POST',
            body: formData,
        })
            .then((response) => response.json())
            .catch((error) => {
                console.error('Image upload error:', error);
                return null; // Return null if there's an error, to handle it later
            });
    });

    // Wait for all uploads to complete
    const uploadResults = await Promise.all(uploadPromises);

    // Filter out any failed uploads (where the result is null)
    return uploadResults.filter((result) => result !== null);
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
