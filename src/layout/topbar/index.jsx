import { useState, useEffect, useRef } from "react";
import "./style.css";
import { Link, useLocation } from "react-router-dom";
import User from "../../assets/images/user.png";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { usePermission } from "../../hooks/usePermission";
import { useNavigate } from "react-router-dom";
import {
  useGetUserQuery,
} from "../../services/features/users/userApi";
import { useSelector } from "react-redux";

const Topbar = ({ toggleSidebar }) => {
  const location = useLocation();
  const { hasPermission } = usePermission();
  const userId = useSelector((state) => state.users.id);
  const { data: userData, isLoading: isUserLoading } = useGetUserQuery(userId);
console.log(userData,"userDatauserDatauserData")
  const CAN_CREATE_USER = "user:create";
  const CAN_CREATE_DEPARTMENT = "department:create";
  const CAN_CREATE_DESIGNATION = "designation:create";
  const CAN_CREATE_POINT = "appraisal:create";
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] =
    useState(false);
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

    if (
      notificationDropdownRef.current &&
      !notificationDropdownRef.current.contains(event.target)
    ) {
      setIsNotificationDropdownOpen(false);
    }

    if (
      addmenuDropdownRef.current &&
      !addmenuDropdownRef.current.contains(event.target)
    ) {
      setIsAddmenuDropdownOpen(false);
    }
  };
  const shouldShowAddButton =
    hasPermission(CAN_CREATE_USER) ||
    hasPermission(CAN_CREATE_DEPARTMENT) ||
    hasPermission(CAN_CREATE_DESIGNATION) ||
    hasPermission(CAN_CREATE_POINT);
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.clear("authUser");
    navigate("/");
  };
  return (
    <nav className="topbar">
      <div className="topbar-left">
        <Link to="#" className="topbar-logo">
          <h3 className="topbar-brand">People Soft</h3>
        </Link>
        <div className="topbar-menu">
          <ul className="pageTabPane">
            <li
              className={location.pathname === "/admin/reports" ? "active" : ""}
            >
              <Link to="/admin/reports">Reports</Link>
            </li>
            <li
              className={
                location.pathname === "/admin/organization" ? "active" : ""
              }
            >
              <Link to="/admin/organization">Organization</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="topbar-right">
        {shouldShowAddButton && ( // Render the entire quickactions div only if any create permission exists
          <div className="quickactions" ref={addmenuDropdownRef}>
            <button
              type="button"
              className="topadd-btn"
              onClick={toggleAddmenuDropdown}
            >
              <AddOutlinedIcon />
            </button>

            <ul
              className={`dropdown-menu ${isaddmenuDropdownOpen ? "show" : ""}`}
            >
              {hasPermission(CAN_CREATE_USER) && (
                <li>
                  <Link to="/admin/employee/add" className="dropdown-item">
                    <i className="fa fa-plus-circle"></i> Add Employee
                  </Link>
                </li>
              )}
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
              {hasPermission(CAN_CREATE_POINT) && (
                <li>
                  <Link to="/admin/point/add" className="dropdown-item">
                    <i className="fa fa-plus-circle"></i> Add Points
                  </Link>
                </li>
              )}
              {hasPermission(CAN_CREATE_DEPARTMENT) && (
                <li>
                  <Link
                    to="/admin/organization/department/add"
                    className="dropdown-item"
                  >
                    <i className="fa fa-plus-circle"></i> Department
                  </Link>
                </li>
              )}
              {hasPermission(CAN_CREATE_DESIGNATION) && (
                <li>
                  <Link
                    to="/admin/organization/designation/add"
                    className="dropdown-item"
                  >
                    <i className="fa fa-plus-circle"></i> Designation
                  </Link>
                </li>
              )}
            </ul>
          </div>
        )}
        <div className="notifications" ref={notificationDropdownRef}>
          <span className="new-nofifications"></span>
          <button
            type="button"
            className="notify-btn"
            onClick={toggleNotificationDropdown}
          >
            <i className="fa fa-bell"></i>
          </button>

          <ul
            className={`notificationdrop dropdown-menu ${isNotificationDropdownOpen ? "show" : ""
              }`}
          >
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
          <Link to="/admin/settings" type="button" className="notify-btn">
            <i className="fa fa-cog"></i>
          </Link>
        </div>
        {/* admin */}
        <div className="user" ref={dropdownRef}>
          <button className="user-avatar" onClick={toggleDropdown}>
            {userData?.data?.profilePhotoUrl?
             <img className="img-fluid" style={{
              borderRadius:'50%'
             }}
              height={'100%'} width={'100%'}
               src={userData?.data?.profilePhotoUrl} alt="Avatar" />:
             
            <img className="img-fluid" src={User} alt="Avatar" />}
          </button>
          <ul className={`dropdown-menu ${isDropdownOpen ? "show" : ""}`}>
            <li>
              <Link to="/profile" className="dropdown-item">
                <i className="fa fa-user"></i> Profile
              </Link>
            </li>
            <li>
              <Link to="/profile/change-password" className="dropdown-item">
                <i className="fa fa-cog"></i> Change Password
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                type="button"
                className="dropdown-item"
              >
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
