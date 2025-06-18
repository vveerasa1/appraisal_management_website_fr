import { useState, useEffect, useRef } from "react";
import "./style.css"
import { Link, useLocation } from 'react-router-dom'
import User from '../../assets/images/user.png'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

const Topbar = ({ toggleSidebar }) => {

    const location = useLocation();

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] = useState(false);
    const notificationDropdownRef = useRef(null);

    const [isaddmenuDropdownOpen, setIsAddmenuDropdownOpen] = useState(false);
    const addmenuDropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
        setIsNotificationDropdownOpen(false);
        setIsAddmenuDropdownOpen(false);
    };

    const toggleNotificationDropdown = () => {
        setIsNotificationDropdownOpen((prev) => !prev);
        setIsDropdownOpen(false);
        setIsAddmenuDropdownOpen(false);
    };

    const toggleAddmenuDropdown = () => {
        setIsAddmenuDropdownOpen((prev) => !prev);
        setIsDropdownOpen(false);
        setIsNotificationDropdownOpen(false);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropdownOpen(false);
        }

        if (notificationDropdownRef.current && !notificationDropdownRef.current.contains(event.target)) {
            setIsNotificationDropdownOpen(false);
        }

        if (addmenuDropdownRef.current && !addmenuDropdownRef.current.contains(event.target)) {
            setIsAddmenuDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (
        <nav className='topbar'>
            <div className='topbar-left'>
                <Link to="#" className="topbar-logo">
                    <h3 className='topbar-brand'>People Soft</h3>
                </Link>
                <div className="topbar-menu">
                    <ul className='pageTabPane'>
                        <li className={location.pathname === "/admin/reports" ? "active" : ""}>
                            <Link to="/admin/reports">Reports</Link>
                        </li>
                        <li className={location.pathname === "/admin/organization" ? "active" : ""}>
                            <Link to="/admin/organization">Organization</Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className='topbar-right'>
                <div className="quickactions" ref={addmenuDropdownRef}>
                    <button type='button' className='topadd-btn' onClick={toggleAddmenuDropdown}>
                        <AddOutlinedIcon />
                    </button>

                    <ul className={`dropdown-menu ${isaddmenuDropdownOpen ? "show" : ""}`}>
                        <li>
                            <Link to="/admin/employee/add" className="dropdown-item">
                                <i className="fa fa-plus-circle"></i> Add Employee
                            </Link>
                        </li>
                        {/* <li>
                            <Link to="/admin/user/add" className="dropdown-item">
                                <i className="fa fa-plus-circle"></i> Add User
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/role/add" className="dropdown-item">
                                <i className="fa fa-plus-circle"></i> Add Role
                            </Link>
                        </li> */}
                        <li>
                            <Link to="/admin/point/add" className="dropdown-item">
                                <i className="fa fa-plus-circle"></i> Add Points
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/organization/department/add" className="dropdown-item">
                                <i className="fa fa-plus-circle"></i> Department
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/organization/designation/add" className="dropdown-item">
                                <i className="fa fa-plus-circle"></i> Designation
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className='notifications' ref={notificationDropdownRef}>
                    <span className='new-nofifications'></span>
                    <button type='button' className='notify-btn' onClick={toggleNotificationDropdown}>
                        <i className='fa fa-bell'></i>
                    </button>

                    <ul className={`notificationdrop dropdown-menu ${isNotificationDropdownOpen ? "show" : ""}`}>
                        <h3 className="nofify-heading">Notifications</h3>
                        <li>
                            <p className="dropdown-item">
                                <span>+2 Points added</span>
                                <span>12:30PM</span>
                            </p>
                        </li>
                        <li>
                            <p className="dropdown-item">
                                <span>+2 Points added</span>
                                <span>12:30PM</span>
                            </p>
                        </li>
                        <li>
                            <p className="dropdown-item">
                                <span>+2 Points added</span>
                                <span>12:30PM</span>
                            </p>
                        </li>
                    </ul>
                </div>
                <div className="quickactions">
                    <Link to="/admin/settings" type='button' className='notify-btn'>
                        <i className='fa fa-cog'></i>
                    </Link>
                </div>
                {/* admin */}
                <div className='user' ref={dropdownRef}>
                    <button className='user-avatar' onClick={toggleDropdown}>
                        <img className='img-fluid' src={User} alt='Avatar' />
                    </button>
                    <ul className={`dropdown-menu ${isDropdownOpen ? "show" : ""}`}>
                        <li>
                            <Link to="/admin/profile" className="dropdown-item">
                                <i className="fa fa-user"></i> Profile
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/settings" className="dropdown-item">
                                <i className="fa fa-cog"></i> Settings
                            </Link>
                        </li>
                        <li>
                            <button type="button" className="dropdown-item">
                                <i className="fa fa-sign-out"></i> Logout
                            </button>
                        </li>
                    </ul>
                </div>
                {/* employee */}
                {/* <div className='user' ref={dropdownRef}>
                    <button className='user-avatar' onClick={toggleDropdown}>
                        <img className='img-fluid' src={User} alt='Avatar' />
                        <p>John Doe</p>
                    </button>
                    <ul className={`dropdown-menu ${isDropdownOpen ? "show" : ""}`}>
                        <li>
                            <Link to="/employee/profile" className="dropdown-item">
                                <i className="fa fa-user"></i> Profile
                            </Link>
                        </li>
                        <li>
                            <Link to="/employee/profile/change-password" className="dropdown-item">
                                <i className="fa fa-user"></i> Change Password
                            </Link>
                        </li>
                        <li>
                            <button type="button" className="dropdown-item">
                                <i className="fa fa-sign-out"></i> Logout
                            </button>
                        </li>
                    </ul>
                </div> */}
                {/* HR */}
                {/* <div className='user' ref={dropdownRef}>
                    <button className='user-avatar' onClick={toggleDropdown}>
                        <img className='img-fluid' src={User} alt='Avatar' />
                    </button>
                    <ul className={`dropdown-menu ${isDropdownOpen ? "show" : ""}`}>
                        <li>
                            <Link to="/hr/profile" className="dropdown-item">
                                <i className="fa fa-user"></i> Profile
                            </Link>
                        </li>
                        <li>
                            <Link to="/hr/profile/change-password" className="dropdown-item">
                                <i className="fa fa-user"></i> Change Password
                            </Link>
                        </li>
                        <li>
                            <button type="button" className="dropdown-item">
                                <i className="fa fa-sign-out"></i> Logout
                            </button>
                        </li>
                    </ul>
                </div> */}
            </div>
        </nav>
    );
};

export default Topbar;