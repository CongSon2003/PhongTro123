import actionTypes from './actionTypes';
import { apiGetPosts ,apiGetPostsLimit,apiGetNewPosts} from '../../services/post';
export const getPosts = (payload)=> async (dispatch)=>{
    try {
        const response = await apiGetPosts();
        if (response?.data.error === 0) {
            dispatch({
                type : actionTypes.GET_POSTS,
                posts : response.data.response
            })
        }else{
            dispatch({
                type : actionTypes.GET_POSTS,
                posts : response.data.message
            })
        }
    } catch (error) {
        dispatch({
            type : actionTypes.GET_POSTS,
            posts : null
        })
    }
}
export const getPostsLimit = (query)=> async (dispatch)=>{
    try {
        const response = await apiGetPostsLimit(query);
        if (response?.data.error === 0) {
            dispatch({
                type : actionTypes.GET_POSTS_LIMIT,
                posts : response.data.response?.rows,
                count : response.data.response?.count
            })
        }else{
            dispatch({
                type : actionTypes.GET_POSTS_LIMIT,
                posts : response.data.message
            })
        }
    } catch (error) {
        dispatch({
            type : actionTypes.GET_POSTS_LIMIT,
            posts : null
        })
    }
}
export const getNewPosts = ()=> async (dispatch)=>{
    try {
        const response = await apiGetNewPosts();
        if (response?.data.error === 0) {
            dispatch({
                type : actionTypes.GET_NEW_POSTS,
                NewPosts : response.data.response,
            })
        }else{
            dispatch({
                type : actionTypes.GET_NEW_POSTS,
                NewPosts : response.data.message
            })
        }
    } catch (error) {
        dispatch({
            type : actionTypes.GET_NEW_POSTS,
            newPosts : null
        })
    }
}