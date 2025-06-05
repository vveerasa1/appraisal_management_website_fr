import { useState } from 'react'
import "./style.css"
import { Link } from 'react-router-dom'
import Appraisal from '../../../assets/images/performance-appraisal.png'

const ViewEmployee = () => {
    return (
        <>
            <div className='breadcrumb-wrapper'>
                <h3 className='page-name'>Quarterly Appraisal</h3>
                <ul className='breadcrumb-lists'>
                    <li><Link to="/admin/dashboad" className="page-link">Home</Link></li>
                    <li><Link to="/admin/appraisals" className="page-link">Appraisals</Link></li>
                    <li><p>Quarterly Appraisal</p></li>
                </ul>
            </div>
            <div className='view-container'>
                <div className='row'>
                    <div className='col-12 col-md-4 col-lg-4 mb-4'>
                        <div className='view-avatar-info'>
                            <img className='img-fluid' src={Appraisal} alt='Appraisal' />
                            <h3>Quarterly Appraisal</h3>
                        </div>
                    </div>
                    <div className='col-12 col-md-4 col-lg-8'>
                        <div className='view-other-info'>
                            <h3 className='small-heading'>Appraisal Details</h3>
                            <ul className='otherInfo-lists'>
                                <li>
                                    <p>Title:</p>
                                    <h4>Quarterly Appraisal Q2 2025</h4>
                                </li>
                                <li>
                                    <p>Type:</p>
                                    <h4>Quarterly</h4>
                                </li>
                                <li>
                                    <p>Appraisal Period:</p>
                                    <h4>Jan 2024 - July 2024</h4>
                                </li>
                                <li>
                                    <p>Department</p>
                                    <h4>IT</h4>
                                </li>
                                <li>
                                    <p>Roles:</p>
                                    <h4>Manager</h4>
                                </li>
                                <li>
                                    <p>Points to Award:</p>
                                    <h4>20</h4>
                                </li>
                                <li>
                                    <p>Bonus Amount:</p>
                                    <h4>$200</h4>
                                </li>
                                <li>
                                    <p>Notes/Description:</p>
                                    <h4>This appraisal focuses on team contributions during Q2</h4>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className='col-12 col-md-12 col-lg-12'>
                        <div className='submit-btn-block'>
                            <button className='theme-btn btn-border' type='button'>Delete</button>
                            <Link to="/admin/appraisal/edit" className='theme-btn btn-blue' type='button'>Edit Appraisal</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ViewEmployee;