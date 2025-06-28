import React, { useState } from "react";
import "./style.css"
import { Link } from 'react-router-dom'

const ChangePassword = () => {
    return (
        <>
            <div className='pageTanDiv'>
                <ul className='pageTabPane'>
                    <li>
                        <Link to="/profile">Profile</Link>
                    </li>
                    <li className='active'>
                        <Link to="/profile/change-password">Change Password</Link>
                    </li>
                </ul>
            </div>
            <div className='view-container'>
                <div className='row'>
                    <div className='col-12 col-md-12 col-lg-12'>
                        <div className='view-other-info'>
                            <div className='row'>
                                <div className='col-12 col-md-6 col-lg-6'>
                                    <div className='forn-group'>
                                        <label className='form-label'>Old Password</label>
                                        <input type='text' className='form-input' placeholder='' />
                                    </div>
                                </div>
                                <div className='col-12 col-md-6 col-lg-6'>
                                    <div className='forn-group'>
                                        <label className='form-label'>New Password</label>
                                        <input type='text' className='form-input' placeholder='' />
                                    </div>
                                </div>
                                <div className='col-12 col-md-6 col-lg-6'>
                                    <div className='forn-group'>
                                        <label className='form-label'>Confirm Password</label>
                                        <input type='text' className='form-input' placeholder='' />
                                    </div>
                                </div>
                                <div className='col-12 col-md-12 col-lg-12'>
                                    <div className='submit-btn-block'>
                                        <button className='theme-btn btn-border' type='button'>Cancel</button>
                                        <button className='theme-btn btn-blue' type='button'>Update Password</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChangePassword;