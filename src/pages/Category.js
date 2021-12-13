import { useState, useEffect } from 'react'
import React from 'react'
import env from 'react-dotenv'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Category = () => {

    // const [items, setItems] = useState({})

    // const loadItems = async () => {
    //     const response = await axios.get(`${env.BACKEND_URL}/item`)

    //     const items = response.data.items

    //     for(let item of items){
    //         console.log(item.category)
    //     }

    //     // console.log(items)
    // }

    // useEffect(()=>{loadItems()}, [])

    return (
        <div>
            <div>Categories</div>
            <div>
                <Link to='/category/bakery'>Bakery</Link>
            </div>
            <div>
                <Link to='/category/books'>Books</Link>
            </div>
            <div>
                <Link to='/category/electronics'>Electronics</Link>
            </div>
        </div>
    )
}

export default Category
