import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast, Toaster } from 'sonner';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      const response = await fetch(`${backendUrl}/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
  
      const data = await response.json();
      if (data.message === 'OTP sent to your email') {
        //alert('OTP has been sent to your email. Please check your inbox.');
        toast.success('✅ otp sent!');
        //console.log('Navigating to reset-password with email:', email); // Log the email
        //navigate('/reset-password', { state: { email } }); // Pass email via state
        setTimeout(() => navigate('/reset-password', { state: { email } }), 1000);
      } else {
        //alert(data.error || 'Failed to send OTP');
        toast.error(data.error || '❌ Failed to send OTP');

      }
    } catch (error) {
      console.error('Error during forgot password:', error);
      //alert('An unexpected error occurred. Please try again.');
      toast.error('❌ An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="form-container">
      <Toaster position="top-right" expand={true} richColors />

      <form onSubmit={handleForgotPassword} className="form">
        <h2>Forgot Password</h2>
        <p>Enter your email to receive an OTP for resetting your password.</p>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send OTP</button>
      </form>
      <p>
        Remember your password?{' '}
        <Link to="/" className="link">
          Login here
        </Link>
      </p>
    </div>
  );
}

export default ForgotPassword;