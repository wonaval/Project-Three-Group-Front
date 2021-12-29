import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import env from 'react-dotenv';
import axios from 'axios';
import './AllProducts.css';

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const AllProducts = (props) => {
  const navigate = useNavigate();
  // useContext
  const { userState, loadingState } = useContext(UserContext);
  const [user, setUser] = userState;
  const [loading, setLoading] = loadingState;

  const [cart, setCart] = useState([]);
  const [filter, setFilter] = useState([]);

  const { name } = useParams();

  // Get cart from backend
  const getCart = () => {
    const userId = localStorage.getItem('userId');
    try {
      // GET cart from backend
      axios
        .get(`${env.REACT_APP_BACKEND_URL}/cart`, {
          headers: { Authorization: userId },
        })
        .then((cartResponse) => {
          setCart([...cartResponse.data.items]);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  // Add item to cart function
  const addToCartClick = async (itemId) => {
    const response = await axios.request({
      method: 'POST',
      url: `${env.REACT_APP_BACKEND_URL}/cart`,
      data: { id: itemId },
      headers: {
        Authorization: localStorage.getItem('userId'),
      },
    });
    getCart();
  };

  // Filter items by category name and return array to be displayed
  const categoryFilter = () => {
    setLoading(true);

    const catFilter = props.products.filter((item) => {
      return item.category === name;
    });
    setFilter(catFilter);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  // userEffect - On load
  useEffect(() => {
    categoryFilter();
    console.log(filter);
  }, []);

  return (
    <div>
      <h2>{name.toUpperCase()}</h2>
      {filter &&
        filter.map((item, i) => {
          return (
            <div key={i} className="product-container">
              <div className="product-image">
                <img src={`${item.image}`} />
              </div>
              <div>{<Link to={`/item/${item.id}`}>{item.name}</Link>}</div>
              <div>{item.description}</div>
              <div>
                {user.id ? (
                  <div
                    className="add-to-cart"
                    onClick={() => {
                      addToCartClick(item.id);
                    }}
                  >
                    <span className="add-text">Add to Cart</span>
                    <AddShoppingCartIcon sx={{ fontSize: 18 }} />
                  </div>
                ) : null}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default AllProducts;
