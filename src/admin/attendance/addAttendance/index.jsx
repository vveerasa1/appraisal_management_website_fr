import React, { useState } from "react";
import "./style.css";
import { Link } from 'react-router-dom'

const AdminAddAttendance = () => {
    return (
        <>
            <div className='pageTanDiv'>
                <ul className='pageTabPane'>
                    <li className='active'>
                        <Link to="/admin/attendance">Attendance</Link>
                    </li>
                </ul>
            </div>
            <form className='form-list-container'>
                <div className='row'>
                    <div className="col-12 col-md-12 col-lg-12">
                        <div className='form-list-wrapper'>
                            <div className='row'>
                                <div className='col-12 col-md-6 col-lg-4'>
                                    <div className='forn-group'>
                                        <label className='form-label'>Employee</label>
                                        <select className='form-input'>
                                            <option>---Select Employee---</option>
                                            <option>John Doe</option>
                                            <option>Mary Joe</option>
                                            <option>William Smith</option>
                                        </select>
                                    </div>
                                </div>
                                <div className='col-12 col-md-6 col-lg-4'>
                                    <div className='forn-group'>
                                        <label className='form-label'>Date</label>
                                        <input type='date' className='form-input' placeholder='' />
                                    </div>
                                </div>
                                <div className='col-12 col-md-6 col-lg-4'>
                                    <div className='forn-group'>
                                        <label className='form-label'>Start Time</label>
                                        <input type='time' className='form-input' placeholder='' />
                                    </div>
                                </div>
                                <div className='col-12 col-md-6 col-lg-4'>
                                    <div className='forn-group'>
                                        <label className='form-label'>End Time</label>
                                        <input type='time' className='form-input' placeholder='' />
                                    </div>
                                </div>
                                <div className='col-12 col-md-6 col-lg-4'>
                                    <div className='forn-group'>
                                        <label className='form-label'>Status</label>
                                        <select className='form-input'>
                                            <option>---Select Status---</option>
                                            <option>Leave</option>
                                            <option>Absent</option>
                                            <option>Present</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="col-12 col-md-6 col-lg-12">
                                    <div className="forn-group">
                                        <label className="form-label">
                                            Remarks
                                        </label>
                                        <textarea
                                            cols={30}
                                            rows={3}
                                            className="form-input"
                                            value=""
                                        ></textarea>
                                    </div>
                                </div>

                                <div className='col-12 col-md-12 col-lg-12'>
                                    <div className='submit-btn-block'>
                                        <button className='theme-btn btn-border' type='button'>Cancel</button>
                                        <button className='theme-btn btn-blue' type='button'>Save Attendance</button>
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

export default AdminAddAttendance;