import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../context/UserContext'
import env from 'react-dotenv'
import axios from 'axios'

const AllProducts = (props) => {
    const { userState } = useContext(UserContext)
    const [ user, setUser ] = userState


    const {name} = useParams()

    const [products, setProducts] = useState([])

    const loadProducts = async () => {
        const response = await axios.get(`${env.BACKEND_URL}/item`)
        
        console.log(response)

        setProducts(response.data.items)

        
        console.log(name)

        // setTimeout(()=>{console.log(products)},5000)
    }

    const addToCartClick = async (itemId) => {
        const response = await axios.post(`${env.BACKEND_URL}/cart`, {id : itemId}, {
            headers: {
                Authorization: localStorage.getItem('userId')
            }
        })
        props.getCart();
    }

    useEffect(()=>{
        loadProducts()
    }, [])

    return (
        <div>
            <div>
                <Link to='/category'>Back to Categories</Link>
            </div>
            <div>
                {products.map((item, i) => {
                    return(
                        <div key={item.id}>
                            {item.category === name ?
                                <>
                                    <h1><Link to={`/item/${item.id}`}>{item.name}</Link></h1>
                                    <img src={item.image} alt={`Image of ${item.name}`} />
                                    <button onClick={()=>{addToCartClick(item.id)}}>Add to cart</button>
                                </>
                            :
                                null
                            }
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default AllProducts
