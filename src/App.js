import './App.css';
import {Route, Routes} from 'react-router-dom'
import env from 'react-dotenv'

// imports components and pages
import Signup from './pages/Signup';
import Login from './pages/Login';
import MyCart from './pages/MyCart';
import Category from './pages/Category';
import Header from './components/Header';

function App() {
  console.log(env)
  return (
    <div className="App">


      <Header />

      <Routes>

        <Route  path='/signup'  element={<Signup />} />

        <Route path='/login' element={<Login />} />

        <Route path='/cart' element={<MyCart />} />

        <Route path='/category' element={<Category />} />

      </Routes>
      
    </div>
  );
}

export default App;