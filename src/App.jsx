import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Home from "./components/Home";
import Login from "./components/Login";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Product from "./components/Product";
import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";
import NavBar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import NotFound from "./components/NotFound";
import NewProduct from "./components/NewProduct";
import UpdateProduct from "./components/UpdateProduct";
import "./App.css";
import WishList from "./components/WishList";
import ProtectedRoute from "./components/ProtectedRoute";
import Checkout from "./components/Checkout";
import OrderSuccess from "./components/OrderSuccess";
import OrderHistory from "./components/OrderHistory";
import Admin from "./components/Admin";

if (!localStorage.getItem("cart")) {
  localStorage.setItem("cart", JSON.stringify(["id:1"]));
}


function App() {
  const [count, setCount] = useState(0);

  let user = "Kavin";
  return (
    <div className="app">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/Product" element={<ProductList />} />

          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/Login/:newUser" element={<Login />} />
          
          <Route path="/NewProduct" element={<NewProduct />} />
          <Route path="/update/:id" element={<UpdateProduct />} />
          <Route path="/order-success" element={<OrderSuccess />} />
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
                {" "}
                <WishList />{" "}
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
          <Route path="/*" element={<NotFound />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/create" element={<NewProduct/>} />
          <Route path="/edit/:id" element={<UpdateProduct />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
