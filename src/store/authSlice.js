import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {isLoggin : false , loggedEmail : '' , loggedToken : ''}

const authSlice = createSlice({
    name : 'auth',
    initialState : initialAuthState,
    reducers : {
        logIn(state,action){           
            state.loggedEmail = action.payload.email;
            state.loggedToken = action.payload.token;
            state.isLoggin = true;
            localStorage.setItem("token", action.payload.token);
            localStorage.setItem("email", action.payload.email);
            localStorage.setItem("isLoggedIn", true);
        },
        logOut(state){
            state.isLoggin = false;
            state.loggedEmail = '';
            state.loggedToken = '';

        }
    }
})

export const authActions = authSlice.actions;

export default authSlice.reducer;