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


import { useContext } from 'react';
import { UserContext } from './context/UserContext';

import axios from 'axios'

function App() {
  console.log(env)

  const value = useContext(UserContext)

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