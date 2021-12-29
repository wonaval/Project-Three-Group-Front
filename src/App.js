import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import env from 'react-dotenv';

// imports components and pages
import Signup from './pages/Signup';
import ItemDetails from './components/ItemDetails';
import Login from './pages/Login';
import MyCart from './pages/MyCart';
import MyOrders from './pages/MyOrders';
import Category from './pages/Category';
import Header from './components/Header';
import AllProducts from './components/AllProducts';
import OrderDetail from './components/OrderDetail';

import { useState, useContext, useEffect } from 'react';
import { UserContext } from './context/UserContext';

import axios from 'axios';
import LoadingScreen from './components/LoadingScreen';

function App() {
  // useContext
  const { userState } = useContext(UserContext);
  const [user, setUser] = userState;

  // useState
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  // Fetches user info sets to userState context if userId is in localstorage
  const fetchUser = async () => {
    const userId = localStorage.getItem('userId');
    try {
      if (userId) {
        // console.log(userId)
        const response = await axios.get(`${env.BACKEND_URL}/user/verify`, {
          headers: {
            Authorization: userId,
          },
        });
        setUser(response.data.user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // GET cart and sets to cart useState
  // Get cart from backend
  const getCart = () => {
    const userId = localStorage.getItem('userId');
    try {
      // GET cart from backend
      axios
        .get(`${env.BACKEND_URL}/cart`, {
          headers: { Authorization: userId },
        })
        .then((cartResponse) => {
          setCart([...cartResponse.data.items]);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  // GET product list sets to product useState
  const getProducts = async () => {
    try {
      // GET products from backend
      const response = await axios.get(`${env.BACKEND_URL}/item`);
      // Set it as product useState hook
      setProducts(response.data.items);
    } catch (error) {
      console.log(error.message);
    }
  };

  // useEffect - On load functions
  useEffect(() => {
    fetchUser();
    getProducts();
    getCart();
  }, []);

  return (
    <div className="App">
      <Header cart={cart} setCart={setCart} />
      <Routes>
        <Route path="/" element={<Category products={products} />} />
        <Route path="/loading" element={<LoadingScreen />} />
        <Route
          path="/signup"
          element={
            localStorage.getItem('userId') ? (
              <Navigate to="/category" />
            ) : (
              <Signup />
            )
          }
        />
        <Route
          path="/login"
          element={
            localStorage.getItem('userId') ? (
              <Navigate to="/category" />
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/cart"
          element={
            localStorage.getItem('userId') ? (
              <MyCart
                products={products}
                getProducts={getProducts}
                getCart={getCart}
              />
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/orders"
          element={
            localStorage.getItem('userId') ? (
              <MyOrders products={products} getCart={getCart} />
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/orders/:id"
          element={<OrderDetail products={products} />}
        />
        <Route path="/category" element={<Category products={products} />} />
        <Route
          path="/category/:name"
          element={<AllProducts products={products} getCart={getCart} />}
        />
        <Route
          path="/item/:id"
          element={<ItemDetails products={products} getCart={getCart} />}
        />
      </Routes>
    </div>
  );
}

export default App;
