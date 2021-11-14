import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { GET_COINS } from "../constants/API";

const initialState = {
  tradeModal: false,
  coins: [],
  coinsLoading: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    showModal: (state, action) => {
      state.tradeModal = action.payload;
    },
    getAllCoins: (state) => {
      state.coinsLoading = true;
    },
    setAllCoins: (state, action) => {
      state.coins = action.payload;
      state.coinsLoading = false;
    },
    setAllCoinsError: (state) => {
      state.coinsLoading = false;
      state.coinsLoadingError = true;
    },
  },
});

export const { showModal, getAllCoins, setAllCoins, setAllCoinsError } =
  modalSlice.actions;

export default modalSlice.reducer;

export function fetchAllCoins() {
  return async (dispatch) => {
    try {
      const response = await axios.get(GET_COINS);
      dispatch(setAllCoins(response.data));
    } catch (error) {
      dispatch(setAllCoinsError());
    }
  };
}
