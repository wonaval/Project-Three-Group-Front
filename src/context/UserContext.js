import {useState, createContext} from 'react'

const UserContext = createContext()

const UserProvider = ({children}) => {
  const [ user, setUser ] = useState({})

  const state = {
    userState: [ user, setUser ]
  }

  return (
    <UserContext.Provider value={ state }>
      { children }
    </UserContext.Provider>
  )
}

export { UserContext, UserProvider }