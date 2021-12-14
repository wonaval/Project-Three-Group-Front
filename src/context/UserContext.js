import {useState, createContext} from 'react'
import axios from 'axios'
import env from 'dotenv'

const UserContext = createContext()

const UserProvider = ({children}) => {

  const [ user, setUser ] = useState({})
  const [ cart, setCart ] = useState([])
  const [ products, setProducts ] = useState([])
  const [ date, setDate ] = useState([])
  const [ loading, setLoading ] = useState(false)

  const state = {
    userState: [ user, setUser ],
    cartState: [ cart, setCart ],
    productState: [ products, setProducts ],
    dateState: [ date, setDate],
    loadingState : [ loading, setLoading ]
  }

  return (
    <UserContext.Provider value={ state }>
      { children }
    </UserContext.Provider>
  )
}

export { UserContext, UserProvider }