import { combineReducers } from "redux";

import usuarioAtualReducer from "./usuarioAtualSlice";

const rootReducer = combineReducers({ usuarioAtualReducer });

export default rootReducer;
