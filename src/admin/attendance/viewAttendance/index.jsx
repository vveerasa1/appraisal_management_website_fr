import { useState } from 'react'
import "./style.css"
import { Link } from 'react-router-dom'
import ProfileImg from '../../../assets/images/user.png'

const AdminViewAttendance = () => {
    return (
        <>
            <div className='pageTanDiv'>
                <div className='viewPageTopDiv'>
                    <div className='lvDiv'>
                        <Link to="/admin/attendance"><i className='fa fa-angle-left'></i></Link>
                        <img className="img-fluid" src={ProfileImg} alt='Profile' />
                        <p>ABC1234 - John Doe</p>
                    </div>
                    <div className='rvDiv'>
                        <Link to="/admin/attendance/edit" className='rvDiv-btns' type='button'><i className='fa fa-pencil'></i></Link>
                        <button className='rvDiv-btns delete' type='button'><i className='fa fa-trash'></i></button>
                    </div>
                </div>
            </div>
            <div className='view-container'>
                <div className='row'>
                    <div className='col-12 col-md-12 col-lg-12'>
                        <div className='view-other-info'>
                            <h3 className='small-heading'>Attendance Details</h3>
                            <div className='row'>
                                <div className='col-12 col-md-6 col-lg-4'>
                                    <div className='editform-group'>
                                        <label className='editform-label'>Employee</label>
                                        <input type='text' className='editform-input' value="John Doe" placeholder='' disabled/>
                                    </div>
                                </div>
                                <div className='col-12 col-md-6 col-lg-4'>
                                    <div className='editform-group'>
                                        <label className='editform-label'>Date</label>
                                        <input type='text' className='editform-input' value="2022-01-10" placeholder='' disabled/>
                                    </div>
                                </div>
                                <div className='col-12 col-md-6 col-lg-4'>
                                    <div className='editform-group'>
                                        <label className='editform-label'>Start Time</label>
                                        <input type='text' className='editform-input' value="11:59:54 AM" placeholder='' disabled/>
                                    </div>
                                </div>
                                <div className='col-12 col-md-6 col-lg-4'>
                                    <div className='editform-group'>
                                        <label className='editform-label'>End Time</label>
                                        <input type='text' className='editform-input' value="10:20:01 PM" placeholder='' disabled/>
                                    </div>
                                </div>
                                <div className='col-12 col-md-6 col-lg-4'>
                                    <div className='editform-group'>
                                        <label className='editform-label'>Status</label>
                                        <input type='text' className='editform-input' value="Leave" placeholder='' disabled/>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 col-lg-12">
                                    <div className="editform-group">
                                        <label className="editform-label">
                                            Remarks
                                        </label>
                                        <textarea
                                            cols={30}
                                            rows={3}
                                            className="editform-input"
                                            value="Lorem ipsum sit amit"
                                            disabled
                                        ></textarea>
                                    </div>
                                </div>
                                <div className='col-12'>
                                    <h3 className='small-heading'>Other Details</h3>
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
                                        <input type='text' className='editform-input' value="7/1/2025, 1:00:29 PM" placeholder='' disabled />
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
                                        <input type='text' className='editform-input' value="7/1/2025, 1:00:29 PM" placeholder='' disabled />
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

export default AdminViewAttendance;