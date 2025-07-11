import { useState } from "react";
import "./style.css";
import AdminSidebar from "./sidebar/admin.index";
import HRSidebar from "./sidebar/hr.index";
import EmployeeSidebar from "./sidebar/employee.index";
import Topbar from "./topbar";
import { useSelector } from "react-redux";

const SUPER_ADMIN = "Super Admin";
const AppLayout = ({ children }) => {
  const userRole = useSelector((state) => state.auth.role);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="main-container">
      <Topbar toggleSidebar={toggleSidebar} />
      <div className="sidebar-content-wrapper">
        {userRole === SUPER_ADMIN ? (
          <AdminSidebar isOpen={isSidebarOpen} />
        ) : (
          <HRSidebar isOpen={isSidebarOpen} />
        )}
        <div className="content-container">{children}</div>
      </div>
    </div>
  );
};

export default AppLayout;
