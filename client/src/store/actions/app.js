import actionTypes from './actionTypes';
import * as apis from '../../services'
export const getCategories = ()=> async (dispatch)=>{
    try {
        const response = await apis.apiGetCategories();
        if (response?.data.err === 0) {
            dispatch({
                type : actionTypes.GET_CATEGORIES,
                categories : response.data.response
            })
        }else{
            dispatch({
                type : actionTypes.GET_CATEGORIES,
                categories : response.data.message
            })
        }
    } catch (error) {
        dispatch({
            type : actionTypes.GET_CATEGORIES,
            categories : null
        })
    }
}
export const getPrice= ()=> async (dispatch)=>{
    try {
        const response = await apis.apiGetPrices();
        if (response?.data?.error === 0) {
            dispatch({
                type : actionTypes.GET_PRICES,
                prices : response.data.response
            })
        }else{
            dispatch({
                type : actionTypes.GET_PRICES,
                prices : response.data.message
            })
        }
    } catch (error) {
        dispatch({
            type : actionTypes.GET_PRICES,
            prices : null
        })
    }
}
export const getAcreage= ()=> async (dispatch)=>{
    try {
        const response = await apis.apiGetAcreage();
        if (response?.data?.error === 0) {
            dispatch({
                type : actionTypes.GET_ACREAGE,
                acreages : response.data.response
            })
        }else{
            dispatch({
                type : actionTypes.GET_ACREAGE,
                acreages : response.data.message
            })
        }
    } catch (error) {
        dispatch({
            type : actionTypes.GET_ACREAGE,
            acreages : null
        })
    }
}
export const getProvinces= ()=> async (dispatch)=>{
    try {
        const response = await apis.apiGetProvinces();
        if (response?.data?.error === 0) {
            dispatch({
                type : actionTypes.GET_PROVINCE,
                Provinces : response.data.response
            })
        }else{
            dispatch({
                type : actionTypes.GET_PROVINCE,
                Provinces : response.data.message
            })
        }
    } catch (error) {
        dispatch({
            type : actionTypes.GET_PROVINCE,
            Provinces : null
        })
    }
}
export const PublicProvinces = () => async (dispatch)=>{
    try {
        const response = await apis.apiGetPublicProvinces();
        if (response?.data) {
            dispatch({
                type : actionTypes.GET_ADDRESS,
                Address : response?.data?.results
            })
        }
    } catch (error) {
        dispatch({
            type : actionTypes.GET_ADDRESS,
            Address : null
        })
    }
}