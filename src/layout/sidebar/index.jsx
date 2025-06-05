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
        // <div className={`sidebar ${isOpen ? "d-none" : "d-block"}`}>
        //     <ul className="nav flex-column">
        //         <li className="nav-item">
        //             <Link
        //                 to="/admin/dashboard"
        //                 className={`nav-link ${activeMenu === "Dashboard" ? "active" : ""}`}
        //                 onClick={() => handleMenuClick("Dashboard")}
        //             >
        //                 <i className="fa fa-home"></i>
        //                 Dashboard
        //             </Link>
        //         </li>
        //         <li className="nav-item">
        //             <Link
        //                 to="/admin/users"
        //                 className={`nav-link ${activeMenu === "Users" ? "active" : ""}`}
        //                 onClick={() => handleMenuClick("Users")}
        //             >
        //                 <i className="fa fa-user"></i>
        //                 Users
        //             </Link>
        //         </li>
        //         <li className="nav-item">
        //             <Link
        //                 to="/admin/employees"
        //                 className={`nav-link ${activeMenu === "Employees" ? "active" : ""}`}
        //                 onClick={() => handleMenuClick("Employees")}
        //             >
        //                 <i className="fa fa-user"></i>
        //                 Employees
        //             </Link>
        //         </li>
        //         <li className="nav-item">
        //             <Link
        //                 to="/admin/appraisals"
        //                 className={`nav-link ${activeMenu === "Appraisals" ? "active" : ""}`}
        //                 onClick={() => handleMenuClick("Appraisals")}
        //             >
        //                 <i className="fa fa-sticky-note"></i>
        //                 Appraisals
        //             </Link>
        //         </li>
        //         <li className="nav-item">
        //             <Link
        //                 to="/admin/points"
        //                 className={`nav-link ${activeMenu === "Points" ? "active" : ""}`}
        //                 onClick={() => handleMenuClick("Points")}
        //             >
        //                 <i className="fa fa-pie-chart"></i>
        //                 Points
        //             </Link>
        //         </li>
        //         <li className="nav-item">
        //             <Link
        //                 to="/admin/roles"
        //                 className={`nav-link ${activeMenu === "Roles" ? "active" : ""}`}
        //                 onClick={() => handleMenuClick("Points")}
        //             >
        //                 <i className="fa fa-users"></i>
        //                 Roles
        //             </Link>
        //         </li>
        //     </ul>
        //     <div className='sibebar-actions'>
        //         <h3 className='mb-2'>Quick Actions</h3>
        //         <Link to="/admin/user/add" className='sbtn-link'>
        //             <i className='fa fa-add'></i>
        //             Add User
        //         </Link>   
        //         <Link to="/admin/appraisal/add" className='sbtn-link'>
        //             <i className='fa fa-add'></i>
        //             Create Appraisal
        //         </Link>
        //         <Link to="/admin/reports" className='sbtn-link'>
        //             <i className='fa fa-add'></i>
        //             View Reports
        //         </Link>
        //         <Link to="/admin/pending-appraisals" className='sbtn-link'>
        //             <i className='fa fa-clock'></i>
        //             Pending Appraisals <span className='menuConts'>10</span>
        //         </Link>
        //     </div>
        // </div>
        // employee sidebar
        <div className={`sidebar ${isOpen ? "d-none" : "d-block"}`}>
            <ul className="nav flex-column">
                <li className="nav-item">
                    <Link
                        to="/employee/dashboard"
                        className={`nav-link ${activeMenu === "Dashboard" ? "active" : ""}`}
                        onClick={() => handleMenuClick("Dashboard")}
                    >
                        <i className="fa fa-home"></i>
                        Dashboard
                    </Link>
                </li>
                <li className="nav-item">
                    <Link
                        to="/employee/appraisals"
                        className={`nav-link ${activeMenu === "Appraisals" ? "active" : ""}`}
                        onClick={() => handleMenuClick("Appraisals")}
                    >
                        <i className="fa fa-sticky-note"></i>
                        Appraisals
                    </Link>
                </li>
                <li className="nav-item">
                    <Link
                        to="/employee/points"
                        className={`nav-link ${activeMenu === "Points" ? "active" : ""}`}
                        onClick={() => handleMenuClick("Points")}
                    >
                        <i className="fa fa-pie-chart"></i>
                        Points
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;