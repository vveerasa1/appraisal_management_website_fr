import { useState } from 'react'
import "./style.css"
import { Link } from 'react-router-dom'

const EditEmployee = () => {

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
                <h3 className='page-name'>John Doe</h3>
                <ul className='breadcrumb-lists'>
                    <li><Link to="/admin/dashboad" className="page-link">Home</Link></li>
                    <li><Link to="/admin/employees" className="page-link">Employees</Link></li>
                    <li><p>John Doe</p></li>
                </ul>
            </div>
            <form className='form-list-container'>
                <div className='row'>
                    <div className='col-12 col-md-6 col-lg-4'>
                        <div className='forn-group'>
                            <label className='form-label'>First Name</label>
                            <input type='text' className='form-input' placeholder='' />
                        </div>
                    </div>
                    <div className='col-12 col-md-6 col-lg-4'>
                        <div className='forn-group'>
                            <label className='form-label'>Last Name</label>
                            <input type='text' className='form-input' placeholder='' />
                        </div>
                    </div>
                    <div className='col-12 col-md-6 col-lg-4'>
                        <div className='forn-group'>
                            <label className='form-label'>Email Address</label>
                            <input type='email' className='form-input' placeholder='' />
                        </div>
                    </div>
                    <div className='col-12 col-md-6 col-lg-4'>
                        <div className='forn-group'>
                            <label className='form-label'>Phone Number</label>
                            <input type='text' className='form-input' placeholder='' />
                        </div>
                    </div>
                    <div className='col-12 col-md-6 col-lg-4'>
                        <div className='forn-group'>
                            <label className='form-label'>Employee ID</label>
                            <input type='text' className='form-input' placeholder='' />
                        </div>
                    </div>
                    <div className='col-12 col-md-6 col-lg-4'>
                        <div className='forn-group'>
                            <label className='form-label'>Department</label>
                            <select className='form-input'>
                                <option>---Select Department---</option>
                                <option></option>
                                <option></option>
                                <option></option>
                            </select>
                        </div>
                    </div>
                    <div className='col-12 col-md-6 col-lg-4'>
                        <div className='forn-group'>
                            <label className='form-label'>Manager</label>
                            <select className='form-input'>
                                <option>---Assign Manager---</option>
                                <option></option>
                                <option></option>
                                <option></option>
                            </select>
                        </div>
                    </div>
                    <div className='col-12 col-md-6 col-lg-4'>
                        <div className='forn-group'>
                            <label className='form-label'>Designation</label>
                            <input type='text' className='form-input' placeholder='' />
                        </div>
                    </div>
                    <div className='col-12 col-md-6 col-lg-4'>
                        <div className='forn-group'>
                            <label className='form-label'>Date of Joining</label>
                            <input type='date' className='form-input' placeholder='' />
                        </div>
                    </div>
                    <div className='col-12 col-md-6 col-lg-4'>
                        <div className='forn-group'>
                            <label className='form-label'>Temporary Password</label>
                            <input type='text' className='form-input' placeholder='' />
                        </div>
                    </div>
                    <div className='col-12 col-md-6 col-lg-4'>
                        <div className='forn-group'>
                            <label className='form-label'>Profile Photo</label>
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
                    <div className='col-12 col-md-6 col-lg-12'>
                        <div className='forn-group'>
                            <label className='form-label'>Employee Description</label>
                            <textarea cols={30} rows={3} className='form-input' placeholder=''></textarea>
                        </div>
                    </div>
                    <div className='col-12 col-md-12 col-lg-12'>
                        <div className='submit-btn-block'>
                            <button className='theme-btn btn-border' type='button'>Cancel</button>
                            <button className='theme-btn btn-blue' type='button'>UPdate Employee</button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};

export default EditEmployee;