import './App.css';
import {Route, Routes} from 'react-router-dom'
import env from 'react-dotenv'

// imports components and pages
import Signup from './pages/Signup';
import Login from './pages/Login';
import MyCart from './pages/MyCart';
import Category from './pages/Category';
import Header from './components/Header';
import AllProducts from './components/AllProducts'

import { useContext, useEffect } from 'react';
import { UserContext } from './context/UserContext';

import axios from 'axios'

function App() {

  const { userState, cartState, productState } = useContext(UserContext)
  const [ user, setUser ] = userState
  const [ cart, setCart ] = cartState
  const [ products, setProducts ]  = productState

  const fetchUser = async () => {
    const userId = localStorage.getItem('userId')
    try {
      if (userId) {
        // console.log(userId)
        const response = await axios.get(`${env.BACKEND_URL}/user/verify`, {
          headers: {
            Authorization: userId
          }
        })
        setUser(response.data.user)
      }
    }
    catch (error) { console.log(error) }
  }


  useEffect(()=>{
    fetchUser();
    getCart();
    getProducts();
  }, [])
  const value = useContext(UserContext)

  const getCart = async () => {
    try {
        // GET cart from backend
        const userId = localStorage.getItem('userId')
        const cartResponse = await axios.get(`${env.BACKEND_URL}/cart`,{
            headers: { Authorization: userId }
        })

        // Set cart hook
        await setCart(cartResponse.data.items)

        // Confirmation
        await console.log('My Cart retrieved')
    } catch (error) {
        console.log(error.message)
    }
  }
  const getProducts = async () => {
    try {
      const response = await axios.get(`${env.BACKEND_URL}/item`)
      setProducts(response.data.items)
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className="App">


      <Header />

      <Routes>

        <Route  path='/signup'  element={<Signup />} />

        <Route path='/login' element={<Login />} />

        <Route path='/cart' element={<MyCart />} />

        <Route path='/category' element={<Category />} />

        <Route path='/category/:name' element={<AllProducts />} />

      </Routes>
      
    </div>
  );
}

export default App;