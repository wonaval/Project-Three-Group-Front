import {useState, createContext} from 'react'

const UserContext = createContext()

const UserProvider = ({children}) => {

  const [ user, setUser ] = useState({})
  const [ date, setDate ] = useState([])
  const [ loading, setLoading ] = useState(false)

  const state = {
    userState: [ user, setUser ],
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