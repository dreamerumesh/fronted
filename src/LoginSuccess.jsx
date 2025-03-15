import React, { useEffect, useState } from 'react';
import './index.css';

function LoginSuccess() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true); // Trigger the animation after the component mounts
  }, []);

  return (
    <div className={`success-page ${animate ? 'animate' : ''}`}>
      <h1>Login Successful!</h1>
      <p>Welcome back to our website </p>
      <p className='umesh'>&nbsp;&nbsp;&nbsp; --Umesh Chandra Gopalasetti</p>


    </div>
  );
}

export default LoginSuccess;