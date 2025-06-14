import { useState } from 'react'
import "./style.css"
import { Link } from 'react-router-dom'
import ProfileImg from '../../../assets/images/user.png'

const ViewRole = () => {
    return (
        <>
            <div className='pageTanDiv'>
                <ul className='pageTabPane'>
                    <li className='active'>
                        <Link to="/admin/roles">Roles</Link>
                    </li>
                </ul>
            </div>
            <div className='view-container'>
                <div className='row'>
                    <div className='col-12 col-md-4 col-lg-4 mb-4'>
                        <div className='view-avatar-info'>
                            <img className='img-fluid' src={ProfileImg} alt='Profile' />
                            <h3>Admin</h3>
                            <p>Created at: <b>25 Jan, 2025 10:30pm</b></p>
                        </div>
                    </div>
                    <div className='col-12 col-md-4 col-lg-8'>
                        <div className='view-other-info'>
                            <h3 className='small-heading'>Role Details</h3>
                            <ul className='otherInfo-lists'>
                                <li>
                                    <p>Role:</p>
                                    <h4>Admin</h4>
                                </li>
                                <li>
                                    <p>Role Description:</p>
                                    <h4>Can view team performance and assign tasks</h4>
                                </li>
                                <li>
                                    <p>Permissions:</p>
                                    <h4>Add/Edit/Delete Users, View All Users, Adjust Points, View Transactions</h4>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className='col-12 col-md-12 col-lg-12'>
                        <div className='submit-btn-block'>
                            <button className='theme-btn btn-border' type='button'>Delete</button>
                            <Link to="/admin/role/edit" className='theme-btn btn-blue' type='button'>Edit Role</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ViewRole;