import { UserContext } from "../context/UserContext"
import { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios"
import env from "react-dotenv"

const MyOrders = (props) => {
  // useContexts
  const { dateState } = useContext(UserContext)
  const [ uniqueDate, setUniqueDate ] = dateState
  
  // useStates
  const [ cart, setCart ] = useState([])
  const [ cartInfo, setCartInfo ] = useState([])

  // Gets cart from backend
  const getCart = async () => {
    try {
      const response = await axios.get(`${env.BACKEND_URL}/cart`, {
      headers: { Authorization: localStorage.getItem('userId')}
    })
    await setCart(response.data.items)
    } catch (error) {
      console.log(error)
    }
  }

  // Converts cartState context into productInfo to be displayed
  const itemInfo = async () => {
    try {
        const infoList = cart.map((item)=>{
          return (props.products.find((product)=>{ return (product.id === item.itemId) }))
        })
        await setCartInfo(infoList)
    } catch (error) {
        console.log(error.message)
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
    await setUniqueDate(sorted)

  }

  useEffect(()=>{
    getCart();
    itemInfo();
    getCartDate();
  }, [])

  return (
    <div>
      <div>Previous Orders</div>
        <div>
          { uniqueDate.map((date, i)=>{
            return(
              <div key={i}>
                <Link to={`/orders/${i}`}> {date} </Link>
              </div>
            )
          })
          }
      </div>
    </div>
  )
}

export default MyOrders