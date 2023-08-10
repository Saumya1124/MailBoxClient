import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {isLoggin : false , loggedEmail : '' , loggedToken : ''}

const authSlice = createSlice({
    name : 'auth',
    initialState : initialAuthState,
    reducers : {
        logIn(state,action){
            state.isLoggin = true;
            state.loggedEmail = action.payload.email;
            state.loggedToken = action.payload.token;
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