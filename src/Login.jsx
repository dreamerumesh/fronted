import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast, Toaster } from 'sonner'; 
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    //console.log(backendUrl);
    const response = await fetch(`${backendUrl}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();

    if (data.message === 'Login successful') {
      toast.success('✅ Login Successful!');
      setTimeout(() => navigate('/login-success'), 1500); // Redirect after 1.5s
    } else {
      toast.error('❌ Login Failed! Please check your credentials.');
    }
  };

  return (
    <div className="form-container">
      <Toaster position="top-right" expand={true} richColors  />

       {/* Welcome message */}
       <h1 className="welcome-text">Welcome to Signify</h1>
       
      <form onSubmit={handleLogin} className="form">
        <h2>Login</h2>
        <input
          type="email"
           name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>

      <p>
        Don't have an account?{' '}
        <Link to="/register" className="link">
          Register here
        </Link>
      </p>
      <p>
        Forgot your password?{' '}
        <Link to="/forgot-password" className="link">
          Reset it here
        </Link>
      </p>
    </div>
  );
}

export default Login;
