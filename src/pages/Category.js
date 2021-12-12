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
            <ul>

                <li>
                    <Link to='/category/bakery'>bakery</Link>
                </li>

                <li>
                    <Link to='/category/books'>books</Link>
                </li>

                <li>
                    <Link to='/category/electronics'>electronics</Link>
                </li>

            </ul>
        </div>
    )
}

export default Category
