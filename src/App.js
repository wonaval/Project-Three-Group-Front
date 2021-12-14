import './App.css';
import {Route, Routes, Navigate} from 'react-router-dom'
import env from 'react-dotenv'

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

import { useContext, useEffect } from 'react';
import { UserContext } from './context/UserContext';

import axios from 'axios'
import LoadingScreen from './components/LoadingScreen';

function App() {
  const { userState, cartState, productState } = useContext(UserContext)
  const [ user, setUser ] = userState
  const [ cart, setCart ] = cartState
  const [ products, setProducts ]  = productState

  // Fetches user info sets to userState context if userId is in localstorage
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

  // GET cart and sets to cartState context
  const getCart = async () => {
    const userId = localStorage.getItem('userId')
    try {
        // GET cart from backend
        const cartResponse = await axios.get(`${env.BACKEND_URL}/cart`,{
            headers: { Authorization: userId }
        })

        // console.log(cartResponse)
        // Set cart hook
        await setCart(cartResponse.data.items)
        localStorage.setItem('cart', cartResponse.data.items)
    } catch (error) {
        console.log(error.message)
    }
  }

  // GET product list sets to productState context
  const getProducts = async () => {
    try {
      // GET products from backend
      const response = await axios.get(`${env.BACKEND_URL}/item`)
      // Set it as cartState context hook
      setProducts(response.data.items)
    } catch (error) {
      console.log(error.message)
    }
  }

  // useEffect - On load functions
  useEffect(()=>{
    fetchUser();
    getCart();
    getProducts();
  }, [])

  useEffect(()=>{
    getCart();
  }, [user.id])

  return (
    <div className="App">


      <Header />

      <Routes>
        <Route path='/' element={<Category />} />

        <Route path='/loading' element={<LoadingScreen />} />

        <Route path='/signup'  element=
          { user.id ?
              <Navigate to='/category'/>
            :
              <Signup />
          }
        />

        <Route path='/login' element=
          { user.id ?
            <Navigate to='/category'/>
          :
            <Login />
          }
        />

        <Route path='/cart' element=
          { user.id ?
            <MyCart getProducts={getProducts} getCart={getCart}/>
          :
            <Login />
          }
        />

        <Route path='/orders' element=
          { user.id ?
            <MyOrders getCart={getCart}/>
          :
            <Login />
          }
        />

        <Route path='/orders/:id' element={<OrderDetail />} />

        <Route path='/category' element=
          {<Category />
          }
        />

        <Route path='/category/:name' element={<AllProducts getCart={getCart}/>} />

        <Route path='/item/:id' element={<ItemDetails getCart={getCart}/>} />

      </Routes>
      
    </div>
  );
}

export default App;