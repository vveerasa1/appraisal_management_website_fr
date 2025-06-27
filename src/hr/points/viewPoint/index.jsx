import { useState } from 'react'
import "./style.css"
import { Link } from 'react-router-dom'
import ProfileImg from '../../../assets/images/user.png'

const ViewPoint = () => {
    return (
        <>
            <div className='pageTanDiv'>
                <div className='viewPageTopDiv'>
                    <div className='lvDiv'>
                        <Link to="/hr/points"><i className='fa fa-angle-left'></i></Link>
                        <img className="img-fluid" src={ProfileImg} alt='Profile' />
                        <p>ABC1234 - John Doe</p>
                    </div>
                    <div className='rvDiv'>
                        <Link to="/hr/point/edit" className='rvDiv-btns' type='button'><i className='fa fa-pencil'></i></Link>
                        <button className='rvDiv-btns delete' type='button'><i className='fa fa-trash'></i></button>
                    </div>
                </div>
            </div>
            <div className='view-container'>
                <div className='row'>
                    <div className='col-12 col-md-12 col-lg-12'>
                        <div className='view-other-info'>
                            <h3 className='small-heading'>Point Details</h3>
                            <div className='row'>
                                <div className='col-12 col-md-6 col-lg-4'>
                                    <div className='editform-group'>
                                        <label className='editform-label'>User</label>
                                        <input type='text' className='editform-input' value="John Doe" placeholder='' />
                                        <div className="ef-actionbtns">
                                            <button className="editform-btn" type='button'><i className='fa fa-pencil'></i></button>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-12 col-md-6 col-lg-4'>
                                    <div className='editform-group'>
                                        <label className='editform-label'>Points Balance</label>
                                        <input type='text' className='editform-input' value="100" placeholder='' disabled />
                                    </div>
                                </div>
                                <div className='col-12 col-md-12'>
                                    <h3 className='small-heading'>Adjust Points</h3>
                                </div>
                                <div className='col-12 col-md-6 col-lg-4'>
                                    <div className='editform-group'>
                                        <label className='editform-label'>Points Count</label>
                                        <input type='text' className='editform-input' value="John Doe" placeholder='' />
                                        <div className="ef-actionbtns">
                                            <button className="editform-btn" type='button'><i className='fa fa-pencil'></i></button>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-12 col-md-6 col-lg-8'>
                                    <div className='editform-group'>
                                        <label className='editform-label'>Reason/Note for Adjustment</label>
                                        <input type='text' className='editform-input' value="John Doe" placeholder='' />
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

export default ViewPoint;