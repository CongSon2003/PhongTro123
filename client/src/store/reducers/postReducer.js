import actionTypes from '../actions/actionTypes';
const initState = {posts : [],message : '',count : 0,NewPosts : []};
export const postReducer = ( state = initState, action)=>{
    switch (action.type) {
        case actionTypes.GET_POSTS:
            return {
                ... state,
                posts : action.posts || [],
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
        default:
            return state
    }
}