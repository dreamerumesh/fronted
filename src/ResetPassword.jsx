import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast, Toaster } from 'sonner';

function ResetPassword() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Extract email from navigation state
    //console.log('Navigation state:', location.state);
    const emailFromState = location.state?.email;
    if (!emailFromState) {
      alert('Invalid access. Please start the process again.');
      navigate('/forgot-password'); // Redirect back to Forgot Password page
      return;
    }
    setEmail(emailFromState); // Set the email state
  }, [location, navigate]);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to the backend `/reset-password` endpoint
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      const response = await fetch(`${backendUrl}/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, newPassword }),
      });

      const data = await response.json();
      if (response.ok && data.message === 'Password reset successful') {
        //alert('Your password has been reset successfully. Please login.');
        toast.success('✅ Your password has been reset successfully. Please login.');
       
        setTimeout(() => navigate('/'), 1500);
      } else {
        //alert(data.error || 'Failed to reset password');
        toast.error( data.error || '❌ Failed to reset password');
      }
    } catch (error) {
      console.error('Error during password reset:', error);
      //alert('An unexpected error occurred. Please try again.');
      toast.error('❌ An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="form-container">
       <Toaster position="top-right" expand={true} richColors />

      <form onSubmit={handleResetPassword} className="form">
        <h2>Reset Password</h2>
        <p>Enter the OTP sent to your email and your new password.</p>
        <p>If OTP is not received please check in Spam</p>

        {/* Email Input (Read-Only) */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          readOnly // Make the email field read-only
        />

        {/* OTP Input */}
        <input
          type="text"
          name="otp"
          placeholder="OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />

        {/* New Password Input */}
        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />

        {/* Submit Button */}
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
}

export default ResetPassword;