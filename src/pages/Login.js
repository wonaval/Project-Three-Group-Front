import React from 'react'
import { useState, useContext }  from 'react'
import { UserContext } from '../context/UserContext'
import axios from 'axios'
import env from 'react-dotenv'


const Login = () => {
  // WILL - This is the useContext syntax added
  // We'll use 'user' state so we know which page should show what
  const { userState } = useContext(UserContext)
  const [ user, setUser ] = userState


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const submitForm = async (e) => {
      // Pulls user from backend
        e.preventDefault()
        const response = await axios.post(`${env.BACKEND_URL}/user/login`, { email, password })

      console.log (response)

      // Sets user through useContext
      setUser(response)
      localStorage.setItem('userId', user)
    }
        
    return (
        <div>
      <form onSubmit={submitForm}>
        <div>
          <label htmlFor="email">Email:</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
          
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        <div>
          <input type="submit" value="Login" />
        </div>
      </form>
    </div>
    )
}

export default Login