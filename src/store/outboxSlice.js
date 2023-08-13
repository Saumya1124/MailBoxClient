import { createSlice } from "@reduxjs/toolkit";

const initialOutboxState = {messages : []}

const outboxSlice = createSlice({
    name : 'outbox',
    initialState : initialOutboxState,
    reducers : {
        sentMessages(state,action){
            state.messages = action.payload
        }
    }
})

export const outboxActions = outboxSlice.actions;

export default outboxSlice.reducer;
