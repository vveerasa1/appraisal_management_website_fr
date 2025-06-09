import React, { useState } from "react";
import "./style.css"
import { Link } from 'react-router-dom'

const HRDashboard = () => {
    return (
        <>
            <div className='breadcrumb-wrapper'>
                <h3 className='page-name'>Dashboard</h3>
                <ul className='breadcrumb-lists'>
                    <li><Link to="/hr/dashboard" className="page-link">Home</Link></li>
                    <li><p>Dashboard</p></li>
                </ul>
            </div>
            <div className='dashboard-wrapper'>
            <div className='dashboard-cards-wrapper'>
                <div className='row'>
                    <div className='col-12 col-md-6 col-lg-4 mb-4'>
                        <div className='dashboard-count-card'>
                            <div className='dashcard-left'>
                                <div className='dicon'>
                                    <i className='fa fa-user'></i>
                                </div>
                                <div className='dinfo'>
                                    <h3>350</h3>
                                    <p>Total Team Members</p>
                                </div>
                            </div>
                            <div className='dashcard-right'>
                                <div>
                                    <p>This Month</p>
                                    <p className='up'>+20% <i className='fa fa-line-chart'></i></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-12 col-md-6 col-lg-4 mb-4'>
                        <div className='dashboard-count-card'>
                            <div className='dashcard-left'>
                                <div className='dicon'>
                                    <i className='fa fa-pie-chart'></i>
                                </div>
                                <div className='dinfo'>
                                    <h3>15,000</h3>
                                    <p>Total My Points</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-12">
                        <h2 className='large-heading'>Latest</h2>
                        <div className="notifications-card">
                            <h3 className="nheading">Notifications</h3>
                            <ul className="nlist">
                                <li><b>2</b>&nbsp;new joiners added</li>
                                <li><b>+2</b>&nbsp;points added to John</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default HRDashboard;