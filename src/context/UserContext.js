import {useState, createContext} from 'react'
import axios from 'axios'
import env from 'dotenv'

const UserContext = createContext()

const UserProvider = ({children}) => {

  const [ user, setUser ] = useState({})
  const [ cart, setCart ] = useState([])
  const [ products, setProducts ] = useState([])
  const [ date, setDate ] = useState([])

  const state = {
    userState: [ user, setUser ],
    cartState: [ cart, setCart ],
    productState: [ products, setProducts ],
    dateState: [ date, setDate]
  }

  return (
    <UserContext.Provider value={ state }>
      { children }
    </UserContext.Provider>
  )
}

export { UserContext, UserProvider }