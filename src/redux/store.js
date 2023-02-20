import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { combineReducers } from '@reduxjs/toolkit'
import storage from "redux-persist/lib/storage";

import addressSlice from "./addressSlice";
import cartSlice from "./cartSlice";
import restrauntSlice from "./restrauntSlice";
import userSlice from "./userSlice";
import persistReducer from 'redux-persist/es/persistReducer';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import uiSlice from './uiSlice';


const persistConfig = {
    key: 'root',
    storage: storage,
    blacklist: []
}

export const rootReducers = combineReducers({
    ui: uiSlice,
    user: userSlice,
    restraunt: restrauntSlice,
    cart: cartSlice,
    address: addressSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducers);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        })
});

setupListeners(store.dispatch);

export default store;