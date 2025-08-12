import actionTypes from '../actions/actionTypes';
const initState = {
    isLoggedIn : false,
    token : null,
    message : '',
    checkLoggin : false,
    checkRegister : false,
}
const authReducer = ( state = initState , action )=>{
    switch (action.type) {
        case actionTypes.REGISTER_SUCCESS:
            return {
                ...state,
                isLoggedIn : true,
                token : action.payload,
                message : "REGISTER_SUCCESS"
            }
        case actionTypes.REGISTER_FAIL:
            return {
                ...state,
                isLoggedIn : false,
                token : null,
                message : action.payload,
                checkRegister : !state.checkRegister,
                checkLoggin : state.checkLoggin
            }
        case actionTypes.LOGIN_SUCESS :
            return {
                ...state,
                isLoggedIn : true,
                token : action.payload,
                message : 'LOGIN_SUCESS'
            }
        case actionTypes.LOGIN_FAIL :
            return {
                ...state,
                isLoggedIn : false,
                token : null,
                message : action.payload,
                checkLoggin  : !state.checkLoggin ,
                checkRegister : state.checkRegister
            }
        case actionTypes.LOGOUT : 
            return {
                ...state,
                isLoggedIn : false,
                token : null,
                message : ""
            }
        default:
            return state
    }
}
export default authReducer