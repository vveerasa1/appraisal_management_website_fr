import { useState } from 'react'
import "./style.css"
import { Link } from 'react-router-dom'

const AddRole = () => {
    return (
        <>
            <div className='pageTanDiv'>
                <ul className='pageTabPane'>
                    <li className='active'>
                        <Link to="/admin/roles">Roles</Link>
                    </li>
                </ul>
            </div>
            <form className='form-list-container'>
                <div className='row'>
                    <div className="col-12 col-md-12 col-lg-12">
                        <div className='form-list-wrapper'>
                            <div className='row'>
                                <div className='col-12 col-md-12 col-lg-12'>
                                    <div className='forn-group'>
                                        <label className='form-label'>Role Name</label>
                                        <input type='text' className='form-input' placeholder='' />
                                    </div>
                                </div>
                                <div className='col-12 col-md-12 col-lg-12'>
                                    <div className='forn-group'>
                                        <label className='form-label'>Role Description</label>
                                        <textarea cols={30} rows={4} className='form-input'></textarea>
                                    </div>
                                </div>
                                <div className='col-12 col-md-12 col-lg-12'>
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
                                        <button className='theme-btn btn-border' type='button'>Cancel</button>
                                        <button className='theme-btn btn-blue' type='button'>Save Role</button>
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

export default AddRole;