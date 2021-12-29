import axios from 'axios';
import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import env from 'react-dotenv';
import './ItemDetails.css';

const ItemDetails = (props) => {
  // useParams
  const { id } = useParams();

  // useState
  const [itemInfo, setItemInfo] = useState([]);

  // Get single item details
  const getDetail = async () => {
    try {
      const detail = await axios.get(`${env.REACT_APP_BACKEND_URL}/item/${id}`);
      setItemInfo(detail.data.item);
    } catch (error) {
      console.log(error.message);
    }
  };

  // Add item to cart function
  const addToCartClick = async (itemId) => {
    try {
      const response = await axios.post(
        `${env.REACT_APP_BACKEND_URL}/cart`,
        { id: id },
        {
          headers: {
            Authorization: localStorage.getItem('userId'),
          },
        }
      );
      props.getCart();
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getDetail();
  }, []);

  return (
    <div className="main-div">
      <div>
        <Link to={`/category/${itemInfo.category}`}>
          Back to {itemInfo.category}
        </Link>
      </div>
      <div className="detail-div">
        <div className="detail-left">
          <img src={itemInfo.image} className="detail-image" />
        </div>
        <div className="detail-mid">
          <div className="detail-header">
            <h2>{itemInfo.name}</h2>
          </div>
          <div>
            <div className="detail-text">{itemInfo.description}</div>
          </div>
        </div>
        <div className="detail-right">
          <div className="detail-price">${itemInfo.price}.00</div>
          <div>
            <button onClick={addToCartClick}>Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
