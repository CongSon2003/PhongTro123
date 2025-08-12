import { combineReducers } from 'redux';
import authReducer from './authReducer';
import lovepostReducer from './lovepostReducer';
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
    ...commonConfig,
    key: 'AuthReducer',
    storage,
    whitelist:['isLoggedIn','token','message','checkLoggin','checkRegister','idLove'],
}
const lovePost_Config = {
    ...commonConfig,
    key: 'lovePostReducer',
    storage,
}
const rootReducers = combineReducers({
    auth : persistReducer(authConfig,authReducer),
    lovepost : persistReducer(lovePost_Config,lovepostReducer),
    user : userReducer,
    post : postReducer,
    app : appReducer,
})
export default rootReducers