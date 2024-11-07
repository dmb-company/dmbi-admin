import { EditImages } from '../edit';

/* eslint-disable @next/next/no-img-element */
const Images = ({ images, handleUpdate }) => {
    return (
        <div>
            <h2 className="my-2 flex items-center text-xl font-semibold">
                <EditImages handleUpdate={handleUpdate} />
                <span>Images</span>
            </h2>
            <div className="grid grid-cols-4 gap-4">
                {images?.map((image, index) => (
                    <div key={index}>
                        <img
                            src={image}
                            alt="product-images"
                            className="w-full rounded-md border-2 border-gray-200 object-cover"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Images;
