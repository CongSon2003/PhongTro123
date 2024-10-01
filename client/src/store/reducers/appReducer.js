import actionTypes from '../actions/actionTypes';
const initState = {
    message : '',
    categories : [],
    prices : [],
    acreages : [],
    provinces : [],
    user : []
};
export const appReducer = ( state = initState, action)=>{
    switch (action.type) {
        case actionTypes.GET_CATEGORIES:
            return {
                ... state,
                categories : action.categories || [],
                message : action.message || '' 
            }
        case actionTypes.GET_PRICES :
            const dataPricesSort = action.prices?.sort((a,b)=>{
                let orderA = a.order;
                let orderB = b.order;
                return parseInt(orderA) - parseInt(orderB)
            })
            return {
                ...state,
                prices : dataPricesSort || [],
                message : action.message || '' 
            }
        case actionTypes.GET_ACREAGE :
            const dataAcreageSort = action.acreages?.sort((a,b)=>{
                let orderA = a.order;
                let orderB = b.order;
                return parseInt(orderA) - parseInt(orderB)
            })
            return {
                ...state,
                acreages : dataAcreageSort || [],
                message : action.message || '' 
            }
        case actionTypes.GET_PROVINCE :
            return {
                ... state,
                provinces : action.Provinces || [],
                message : action.message || '' 
            }
        case actionTypes.GET_ADDRESS : 
            return {
                ...state,
                Address : action.PublicProvinces || [],
                message : action.message
            }
        default:
            return state
    }
}