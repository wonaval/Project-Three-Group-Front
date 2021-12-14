import { UserContext } from "../context/UserContext"
import { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios"
import env from "react-dotenv"

const MyOrders = (props) => {
  // useContexts
  const { cartState, productState, dateState } = useContext(UserContext)
  const [ products, setProducts ] = productState
  const [ cart, setCart ] = cartState
  const [ uniqueDate, setUniqueDate ] = dateState
  
  // useStates
  const [ cartInfo, setCartInfo ] = useState([])
  // const [ uniqueDate, setUniqueDate ] = useState([])


  // Converts cartState context into productInfo to be displayed
  const itemInfo = async () => {
    try {
        const infoList = cart.map((item)=>{
          return (products.find((product)=>{ return (product.id === item.itemId) }))
        })
        await setCartInfo([...infoList])
        console.log('Cart',cart)
        console.log('Product', products)
    } catch (error) {
        console.log(error.message)
    }
  }

  const getCart = async () => {
    try {
      const response = await axios.get(`${env.BACKEND_URL}/cart`, {
      headers: { Authorization: localStorage.getItem('userId')}
    })
    setCart(response.data.items)

    } catch (error) {
      console.log(error)
    }
  }


  // Get unique dates in cart join table
  const getCartDate = async () => {

    // referenced: https://stackoverflow.com/questions/15125920/how-to-get-distinct-values-from-an-array-of-objects-in-javascript?rq=1
    // const List = await cart.map((item) => {
    //   console.log('Item', item)
    //   return item.checkoutDate
    // }).filter((value, index, self)=>(
    //   self.indexOf(value) === index
    // ))



    // referenced: https://stackoverflow.com/questions/15125920/how-to-get-distinct-values-from-an-array-of-objects-in-javascript?rq=1
    const List1 = await [...new Set(cart.map(item => item.checkoutDate))]

    await console.log('DateList', List1)
    await console.log('Cart', cart)
    const sorted = await List1.sort()
    await setUniqueDate(sorted.reverse())

  }

  // const formatDate = (test) => {
  //   const date = new 
  //   const year = date.getFullYear();

  //   const month = (1 + date.getMonth()).toString();

  //   month = month.length > 1 ? month : '0' + month;
  
  //   const day = date.getDate().toString();
  //   day = day.length > 1 ? day : '0' + day;
    
  //   return month + '/' + day + '/' + year;
  // }

  useEffect(()=>{
    // props.getCart();
    getCart();
    itemInfo();
    getCartDate()
  }, [])


  return (
    <div>
      <div>Previous Orders</div>
        <div>
          {/* {console.log(cart)} */}
          { uniqueDate.map((date, i)=>{
            return(
              <div key={i}>
                <Link to={`/orders/${i}`}> {date} </Link>
              </div>
            )
          })
          }


        {/* { .map((item, i) => {
          return (
              <div className='cartItem' key={i}>
                {console.log(getOrderDate(cart[i].checkoutDate))}
                  { getOrderDate(cart[i].checkoutDate) === cart[i].checkoutDate ?
                    <div>
                      <img src={item.image} alt={item.name} />
                      {cart[i].checkoutDate}
                      {item.name}
                      ${item.price}
                    </div>
                  :
                    null
                  }
              </div>
          )
        })} */}
        </div>
    </div>
  )
}

export default MyOrders