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

    // Get cart from backend
    const getCart = () => {
      const userId = localStorage.getItem('userId')
      try {
          // GET cart from backend
          axios.get(`${env.BACKEND_URL}/cart`,{
              headers: { Authorization: userId }
          }).then((cartResponse)=>{setCart([...cartResponse.data.items])})

      } catch (error) {
          console.log(error.message)
      }
  }

  // Converts cart context into productInfo to be displayed
  const itemInfo = async () => {
      // Filters list so only checked out items are left
      const checkedList = await cart.filter((item)=>{return(item.checkedOut === true)})
      console.log('checked', checkedList)

      const infoList = await checkedList.map((item)=>{
          return (props.products.find((product)=>{ return (product.id === item.itemId) }))
      })
      await setCartInfo([...infoList])
      console.log('CART', cartInfo)
  }

  // Get unique dates in cart join table
  const getCartDate = async () => {
    // const List1 = await [...new Set(cart.map(item => item.checkoutDate))]
    // Referenced: https://stackoverflow.com/questions/15125920/how-to-get-distinct-values-from-an-array-of-objects-in-javascript?rq=1

    // Alternative function
    // referenced: https://stackoverflow.com/questions/15125920/how-to-get-distinct-values-from-an-array-of-objects-in-javascript?rq=1
    console.log(cart)
    const List = await cart.map((item) => {
      console.log('Item', item)
      return item.checkoutDate
    }).filter((value, index, self)=>(
      self.indexOf(value) === index
    ))

    await console.log('DateList', List)
    await console.log('Cart', cart)
    const sorted = await List.sort()
    await setUniqueDate(sorted)

  }

  useEffect(()=>{
    getCart();
  }, [])

  useEffect(()=>{
    itemInfo()
  },[cart])

  useEffect(()=>{
    getCartDate();
  },[cartInfo])

  return (
    <div>
      <div>Previous Orders</div>
        <div>
          {uniqueDate.length &&
          
          <>
            { uniqueDate.map((date, i)=>{
              return(
                <div key={i}>
                  <Link to={`/orders/${i}`}> {date} </Link>
                </div>
              )
            })
            }

          </>
          
          }

      </div>
    </div>
  )
}

export default MyOrders