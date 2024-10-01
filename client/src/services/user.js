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
})