import { useState } from 'react'
import "./style.css"
import { Link } from 'react-router-dom'
import ProfileImg from '../../assets/images/user.png'

const AddPoints = () => {
    return (
        <>
            <div className='pageTanDiv'>
                <ul className='pageTabPane'>
                    <div className='lvDiv'>
                        <Link to="/hr/team-members"><i className='fa fa-angle-left'></i></Link>
                        <img className="img-fluid" src={ProfileImg} alt='Profile' />
                        <p>ABC1234 - John Doe</p>
                    </div>
                    <li className='active'>
                        <Link to="/hr/adjust-points">Adjust Points</Link>
                    </li>
                    <li>
                        <Link to="/hr/points">Points History</Link>
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
                                        <label className='form-label'>User</label>
                                        <select className='form-input'>
                                            <option>---Select User---</option>
                                            <option>John Doe</option>
                                            <option>Mary Joe</option>
                                            <option>William Smith</option>
                                        </select>
                                    </div>
                                </div>
                                <div className='col-12 col-md-6 col-lg-4'>
                                    <div className='forn-group'>
                                        <label className='form-label'>Current Points Balance (Read-Only)</label>
                                        <input type='email' className='form-input' placeholder='' value={0} disabled />
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
                                        <button className='theme-btn btn-blue' type='button'>Save Points</button>
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

export default AddPoints;