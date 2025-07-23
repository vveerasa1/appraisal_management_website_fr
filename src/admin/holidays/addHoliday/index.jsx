import { useState } from 'react'
import "./style.css"
import { Link } from 'react-router-dom'

const AddHoliday = () => {
    return (
        <>
            <div className='pageTanDiv'>
                <ul className='pageTabPane'>
                    <li className='active'>
                        <Link to="/admin/holidays">Holidays</Link>
                    </li>
                </ul>
            </div>
            <form className='form-list-container'>
                <div className='row'>
                    <div className="col-12 col-md-12 col-lg-12">
                        <div className='form-list-wrapper'>
                            <div className='row'>
                                <div className='col-12 col-md-6 col-lg-6'>
                                    <div className='forn-group'>
                                        <label className='form-label'>Holiday Name</label>
                                        <input type='text' className='form-input' value="" placeholder='' />
                                    </div>
                                </div>
                                <div className='col-12 col-md-6 col-lg-6'>
                                    <div className='forn-group'>
                                        <label className='form-label'>Date</label>
                                        <input type='date' className='form-input' value="" placeholder='' />
                                    </div>
                                </div>
                                <div className='col-12 col-md-6 col-lg-12'>
                                    <div className='forn-group'>
                                        <label className='form-label'>Description</label>
                                        <textarea cols={30} rows={3} className='form-input' value="" placeholder=''></textarea>
                                    </div>
                                </div>

                                <div className='col-12 col-md-12 col-lg-12'>
                                    <div className='submit-btn-block'>
                                        <button className='theme-btn btn-border' type='button'>Cancel</button>
                                        <button className='theme-btn btn-blue' type='button'>Save Role</button>
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

export default AddHoliday;