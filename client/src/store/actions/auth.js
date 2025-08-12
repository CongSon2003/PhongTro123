import actionTypes from './actionTypes';
import { apiLogin, apiRegister } from '../../services/auth';
export const register = (payload)=> async (dispatch)=>{
    try {
        const {name,phone,password} = payload;
        const response = await apiRegister({name,phone,password});
        if (response?.data.error === 0) {
            dispatch({
                type : actionTypes.REGISTER_SUCCESS,
                payload : response.data.access_Token
            })
        }else{
            dispatch({
                type : actionTypes.REGISTER_FAIL,
                payload : response.data.message
            })
        }
    } catch (error) {
        dispatch({
            type : actionTypes.REGISTER_FAIL,
            payload : null
        })
    }
}
export const login = (payload)=> async (dispatch)=>{
    try {
        const {phone,password} = payload;
        const response = await apiLogin({phone,password});
        if (response?.data.error === 0) {
            dispatch({
                type : actionTypes.LOGIN_SUCESS,
                payload : response.data.access_Token
            });
        }else{
            dispatch({
                type : actionTypes.LOGIN_FAIL,
                payload : response.data.message
            });
        }
    } catch (error) {
        dispatch({
            type : actionTypes.LOGIN,
            payload : null
        });
    }
}
export const logout = (dispatch)=>{
    dispatch({
        type : actionTypes.LOGOUT,
        payload : null
    })
}