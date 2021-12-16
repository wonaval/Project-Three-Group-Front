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

<<<<<<< HEAD

    // Converts cartState context into productInfo to be displayed
    const itemInfo = async () => {
=======
    // Get cart from backend
    const getCart = () => {
        const userId = localStorage.getItem('userId')
>>>>>>> 88d69bc5809ca073a0d3899284e7664e19f55746
        try {
            setLoading(true)
            // GET cart from backend
            axios.get(`${env.BACKEND_URL}/cart`,{
                headers: { Authorization: userId }
<<<<<<< HEAD
            })
            console.log(cartResponse)
            setCart(cartResponse.data.items)

            // Filters list so only checked out items are left
            const checkedList = cart.filter((item)=>{return(item.checkedOut !== true)})

            console.log('checkedList', checkedList)

            const infoList = checkedList.map((item)=>{
                return (props.products.find((product)=>{ return (product.id === item.itemId) }))
            })

            console.log('info',infoList)

            setCartInfo(infoList)  

            // setTimeout(()=>{setLoading(false)},2000)
            console.log(cart)
            console.log(cartInfo)
=======
            }).then((cartResponse)=>{setCart([...cartResponse.data.items])})
>>>>>>> 88d69bc5809ca073a0d3899284e7664e19f55746
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
            console.log(remove)
            await itemInfo();
        } catch (error) {
            console.log(error.message)
        }
    }

<<<<<<< HEAD
    useEffect(async()=>{
        await itemInfo();
=======
    useEffect(()=>{
        getCart();
>>>>>>> 88d69bc5809ca073a0d3899284e7664e19f55746
    }, [])

    useEffect(()=>{
        itemInfo();
    }, [cart])

    return (
        <>
            { loading ?
                <LoadingScreen />
            :
<<<<<<< HEAD
            <div>
                Cart Page
                <div>{ cartInfo.length && cart.length ?
                        <>
                        {/* {console.log(cartInfo)} */}
                            {cartInfo.map((item, i) => {
                                // console.log(item)
                                return (
                                    <div className='cartItem' key={i}>
                                        {/* {console.log(cart)} */}
                                        { cart[i].checkedOut ?
                                            null
                                        :
                                            <span>
                                                <img src={item.image} alt={item.name} />
                                                {item.name}
                                                ${item.price}
                                                <button
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
=======
>>>>>>> 88d69bc5809ca073a0d3899284e7664e19f55746
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
