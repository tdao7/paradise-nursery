import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Add a plant to the cart, or increment it if already present.
    addItem: (state, action) => {
      const plant = action.payload;
      const existingItem = state.items.find((item) => item.id === plant.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          id: plant.id,
          name: plant.name,
          price: plant.price,
          image: plant.image,
          quantity: 1,
        });
      }
    },
    // Remove all quantities of a selected plant.
    removeItem: (state, action) => {
      const id = typeof action.payload === 'object' ? action.payload.id : action.payload;
      state.items = state.items.filter((item) => item.id !== id);
    },
    // Change quantity; remove the item when the new quantity is zero.
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((entry) => entry.id === id);
      if (!item) return;
      const nextQuantity = Number(quantity);
      if (!Number.isInteger(nextQuantity)) return;
      if (nextQuantity <= 0) {
        state.items = state.items.filter((entry) => entry.id !== id);
      } else {
        item.quantity = nextQuantity;
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = cartSlice.actions;
export const selectCartItems = (state) => state.cart.items;
export const selectCartCount = (state) =>
  state.cart.items.reduce((count, item) => count + item.quantity, 0);
export const selectCartTotal = (state) =>
  state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0);
export default cartSlice.reducer;
