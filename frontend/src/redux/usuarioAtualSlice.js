import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  usuarioEscolhido: null,
};

const usuarioAtualSlice = createSlice({
  name: "usuarioAtual",
  initialState,
  reducers: {
    DefineUser: (state, action) => {
      state.usuarioEscolhido = action.payload;
    },
  },
});

export const { DefineUser } = usuarioAtualSlice.actions;

export default usuarioAtualSlice.reducer;
