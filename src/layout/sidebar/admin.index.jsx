import { useState } from 'react'
import "./style.css"
import { Link } from 'react-router-dom'

const Sidebar = ({ isOpen }) => {

    const [activeMenu, setActiveMenu] = useState("");

    const handleMenuClick = (menu) => {
        setActiveMenu(menu);
    };

    return (
        // admin sidebar
        <div className={`sidebar ${isOpen ? "d-none" : "d-block"}`}>
            <ul className="nav flex-column">
                <li className="nav-item">
                    <Link
                        to="/admin/dashboard"
                        className={`nav-link ${activeMenu === "Home" ? "active" : ""}`}
                        onClick={() => handleMenuClick("Home")}
                    >
                        <i className="fa fa-home"></i>
                        Home
                    </Link>
                </li>
                <li className="nav-item">
                    <Link
                        to="/admin/employees"
                        className={`nav-link ${activeMenu === "Employees" ? "active" : ""}`}
                        onClick={() => handleMenuClick("Employees")}
                    >
                        <i className="fa fa-user"></i>
                        Employees
                    </Link>
                </li>
                <li className="nav-item">
                    <Link
                        to="/admin/attendance"
                        className={`nav-link ${activeMenu === "Attendance" ? "active" : ""}`}
                        onClick={() => handleMenuClick("Attendance")}
                    >
                        <i className="fa fa-clock-o"></i>
                        Attendance
                    </Link>
                </li>
                <li className="nav-item">
                    <Link
                        to="/admin/points"
                        className={`nav-link ${activeMenu === "Points" ? "active" : ""}`}
                        onClick={() => handleMenuClick("Points")}
                    >
                        <i className="fa fa-pie-chart"></i>
                        Appraisals
                    </Link>
                </li>
                <li className="nav-item">
                    <Link
                        to="/admin/roles"
                        className={`nav-link ${activeMenu === "Roles" ? "active" : ""}`}
                        onClick={() => handleMenuClick("Roles")}
                    >
                        <i className="fa fa-users"></i>
                        Roles
                    </Link>
                </li>
            </ul>
            {/* <div className='sibebar-actions'>
                <h3 className='mb-2'>Quick Actions</h3>
                <Link to="/admin/user/add" className='sbtn-link'>
                    <i className='fa fa-add'></i>
                    Add User
                </Link>
                <Link to="/admin/reports" className='sbtn-link'>
                    <i className='fa fa-add'></i>
                    View Reports
                </Link>
            </div> */}
        </div>
    );
};

export default Sidebar;