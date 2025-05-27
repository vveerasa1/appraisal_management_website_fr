import { useState } from 'react'
import "./style.css"
import { Link } from 'react-router-dom'

const Signin = () => {
    return (
        <div className='auth-container'>
            <div className='auth-wrapper'>
                <form className='auth-form-container'>
                    <div className='auth-form-top'>
                        <h3 className='auth-small-heading'>Login</h3>
                        <h1 className='auth-heading'>Hello Welcome Back</h1>
                        <p className='auth-description'>Welcome back please sign in again</p>
                    </div>
                    <div className='auth-form-fields'>
                        <div className='auth-group'>
                            <i className='fa fa-envelope'></i>
                            <input className='auth-input' type='email' placeholder='Email' />
                        </div>
                        <div className='auth-group'>
                            <i className='fa fa-lock'></i>
                            <input className='auth-input' type='password' placeholder='Password' />
                        </div>
                        <div className='forgot-password'>
                            <Link to='/forgot-password' className="link-text">Forgot Password?</Link>
                        </div>

                        <div className='auth-submit'>
                            <button className='auth-btn' type='button'>Login Now</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signin;