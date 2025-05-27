import { useState } from 'react'
import "./style.css"
import { Link } from 'react-router-dom'

const OTPVerify = () => {
    return (
        <div className='auth-container'>
            <div className='auth-wrapper'>
                <form className='auth-form-container'>
                    <div className='auth-form-top'>
                        {/* <h3 className='auth-small-heading'>OTP</h3> */}
                        <h1 className='auth-heading'>Verify Your Account</h1>
                        <p className='auth-description'>We’ve sent a 6-digit verification code to your registered  email</p>
                    </div>
                    <div className='auth-form-fields'>
                        <div className='otp-inputs-group'>
                            <input className='otp-input' type='text' placeholder='' minLength={1} maxLength={1} />
                            <input className='otp-input' type='text' placeholder='' minLength={1} maxLength={1} />
                            <input className='otp-input' type='text' placeholder='' minLength={1} maxLength={1} />
                            <input className='otp-input' type='text' placeholder='' minLength={1} maxLength={1} />
                            <input className='otp-input' type='text' placeholder='' minLength={1} maxLength={1} />
                            <input className='otp-input' type='text' placeholder='' minLength={1} maxLength={1} />
                        </div>
                        <div className='auth-submit'>
                            <button className='auth-btn' type='button'>Login Now</button>
                        </div>
                        <div className='bottom-link mt-4'>
                            <p>Didn’t receive the code?
                            <Link to='/' className="blue-link-text">&nbsp;Resend Code</Link>
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default OTPVerify;