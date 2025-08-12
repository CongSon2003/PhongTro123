import { Buffer } from "buffer";
export const toBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    if (file) {
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    }
});
export const blobToBase64 = (blob) => new Buffer(blob,'base64').toString('binary')