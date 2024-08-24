import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  usuarioLogado: null,
};

const usuarioLogadoSlice = createSlice({
  name: "usuarioLogado",
  initialState,
  reducers: {
    DefineUserLogado: (state, action) => {
      state.usuarioLogado = action.payload;
    },
  },
});

export const { DefineUserLogado } = usuarioLogadoSlice.actions;

export default usuarioLogadoSlice.reducer;
