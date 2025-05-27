import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import AppLayout from './layout';
import SignIn from './auth/signin' 
import Dashboard from './admin/dashboard'
import ForgotPassword from './auth/forgotPassword'
import OTPVerify from './auth/otpVerify'
import ResetPassword from './auth/resetPassword'
import ResetSuccess from './auth/resetSuccess'

function App() {

  return (
   <Router>
      <Routes>

        {/* Redirect default route ("/") to "/signin" */}
        <Route path="/" element={<SignIn />} />

        {/* Auth Route */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/otp-verify" element={<OTPVerify />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/reset-success" element={<ResetSuccess />} />

        {/* Routes for pages with Sidebar and Topbar */}
        {/* admin */}
        <Route 
          path="/admin/dashboard" 
          element={<AppLayout><Dashboard /></AppLayout>} 
        />
        {/* hr */}
        <Route 
          path="/hr/dashboard" 
          element={<AppLayout><Dashboard /></AppLayout>} 
        />
        {/* manager */}
        <Route 
          path="/manager/dashboard" 
          element={<AppLayout><Dashboard /></AppLayout>} 
        />
        {/* employee */}
        <Route 
          path="/employee/dashboard" 
          element={<AppLayout><Dashboard /></AppLayout>} 
        />
      </Routes>
    </Router>
  )
}

export default App
