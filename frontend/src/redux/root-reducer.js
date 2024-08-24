import { combineReducers } from "redux";

import usuarioAtualReducer from "./usuarioAtualSlice";
import usuarioLogadoReducer from "./usuarioLogadoSlice";

const rootReducer = combineReducers({
  usuarioAtualReducer,
  usuarioLogadoReducer,
});

export default rootReducer;
