import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../context/UserContext'
import axios from 'axios'
import env from 'react-dotenv'
import CheckOut from '../components/CheckOut'
import './MyCart.css';
import LoadingScreen from '../components/LoadingScreen'

const MyCart = (props) => {
    // useContexts
    const { loadingState } = useContext(UserContext)
    const [ loading, setLoading ] = loadingState
    
    // useStates
    const [ cart, setCart] = useState([])
    const [ cartInfo, setCartInfo ] = useState([])
    const [ showCheckout, setShowCheckout] = useState(false)

    // Get cart from backend
    const getCart = () => {
        const userId = localStorage.getItem('userId')
        try {
            setLoading(true)
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
        // Filters list so only non-checked out items are left
        const checkedList = await cart.filter((item)=>{return(item.checkedOut !== true)})
        console.log('checked', checkedList)

        const infoList = await checkedList.map((item)=>{
            return (props.products.find((product)=>{ return (product.id === item.itemId) }))
        })
        await setCartInfo([...infoList])
        console.log('CART', cartInfo)
        setTimeout(()=>{setLoading(false)},2000)
    }

    // Removes item from backend
    const removeItem = async (itemId) => {
        try {
            console.log('ItemId', itemId)
            const userId = localStorage.getItem('userId');
            const remove = await axios.delete(`${env.BACKEND_URL}/cart/${itemId}`, {
                headers: { Authorization: userId }
            })
            await itemInfo();
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(()=>{
        getCart();
    }, [])

    useEffect(()=>{
        itemInfo();
    }, [cart])

    return (
        <>
            { loading ?
                <LoadingScreen />
            :
                <div>
                    <div>
                        Cart Page
                        {cartInfo.map((item, i) => {
                            console.log('item', item, 'cart', cart[i])
                            return (
                                <div className='cartItem' key={i}>
                                        <span>
                                            <img src={item.image} alt={item.name} />
                                            {item.name}
                                            ${item.price}
                                            <button onClick={()=>{ removeItem(cart[i].id) }} > Remove </button>
                                        </span>
                                </div>
                            )
                        })}
                    </div>
                    <div>
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
                </div>
            }
        </>
    )
}

export default MyCart
