import axiosConfig from '../axiosConfig';
export const apiGetUser = () =>  new Promise(async(resolve,reject)=>{
    try {
        const response = await axiosConfig({
            method: 'get',
            url:'/api/v1/user',
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
});
export const UpdateUser = (payload) => new Promise(async (resolve, reject) =>{
    try {
        const response = await axiosConfig({
            method : 'put',
            url : '/api/v1/user/update-user',
            data : payload
        })
        resolve(response);
    } catch (error) {
        reject(error)
    }
})