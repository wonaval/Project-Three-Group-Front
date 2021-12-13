import axios from 'axios';
import React from 'react'
import { useState, useEffect, useContext } from  'react'
import { useParams, Link } from 'react-router-dom'
import env from 'react-dotenv'
import { UserContext } from '../context/UserContext';

const ItemDetails = (props) => {
    const { userState } = useContext(UserContext)
    const [ user, setUser ] = userState
    
    const { id } = useParams();

    const [ itemInfo, setItemInfo ] = useState([])

    const getDetail = async () => {
        try {
            const detail = await axios.get(`${env.BACKEND_URL}/item/${id}`)
            console.log('Detail', detail.data.item)
            setItemInfo(detail.data.item)
        } catch (error) {
            console.log(error.message)
        }
    }

    const addToCartClick = async (itemId) => {
        try {
            const response = await axios.post(`${env.BACKEND_URL}/cart`, {itemId : id}, {
                headers: {
                    Authorization: localStorage.getItem('userId')
                }
            })
            props.getCart();
        } catch (error) {
            console.log(error.message)
        }
    }

    const capitalize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }

    useEffect(()=>{
        getDetail();
    }, [])

    return (
        <div>
            <div>
                <Link to={`/category/${itemInfo.category}`}>
                    Back to {itemInfo.category}
                </Link>
            </div>
            <div>
                {itemInfo.name}
            </div>
            <div>
                <img src={itemInfo.image}/>
            </div>
            <div>
                {itemInfo.description}
            </div>
            <div>
                Price: ${itemInfo.price}
            </div>
            <div>
                <button onClick={addToCartClick}>Add to Cart</button>
            </div>
        </div>
    )
}

export default ItemDetails
