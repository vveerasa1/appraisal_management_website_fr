import { useState } from 'react'
import "./style.css"
import { Link } from 'react-router-dom'
import Check from '../../assets/images/check.png'

const ResetSuccess = () => {
    return (
        <div className='auth-container'>
            <div className='auth-wrapper'>
                <form className='auth-form-container'>
                    <div className='auth-form-top'>
                        <img className='img-fluid' src={Check} alt='Check' />
                        <h1 className='auth-heading'>Password Reset Successful!</h1>
                        <p className='auth-description'>Your password has been updated successfully.</p>
                        <p className='auth-description'>You can now log in with your new password.</p>
                        <Link to="/signin" className='auth-btn mt-4' type='button'>Go To Login</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ResetSuccess;