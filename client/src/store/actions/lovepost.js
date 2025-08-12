import actionTypes from './actionTypes';
export const idPost = (id) => async (dispatch) =>{
    dispatch({
        type : actionTypes.LOVE_POST,
        payload : id
    })
}
export const Delete_idPost = (id) => async (dispatch) =>{
    dispatch({
        type : actionTypes.DELETE_LOVE_POST,
        payload : id
    })
}