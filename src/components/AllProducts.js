import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../context/UserContext'
import env from 'react-dotenv'
import axios from 'axios'

const AllProducts = () => {
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

    useEffect(()=>{loadProducts(); console.log(user.password)}, [])
    return (
        <div>

            {products.map((item, i) => {

                // {console.log(item.category)}
                // {console.log(item.category === name)}
                // "books"
                return(
                    <div key={item.id}>
                        {item.category === name ?
                        
                    
                            <>
                            
                                <h1>{item.name}</h1>
                                <p>{item.description}</p>
                                <img src={item.image} alt={`Image of ${item.name}`} />
                            
                            </>
                            
                        :


                            null
                    
                    
                    
                        }
                
                    </div>

                ) 
            })}
                
                

            
            
        </div>
    )
}

export default AllProducts
