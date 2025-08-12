import actionTypes from '../actions/actionTypes';
const initState = {
    posts : [],
    postsAll : [],
    message : '',
    count : 0,
    NewPosts : [],
    OustandingPosts : [],
    postAdmin:[]
};
export const postReducer = ( state = initState, action)=>{
    switch (action.type) {
        case actionTypes.GET_OUSTANDING_POSTS :
            return {
                ... state,
                OustandingPosts : action.OustandingPosts || [],
                message : action.message || '' ,
            }
        case actionTypes.GET_POSTS:
            return {
                ... state,
                postsAll : action.postsAll || [],
                message : action.message || '' ,
                count : action.count || 0
            }
        case actionTypes.GET_POSTS_LIMIT :
            return {
                ... state,
                posts : action.posts || [],
                message : action.message || '' ,
                count : action.count || 0
            }
        case actionTypes.GET_NEW_POSTS :
            return {
                ... state,
                NewPosts : action.NewPosts || [],
                message : action.message || '' ,
            }
        case actionTypes.GET_POSTS_LIMIT_ADMIN :
            return {
                ... state,
                postAdmin : action.posts || [],
                message : action.message || '' ,
            }
        case actionTypes.CHANGE_DATA_POST :
            return{
                ...state,
                dataChange : action.dataChange || {},
            }
        case actionTypes.ISCHECK_POST :
            return {
                ...state,
                isCheck : action.isCheck
            }
        case actionTypes.GET_TYPE_PACKAGE :
            return {
                ...state,
                TypePost : action.TypePost
            }
        case actionTypes.GET_TIME_PACKAGE :
            return {
                ...state,
                TimePost : action.TimePost
            }
        case actionTypes.GET_NUMBER_PACKAGE :
            return {
                ...state,
                NumberPost : action.NumberPost
            }
        default:
            return state
    }
}