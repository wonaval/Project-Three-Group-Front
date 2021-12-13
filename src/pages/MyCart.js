import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../context/UserContext'
import axios from 'axios'
import env from 'react-dotenv'
import './MyCart.css';

const MyCart = (props) => {
    // useContexts
    const { cartState, productState } = useContext(UserContext)
    const [ products, setProducts ] = productState
    const [ cart, setCart] = cartState
    
    // useStates
    const [ cartInfo, setCartInfo ] = useState([])
    const [loading, setLoading] = useState(false);



        // useEffect(async ()=>{
        //     await props.getProducts();
        // }, [])

    // Converts cartState context into productInfo to be displayed
        const itemInfo = async () => {
        try {

            console.log(products)

            console.log(cart)


            const infoList = cart.map((item)=>{
                    return (products.find((product)=>{ return (product.id === item.itemId) }))
            })
            
            setCartInfo([...infoList])
            console.log(cartInfo)
        } catch (error) {
            console.log(error.message)
        }
    }

    // Removes item form backend
    const removeItem = async (itemId) => {
        try {
            console.log('ItemId', itemId)
            const userId = localStorage.getItem('userId');
            const remove = await axios.delete(`${env.BACKEND_URL}/cart/${itemId}`, {
                headers: { Authorization: userId}
            })
            await props.getCart();
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
                <button onClick={()=>{}}>Checkout</button>
            </div>
        </div>
    )
}

export default MyCart
