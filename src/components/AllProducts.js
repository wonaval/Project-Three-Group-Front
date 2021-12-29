import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import env from 'react-dotenv';
import axios from 'axios';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';

import addToCart from './images/icon.png';
import LoadingScreen from './LoadingScreen';

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

  // Add item to cart function
  const addToCartClick = async (itemId) => {
    console.log(itemId);
    const response = await axios.request({
      method: 'POST',
      url: `${env.BACKEND_URL}/cart`,
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

  // userEffect - On
  useEffect(() => {
    categoryFilter();
  }, []);

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <ImageList>
          <ImageListItem key="Subheader" cols={7}>
            <ListSubheader component="div">
              <h2>{name.toUpperCase()}</h2>
            </ListSubheader>
          </ImageListItem>
          {filter.map((item, i) => (
            <ImageListItem key={item.id}>
              <img
                className="productImage"
                src={`${item.image}?
                    w=248&fit=crop&auto=format`}
                srcSet={`${item.image}?
                    w=248&fit=crop&auto=format&dpr=6 6x`}
                alt={item.title}
                loading="lazy"
                onClick={() => {
                  navigate(`/item/${item.id}`);
                }}
              />
              <ImageListItemBar
                title={item.name}
                subtitle={item.description}
                actionIcon={
                  <>
                    {localStorage.getItem('userId') ? (
                      <IconButton
                        sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                        aria-label={`info about ${item.title}`}
                        value={item.id}
                        onClick={(e) => {
                          addToCartClick(item.id);
                        }}
                      >
                        <img src={addToCart} />
                      </IconButton>
                    ) : null}
                  </>
                }
              />
            </ImageListItem>
          ))}
        </ImageList>
      )}
    </>
  );
};

export default AllProducts;
