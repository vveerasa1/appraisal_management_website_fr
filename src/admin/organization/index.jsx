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
                <li className='active'>
                    <Link to="/admin/organization/overview">Overview</Link>
                </li>
                <li>
                    <Link to="/admin/employee">Employee</Link>
                </li>
                <li>
                    <Link to="/admin/organization/department">Department</Link>
                </li>
                <li>
                    <Link to="/admin/organization/designation">Designation</Link>
                </li>
                <li>
                    <Link to="/admin/organization/tree">Organization Tree</Link>
                </li>
            </ul>
        </div>
        </>
    );
};

export default Dashboard;