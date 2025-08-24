import { createSlice } from "@reduxjs/toolkit";

// User initial state
const initialStateCart = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialStateCart,
  reducers: {
    addToCart: {
      reducer(state, action) {
        const itemInCart = state.cart.find(
          (item) => item.pizzaId === action.payload.id,
        );

        if (itemInCart) {
          itemInCart.quantity += 1;
          itemInCart.totalPrice = itemInCart.quantity * itemInCart.unitPrice;
        } else {
          state.cart.push(action.payload);
        }
      },
    },
    increase: {
      reducer(state, action) {
        const itemInCart = state.cart.find(
          (item) => item.pizzaId === action.payload,
        );

        itemInCart.quantity += 1;
        itemInCart.totalPrice = itemInCart.quantity * itemInCart.unitPrice;
      },
    },
    decrease: {
      reducer(state, action) {
        const itemInCart = state.cart.find(
          (item) => item.pizzaId === action.payload,
        );

        if (itemInCart.quantity === 1) {
          state.cart = state.cart.filter(
            (item) => item.pizzaId !== action.payload,
          );
          return;
        }

        itemInCart.quantity -= 1;
        itemInCart.totalPrice = itemInCart.quantity * itemInCart.unitPrice;
      },
    },
    removeFromCart: {
      reducer(state, action) {
        const id = action.payload;

        state.cart = state.cart.filter((item) => item.pizzaId !== id);
      },
    },
  },
});

const { addToCart, removeFromCart, increase, decrease } = cartSlice.actions;

export default cartSlice.reducer;
export { addToCart, removeFromCart, increase, decrease };
