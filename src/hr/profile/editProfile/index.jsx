import React, { useState } from "react";
import "./style.css"
import { Link } from 'react-router-dom'

const EditProfile = () => {
    const [fileName, setFileName] = useState("");

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name);
        }
    };
    return (
        <>
            <div className='breadcrumb-wrapper'>
                <h3 className='page-name'>Profile</h3>
                <ul className='breadcrumb-lists'>
                    <li><Link to="/employee/dashboard" className="page-link">Home</Link></li>
                    <li><p>Profile</p></li>
                </ul>
            </div>
            <form className='form-list-container'>
                <div className='row'>
                    <div className='col-12 col-md-6 col-lg-4'>
                        <div className='forn-group'>
                            <label className='form-label'>First Name</label>
                            <input type='text' className='form-input' placeholder='' value="John" disabled/>
                        </div>
                    </div>
                    <div className='col-12 col-md-6 col-lg-4'>
                        <div className='forn-group'>
                            <label className='form-label'>Last Name</label>
                            <input type='text' className='form-input' placeholder='' value="Doe" disabled/>
                        </div>
                    </div>
                    <div className='col-12 col-md-6 col-lg-4'>
                        <div className='forn-group'>
                            <label className='form-label'>Email Address</label>
                            <input type='email' className='form-input' placeholder='' value="john@gmail.com" disabled/>
                        </div>
                    </div>
                    <div className='col-12 col-md-6 col-lg-4'>
                        <div className='forn-group'>
                            <label className='form-label'>Phone Number</label>
                            <input type='text' className='form-input' placeholder='' value="+(123)456-7890" />
                        </div>
                    </div>
                    <div className='col-12 col-md-6 col-lg-4'>
                        <div className='forn-group'>
                            <label className='form-label'>Employee ID</label>
                            <input type='text' className='form-input' placeholder='' value="ABC0001" disabled />
                        </div>
                    </div>
                    <div className='col-12 col-md-6 col-lg-4'>
                        <div className='forn-group'>
                            <label className='form-label'>Department</label>
                            <input type='text' className='form-input' placeholder='' value="IT" disabled />
                        </div>
                    </div>
                    <div className='col-12 col-md-6 col-lg-4'>
                        <div className='forn-group'>
                            <label className='form-label'>Reporting To</label>
                            <input type='text' className='form-input' placeholder='' value="William Smith" disabled />
                        </div>
                    </div>
                    <div className='col-12 col-md-6 col-lg-4'>
                        <div className='forn-group'>
                            <label className='form-label'>Designation</label>
                            <input type='text' className='form-input' placeholder='' value="Web Developer" disabled />
                        </div>
                    </div>
                    <div className='col-12 col-md-6 col-lg-4'>
                        <div className='forn-group'>
                            <label className='form-label'>Date of Joining</label>
                            <input type='date' className='form-input' placeholder='' value="10/02/2024" disabled />
                        </div>
                    </div>
                    <div className='col-12 col-md-6 col-lg-6'>
                        <div className='forn-group'>
                            <label className='form-label'>Address</label>
                            <input type='text' className='form-input' placeholder='' value="1234, New Winston Road" />
                        </div>
                    </div>
                    <div className='col-12 col-md-6 col-lg-3'>
                        <div className='forn-group'>
                            <label className='form-label'>City</label>
                            <input type='text' className='form-input' placeholder='' value="New York" />
                        </div>
                    </div>
                    <div className='col-12 col-md-6 col-lg-3'>
                        <div className='forn-group'>
                            <label className='form-label'>Province</label>
                            <input type='text' className='form-input' placeholder='' value="New York" />
                        </div>
                    </div>
                    <div className='col-12 col-md-6 col-lg-4'>
                        <div className='forn-group'>
                            <label className='form-label'>Postal Code</label>
                            <input type='text' className='form-input' placeholder='' value="12345" />
                        </div>
                    </div>
                    <div className='col-12 col-md-6 col-lg-4'>
                        <div className='forn-group'>
                            <label className='form-label'>Country</label>
                            <input type='text' className='form-input' placeholder='' value="USA" />
                        </div>
                    </div>
                    <div className='col-12 col-md-6 col-lg-4'>
                        <div className='forn-group'>
                            <label className='form-label'>Upload Logo</label>
                            <div className="upload-container">
                                {!fileName ? (
                                    <label htmlFor="upload" className="upload-button">
                                        <span>Upload</span>
                                        <i className='fa fa-upload'></i>
                                    </label>
                                ) : (
                                    <div className="file-name">{fileName}</div>
                                )}
                                <input
                                    type="file"
                                    id="upload"
                                    className="upload-input"
                                    onChange={handleFileChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='col-12 col-md-12 col-lg-12'>
                        <div className='submit-btn-block'>
                            <button className='theme-btn btn-border' type='button'>Cancel</button>
                            <button className='theme-btn btn-blue' type='button'>Save Profile</button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};

export default EditProfile;