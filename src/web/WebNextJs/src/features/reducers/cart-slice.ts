import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getQuantityCart } from "../actions";

interface CartState {
  value: number;
}

const initialState: CartState = {
  value: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getQuantityCart.fulfilled, (state, action) => {
      state.value = action.payload;
    });
    builder.addCase(getQuantityCart.pending, (state, action) => {
      "a";
    });
    builder.addCase(getQuantityCart.rejected, (state, action) => {
      "a";
    });
  },
});

export const cartReducer = cartSlice.reducer;
