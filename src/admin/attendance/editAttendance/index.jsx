import React, { useState } from "react";
import "./style.css";
import { Link } from 'react-router-dom'
import ProfileImg from '../../../assets/images/user.png'

const AdminEditAttendance = () => {
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
                            <div className='row'>
                                <div className='col-12 col-md-6 col-lg-4'>
                                    <div className='editform-group'>
                                        <label className='editform-label'>Employee</label>
                                        <select className='editform-input'>
                                            <option>John Doe</option>
                                            <option>Mary Joe</option>
                                            <option>William Smith</option>
                                        </select>
                                    </div>
                                </div>
                                <div className='col-12 col-md-6 col-lg-4'>
                                    <div className='editform-group'>
                                        <label className='editform-label'>Date</label>
                                        <input type='text' className='editform-input' value="2022-01-10" placeholder=''/>
                                    </div>
                                </div>
                                <div className='col-12 col-md-6 col-lg-4'>
                                    <div className='editform-group'>
                                        <label className='editform-label'>Start Time</label>
                                        <input type='text' className='editform-input' value="11:59:54 AM" placeholder=''/>
                                    </div>
                                </div>
                                <div className='col-12 col-md-6 col-lg-4'>
                                    <div className='editform-group'>
                                        <label className='editform-label'>End Time</label>
                                        <input type='text' className='editform-input' value="10:20:01 PM" placeholder=''/>
                                    </div>
                                </div>
                                <div className='col-12 col-md-6 col-lg-4'>
                                    <div className='editform-group'>
                                        <label className='editform-label'>Status</label>
                                        <select className='editform-input'>
                                            <option>Leave</option>
                                            <option>Absent</option>
                                            <option>Present</option>
                                        </select>
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
                                            value=""
                                        ></textarea>
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

export default AdminEditAttendance;