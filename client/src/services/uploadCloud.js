import axiosConfig from '../axiosConfig';
export const apiUploadCloud = (images) => new Promise(async (resolve, reject) =>{
    try {
        const response = await axiosConfig({
            url : '/api/v1/uploadCloud',
            method : 'POST',
            body : images
        })
        resolve(response);
    } catch (error) {
        reject(error);
    }
})
export const apiDeleteCloud = (filename) => new Promise(async (resolve,reject) =>{
    try {
        const response = await axiosConfig({
            url : '/api/v1/Cloudinary/deleteCloud',
            method : 'post',
            data : filename
        });
        resolve(response);
    } catch (error) {
        reject(error)
    }
})