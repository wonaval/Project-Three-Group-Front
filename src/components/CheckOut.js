import { useState, useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import LoadingScreen from './LoadingScreen';

import axios from 'axios';
import env from 'react-dotenv';

const CheckOut = (props) => {
  // useContext
  const { loadingState } = useContext(UserContext);

  const [loading, setLoading] = loadingState;

  // useState
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState([]);
  const [zip, setZip] = useState('');
  const [credit, setCredit] = useState('');
  const [cart, setCart] = useState([]);

  const navigate = useNavigate();

  const getCart = () => {
    const userId = localStorage.getItem('userId');
    try {
      setLoading(true);
      // GET cart from backend
      axios
        .get(`${env.BACKEND_URL}/cart`, {
          headers: { Authorization: userId },
        })
        .then((cartResponse) => {
          setCart([...cartResponse.data.items]);
        });

      setLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const submitForm = async (e) => {
    try {
      e.preventDefault();
      const userId = localStorage.getItem('userId');
      const newAddress = ` ${address1} ${address2} ${city} ${state} ${zip}`;

      const response = await axios.post(`${env.BACKEND_URL}/cart/update`, {
        id: userId,
        credit: credit,
        address: newAddress,
      });

      await getCart();
      await console.log('Cart after Checkout', cart);
      await navigate('/orders');
    } catch (error) {
      console.log(error.message);
    }
  };

  const orderTotal = () => {
    let sum = 0;

    cart.map((item, i) => {
      if (item.checkedOut === false && cart.length) {
        sum = sum + props.cartInfo[i].price;
      }
    });
    return sum;
  };

  return (
    <div>
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          <div>SUBTOTAL: ${props.subtotal}</div>
          <div className="checkout">
            <div>CHECKOUT</div>
            <form
              onSubmit={(e) => {
                submitForm(e);
              }}
            >
              <label htmlFor="address">Address:</label>
              <input
                type="text"
                placeholder="Address line 1*"
                value={address1}
                onChange={(e) => {
                  setAddress1(e.target.value);
                }}
              />
              <input
                type="text"
                placeholder="Adress Line 2"
                value={address2}
                onChange={(e) => {
                  setAddress2(e.target.value);
                }}
              />
              <input
                type="text"
                placeholder="City*"
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                }}
              />
              <input
                type="text"
                placeholder="State*"
                value={state}
                onChange={(e) => {
                  setState(e.target.value);
                }}
              />
              <input
                type="text"
                placeholder="Zip Code*"
                value={zip}
                onChange={(e) => {
                  setZip(e.target.value);
                }}
              />
              <label htmlFor="creditCard">Credit-card:</label>
              <input
                type="text"
                placeholder="Credit Card Number"
                value={credit}
                onChange={(e) => {
                  setCredit(e.target.value);
                }}
              />
              <input type="submit" value="Checkout" />
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default CheckOut;
