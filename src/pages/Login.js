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
      e.preventDefault()
      try {
            // Pulls user from backend
            const response = await axios.post(`${env.BACKEND_URL}/user/login`, { email, password })
      
            // Sets user through useContext
            await setUser(response.data.user)

            // Set userId into localStorage
            setTimeout(()=>{localStorage.setItem('userId', response.data.user.id)}, 1)

      } catch (error) {
        console.log('Error:', error.message)
      }

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