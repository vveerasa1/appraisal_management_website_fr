import React, { useState } from "react";
import "./style.css"
import { Link } from 'react-router-dom'
import ProfileImg from '../../assets/images/user.png'

const Profile = () => {
    const [fileName, setFileName] = useState("");

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name);
        }
    };
    return (
        <>
            <div className='pageTanDiv'>
                <ul className='pageTabPane'>
                    <li className='active'>
                        <Link to="/profile">Profile</Link>
                    </li>
                    <li>
                        <Link to="/profile/change-password">Change Password</Link>
                    </li>
                </ul>
            </div>
            <div className='view-container'>
                <div className='row'>
                    <div className='col-12 col-md-12 col-lg-12'>
                        <div className='view-other-info'>
                            <h3 className='small-heading'>Profile Details</h3>
                            <div className='row'>
                                <div className='col-12 col-md-6 col-lg-4'>
                                    <div className='editform-group'>
                                        <label className='editform-label'>First Name</label>
                                        <input type='text' className='editform-input' value="John" placeholder='' />
                                    </div>
                                </div>
                                <div className='col-12 col-md-6 col-lg-4'>
                                    <div className='editform-group'>
                                        <label className='editform-label'>Last Name</label>
                                        <input type='text' className='editform-input' value="Doe" placeholder='' />
                                    </div>
                                </div>
                                <div className='col-12 col-md-6 col-lg-4'>
                                    <div className='editform-group'>
                                        <label className='editform-label'>Email Address</label>
                                        <input type='text' className='editform-input' value="john@gmail.com" placeholder='' disabled/>
                                    </div>
                                </div>
                                <div className='col-12 col-md-6 col-lg-4'>
                                    <div className='editform-group'>
                                        <label className='editform-label'>Phone Number</label>
                                        <input type='text' className='editform-input' value="123456789" placeholder='' />
                                    </div>
                                </div>
                                <div className='col-12 col-md-6 col-lg-4'>
                                    <div className='editform-group'>
                                        <label className='editform-label'>Employee ID</label>
                                        <input type='text' className='editform-input' value="ABC1234" placeholder='' disabled/>
                                    </div>
                                </div>
                                <div className='col-12 col-md-6 col-lg-4'>
                                    <div className='editform-group'>
                                        <label className='editform-label'>Department</label>
                                        <input type='text' className='editform-input' value="Software Development" placeholder='' disabled/>
                                    </div>
                                </div>
                                <div className='col-12 col-md-6 col-lg-4'>
                                    <div className='editform-group'>
                                        <label className='editform-label'>Reporting to</label>
                                        <input type='text' className='editform-input' value="ABC1234 - William Smith" placeholder='' disabled/>
                                    </div>
                                </div>
                                <div className='col-12 col-md-6 col-lg-4'>
                                    <div className='editform-group'>
                                        <label className='editform-label'>Designation</label>
                                        <input type='text' className='editform-input' value="Web Developer" placeholder='' disabled/>
                                    </div>
                                </div>
                                <div className='col-12 col-md-6 col-lg-4'>
                                    <div className='editform-group'>
                                        <label className='editform-label'>Date of Joining</label>
                                        <input type='text' className='editform-input' value="20/07/2024" placeholder='' disabled/>
                                    </div>
                                </div>
                                <div className='col-12 col-md-12 col-lg-12'>
                                    <h3 className='small-heading'>Address Details</h3>
                                </div>
                                <div className='col-12 col-md-6 col-lg-6'>
                                    <div className='editform-group'>
                                        <label className='editform-label'>Address</label>
                                        <input type='text' className='editform-input' value="1234, New Winston Road" placeholder='' />
                                    </div>
                                </div>
                                <div className='col-12 col-md-6 col-lg-3'>
                                    <div className='editform-group'>
                                        <label className='editform-label'>City</label>
                                        <input type='text' className='editform-input' value="New York" placeholder='' />
                                    </div>
                                </div>
                                <div className='col-12 col-md-6 col-lg-3'>
                                    <div className='editform-group'>
                                        <label className='editform-label'>Province</label>
                                        <input type='text' className='editform-input' value="NY" placeholder='' />
                                    </div>
                                </div>
                                <div className='col-12 col-md-6 col-lg-4'>
                                    <div className='editform-group'>
                                        <label className='editform-label'>Postal Code</label>
                                        <input type='text' className='editform-input' value="12345" placeholder='' />
                                    </div>
                                </div>
                                <div className='col-12 col-md-6 col-lg-4'>
                                    <div className='editform-group'>
                                        <label className='editform-label'>Country</label>
                                        <input type='text' className='editform-input' value="USA" placeholder='' />
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
                                    <h3 className='small-heading'>Profile Photo</h3>
                                </div>
                                <div className='col-12 col-md-6 col-lg-3'>
                                    <div className='forn-group'>
                                        {/* <label className='form-label'>Upload Profile</label> */}
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

export default Profile;