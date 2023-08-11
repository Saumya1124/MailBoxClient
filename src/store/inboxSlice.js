import { createSlice } from "@reduxjs/toolkit";

const initialInboxState = {messages : [], unReadCount :0 ,read : false}

const inboxSlice = createSlice({
    name : 'inbox',
    initialState : initialInboxState,
    reducers : {
        getMessages(state,action){
            state.messages = action.payload
        },
        unReadMail(state,action){
            state.unReadCount = action.payload.filter(
                messages => !messages.read
            ).length
        }
    }
})

export const inboxActions = inboxSlice.actions;

export default inboxSlice.reducer;
