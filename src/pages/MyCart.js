import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import env from 'react-dotenv';
import CheckOut from '../components/CheckOut';
import './MyCart.css';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';

const MyCart = (props) => {
  // useStates
  const [cart, setCart] = useState([]);
  const [checkList, setCheckList] = useState([]);
  const [cartInfo, setCartInfo] = useState([]);
  const [products, setProducts] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const userId = localStorage.getItem('userId');

  // Get cart from backend
  const getCart = () => {
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

  const getProducts = async () => {
    try {
      // GET products from backend
      const response = await axios.get(`${env.REACT_APP_BACKEND_URL}/item`);
      // Set it as product useState hook
      setProducts(response.data.items);
    } catch (error) {
      console.log(error.message);
    }
  };

  // Converts cart context into productInfo to be displayed
  const itemInfo = async () => {
    // Filters list so only non-checked out items are left
    const checkedList = await cart.filter((item) => {
      return item.checkedOut !== true;
    });
    setCheckList([...checkedList]);
    const infoList = await checkedList.map((item) => {
      return products.find((product) => {
        return product.id === item.itemId;
      });
    });
    setCartInfo(infoList);
  };

  // Removes item from backend
  const removeItem = async (itemId) => {
    try {
      const remove = await axios.delete(
        `${env.REACT_APP_BACKEND_URL}/cart/${itemId}`,
        {
          headers: { Authorization: userId },
        }
      );
      getCart();
    } catch (error) {
      console.log(error.message);
    }
  };

  const orderTotal = () => {
    try {
      let sum = 0;
      cartInfo.map((item, i) => {
        sum = sum + item.price;
      });
      setSubtotal(sum);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  useEffect(() => {
    getProducts();
  }, [cart]);

  useEffect(() => {
    itemInfo();
  }, [cart, products]);

  useEffect(() => {
    orderTotal();
  }, [cartInfo]);

  const returnCart = (item, i) => {
    try {
      return (
        <div
          key={i}
          style={{ backgroundImage: `url(${item.image})` }}
          className="cart-div"
        >
          <div className="cart-text">
            <span>
              {cartInfo[i].name} <br />
            </span>
            <span>${cartInfo[i].price}</span>
            <RemoveShoppingCartIcon
              onClick={() => {
                removeItem(checkList[i].id);
              }}
            />
          </div>
        </div>
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>MY CART</h2>
      {cartInfo.length ? (
        <div>
          <div className="cart-container">
            {cartInfo.map((item, i) => {
              return returnCart(item, i);
            })}
          </div>
          <h2>
            <CheckOut subtotal={subtotal} />
          </h2>
        </div>
      ) : (
        <div>
          Your cart is empty. Add items to it by clicking on the Category link
          above!
        </div>
      )}
    </div>
  );
};

export default MyCart;
