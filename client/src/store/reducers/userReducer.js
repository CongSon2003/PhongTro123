import actionTypes from "../actions/actionTypes"

const initState = {
    userData : {}
}
const userReducer = ( state = initState , action )=>{
    switch (action.type) {
        case actionTypes.GET_USER:
            return {
                ...state,
                user : action.user || {}
            }
        case actionTypes.LOGOUT:
            return {
                ...state,
                user : {}
            }    
        default:
            return state
    }
}
export default userReducer