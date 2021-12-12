import React from 'react'

import { useState, useContext }  from 'react'
import { UserContext } from '../context/UserContext'
import axios from 'axios'
import env from 'react-dotenv'


const Signup = () => {
  // WILL - This is the userContext syntax added
  const { userState } = useContext(UserContext)
  const [ user, setUser ] = userState

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const submitForm = async (e) => {
        e.preventDefault()
        // Pulls user from backend
        const response = await axios.post(`${env.BACKEND_URL}/user`, { name, email, password })

        console.log (response)

        // Sets user through useContext
        setUser(response)
        localStorage.setItem('userId', user)
    }
    return (
        <div>
      <form onSubmit={submitForm}>
      <div>
          <label htmlFor="name">Name:</label>
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
          
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        <div>
          <input type="submit" value="Sign Up!" />
        </div>
      </form>
    </div>
    )
}


export default Signup