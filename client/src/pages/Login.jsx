import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';  // Import your Header
import './Login.css';

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleLoginChange = (e) => {
    setLoginData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegisterChange = (e) => {
    setRegisterData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', loginData);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/');
    } catch (error) {
      alert(error.response?.data?.error || 'Login failed');
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    alert('Registration submitted! Implement your API call here.');
    setIsRegister(false);
    setRegisterData({ username: '', email: '', password: '', confirmPassword: '' });
  };

  return (
    <>
      <Header />  {/* Add Header here */}
      <div className="login-page">
        <div className="login-card">
          <h2>{isRegister ? 'Register' : 'Login'}</h2>

          {isRegister ? (
            <form onSubmit={handleRegisterSubmit}>
              <label>
                Username
                <input
                  type="text"
                  name="username"
                  placeholder="Enter username"
                  value={registerData.username}
                  onChange={handleRegisterChange}
                  required
                />
              </label>

              <label>
                Email
                <input
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={registerData.email}
                  onChange={handleRegisterChange}
                  required
                />
              </label>

              <label>
                Password
                <input
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  value={registerData.password}
                  onChange={handleRegisterChange}
                  required
                />
              </label>

              <label>
                Confirm Password
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm password"
                  value={registerData.confirmPassword}
                  onChange={handleRegisterChange}
                  required
                />
              </label>

              <button type="submit" className="submit-btn">
                Register
              </button>
            </form>
          ) : (
            <form onSubmit={handleLoginSubmit}>
              <label>
                Email
                <input
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={loginData.email}
                  onChange={handleLoginChange}
                  required
                />
              </label>

              <label>
                Password
                <input
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  required
                />
              </label>

              <button type="submit" className="submit-btn">
                Login
              </button>
            </form>
          )}

          <div className="toggle-text">
            {isRegister ? (
              <>
                Already have an account?{' '}
                <button onClick={() => setIsRegister(false)} className="toggle-btn">
                  Login here
                </button>
              </>
            ) : (
              <>
                Don't have an account?{' '}
                <button onClick={() => setIsRegister(true)} className="toggle-btn">
                  Register here
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

