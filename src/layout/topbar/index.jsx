import { useState, useEffect, useRef } from "react";
import "./style.css"
import { Link } from 'react-router-dom'
import User from '../../assets/images/user.png'

const Topbar = ({ toggleSidebar }) => {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
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
                <div className='notifications'>
                    <span className='new-nofifications'></span>
                    <button type='button' className='notify-btn'>
                        <i className='fa fa-bell'></i>
                    </button>
                </div>
                <div className='user' ref={dropdownRef}>
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
                            <Link to="/admin/logout" className="dropdown-item">
                                <i className="fa fa-sign-out"></i> Logout
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Topbar;