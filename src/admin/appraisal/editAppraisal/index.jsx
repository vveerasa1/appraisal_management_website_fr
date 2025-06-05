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
                <h3 className='page-name'>Quarterly Appraisal</h3>
                <ul className='breadcrumb-lists'>
                    <li><Link to="/admin/dashboad" className="page-link">Home</Link></li>
                    <li><Link to="/admin/appraisals" className="page-link">Appraisal</Link></li>
                    <li><p>Quarterly Appraisal</p></li>
                </ul>
            </div>
            <form className='form-list-container'>
                <div className='row'>
                    <div className='col-12 col-md-6 col-lg-7'>
                        <div className='forn-group'>
                            <label className='form-label'>Appraisal Title</label>
                            <input type='text' className='form-input' placeholder='' />
                        </div>
                    </div>
                    <div className='col-12 col-md-6 col-lg-5'>
                        <div className='forn-group'>
                            <label className='form-label'>Appraisal Type</label>
                            <select className='form-input'>
                                <option></option>
                                <option></option>
                                <option></option>
                            </select>
                        </div>
                    </div>
                    <div className='col-12 col-md-6 col-lg-4'>
                        <div className='forn-group'>
                            <label className='form-label'>Appraisal Start Date</label>
                            <input type='date' className='form-input' placeholder='' />
                        </div>
                    </div>
                    <div className='col-12 col-md-6 col-lg-4'>
                        <div className='forn-group'>
                            <label className='form-label'>Appraisal End Date</label>
                            <input type='date' className='form-input' placeholder='' />
                        </div>
                    </div>
                    <div className='col-12 col-md-6 col-lg-4'>
                        <div className='forn-group'>
                            <label className='form-label'>Assign to Department</label>
                            <select className='form-input'>
                                <option>---Assign Department---</option>
                                <option></option>
                                <option></option>
                                <option></option>
                            </select>
                        </div>
                    </div>
                    <div className='col-12 col-md-6 col-lg-4'>
                        <div className='forn-group'>
                            <label className='form-label'>Assign to Roles</label>
                            <select className='form-input'>
                                <option>---Assign Roles---</option>
                                <option></option>
                                <option></option>
                                <option></option>
                            </select>
                        </div>
                    </div>
                    <div className='col-12 col-md-6 col-lg-4'>
                        <div className='forn-group'>
                            <label className='form-label'>Points to Award</label>
                            <input type='text' className='form-input' placeholder='' />
                        </div>
                    </div>
                    <div className='col-12 col-md-6 col-lg-4'>
                        <div className='forn-group'>
                            <label className='form-label'>Bonus Amount</label>
                            <input type='date' className='form-input' placeholder='' />
                        </div>
                    </div>
                    <div className='col-12 col-md-6 col-lg-12'>
                        <div className='forn-group'>
                            <label className='form-label'>Appraisal Notes/Description</label>
                            <textarea cols={30} rows={3} className='form-input' placeholder=''></textarea>
                        </div>
                    </div>
                    <div className='col-12 col-md-12 col-lg-12'>
                        <div className='submit-btn-block'>
                            <button className='theme-btn btn-border' type='button'>Cancel</button>
                            <button className='theme-btn btn-blue' type='button'>Save Appraisal</button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};

export default EditEmployee;