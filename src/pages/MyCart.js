import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../context/UserContext'
import axios from 'axios'
import env from 'react-dotenv'
import CheckOut from '../components/CheckOut'

const MyCart = (props) => {
    // useContexts
    const { cartState, productState } = useContext(UserContext)
    const [ products, setProducts ] = productState
    const [ cart, setCart] = cartState
    const [ showCheckout, setShowCheckout] = useState(false)
    
    // useStates
    const [ cartInfo, setCartInfo ] = useState([])

    // Converts cartState context into productInfo to be displayed
        const itemInfo = async () => {
        try {
            console.log(cart)
            const infoList = cart.map((item)=>{
                return (products.find((product)=>{ return (product.id === item.itemId) }))
            })
            setCartInfo([...infoList])
        } catch (error) {
            console.log(error.message)
        }
    }

    // Removes item from backend
    const removeItem = async (itemId) => {
        try {
            console.log('ItemId', itemId)
            const userId = localStorage.getItem('userId');
            const remove = await axios.delete(`${env.BACKEND_URL}/cart/${itemId}`, {
                headers: { Authorization: userId}
            })
            props.getCart();
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(()=>{
        itemInfo();
    }, [])

    return (
        <div>
            Cart Page
            <div>
                {cartInfo.map((item, i) => {
                    return (
                        <div className='cartItem' key={i}>
                            { cart[i].checkedOut ?
                                null
                            :
                                <span>
                                    <img src={item.image} alt={item.name} />
                                    {item.itemId}
                                    {item.name}
                                    ${item.price}
                                    <button
                                        value={cart[i].itemId}
                                        onClick={(event)=>{
                                            removeItem(event.target.value)
                                        }}
                                    > Remove </button>
                                </span>
                            }
                        </div>
                    )
                })}
            </div>

            { showCheckout ?
            <div>
                <CheckOut />
                <button onClick={()=>{setShowCheckout(false)}}>Cancel Checkout</button>
            </div>
            :
            <div>
                <button onClick={()=>{setShowCheckout(true)}}>Checkout</button>
            </div>
            }
        </div>
    )
}

export default MyCart
