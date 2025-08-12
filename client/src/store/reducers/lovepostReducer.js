import { idPost } from '../actions';
import actionTypes from '../actions/actionTypes';
const  initState = {
    idPost : []
}
const lovepostReducer = (state =initState , action) => {
    switch (action.type) {
        case actionTypes.LOVE_POST : 
            let arrayid = [];
            arrayid.push(action.payload);
            for (let index = 0; index < state.idPost.length; index++) {
                arrayid.push(state.idPost[index]);
            }
            let uniqueArrayid = [...new Set(arrayid)]; // Dữ lý Các Dữ liệu trùng lập thành 1 
            return {
                ...state,
                idPost : uniqueArrayid
            }
        case actionTypes.DELETE_LOVE_POST :
            let arrayidAfterDelete = [];
            arrayidAfterDelete = state.idPost.filter(item => item !== action.payload);
            return {
                ...state,
                idPost :arrayidAfterDelete
            }
        default:
            return state
    }

}
export default lovepostReducer