import { useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen }) => {
  const [activeMenu, setActiveMenu] = useState("");

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };

  return (
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
            to="/employee/points"
            className={`nav-link ${activeMenu === "Points" ? "active" : ""}`}
            onClick={() => handleMenuClick("Points")}
          >
            <i className="fa fa-pie-chart"></i>
            Appraisals
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
