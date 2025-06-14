import { useState } from 'react'
import "./style.css"
import { Link } from 'react-router-dom'

const Reports = () => {
    return (
        <>
            <div className='pageTanDiv'>
                <ul className='pageTabPane'>
                    <li className='active'>
                        <Link to="/admin/reports">Reports</Link>
                    </li>
                </ul>
            </div>
            <div className='reports-lists-container'>
                <div className='row'>
                    <div className='col-12 col-md-12 mb-4'>
                         <div className='table-top-block'>
                            <button type='button' className='theme-btn btn-blue'><i className='fa fa-file'></i>Generate Report</button>
                         </div>
                    </div>
                    <div className='col-12 col-md-6 col-lg-6 mb-4'>
                        <div className='report-wrapper'>
                            <div className='report-head'>
                                <h3>Total Points Over Time</h3>
                                <button className='report-drop-btn' type='button'>
                                    <i className='fa fa-ellipsis-v'></i>
                                </button>
                            </div>
                            <div className='report-body'>

                            </div>
                        </div>
                    </div>
                    <div className='col-12 col-md-6 col-lg-6 mb-4'>
                        <div className='report-wrapper'>
                            <div className='report-head'>
                                <h3>Department Breakdown</h3>
                                <button className='report-drop-btn' type='button'>
                                    <i className='fa fa-ellipsis-v'></i>
                                </button>
                            </div>
                            <div className='report-body'>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Reports;