import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

// const token = ;
// console.log(token)
const initialState = {
  isLoggedIn: Cookies.get('token')!=null?true:false, // initial state
};

const authSlice = createSlice({
  name:'auth',
  initialState,
    reducers: {
      login:(state)=>{
        state.isLoggedIn = true;
    },
    logout:(state)=>{
       state.isLoggedIn = false;
    }
    },
  });
  
  export const authActions = authSlice.actions;
  export const authstate=(state)=>state.auth.isLoggedIn;
  export default authSlice.reducer;