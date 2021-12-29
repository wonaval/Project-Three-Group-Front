import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import env from 'react-dotenv';
import CheckOut from '../components/CheckOut';
import './MyCart.css';
import LoadingScreen from '../components/LoadingScreen';

const MyCart = (props) => {
  // useContexts
  const { loadingState } = useContext(UserContext);
  const [loading, setLoading] = loadingState;

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
      setLoading(true);
      // GET cart from backend
      axios
        .get(`${env.BACKEND_URL}/cart`, {
          headers: { Authorization: userId },
        })
        .then((cartResponse) => {
          setCart([...cartResponse.data.items]);
        });

      setTimeout(() => {
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.log(error.message);
    }
  };

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

  // Converts cart context into productInfo to be displayed
  const itemInfo = async () => {
    // Filters list so only non-checked out items are left
    const checkedList = await cart.filter((item) => {
      return item.checkedOut !== true;
    });
    setCheckList([...checkedList]);
    console.log('products', products);
    const infoList = await checkedList.map((item) => {
      console.log('checkItem', item);
      return products.find((product) => {
        console.log('Prod ID', product.id);
        console.log('Item ID', item.itemId);
        return product.id === item.itemId;
      });
    });
    setCartInfo(infoList);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  // Removes item from backend
  const removeItem = async (itemId) => {
    try {
      console.log('ItemId', itemId);
      const remove = await axios.delete(`${env.BACKEND_URL}/cart/${itemId}`, {
        headers: { Authorization: userId },
      });
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
      console.log(subtotal);
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
            <button
              onClick={() => {
                removeItem(checkList[i].id);
                console.log(checkList[i].id);
              }}
            >
              {' '}
              Remove{' '}
            </button>
          </div>
        </div>
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <div>
          {cartInfo.length && (
            <>
              <h1>Cart Page</h1>
              <div className="cart-container">
                {cartInfo.map((item, i) => {
                  return returnCart(item, i);
                })}
              </div>
              <h2>
                <CheckOut subtotal={subtotal} />
              </h2>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default MyCart;
