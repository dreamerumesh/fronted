import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login'; // Login page component
import Register from './Register'; // Registration page component
import LoginSuccess from './LoginSuccess'; // Login success page component
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword'; // Import the ResetPassword component
import NotFound from "./NotFound"; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <Routes>
       {/* <Route path="/" element={<App />} />  */}
       <Route path="/" element={<Login />} /> {/* Add the login route */}
       <Route path="/register" element={<Register />} /> {/*Add the register route  */}
       <Route path="/login-success" element={<LoginSuccess />} /> {/*Add the success route */}
       <Route path="/forgot-password" element={<ForgotPassword />} /> 
       <Route path="/reset-password" element={<ResetPassword />} /> {/*Add this route */}
       <Route path="*" element={<NotFound />} />
     
    </Routes>
  </Router>
);