import axiosConfig from '../axiosConfig';
import axios from 'axios';
export const apiGetPosts = () => new Promise(async(resolve,reject)=>{
    try {
        const response = await axiosConfig({
            method : 'get',
            url : '/api/v1/post/all'
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
export const apiGetPostsLimit = (query) => new Promise(async(resolve,reject)=>{
    try {
        const response = await axiosConfig({
            method: 'get',
            url: `/api/v1/post/limit`,
            params: query
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
export const apiGetNewPosts = () => new Promise(async(resolve,reject)=>{
    try {
        const response = await axiosConfig({
            method : 'get',
            url : `/api/v1/post/NewPosts`,
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
export const apiUploadImages = (images) => new Promise(async(resolve,reject)=>{
    try {
        const response = await axios({
            url : `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_NAME}/image/upload`,
            method : 'post',
            data : images
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
export const apiCreateNewPost = (payload) => new Promise(async(resolve,reject)=>{
    try {
        const response = await axiosConfig({
            url : `/api/v1/post/create-new`,
            method : 'post',
            data : payload
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})