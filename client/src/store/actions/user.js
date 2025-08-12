import { apiGetUser} from '../../services';
import actionTypes from './actionTypes';
export const getUser= ()=> async (dispatch)=>{
    try {
        const response = await apiGetUser();
        if (response?.data?.error === 0) {
            dispatch({
                type : actionTypes.GET_USER,
                user : response.data.response
            })
        }else{
            dispatch({
                type : actionTypes.GET_USER,
                user : response.data.message
            });
            dispatch({
                type : actionTypes.LOGOUT,
                payload : null
            })
        }
    } catch (error) {
        dispatch({
            type : actionTypes.GET_USER,
            user : null
        })
        dispatch({
            type : actionTypes.LOGOUT,
            payload : null
        })
    }
}