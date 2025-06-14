import { useState } from 'react'
import "./style.css"
import { Link } from 'react-router-dom'
import PartyPaper from '../../assets/images/party-popper.png'
import ProfileImg from '../../assets/images/user.png'

const Dashboard = () => {
    return (
        <>
        <div className='pageTanDiv'>
            <ul className='pageTabPane'>
                <li>
                    <Link to="/admin/overview">Overview</Link>
                </li>
                <li className='active'>
                    <Link to="/admin/dashboard">Dashboard</Link>
                </li>
            </ul>
        </div>
        <div className='dashboard-wrapper'>
            <div className='dashboard-cards-wrapper'>
                {/* <div className='row'>
                    <div className='col-12 col-md-6 col-lg-6'>
                        <div className='dashcounts-wrapper'>
                            <div className='dashcounts-item'>
                                <p>Employees</p>
                                <h2>10</h2>
                            </div>
                            <div className='dashcounts-item'>
                                <p>Roles</p>
                                <h2>3</h2>
                            </div>
                            <div className='dashcounts-item'>
                                <p>New Hires</p>
                                <h2>2</h2>
                            </div>
                        </div>
                    </div>
                </div> */}
                <div className='row mt-2'>
                    <div className='col-12 col-md-6 col-lg-4 mb-4'>
                        <div className='dashbord-cards-wrapper'>
                            <div className='dc-head'>
                                <h3 className='dash-title'>New Hires</h3>
                            </div>
                            <div className='dc-body'>
                                <ul className='dc-list'>
                                    <li>
                                        <div className='dc-list-inner'>
                                            <img className='img-fluid dc-list-img' src={ProfileImg} alt='Profile' />
                                            <div className='dc-list-info'>
                                                <h3>Welcome On-Board John Doe!</h3>
                                                <p>16 May 2020, 6:57 PM</p>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className='col-12 col-md-6 col-lg-4 mb-4'>
                        <div className='dashbord-cards-wrapper'>
                            <div className='dc-head'>
                                <h3 className='dash-title'>Work Anniversary</h3>
                            </div>
                            <div className='dc-body'>
                                <ul className='dc-list'>
                                    <li>
                                        <div className='dc-list-inner'>
                                            <img className='img-fluid dc-list-img' src={ProfileImg} alt='Profile' />
                                            <div className='dc-list-info'>
                                                <h3>Mary Joe</h3>
                                                <p>Completing <b>10</b> Years<img className='img-fluid small-img' src={PartyPaper} alt='Profile' /></p>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className='col-12 col-md-6 col-lg-4 mb-4'>
                        <div className='dashbord-cards-wrapper'>
                            <div className='dc-head'>
                                <h3 className='dash-title'>Birthdays</h3>
                            </div>
                            <div className='dc-body'>
                                <div className='no-results-wrapper'>
                                    <p>No results found.</p>
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

export default Dashboard;