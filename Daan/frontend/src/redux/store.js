import {  configureStore } from '@reduxjs/toolkit'
import authReducer from './Slice/slice.js'

export const store=configureStore({
    reducer:{
        auth:authReducer,
    },//which who handle the events
})
// export const store;