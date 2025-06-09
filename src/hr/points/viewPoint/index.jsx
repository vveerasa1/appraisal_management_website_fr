import { useState } from 'react'
import "./style.css"
import { Link } from 'react-router-dom'
import ProfileImg from '../../../assets/images/user.png'

const ViewPoint = () => {
    return (
        <>
            <div className='breadcrumb-wrapper'>
                <h3 className='page-name'>John Doe</h3>
                <ul className='breadcrumb-lists'>
                    <li><Link to="/hr/dashboad" className="page-link">Home</Link></li>
                    <li><Link to="/hr/points" className="page-link">Points</Link></li>
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
                            <h3 className='small-heading'>Points Details</h3>
                            <ul className='otherInfo-lists'>
                                <li>
                                    <p>Points:</p>
                                    <h4>+20</h4>
                                </li>
                                <li>
                                    <p>Balance:</p>
                                    <h4>450</h4>
                                </li>
                                <li>
                                    <p>Reason:</p>
                                    <h4>Quarterly Bonus</h4>
                                </li>
                                <li>
                                    <p>Date:</p>
                                    <h4>May 20, 2025</h4>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ViewPoint;