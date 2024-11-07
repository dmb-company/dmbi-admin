import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { medusaClient } from '@/lib/config';
import { uploadImageCloudinary } from './cloudinary';

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('VI', options);
};

export const formatNumber = (number) => {
    return new Intl.NumberFormat().format(number);
};

export const formatHandle = (handle) => {
    const from =
        'áàảãạăắằẳẵặâấầẩẫậéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵđ';
    const to =
        'aaaaaaaaaaaaaaaaaeeeeeeeeeeiiiiiooooooooooooooooouuuuuuuuuuuyyyyyd';

    let result = handle
        .split('')
        .map((char, i) => {
            const index = from.indexOf(char);
            return index >= 0 ? to[index] : char;
        })
        .join('');

    result = result.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-]/g, '');

    return result;
};

export const uploadFile = async (file) => {
    const url = await uploadImageCloudinary(file)
        .then(({ url }) => url)
        .catch((err) => console.log(err));
    return url;
};

export const uploadFiles = async (files) => {
    const urls = await Promise.all(
        Array.from(files).map(async (file) => {
            return await uploadFile(file);
        })
    );
    return urls;
};
