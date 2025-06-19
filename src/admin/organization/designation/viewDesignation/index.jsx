import { useState, useEffect, useRef } from 'react';
import "./style.css"
import { Link } from 'react-router-dom'
import ProfileImg from '../../../../assets/images/user.png'
import Select from "react-select";
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';

const ViewDesignation = () => {

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
                <div className='rvDiv'>
                    <Link to="/admin/organization/designation/edit" className='rvDiv-btns' type='button'><i className='fa fa-pencil'></i></Link>
                    <button className='rvDiv-btns delete' type='button'><i className='fa fa-trash'></i></button>
                </div>
            </div>
            <div className='view-container'>
                <div className='row'>
                    <div className='col-12 col-md-12 col-lg-12'>
                        <div className='view-other-info'>
                            <h3 className='small-heading'>Designation Details</h3>
                            <div className='row'>
                                <div className='col-12 col-md-6 col-lg-4'>
                                    <div className='editform-group'>
                                        <label className='editform-label'>Designation Name</label>
                                        <input type='text' className='editform-input' value="Developer" placeholder='' />
                                        {/* before edit click */}
                                        <div className="ef-actionbtns">
                                            <button className="editform-btn" type='button'><i className='fa fa-pencil'></i></button>
                                        </div>
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

export default ViewDesignation;