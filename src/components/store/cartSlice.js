import { createSlice } from "@reduxjs/toolkit"

const getInitialCart = () => {
  try {
    const stored = localStorage.getItem("cart")
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems : getInitialCart(),
    totalQuantity:0,
    totalAmount:0,
    checkoutItem: null,
  },
  reducers: {

  addItem(state, action) {
    const newItem = action.payload

    const existingItem = state.cartItems.find(
      item => item.id === newItem.id
    )

    if (existingItem) {
      existingItem.quantity += 1
    } else {
      state.cartItems.push({
        ...newItem,
        quantity: 1
      })
    }
    cartSlice.caseReducers.calculateTotals(state)
    localStorage.setItem("cart", JSON.stringify(state.cartItems))
  },

  removeItem(state, action) {
    state.cartItems = state.cartItems.filter(
      item => item.id !== action.payload
    )

    cartSlice.caseReducers.calculateTotals(state)
    localStorage.setItem("cart", JSON.stringify(state.cartItems))
  },

  calculateTotals(state) {
    let total = 0
    let quantity = 0

    state.cartItems.forEach((item) => {
      total += item.price * item.quantity
      quantity += item.quantity
    })

    state.totalAmount = total
    state.totalQuantity = quantity
  },
  increaseQuantity(state, action) {
  const item = state.cartItems.find(
    item => item.id === action.payload
  )

  if (item) {
    item.quantity += 1
  }

  cartSlice.caseReducers.calculateTotals(state)
  localStorage.setItem("cart", JSON.stringify(state.cartItems))
},

decreaseQuantity(state, action) {
  const item = state.cartItems.find(
    item => item.id === action.payload
  )

  if (item && item.quantity > 1) {
    item.quantity -= 1
  }

  cartSlice.caseReducers.calculateTotals(state)
  localStorage.setItem("cart", JSON.stringify(state.cartItems))
},
  setCheckoutItem(state, action) {
    state.checkoutItem = action.payload;
},
clearCart(state) {
  state.cartItems = [];
  state.totalAmount = 0;
  state.totalQuantity = 0;
  state.checkoutItem = null;

  localStorage.removeItem("cart");
}


}



})


export default cartSlice.reducer

/* 👇 These are named exports */
export const { addItem, removeItem,calculateTotals,increaseQuantity,decreaseQuantity,setCheckoutItem,clearCart } = cartSlice.actions