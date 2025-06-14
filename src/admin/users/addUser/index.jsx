import { useState } from 'react'
import "./style.css"
import { Link } from 'react-router-dom'

const AddUser = () => {
    return (
        <>
            <div className='pageTanDiv'>
                <ul className='pageTabPane'>
                    <li className='active'>
                        <Link to="/admin/users">Users</Link>
                    </li>
                </ul>
            </div>
            <form className='form-list-container'>
                <div class="row">
                    <div className="col-12 col-md-12 col-lg-12">
                        <div className='form-list-wrapper'>
                        <div className='row'>
                            <div className='col-12 col-md-6 col-lg-4'>
                                <div className='forn-group'>
                                    <label className='form-label'>User</label>
                                    <select className='form-input'>
                                        <option>---Select User---</option>
                                        <option>John Doe</option>
                                        <option>Mary Joe</option>
                                        <option>William Smith</option>
                                    </select>
                                </div>
                            </div>
                            <div className='col-12 col-md-6 col-lg-4'>
                                <div className='forn-group'>
                                    <label className='form-label'>Email Address</label>
                                    <input type='email' className='form-input' placeholder='' />
                                </div>
                            </div>
                            <div className='col-12 col-md-6 col-lg-4'>
                                <div className='forn-group'>
                                    <label className='form-label'>Phone Number</label>
                                    <input type='text' className='form-input' placeholder='' />
                                </div>
                            </div>
                            <div className='col-12 col-md-6 col-lg-4'>
                                <div className='forn-group'>
                                    <label className='form-label'>Role</label>
                                    <select className='form-input'>
                                        <option>---Select Role---</option>
                                        <option></option>
                                        <option></option>
                                        <option></option>
                                    </select>
                                </div>
                            </div>
                            <div className='col-12 col-md-6 col-lg-4'>
                                <div className='forn-group'>
                                    <label className='form-label'>Department</label>
                                    <select className='form-input'>
                                        <option>---Select Department---</option>
                                        <option></option>
                                        <option></option>
                                        <option></option>
                                    </select>
                                </div>
                            </div>
                            <div className='col-12 col-md-6 col-lg-4'>
                                <div className='forn-group'>
                                    <label className='form-label'>Designation</label>
                                    <input type='text' className='form-input' placeholder='' />
                                </div>
                            </div>
                            <div className='col-12 col-md-6 col-lg-4'>
                                <div className='forn-group'>
                                    <label className='form-label'>Employee ID</label>
                                    <input type='text' className='form-input' placeholder='' />
                                </div>
                            </div>
                            <div className='col-12 col-md-6 col-lg-4'>
                                <div className='forn-group'>
                                    <label className='form-label'>Date of Joining</label>
                                    <input type='date' className='form-input' placeholder='' />
                                </div>
                            </div>

                            <div className='col-12 col-md-12 col-lg-12'>
                                <div className='submit-btn-block'>
                                    <button className='theme-btn btn-border' type='button'>Cancel</button>
                                    <button className='theme-btn btn-blue' type='button'>Save User</button>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};

export default AddUser;