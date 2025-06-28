import { useState, useEffect, useRef } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import ProfileImg from "../../assets/images/user.png";
import Select from "react-select";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import AdminDepartment from "./department/index";

const DepartmentSection = () => (
  <div className="department-section">
    <AdminDepartment />
    AdminDepartment
    <p>Show your department data here.</p>
  </div>
);

// const Dashboard = () => {
//   return (
//     <>
//       <div className="pageTanDiv">
//         <ul className="pageTabPane">
//           <li className="active">
//             <Link to="/admin/organization/department">Department</Link>
//           </li>
//           <li>
//             <Link to="/admin/organization/designation">Designation</Link>
//           </li>
//           <li>
//             <Link to="/admin/organization/tree">Organization Tree</Link>
//           </li>
//         </ul>
//       </div>
//       <div className="table-lists-container">
//         <DepartmentSection />
//       </div>
//     </>
//   );
// };

export default DepartmentSection;
