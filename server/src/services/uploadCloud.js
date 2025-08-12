const cloudinary = require('cloudinary').v2;
export const uploadCloudService = () => new Promise(async (resolve,reject) =>{
    try {
        resolve({
            error : 0,
            message : "Upload success"
        });
    } catch (error) {
        reject(error)
    }
})
export const DeleteCloudService = (filename) => new Promise(async (resolve,reject) =>{
    try {
        if (filename) {
            cloudinary.uploader.destroy(filename, (error, result) => {
                if (error) {
                    resolve({
                        error : 1,
                        message : "result :: Delete unsuccessful"
                    });
                }else{
                    resolve({
                        error : 0,
                        message : result
                    });
                }
            })
        }else{
            resolve({
                error : 1,
                message : "Miss filename"
            });
        }
    } catch (error) {
        reject(error)
    }
})