import {configureStore} from '@reduxjs/toolkit';
import authSlice from './authSlice'
import postSlice from './postSlice';
import userSlice from './userSlice';

const store=configureStore({
    reducer:{
        auth:authSlice,
        post:postSlice,
        user:userSlice,
    }
})

export default store;