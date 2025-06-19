import { useState, useEffect, useRef } from 'react';
import "./style.css"
import { Link } from 'react-router-dom'

const AddDesignation = () => {
    
    return (
        <>
            <div className='pageTanDiv'>
                <ul className='pageTabPane'>
                    <li>
                        <Link to="/admin/employees">Employee</Link>
                    </li>
                    <li>
                        <Link to="/admin/organization/department">Department</Link>
                    </li>
                    <li className='active'>
                        <Link to="/admin/organization/designation">Designation</Link>
                    </li>
                    <li>
                        <Link to="/admin/organization/tree">Organization Tree</Link>
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
                                    <label className='form-label'>Designation Name</label>
                                    <input type='email' className='form-input' placeholder='' />
                                </div>
                            </div>

                            <div className='col-12 col-md-12 col-lg-12'>
                                <div className='submit-btn-block'>
                                    <button className='theme-btn btn-border' type='button'>Cancel</button>
                                    <button className='theme-btn btn-blue' type='button'>Save Designation</button>
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

export default AddDesignation;