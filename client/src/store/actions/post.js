import actionTypes from './actionTypes';
import { apiGetPosts ,apiGetPostsLimit,apiGetNewPosts, apiGetPostsLimitAdmin} from '../../services/post';
export const getPosts = (payload)=> async (dispatch)=>{
    try {
        const response = await apiGetPosts();
        if (response?.data.error === 0) {
            dispatch({
                type : actionTypes.GET_POSTS,
                postsAll : response?.data?.response
            })
        }else{
            dispatch({
                type : actionTypes.GET_POSTS,
                postsAll : response?.data?.message
            })
        }
    } catch (error) {
        dispatch({
            type : actionTypes.GET_POSTS,
            postsAll : null
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
export const getOutstandingPosts = ()=> async (dispatch)=>{
    try {
        const response = await apiGetPostsLimit({
            limitPost : 5,
            order : ['star' , 'DESC']
        });
        if (response?.data.error === 0) {
            dispatch({
                type : actionTypes.GET_OUSTANDING_POSTS,
                OustandingPosts : response.data.response,
            })
        }else{
            dispatch({
                type : actionTypes.GET_NEW_POSTS,
                OustandingPosts : response.data.message
            })
        }
    } catch (error) {
        dispatch({
            type : actionTypes.GET_NEW_POSTS,
            OustandingPosts : null
        })
    }
}
export const getPostsLimitAmin = (query)=> async (dispatch)=>{
    try {
        const response = await apiGetPostsLimitAdmin(query);
        if (response?.data.error === 0) {
            dispatch({
                type : actionTypes.GET_POSTS_LIMIT_ADMIN,
                posts : response.data.response?.rows,
                count : response.data.response?.count
            })
        }else{
            dispatch({
                type : actionTypes.GET_POSTS_LIMIT_ADMIN,
                message : response.data.message,
                posts : null
            })
        }
    } catch (error) {
        dispatch({
            type : actionTypes.GET_POSTS_LIMIT,
            posts : null
        })
    }
}
export const changeDataPost = (dataChange) =>({
    type : actionTypes.CHANGE_DATA_POST,
    dataChange
})
export const IsCheckPost = (isCheck)=>({
    type : actionTypes.ISCHECK_POST,
    isCheck
})
export const TypePost = (TypePost)=>({
    type : actionTypes.GET_TYPE_PACKAGE,
    TypePost
})
export const TimePost = (TimePost)=>({
    type : actionTypes.GET_TIME_PACKAGE,
    TimePost
})
export const NumberPost = (NumberPost)=>({
    type : actionTypes.GET_NUMBER_PACKAGE,
    NumberPost
})
