import { useState } from 'react'
import "./style.css"
import { Link } from 'react-router-dom'

const ResetPassword = () => {
    return (
        <div className='auth-container'>
            <div className='auth-wrapper'>
                <form className='auth-form-container'>
                    <div className='auth-form-top'>
                        {/* <h3 className='auth-small-heading'>Login</h3> */}
                        <h1 className='auth-heading'>Reset Your Password</h1>
                        <p className='auth-description'>Create a new password for your account.</p>
                    </div>
                    <div className='auth-form-fields'>
                        <div className='auth-group'>
                            <i className='fa fa-lock'></i>
                            <input className='auth-input' type='password' placeholder='New Password' />
                        </div>
                        <div className='auth-group'>
                            <i className='fa fa-lock'></i>
                            <input className='auth-input' type='password' placeholder='Confirm Password' />
                        </div>
                        <div className='auth-submit'>
                            <button className='auth-btn' type='button'>Reset Password</button>
                        </div>
                        <div className='bottom-link mt-4'>
                            <p>Remembered it?
                            <Link to='/signin' className="blue-link-text">&nbsp;Login</Link>
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;