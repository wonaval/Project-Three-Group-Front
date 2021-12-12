import {useState, createContext} from 'react'

const UserContext = createContext()

const UserProvider = ({children}) => {
  const [ user, setUser ] = useState({})
  const [ cart, setCart ] = useState([])
  const [ products, setProducts ] = useState([])

  const state = {
    userState: [ user, setUser ],
    cartState: [ cart, setCart ],
    productState: [ products, setProducts ]
  }

  return (
    <UserContext.Provider value={ state }>
      { children }
    </UserContext.Provider>
  )
}

export { UserContext, UserProvider }