import React, { useState } from "react";
import "./style.css"
import { Link } from 'react-router-dom'
import PartyPaper from '../../assets/images/party-popper.png'
import ProfileImg from '../../assets/images/user.png'
import User from "../../assets/images/user-thumbnail.png";

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState("employee");

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };
    return (
        <>
            <div className='pageTanDiv'>
                <ul className='pageTabPane'>
                    <li className='active'>
                        <Link to="/dashboard">Dashboard</Link>
                    </li>
                </ul>
            </div>
            <div className='dashboard-wrapper'>
                <div className='dashboard-cards-wrapper'>
                    <div className='row mt-2'>
                        <div className='col-12 col-md-9 col-lg-9'>
                            <div className='row'>
                                <div className='col-12 col-md-6 col-lg-6 mb-4'>
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
                                <div className='col-12 col-md-6 col-lg-6 mb-4'>
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
                                <div className='col-12 col-md-6 col-lg-6 mb-4'>
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
                        <div className='col-12 col-md-3 col-lg-3'>
                            <div className="overview-rwrapper">
                                <div className="overview-rhead">
                                    <h3 className="dash-title">Your Account</h3>
                                </div>
                                <div className="ovdash-profile">
                                    <img className="img-fluid" src={User} alt="Profile" />
                                    <div className="ovdash-pInfo">
                                        <h3>
                                            <span>ABC1234 -</span> John Doe
                                        </h3>
                                        <p>HR</p>
                                    </div>
                                </div>
                                <div className="ovdash-rprofile">
                                    <img className="img-fluid" src={User} alt="Profile" />
                                    <div className="ovdash-pInfo">
                                        <p>Reporting To</p>
                                        <h3>
                                            <span>ABC1245 -</span> William Smith
                                        </h3>
                                    </div>
                                </div>
                            </div>
                            <div className="overview-tmembers">
                                <div className="overview-rhead">
                                    <h3 className="dash-title">Team Members</h3>
                                </div>
                                <ul className="dmemebers-list">
                                    <li>
                                        <div className="dmemebers-wrapper">
                                            <img className="img-fluid" src={User} alt="Profile" />
                                            <h3>
                                                <span>ABC234 -</span> Mary Joe
                                            </h3>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;