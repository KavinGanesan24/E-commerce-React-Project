import { createSlice } from "@reduxjs/toolkit";


const getOrders = () => {
  const storedOrders = localStorage.getItem("orders");
  return storedOrders ? JSON.parse(storedOrders) : [];
};

const orderSlice = createSlice({
  name: "orders",

  initialState: {
    orders: getOrders(),
  },

  reducers: {

    addOrder(state, action) {
      state.orders.push(action.payload);

      localStorage.setItem(
        "orders",
        JSON.stringify(state.orders)
      );
    }

  }
});

export const { addOrder } = orderSlice.actions;

export default orderSlice.reducer;