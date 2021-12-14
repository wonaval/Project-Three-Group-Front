import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../context/UserContext'
import axios from 'axios'
import env from 'react-dotenv'
import CheckOut from '../components/CheckOut'
import './MyCart.css';
import LoadingScreen from '../components/LoadingScreen'

const MyCart = (props) => {
    // useContexts
    const { cartState, productState, loadingState } = useContext(UserContext)
    const [ products, setProducts ] = productState
    const [ cart, setCart] = cartState
    const [ loading, setLoading ] = loadingState
    
    // useStates
    const [ cartInfo, setCartInfo ] = useState([])
    
    const [ showCheckout, setShowCheckout] = useState(false)



        // useEffect(async ()=>{
        //     await props.getProducts();
        // }, [])

    // Converts cartState context into productInfo to be displayed
    const itemInfo = async () => {
        try {
            const userId = localStorage.getItem('userId')

            setLoading(true)

            const cartResponse = await axios.get(`${env.BACKEND_URL}/cart`,{
                headers: { Authorization: userId }
            })

            const userCart = await cartResponse.data.items

            await setCart(userCart)

            const infoList = await userCart.map((item)=>{
                return (products.find((product)=>{ return (product.id === item.itemId) }))
            })

            await setCartInfo([...infoList])

            setTimeout(()=>{setLoading(false)},2000)
            
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
            await itemInfo();
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(()=>{
        itemInfo();
    }, [])

    return (

        <>
        
            { loading ?
            
                <LoadingScreen />
            :
            <div>
                Cart Page
                <div>{ cartInfo.length && cart.length ?
                        <>
                            {cartInfo.map((item, i) => {
                                return (
                                    <div className='cartItem' key={i}>
                                        { cart[i].checkedOut ?
                                            null
                                        :
                                            <span>
                                                <img src={item.image} alt={item.name} />
                                                {item.name}
                                                ${item.price}
                                                <button
                                                    // value={cart[i].itemId}
                                                    onClick={()=>{
                                                        removeItem(cart[i].id)
                                                    }}
                                                > Remove </button>
                                            </span>
                                        }
                                    </div>
                                )
                            })}
                        </>
                    :
                        null
                    }
                </div>

                { showCheckout ?
                <div>
                    <CheckOut getCart={props.getCart()} cartInfo={cartInfo} />
                    <button onClick={()=>{setShowCheckout(false)}}>Cancel Checkout</button>
                </div>
                :
                <div>
                    <button onClick={()=>{setShowCheckout(true)}}>Checkout</button>
                </div>
                }
            </div>
        
        }
        </>
        
    )
}

export default MyCart
