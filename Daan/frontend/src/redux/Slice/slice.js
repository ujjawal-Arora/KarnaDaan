import { createSlice } from '@reduxjs/toolkit';

const getUserFromLocalStorage = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : {
    _id: "",
    name: "",
    email: "",
    profile_pic: "",
  };
};
const getLocationFromLocalStorage = () => {
  const user = localStorage.getItem('user');
  
  const parsedUser = user ? JSON.parse(user) : {};

  return {
    location: parsedUser.location || "",
    category: parsedUser.category || "",
  };
}


const initialState = {
  isLoggedIn: localStorage.getItem('token')!=null?true:false, // initial state
  ...getUserFromLocalStorage(),
  ...getLocationFromLocalStorage(),
  socketConnections:null,
  online: localStorage.getItem('online')!=null?true:false, // initial state
  onlineUser:[],

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
       state._id = "";
      state.name = "";
      state.email = "";
      state.profile_pic = "";
       localStorage.removeItem('user');
       localStorage.removeItem('item');      
        localStorage.removeItem('token');

       state. socketConnections=null

    }, 
    setUser:(state,action)=>{
      state._id=action.payload._id;
      state.name=action.payload.name;
      state.email=action.payload.email;
      state.profile_pic=action.payload.profile_pic;
   },
  setSearch:(state,action)=>{
     state.location=action.payload.location;
     state.category=action.payload.category;
  },
  setSocketConnections:(state,action)=>{
    state.socketConnections = action.payload
},
setOnlineUser:(state,action)=>{
  state.onlineUser = action.payload
},

    },
  });
  export const authActions = authSlice.actions;
  export const authstate=(state)=>state.auth.isLoggedIn;
  export default authSlice.reducer;