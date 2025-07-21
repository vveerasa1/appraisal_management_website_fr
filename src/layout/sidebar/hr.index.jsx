import { useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { usePermission } from "../../hooks/usePermission";

const Sidebar = ({ isOpen }) => {
  const [activeMenu, setActiveMenu] = useState("");
  const { hasPermission } = usePermission();

  const CAN_VIEW_TEAM = "team:view";
  const CAN_VIEW_USER = "user:view";
  const CAN_VIEW_APPRAISAL = "appraisal:view";
  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };

  return (
    // hr sidebar
    <div className={`sidebar ${isOpen ? "show-sidebar" : "hide-sidebar"}`}>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link
            to="/dashboard"
            className={`nav-link ${activeMenu === "Dashboard" ? "active" : ""}`}
            onClick={() => handleMenuClick("Dashboard")}
          >
            <i className="fa fa-home"></i>
            Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/hr/my-points"
            className={`nav-link ${activeMenu === "My Points" ? "active" : ""}`}
            onClick={() => handleMenuClick("My Points")}
          >
            <i className="fa fa-pie-chart"></i>
            My Appraisals
          </Link>
        </li>
        {hasPermission(CAN_VIEW_TEAM) && (
          <li className="nav-item">
            <Link
              to="/hr/team-members"
              className={`nav-link ${activeMenu === "Team" ? "active" : ""}`}
              onClick={() => handleMenuClick("Team")}
            >
              <i className="fa fa-users"></i>
              Team
            </Link>
          </li>
        )}
        {hasPermission(CAN_VIEW_USER) && (
          <li className="nav-item">
            <Link
              to="/admin/employees"
              className={`nav-link ${
                activeMenu === "Employees" ? "active" : ""
              }`}
              onClick={() => handleMenuClick("Employees")}
            >
              <i className="fa fa-users"></i>
              Employees
            </Link>
          </li>
        )}
        {hasPermission(CAN_VIEW_APPRAISAL) && (
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
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
