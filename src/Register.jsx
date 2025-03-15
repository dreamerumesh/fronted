import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast, Toaster } from 'sonner';

function Register() {
  // State to store the email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Hook for navigation
  const navigate = useNavigate();

  // Handle form submission
  const handleRegister = async (e) => {
    e.preventDefault(); // Prevent default form behavior

    try {
      // Send a POST request to the backend `/register` endpoint
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      const response = await fetch(`${backendUrl}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      // Parse the response as JSON
      const data = await response.json();

      // Check if registration was successful
      if (data.message === 'User registered successfully') {
        //alert('Registration successful! Please login.');
        toast.success('✅ Registration successful! Please login.');
        setTimeout(() => navigate('/'), 1000);
        //navigate('/'); // Redirect to the login page
      } else {
        //alert(data.error || 'Registration failed');
        toast.error(data.error || 'Registration failed');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="form-container">
      {/* Registration Form */}
      <Toaster position="top-right" expand={true} richColors />
      <form onSubmit={handleRegister} className="form">
        <h2>Register</h2>
        {/* Email Input */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {/* Password Input */}
        <input
          type="password"
          name='password'
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {/* Submit Button */}
        <button type="submit">Register</button>
      </form>

      {/* Link to Login Page */}
      <p>
        Already have an account?{' '}
        <Link to="/" className="link">
          Login here
        </Link>
      </p>
    </div>
  );
}

export default Register;