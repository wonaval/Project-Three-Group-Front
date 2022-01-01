import { UserContext } from '../context/UserContext';
import { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import env from 'react-dotenv';
import './MyOrders.css';

const MyOrders = (props) => {
  // useContexts
  const { dateState } = useContext(UserContext);
  const [uniqueDate, setUniqueDate] = dateState;

  // useStates
  const [cart, setCart] = useState([]);
  const [cartInfo, setCartInfo] = useState([]);

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

  // Converts cart context into productInfo to be displayed
  const itemInfo = () => {
    // Filters list so only checked out items are left
    const checkedList = cart.filter((item) => {
      return item.checkedOut === true;
    });
    const infoList = checkedList.map((item) => {
      return props.products.find((product) => {
        return product.id === item.itemId;
      });
    });
    setCartInfo([...infoList]);
  };

  // Get unique dates in cart join table
  const getCartDate = async () => {
    // Unique date values function
    // referenced: https://stackoverflow.com/questions/15125920/how-to-get-distinct-values-from-an-array-of-objects-in-javascript?rq=1
    const List = await cart
      .map((item) => {
        return item.checkoutDate;
      })
      .filter((value, index, self) => self.indexOf(value) === index);
    // Sort unique dates
    const sorted = await List.sort();
    await setUniqueDate(sorted);
  };

  const getMonth = (monthNum) => {
    let month = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    return month[monthNum - 1];
  };

  // Cascading useEffect in order to get useState to time correctly
  useEffect(() => {
    getCart();
  }, []);

  useEffect(() => {
    itemInfo();
  }, [cart]);

  useEffect(() => {
    getCartDate();
  }, [cartInfo]);

  return (
    <div className="myOrders">
      <div>
        <h2>MY ORDERS</h2>
      </div>
      <div className="orderList">
        {uniqueDate.length ? (
          <>
            {uniqueDate.map((date, i) => {
              if (date !== null) {
                return (
                  <div key={i}>
                    {'Order Placed: '}
                    <Link to={`/orders/${i}`}>
                      <span>
                        {`
                          ${getMonth(date.slice(5, 7))}
                          ${date.slice(8, 10)}, 
                          ${date.slice(0, 4)} 
                          ${date.slice(11, 19)}
                        `}
                      </span>
                    </Link>
                  </div>
                );
              }
            })}
          </>
        ) : (
          <div>You currently do not have any previous orders.</div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
