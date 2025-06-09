import { useState, useEffect, useRef } from "react";
import "./style.css"
import { Link } from 'react-router-dom'
import User from '../../assets/images/user.png'

const Topbar = ({ toggleSidebar }) => {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] = useState(false);
    const notificationDropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
        setIsNotificationDropdownOpen(false);
    };

    const toggleNotificationDropdown = () => {
        setIsNotificationDropdownOpen((prev) => !prev);
        setIsDropdownOpen(false);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropdownOpen(false);
        }

        if (
            notificationDropdownRef.current &&
            !notificationDropdownRef.current.contains(event.target)
        ) {
            setIsNotificationDropdownOpen(false);
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
                    <span className='topbar-brand'>Appraisal Management</span>
                </Link>
                <button type='button' className='navbar-toggle-btn' onClick={toggleSidebar}>
                    <i className='fa fa-bars'></i>
                </button>
            </div>
            <div className='topbar-right'>
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
                {/* admin */}
                {/* <div className='user' ref={dropdownRef}>
                    <button className='user-avatar' onClick={toggleDropdown}>
                        <img className='img-fluid' src={User} alt='Avatar' />
                        <p>John Doe</p>
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
                </div> */}
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
                <div className='user' ref={dropdownRef}>
                    <button className='user-avatar' onClick={toggleDropdown}>
                        <img className='img-fluid' src={User} alt='Avatar' />
                        <p>John Doe</p>
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
                </div>
            </div>
        </nav>
    );
};

export default Topbar;