import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import TodoApp from './components/TodoApp'
import Home from './components/Home'
import Login from './components/Login'
import {BrowserRouter as Router,Routes,Route, Link} from "react-router-dom"
import Product from './components/Product'
import SignUp from './components/SignUp'
import ProductList from './components/ProductList'
import ProductDetails from './components/ProductDetails'
import NavBar from './components/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css';
import NotFound from './components/NotFound'
import NewProduct from './components/NewProduct'
import UpdateProduct from './components/UpdateProduct'
import "./App.css";
import WishList from './components/WishList'



if( !localStorage.getItem("cart") ){
  localStorage.setItem("cart" , JSON.stringify(["id:1"]) )
}



function App() {
  const [count, setCount] = useState(0)

  let user = "Kavin"
      return (
          
            <div className="app"> 
              <Router>
                <NavBar/>
                <Routes>
                  <Route path='/' element= {<Home/>} />
                  <Route  path='/Product' element = { <Product/> }>
                      <Route index element={ <ProductList/> }></Route>
                      <Route  path='list' element = {<ProductList/>}/>
                      <Route path='details' element = {<ProductDetails/>}/>
                  </Route>
                  <Route  path='/Login/:newUser' element = { <Login/> }/>
                  <Route  path='/SignUp' element = { <SignUp/> }/>
                  <Route  path='/TodoApp' element = { <TodoApp/> }/>
                  <Route  path='/NewProduct' element = { <NewProduct/> }/>
                  <Route  path='/update/:id' element = { <UpdateProduct/> }/>
                  <Route  path='/WishList' element = { <WishList/> }/>
                  <Route path='/*' element= {<NotFound/>} />
                </Routes>
              </Router>
            </div>
    
        );
}

export default App
