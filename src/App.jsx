import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./components/Home";
import Login from "./components/Login";
import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";
import NavBar from "./components/Navbar";
import NotFound from "./components/NotFound";
import NewProduct from "./components/NewProduct";
import UpdateProduct from "./components/UpdateProduct";
import WishList from "./components/WishList";
import ProtectedRoute from "./components/ProtectedRoute";
import Checkout from "./components/Checkout";
import OrderSuccess from "./components/OrderSuccess";
import OrderHistory from "./components/OrderHistory";
import Admin from "./components/Admin";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

if (!localStorage.getItem("cart")) {
  localStorage.setItem("cart", JSON.stringify([]));
}

function App() {
  return (
    <div className="app">
      <Router>
        <NavBar />

        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/Product"
            element={<ProductList />}
          />

          <Route
            path="/product/:id"
            element={<ProductDetails />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/NewProduct"
            element={<NewProduct />}
          />

          <Route
            path="/update/:id"
            element={<UpdateProduct />}
          />

          <Route
            path="/order-success"
            element={<OrderSuccess />}
          />

          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />

          <Route
            path="/WishList"
            element={
              <ProtectedRoute>
                <WishList />
              </ProtectedRoute>
            }
          />

          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <OrderHistory />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={<Admin />}
          />

          <Route
            path="/create"
            element={<NewProduct />}
          />

          <Route
            path="/edit/:id"
            element={<UpdateProduct />}
          />

          <Route
            path="/*"
            element={<NotFound />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;