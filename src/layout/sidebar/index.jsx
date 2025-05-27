import { useState } from 'react'
import "./style.css"
import { Link } from 'react-router-dom'

const Sidebar = ({ isOpen }) => {

    const [activeMenu, setActiveMenu] = useState("Dashboard");

    const handleMenuClick = (menu) => {
        setActiveMenu(menu);
    };

    return (
        <div className={`sidebar ${isOpen ? "d-none" : "d-block"}`}>
            <ul className="nav flex-column">
                <li className="nav-item">
                    <Link
                        to="/admin/dashboard"
                        className={`nav-link ${activeMenu === "Dashboard" ? "active" : ""}`}
                        onClick={() => handleMenuClick("Dashboard")}
                    >
                        <i className="fa fa-home"></i>
                        Dashboard
                    </Link>
                </li>
                <li className="nav-item">
                    <Link
                        to="/admin/users"
                        className={`nav-link ${activeMenu === "Users" ? "active" : ""}`}
                        onClick={() => handleMenuClick("Users")}
                    >
                        <i className="fa fa-user"></i>
                        Users
                    </Link>
                </li>
                <li className="nav-item">
                    <Link
                        to="/admin/appraisal"
                        className={`nav-link ${activeMenu === "Appraisal" ? "active" : ""}`}
                        onClick={() => handleMenuClick("Appraisal")}
                    >
                        <i className="fa fa-sticky-note"></i>
                        Appraisal
                    </Link>
                </li>
                <li className="nav-item">
                    <Link
                        to="/admin/points"
                        className={`nav-link ${activeMenu === "Points" ? "active" : ""}`}
                        onClick={() => handleMenuClick("Points")}
                    >
                        <i className="fa fa-pie-chart"></i>
                        Points
                    </Link>
                </li>
                <li className="nav-item">
                    <Link
                        to="/admin/settings"
                        className={`nav-link ${activeMenu === "Settings" ? "active" : ""}`}
                        onClick={() => handleMenuClick("Settings")}
                    >
                        <i className="fa fa-cog"></i>
                        Settings
                    </Link>
                </li>
            </ul>
            {/* actions */}
            <div className='sibebar-actions'>
                <h3 className='mb-2'>Quick Actions</h3>
                <Link to="#" className='sbtn-link'>
                    <i className='fa fa-add'></i>
                    Add User
                </Link>   
                <Link to="#" className='sbtn-link'>
                    <i className='fa fa-add'></i>
                    Create Appraisal
                </Link>
                <Link to="#" className='sbtn-link'>
                    <i className='fa fa-add'></i>
                    View Reports
                </Link>
                <Link to="#" className='sbtn-link'>
                    <i className='fa fa-add'></i>
                    Manage Roles
                </Link>
            </div>
        </div>
    );
};

export default Sidebar;