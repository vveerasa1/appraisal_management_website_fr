import { useState } from 'react'
import "./style.css"
import { Link } from 'react-router-dom'
import ProfileImg from '../../../assets/images/user.png'

const ViewEmployee = () => {
    return (
        <>
            <div className='pageTanDiv'>
                <div className='viewPageTopDiv'>
                    <div className='lvDiv'>
                        <Link to="/hr/employees"><i className='fa fa-angle-left'></i></Link>
                        <img className="img-fluid" src={ProfileImg} alt='Profile' />
                        <p>ABC1234 - John Doe</p>
                    </div>
                    <div className='rvDiv'>
                        <Link to="/hr/employee/edit" className='rvDiv-btns' type='button'><i className='fa fa-pencil'></i></Link>
                        <button className='rvDiv-btns delete' type='button'><i className='fa fa-trash'></i></button>
                    </div>
                </div>
            </div>
            <div className='view-container'>
                <div className='row'>
                    <div className='col-12 col-md-12 col-lg-12'>
                        <div className='view-other-info'>
                            <h3 className='small-heading'>Employee Details</h3>
                            <div className='row'>
                                <div className='col-12 col-md-6 col-lg-4'>
                                    <div className='editform-group'>
                                        <label className='editform-label'>First Name</label>
                                        <input type='text' className='editform-input' value="John" placeholder='' />
                                        {/* before edit click */}
                                        <div className="ef-actionbtns">
                                            <button className="editform-btn" type='button'><i className='fa fa-pencil'></i></button>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-12 col-md-6 col-lg-4'>
                                    <div className='editform-group'>
                                        <label className='editform-label'>Last Name</label>
                                        <input type='text' className='editform-input' value="Doe" placeholder='' />
                                        {/* before edit click */}
                                        <div className="ef-actionbtns">
                                            <button className="editform-btn" type='button'><i className='fa fa-pencil'></i></button>
                                        </div>
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
                                        {/* before edit click */}
                                        <div className="ef-actionbtns">
                                            <button className="editform-btn" type='button'><i className='fa fa-pencil'></i></button>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-12 col-md-6 col-lg-4'>
                                    <div className='editform-group'>
                                        <label className='editform-label'>Employee ID</label>
                                        <input type='text' className='editform-input' value="ABC1234" placeholder='' />
                                        {/* before edit click */}
                                        <div className="ef-actionbtns">
                                            <button className="editform-btn" type='button'><i className='fa fa-pencil'></i></button>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-12 col-md-6 col-lg-4'>
                                    <div className='editform-group'>
                                        <label className='editform-label'>Department</label>
                                        <input type='text' className='editform-input' value="Software Development" placeholder='' />
                                        {/* before edit click */}
                                        <div className="ef-actionbtns">
                                            <button className="editform-btn" type='button'><i className='fa fa-pencil'></i></button>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-12 col-md-6 col-lg-4'>
                                    <div className='editform-group'>
                                        <label className='editform-label'>Reporting to</label>
                                        <input type='text' className='editform-input' value="ABC1234 - William Smith" placeholder='' />
                                        {/* before edit click */}
                                        <div className="ef-actionbtns">
                                            <button className="editform-btn" type='button'><i className='fa fa-pencil'></i></button>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-12 col-md-6 col-lg-4'>
                                    <div className='editform-group'>
                                        <label className='editform-label'>Designation</label>
                                        <input type='text' className='editform-input' value="Web Developer" placeholder='' />
                                        {/* before edit click */}
                                        <div className="ef-actionbtns">
                                            <button className="editform-btn" type='button'><i className='fa fa-pencil'></i></button>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-12 col-md-6 col-lg-4'>
                                    <div className='editform-group'>
                                        <label className='editform-label'>Date of Joining</label>
                                        <input type='text' className='editform-input' value="20/07/2024" placeholder='' />
                                        {/* before edit click */}
                                        <div className="ef-actionbtns">
                                            <button className="editform-btn" type='button'><i className='fa fa-pencil'></i></button>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-12 col-md-12 col-lg-12'>
                                    <h3 className='small-heading'>Address Details</h3>
                                </div>
                                <div className='col-12 col-md-6 col-lg-6'>
                                    <div className='editform-group'>
                                        <label className='editform-label'>Address</label>
                                        <input type='text' className='editform-input' value="1234, New Winston Road" placeholder='' />
                                        {/* before edit click */}
                                        <div className="ef-actionbtns">
                                            <button className="editform-btn" type='button'><i className='fa fa-pencil'></i></button>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-12 col-md-6 col-lg-3'>
                                    <div className='editform-group'>
                                        <label className='editform-label'>City</label>
                                        <input type='text' className='editform-input' value="New York" placeholder='' />
                                        {/* before edit click */}
                                        <div className="ef-actionbtns">
                                            <button className="editform-btn" type='button'><i className='fa fa-pencil'></i></button>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-12 col-md-6 col-lg-3'>
                                    <div className='editform-group'>
                                        <label className='editform-label'>Province</label>
                                        <input type='text' className='editform-input' value="NY" placeholder='' />
                                        {/* before edit click */}
                                        <div className="ef-actionbtns">
                                            <button className="editform-btn" type='button'><i className='fa fa-pencil'></i></button>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-12 col-md-6 col-lg-4'>
                                    <div className='editform-group'>
                                        <label className='editform-label'>Postal Code</label>
                                        <input type='text' className='editform-input' value="12345" placeholder='' />
                                        {/* before edit click */}
                                        <div className="ef-actionbtns">
                                            <button className="editform-btn" type='button'><i className='fa fa-pencil'></i></button>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-12 col-md-6 col-lg-4'>
                                    <div className='editform-group'>
                                        <label className='editform-label'>Country</label>
                                        <input type='text' className='editform-input' value="USA" placeholder='' />
                                        {/* before edit click */}
                                        <div className="ef-actionbtns">
                                            <button className="editform-btn" type='button'><i className='fa fa-pencil'></i></button>
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

export default ViewEmployee;