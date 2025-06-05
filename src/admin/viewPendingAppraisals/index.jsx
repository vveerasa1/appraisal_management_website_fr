import { useState } from 'react'
import "./style.css"
import { Link } from 'react-router-dom'

const ViewPendingApprsisals = () => {
    return (
        <>
            <div className='breadcrumb-wrapper'>
                <h3 className='page-name'>Appraisal Details for Jane Smith</h3>
                <ul className='breadcrumb-lists'>
                    <li><Link to="/admin/dashboad" className="page-link">Home</Link></li>
                    <li><p>Jane Smith</p></li>
                </ul>
            </div>
            <div className='pending-view-container'>
                <div className='row align-items-center justify-content-center'>
                    <div className='col-12 col-md-8 col-lg-8'>
                        <div className='appraisal-status-container'>
                            <div className='appraisal-status-item approved'>
                                <div className='astatus-top'>
                                    <i className='fa fa-check'></i>
                                    <p>Approved by Manager</p>
                                </div>
                                <div className='astatus-content'>
                                    <h3>Manager Comments:</h3>
                                    <p>"Excellent performance..."</p>
                                </div>
                            </div>
                            <div className='appraisal-status-item rejected'>
                                <div className='astatus-top'>
                                    <i className='fa fa-close'></i>
                                    <p>Rejected by HR</p>
                                </div>
                                <div className='astatus-content'>
                                    <h3>HR Comments:</h3>
                                    <p>"Poor performance..."</p>
                                </div>
                            </div>
                            <div className='appraisal-status-item document'>
                                <Link
                                    to="/"
                                    download="Appraisal_form_2025.pdf"
                                >
                                    Appraisal_form_2025.pdf
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className='col-12 col-md-8 col-lg-8'>
                        <div className='forn-group mb-2'>
                            <label className='form-label'>Admin Comments</label>
                            <textarea cols={30} rows={3} className='form-input' placeholder=''></textarea>
                        </div>
                        <div className='formcheck'>
                            <label>
                                <input type='checkbox' />
                                I Validated appraisal processes, align with policies, forward appraisals to Employee.
                            </label>
                        </div>
                    </div>
                    <div className='col-12 col-md-8 col-lg-8'>
                        <div className='submit-btn-block'>
                            <button className='theme-btn btn-blue' type='button'>Accept</button>
                            <button className='theme-btn btn-red' type='button'>Reject</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ViewPendingApprsisals;