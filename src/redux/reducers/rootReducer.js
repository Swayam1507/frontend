import {combineReducers} from "redux";
import authReducer from "./authReducer";
import conversationReducer from "./conversationReducer";
import messageReducer from "./messageReducer";
import socketReducer from "./socketReducer";


const rootReducer = combineReducers({
    auth : authReducer,
    message: messageReducer,
    conversation: conversationReducer,
    socket: socketReducer,
});

export default rootReducer;