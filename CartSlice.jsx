import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add a plant to the cart
    addItem: (state, action) => {
      const newItem = action.payload;

      const existingItem = state.items.find(
        (item) => item.id === newItem.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          ...newItem,
          quantity: 1,
        });
      }
    },

    // Remove a plant from the cart
    removeItem: (state, action) => {
      const payload = action.payload;
      const itemId =
        payload && typeof payload === "object"
          ? payload.id
          : payload;

      state.items = state.items.filter(
        (item) => item.id !== itemId
      );
    },

    // Update the quantity of a plant
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;

      const existingItem = state.items.find(
        (item) => item.id === id
      );

      if (!existingItem || !Number.isFinite(quantity)) {
        return;
      }

      if (quantity <= 0) {
        state.items = state.items.filter(
          (item) => item.id !== id
        );
      } else {
        existingItem.quantity = quantity;
      }
    },
  },
});

export const {
  addItem,
  removeItem,
  updateQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
