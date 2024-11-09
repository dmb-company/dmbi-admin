import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { medusaClient } from '@/lib/config';
import { uploadImageCloudinary, uploadImagesToCloudinary } from './cloudinary';

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

export const uploadFiles = async (files) => {
    const urls = await uploadImagesToCloudinary(files);
    return urls;
};

export const uploadFile = async (files) => {
    const url = await uploadFiles(files).then((res) => res[0]?.url);
    return url;
};
