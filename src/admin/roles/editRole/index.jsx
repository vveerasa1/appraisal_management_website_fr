import { useState } from 'react'
import "./style.css"
import { Link } from 'react-router-dom'
import ProfileImg from '../../../assets/images/user.png'

const EditRole = () => {
    return (
        <>
            <div className='pageTanDiv'>
                <div className='viewPageTopDiv'>
                    <div className='lvDiv'>
                        <Link to="/admin/users"><i className='fa fa-angle-left'></i></Link>
                        <img className="img-fluid" src={ProfileImg} alt='Profile' />
                        <p>ABC1234 - John Doe</p>
                    </div>
                    <div className='rvDiv'>
                        <button className='rvDiv-btns delete' type='button'><i className='fa fa-trash'></i></button>
                    </div>
                </div>
            </div>
            <div className='view-container'>
                <div className='row'>
                    <div className='col-12 col-md-12 col-lg-12'>
                        <div className='view-other-info'>
                            <h3 className='small-heading'>Role Details</h3>
                            <div className='row'>
                                <div className='col-12 col-md-6 col-lg-4'>
                                    <div className='editform-group'>
                                        <label className='editform-label'>Role Name</label>
                                        <input type='text' className='editform-input' value="HR" placeholder='' />
                                    </div>
                                </div>
                                <div className='col-12 col-md-6 col-lg-8'>
                                    <div className='editform-group'>
                                        <label className='editform-label'>Description</label>
                                        <textarea cols={30} rows={3} className='editform-input' value=""></textarea>
                                    </div>
                                </div>
                                <div className='col-12 col-md-6 col-lg-4'>
                                    <div className='editform-group'>
                                        <label className='editform-label'>Added By</label>
                                        <input type='text' className='editform-input' value="Admin" placeholder='' disabled />
                                    </div>
                                </div>
                                <div className='col-12 col-md-6 col-lg-4'>
                                    <div className='editform-group'>
                                        <label className='editform-label'>Added Time</label>
                                        <input type='text' className='editform-input' value="20/07/2024" placeholder='' disabled />
                                    </div>
                                </div>
                                <div className='col-12 col-md-6 col-lg-4'>
                                    <div className='editform-group'>
                                        <label className='editform-label'>Modified By</label>
                                        <input type='text' className='editform-input' value="Admin" placeholder='' disabled />
                                    </div>
                                </div>
                                <div className='col-12 col-md-6 col-lg-4'>
                                    <div className='editform-group'>
                                        <label className='editform-label'>Modified Time</label>
                                        <input type='text' className='editform-input' value="20/07/2024" placeholder='' disabled />
                                    </div>
                                </div>
                                <div className='col-12 col-md-12'>
                                    <h3 className='small-heading'>Permissions</h3>
                                </div>
                                <div className='col-12 col-md-12 col-lg-12'>
                                    <div className='forn-group'>
                                        <label className='form-label'>Employee Management</label>
                                        <div className='form-check-container'>
                                            <div className='form-check-item'>
                                                <label>
                                                    <input type='checkbox' className='' />
                                                    <p>Add/Edit/Delete Users</p>
                                                </label>
                                            </div>
                                            <div className='form-check-item'>
                                                <label>
                                                    <input type='checkbox' className='' />
                                                    <p>View All Users</p>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-12 col-md-12 col-lg-12'>
                                    <div className='forn-group'>
                                        <label className='form-label'>Point Management</label>
                                        <div className='form-check-container'>
                                            <div className='form-check-item'>
                                                <label>
                                                    <input type='checkbox' className='' />
                                                    <p>Adjust Points</p>
                                                </label>
                                            </div>
                                            <div className='form-check-item'>
                                                <label>
                                                    <input type='checkbox' className='' />
                                                    <p>View Points Transactions</p>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-12 col-md-12 col-lg-12'>
                                    <div className='submit-btn-block'>
                                        <button className='theme-btn btn-blue' type='button'>Save Changes</button>
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

export default EditRole;