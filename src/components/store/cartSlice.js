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
  initialState: getInitialCart(),
  reducers: {
    addItem(state, action) {
      state.push(action.payload)
      localStorage.setItem("cart", JSON.stringify(state))
    },
    removeItem(state, action) {
      const updated = state.filter(
        item => item.id !== action.payload
      )
      localStorage.setItem("cart", JSON.stringify(updated))
      return updated
    }
  }
})


export default cartSlice.reducer

/* 👇 These are named exports */
export const { addItem, removeItem } = cartSlice.actions