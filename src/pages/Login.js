import React from 'react'
import {useState}  from 'react'
import axios from 'axios'
import env from 'react-dotenv'


const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const submitForm = (e) => {
        e.preventDefault()
        axios.post(`${env.BACKEND_URL}/user/login`, { email, password })
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