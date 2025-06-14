import { useState } from 'react'
import "./style.css"
import { Link } from 'react-router-dom'

const Settings = () => {

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
                        <Link to="/admin/settings">System Setting</Link>
                    </li>
                </ul>
            </div>
            <form className='form-list-container'>
                <div className='row'>
                    <div className='col-12 col-md-6 col-lg-8'>
                        <div className='forn-group'>
                            <label className='form-label'>Company Name</label>
                            <input type='text' className='form-input' placeholder='' />
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
                        <div className='forn-group'>
                            <label className='form-label'>Notification Preferences</label>
                            <div className='form-check-container'>
                                <div className='form-check-item'>
                                    <label>
                                        <input type='checkbox' className='' />
                                        <p>Email</p>
                                    </label>
                                </div>
                                <div className='form-check-item'>
                                    <label>
                                        <input type='checkbox' className='' />
                                        <p>SMS</p>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-12 col-md-6 col-lg-4'>
                        <div className='forn-group'>
                            <label className='form-label'>Appraisal Cycle</label>
                            <select className='form-input'>
                                <option>Quarterly</option>
                                <option></option>
                            </select>
                        </div>
                    </div>
                    <div className='col-12 col-md-12 col-lg-12'>
                        <div className='submit-btn-block'>
                            <button className='theme-btn btn-border' type='button'>Cancel</button>
                            <button className='theme-btn btn-blue' type='button'>Save Changes</button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};

export default Settings;