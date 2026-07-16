import{configureStore} from "@reduxjs/toolkit"
import cartSliceReducer from "./cartSlice"
import authReducer from "./authSlice"
import searchReducer from "./searchSlice";
import orderReducer from "./orderSlice";
import buyNowReducer from "./buyNowSlice";

export const store = configureStore({
    reducer:{
        cart :cartSliceReducer,
        auth :authReducer,
        search:searchReducer,
        orders: orderReducer,
        buyNow: buyNowReducer,
    }
})