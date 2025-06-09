import { useState } from 'react'
import "./style.css"
import { Link } from 'react-router-dom'

const AddPoints = () => {
    return (
        <>
            <div className='breadcrumb-wrapper'>
                <h3 className='page-name'>Add New Points</h3>
                <ul className='breadcrumb-lists'>
                    <li><Link to="/admin/dashboad" className="page-link">Home</Link></li>
                    <li><Link to="/admin/points" className="page-link">Points</Link></li>
                    <li><p>Add Point</p></li>
                </ul>
            </div>
            <form className='form-list-container'>
                <div className='row'>
                    <div className='col-12 col-md-6 col-lg-4'>
                        <div className='forn-group'>
                            <label className='form-label'>User</label>
                            <input type='email' className='form-input' placeholder='' value="John Doe" disabled/>
                        </div>
                    </div>
                    <div className='col-12 col-md-6 col-lg-4'>
                        <div className='forn-group'>
                            <label className='form-label'>Current Points Balance (Read-Only)</label>
                            <input type='email' className='form-input' placeholder='' value="0" disabled/>
                        </div>
                    </div>
                    <div className='col-12 col-md-12 col-lg-12'>
                        <h3 className='small-heading'>Adjust Points</h3>
                    </div>
                    <div className='col-12 col-md-6 col-lg-4'>
                        <div className='forn-group'>
                            <label className='form-label'>Points Count</label>
                            <input type='text' className='form-input' placeholder='' />
                        </div>
                    </div>
                    <div className='col-12 col-md-6 col-lg-12'>
                        <div className='forn-group'>
                            <label className='form-label'>Reason/Note for Adjustment</label>
                            <textarea cols={30} rows={4} className='form-input'></textarea>
                        </div>
                    </div>

                    <div className='col-12 col-md-12 col-lg-12'>
                        <div className='submit-btn-block'>
                            <button className='theme-btn btn-border' type='button'>Cancel</button>
                            <button className='theme-btn btn-blue' type='button'>Confirm Adjustment</button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};

export default AddPoints;