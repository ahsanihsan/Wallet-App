import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tradeModal: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    showModal: (state, action) => {
      state.tradeModal = action.payload;
    },
  },
});

export const { showModal } = modalSlice.actions;

export default modalSlice.reducer;
