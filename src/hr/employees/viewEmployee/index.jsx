import { useState } from 'react'
import "./style.css"
import { Link } from 'react-router-dom'
import ProfileImg from '../../../assets/images/user.png'

const ViewEmployee = () => {
    return (
        <>
            <div className='breadcrumb-wrapper'>
                <h3 className='page-name'>John Doe</h3>
                <ul className='breadcrumb-lists'>
                    <li><Link to="/hr/dashboard" className="page-link">Home</Link></li>
                    <li><Link to="/hr/employees" className="page-link">Employee</Link></li>
                    <li><p>John Doe</p></li>
                </ul>
            </div>
            <div className='view-container'>
                <div className='row'>
                    <div className='col-12 col-md-4 col-lg-4 mb-4'>
                        <div className='view-avatar-info'>
                            <img className='img-fluid' src={ProfileImg} alt='Profile' />
                            <h3>John Doe</h3>
                            <p>Designation: <b>Web Developer</b></p>
                            <p>Employee ID: <b>ABC1234</b></p>
                        </div>
                    </div>
                    <div className='col-12 col-md-4 col-lg-8'>
                        <div className='view-other-info'>
                            <h3 className='small-heading'>Employee Details</h3>
                            <ul className='otherInfo-lists'>
                                <li>
                                    <p>Email:</p>
                                    <h4>john@company.com</h4>
                                </li>
                                <li>
                                    <p>Mobile Number:</p>
                                    <h4>+1(234) 567-8901</h4>
                                </li>
                                <li>
                                    <p>Department:</p>
                                    <h4>Software Development</h4>
                                </li>
                                <li>
                                    <p>DOJ:</p>
                                    <h4>12 Jan, 2024</h4>
                                </li>
                                <li>
                                    <p>Reporting to:</p>
                                    <h4>Manager Name</h4>
                                </li>
                                <li>
                                    <p>Address:</p>
                                    <h4>1234, New Winston Road, New York, NY A567</h4>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className='col-12 col-md-12 col-lg-12'>
                        <div className='submit-btn-block'>
                            <button className='theme-btn btn-border' type='button'>Delete</button>
                            <Link to="/hr/employee/edit" className='theme-btn btn-blue' type='button'>Edit Employee</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ViewEmployee;