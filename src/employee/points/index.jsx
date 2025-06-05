import { useState } from 'react'
import "./style.css"
import { Link } from 'react-router-dom'

const Points = () => {
    return (
        <>
        <div className='breadcrumb-wrapper'>
            <h3 className='page-name'>Dashboard</h3>
            <ul className='breadcrumb-lists'>
                <li><Link to="/" className="page-link">Home</Link></li>
                <li><p>Dashboard</p></li>
            </ul>
        </div>
        </>
    );
};

export default Points;