import { useState } from 'react'
import "./style.css"
import { Link } from 'react-router-dom'
import Person from "../../assets/images/person.png"
import Coin from "../../assets/images/coin.png"

const Dashboard = () => {
    return (
        <>
        <div className='breadcrumb-wrapper'>
            <h3 className='page-name'>Dashboard</h3>
            <ul className='breadcrumb-lists'>
                <li><Link to="/employee/dashboard" className="page-link">Home</Link></li>
                <li><p>Dashboard</p></li>
            </ul>
        </div>
        <div className='page-wrapper'>
            <div className='dashboard-cards-wrapper'>
                <div className='row'>
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
                                    <button className='refresh-btn' type='button'><i className='fa fa-refresh'></i></button>
                                    <p>Last updated today<br />10:30AM</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='employee-recents'>
                <h2 className='large-heading'>Latest</h2>
                <div className='recents-list-wrapper'>
                    <div className='row'>
                        <div className='col-12 col-md-12 col-lg-6 mb-3'>
                            <div className='recents-item'>
                                <div className='ri-left'>
                                    <div className='ri-employee-avatar'>
                                        <img className='img-fluid' src={Person} alt='Avatar' />
                                    </div>
                                    <div className='ri-info'>
                                        <h3>Project Completion <span className='ri-status'>New!</span></h3>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing eli Morbi dignissim eros in odio eleifend</p>
                                        <span>Today, 04:32 AM </span>
                                    </div>
                                </div>
                                <div className='ri-right'>
                                    <div className='ri-points'>
                                        <img className='img-fluid' src={Coin} alt='Coin' />
                                        <p className='add'>+20</p>
                                    </div>
                                    <div className='ri-points'>
                                        <img className='img-fluid' src={Coin} alt='Coin' />
                                        <p className='text'>Bal: 1220</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-12 col-md-12 col-lg-6 mb-3'>
                            <div className='recents-item'>
                                <div className='ri-left'>
                                    <div className='ri-employee-avatar'>
                                        <img className='img-fluid' src={Person} alt='Avatar' />
                                    </div>
                                    <div className='ri-info'>
                                        <h3>Project Completion <span className='ri-status'>New!</span></h3>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing eli Morbi dignissim eros in odio eleifend</p>
                                        <span>Today, 04:32 AM </span>
                                    </div>
                                </div>
                                <div className='ri-right'>
                                    <div className='ri-points'>
                                        <img className='img-fluid' src={Coin} alt='Coin' />
                                        <p className='add'>+20</p>
                                    </div>
                                    <div className='ri-points'>
                                        <img className='img-fluid' src={Coin} alt='Coin' />
                                        <p className='text'>Bal: 1220</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-12 col-md-12 col-lg-6 mb-3'>
                            <div className='recents-item'>
                                <div className='ri-left'>
                                    <div className='ri-employee-avatar'>
                                        <img className='img-fluid' src={Person} alt='Avatar' />
                                    </div>
                                    <div className='ri-info'>
                                        <h3>Project Completion <span className='ri-status'>New!</span></h3>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing eli Morbi dignissim eros in odio eleifend</p>
                                        <span>Today, 04:32 AM </span>
                                    </div>
                                </div>
                                <div className='ri-right'>
                                    <div className='ri-points'>
                                        <img className='img-fluid' src={Coin} alt='Coin' />
                                        <p className='add'>+20</p>
                                    </div>
                                    <div className='ri-points'>
                                        <img className='img-fluid' src={Coin} alt='Coin' />
                                        <p className='text'>Bal: 1220</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-12 col-md-12 col-lg-6 mb-3'>
                            <div className='recents-item'>
                                <div className='ri-left'>
                                    <div className='ri-employee-avatar'>
                                        <img className='img-fluid' src={Person} alt='Avatar' />
                                    </div>
                                    <div className='ri-info'>
                                        <h3>Project Completion <span className='ri-status'>New!</span></h3>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing eli Morbi dignissim eros in odio eleifend</p>
                                        <span>Today, 04:32 AM </span>
                                    </div>
                                </div>
                                <div className='ri-right'>
                                    <div className='ri-points'>
                                        <img className='img-fluid' src={Coin} alt='Coin' />
                                        <p className='add'>+20</p>
                                    </div>
                                    <div className='ri-points'>
                                        <img className='img-fluid' src={Coin} alt='Coin' />
                                        <p className='text'>Bal: 1220</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-12 col-md-12 col-lg-6 mb-3'>
                            <div className='recents-item'>
                                <div className='ri-left'>
                                    <div className='ri-employee-avatar'>
                                        <img className='img-fluid' src={Person} alt='Avatar' />
                                    </div>
                                    <div className='ri-info'>
                                        <h3>Project Completion <span className='ri-status'>New!</span></h3>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing eli Morbi dignissim eros in odio eleifend</p>
                                        <span>Today, 04:32 AM </span>
                                    </div>
                                </div>
                                <div className='ri-right'>
                                    <div className='ri-points'>
                                        <img className='img-fluid' src={Coin} alt='Coin' />
                                        <p className='add'>+20</p>
                                    </div>
                                    <div className='ri-points'>
                                        <img className='img-fluid' src={Coin} alt='Coin' />
                                        <p className='text'>Bal: 1220</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-12 col-md-12 col-lg-6 mb-3'>
                            <div className='recents-item'>
                                <div className='ri-left'>
                                    <div className='ri-employee-avatar'>
                                        <img className='img-fluid' src={Person} alt='Avatar' />
                                    </div>
                                    <div className='ri-info'>
                                        <h3>Project Completion <span className='ri-status'>New!</span></h3>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing eli Morbi dignissim eros in odio eleifend</p>
                                        <span>Today, 04:32 AM </span>
                                    </div>
                                </div>
                                <div className='ri-right'>
                                    <div className='ri-points'>
                                        <img className='img-fluid' src={Coin} alt='Coin' />
                                        <p className='add'>+20</p>
                                    </div>
                                    <div className='ri-points'>
                                        <img className='img-fluid' src={Coin} alt='Coin' />
                                        <p className='text'>Bal: 1220</p>
                                    </div>
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