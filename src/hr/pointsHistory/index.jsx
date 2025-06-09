import React, { useState } from "react";
import "./style.css"
import { Link } from 'react-router-dom'

const Points = () => {
    return (
        <>
            <div className='breadcrumb-wrapper'>
                <h3 className='page-name'>Points History</h3>
                <ul className='breadcrumb-lists'>
                    <li><Link to="/hr/dashboard" className="page-link">Home</Link></li>
                    <li><p>Points History</p></li>
                </ul>
            </div>
            <div className='page-wrapper'>
                
            </div>
        </>
    );
};

export default Points;