import { useState } from 'react'
import "./style.css"
import { Link } from 'react-router-dom'

const ForgotPassword = () => {
    return (
        <div className='auth-container'>
            <div className='auth-wrapper'>
                <form className='auth-form-container'>
                    <div className='auth-form-top'>
                        {/* <h3 className='auth-small-heading'>Login</h3> */}
                        <h1 className='auth-heading'>Forgot Your Password?</h1>
                        <p className='auth-description'>Don’t worry! We’ll help you reset it.</p>
                        <p className='auth-description'>Enter your registered email, and we’ll send you a password reset link or OTP.</p>
                    </div>
                    <div className='auth-form-fields'>
                        <div className='auth-group'>
                            <i className='fa fa-envelope'></i>
                            <input className='auth-input' type='email' placeholder='Email' />
                        </div>
                        <div className='auth-submit'>
                            <button className='auth-btn' type='button'>Continue</button>
                        </div>

                        <div className='mt-4'>
                            <Link to='/' className="blue-link-text">Send Reset Link</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;