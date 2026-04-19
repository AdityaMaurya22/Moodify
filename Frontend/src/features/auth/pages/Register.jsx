import React, {useState} from 'react'
import "../style/register.scss";
import "../../shared/styles/button.scss";
import Formgroup from '../components/Formgroup';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Register = () => {

  const { loading, handleRegister } = useAuth()
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    await handleRegister({ username, email, password })
    navigate("/")
  }

  return (
    <main className="register-page">
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <Formgroup
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            label="Username" placeholder="Enter your username" />
          <Formgroup
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email" placeholder="Enter your email" />
          <Formgroup
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password" placeholder="Enter your password" />
          <button type="submit">Register</button>
        </form>
        <p>Already have an account? <Link to="/login">Login here</Link></p>
      </div>
    </main>
  )
}

export default Register
