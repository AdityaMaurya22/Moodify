import { useState } from 'react'
import "../style/login.scss";
import "../../shared/styles/button.scss";
import Formgroup from '../components/Formgroup';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const { loading, handleLogin } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    await handleLogin({ email, password })
    navigate("/")
  }

  return (
    <main className="login-page">
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <Formgroup
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email" placeholder="Enter your email" />
          <Formgroup
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password" placeholder="Enter your password" />
          <button type="submit">Login</button>
        </form>
        <p>Don't have an account? <Link to="/register">Register here</Link></p>
      </div>
    </main>
  )
}

export default Login
