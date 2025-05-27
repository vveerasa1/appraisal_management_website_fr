import { useState } from 'react'
import "./style.css"
import { Link } from 'react-router-dom'

const Dashboard = () => {
    return (
        <>
        <div className='breadcrumb-wrapper'>
            <h3 className='page-name'>Dashboard</h3>
            <ul className='breadcrumb-lists'>
                <li><Link to="/" className="page-link">Home</Link></li>
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
                                    <p>Total Users</p>
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
                                    <i className='fa fa-user'></i>
                                </div>
                                <div className='dinfo'>
                                    <h3>350</h3>
                                    <p>Total Managers</p>
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
                                    <p>Total Points</p>
                                </div>
                            </div>
                            <div className='dashcard-right'>
                                <div>
                                    <p>This Month<br />(Bonuses)</p>
                                    <p className='up'>+20% <i className='fa fa-line-chart'></i></p>
                                </div>
                                <div>
                                    <p>This Month<br />(Deductions)</p>
                                    <p className='down'>-5% <i className='fa fa-line-chart'></i></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-12 col-md-6 col-lg-4 mb-4'>
                        <div className='dashboard-count-card'>
                            <div className='dashcard-left'>
                                <div className='dicon'>
                                    <i className='fa fa-sticky-note'></i>
                                </div>
                                <div className='dinfo'>
                                    <h3>12</h3>
                                    <p>Pending Appraisals</p>
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
                </div>
            </div>
        </div>
        </>
    );
};

export default Dashboard;