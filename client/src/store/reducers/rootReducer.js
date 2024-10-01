import { combineReducers } from 'redux';
import authReducer from './authReducer';
import {postReducer,postLimitReducer} from './postReducer';
import userReducer from './userReducer';
import {appReducer} from './appReducer'
import storage from 'redux-persist/lib/storage';
import {persistReducer,persistStore} from 'redux-persist'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
const commonConfig = {
    storage,
    stateReconciler : autoMergeLevel2
}
const authConfig = {
    key: 'AuthReducer',
    storage,
    whitelist:['isLoggedIn','token','message','checkLoggin','checkRegister'],
}
const rootReducers = combineReducers({
    auth : persistReducer(authConfig,authReducer),
    user : userReducer,
    post : postReducer,
    app : appReducer,
})
export default rootReducers