import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice';
import inboxReducer from './inboxSlice';
import outboxReducer from './outboxSlice';

const store = configureStore({
    reducer : {
        auth : authReducer,
        inbox : inboxReducer,
        outbox : outboxReducer
    }
})

export default store;