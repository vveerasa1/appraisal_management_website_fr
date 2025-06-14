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
                        to="/admin/overview"
                        className={`nav-link ${activeMenu === "Home" ? "active" : ""}`}
                        onClick={() => handleMenuClick("Home")}
                    >
                        <i className="fa fa-home"></i>
                        Home
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
        // employee sidebar
        // <div className={`sidebar ${isOpen ? "d-none" : "d-block"}`}>
        //     <ul className="nav flex-column">
        //         <li className="nav-item">
        //             <Link
        //                 to="/employee/dashboard"
        //                 className={`nav-link ${activeMenu === "Dashboard" ? "active" : ""}`}
        //                 onClick={() => handleMenuClick("Dashboard")}
        //             >
        //                 <i className="fa fa-home"></i>
        //                 Dashboard
        //             </Link>
        //         </li>
        //         <li className="nav-item">
        //             <Link
        //                 to="/employee/points"
        //                 className={`nav-link ${activeMenu === "Points" ? "active" : ""}`}
        //                 onClick={() => handleMenuClick("Points")}
        //             >
        //                 <i className="fa fa-pie-chart"></i>
        //                 Points
        //             </Link>
        //         </li>
        //     </ul>
        // </div>
        // hr sidebar
        // <div className={`sidebar ${isOpen ? "show-sidebar" : "hide-sidebar"}`}>
        //     <ul className="nav flex-column">
        //         <li className="nav-item">
        //             <Link
        //                 to="/hr/dashboard"
        //                 className={`nav-link ${activeMenu === "Dashboard" ? "active" : ""}`}
        //                 onClick={() => handleMenuClick("Dashboard")}
        //             >
        //                 <i className="fa fa-home"></i>
        //                 Dashboard
        //             </Link>
        //         </li>
        //         <li className="nav-item">
        //             <Link
        //                 to="/hr/my-points"
        //                 className={`nav-link ${activeMenu === "My Points" ? "active" : ""}`}
        //                 onClick={() => handleMenuClick("My Points")}
        //             >
        //                 <i className="fa fa-pie-chart"></i>
        //                 My Points
        //             </Link>
        //         </li>
        //         <li className="nav-item">
        //             <Link
        //                 to="/hr/team-members"
        //                 className={`nav-link ${activeMenu === "Team" ? "active" : ""}`}
        //                 onClick={() => handleMenuClick("Team")}
        //             >
        //                 <i className="fa fa-users"></i>
        //                 Team
        //             </Link>
        //         </li>
        //         <li className="nav-item">
        //             <Link
        //                 to="/hr/employees"
        //                 className={`nav-link ${activeMenu === "Employees" ? "active" : ""}`}
        //                 onClick={() => handleMenuClick("Employees")}
        //             >
        //                 <i className="fa fa-users"></i>
        //                 Employees
        //             </Link>
        //         </li>
        //     </ul>
        //     {/* <div className='sibebar-actions'>
        //         <h3 className='mb-2'>Quick Actions</h3>
        //         <Link to="/hr/employee/add" className='sbtn-link'>
        //             <i className='fa fa-add'></i>
        //             Add Employee
        //         </Link>
        //         <Link to="/hr/points" className='sbtn-link'>
        //             <i className='fa fa-add'></i>
        //             Points History
        //         </Link>
        //         <Link to="/hr/team-members" className='sbtn-link'>
        //             <i className='fa fa-add'></i>
        //             View Team
        //         </Link>
        //     </div> */}
        // </div>
    );
};

export default Sidebar;