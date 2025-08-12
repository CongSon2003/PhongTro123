import rootReducers from "./store/reducers/rootReducer";
import {applyMiddleware, createStore} from "redux";
import storage from 'redux-persist/lib/storage';
import {persistReducer,persistStore} from 'redux-persist';
import {thunk} from 'redux-thunk';

export const store = createStore(rootReducers,applyMiddleware(thunk)) 
export const persistor = persistStore(store)