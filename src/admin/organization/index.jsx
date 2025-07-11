import { useState, useEffect, useRef } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import ProfileImg from "../../assets/images/user.png";
import Select from "react-select";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import AdminDepartment from "./department/index";
import AdminDesignation from "./designation/index";
import OrganizationTree from "./organizationTree/index";

import { usePermission } from "../../hooks/usePermission";

const OrganizationSection = () => {
  // Changed to a functional component with curly braces
  const { hasPermission } = usePermission();

  // Define your permission slugs (these must match your backend's slugs)
  const CAN_VIEW_DEPARTMENT = "department:view";
  const CAN_VIEW_DESIGNATION = "designation:view";
  // You might have a specific permission for the organization tree, e.g., "organization:view"
  // For now, it's the fallback, but you can add a permission for it if needed.

  // Determine which component to render
  let contentToRender = null;

  if (hasPermission(CAN_VIEW_DEPARTMENT)) {
    contentToRender = (
      <div className="table-lists-container">
        <AdminDepartment />
        {/* You had duplicated 'AdminDepartment' and 'p' tags, I've cleaned it up */}
        {/* <p>Show your department data here.</p> */}
      </div>
    );
  } else if (hasPermission(CAN_VIEW_DESIGNATION)) {
    contentToRender = (
      <div className="table-lists-container">
        <AdminDesignation />
        {/* <p>Show your designation data here.</p> */}
      </div>
    );
  } else {
    // Fallback if neither department:view nor designation:view is present
    // You can also add a specific permission check here if 'organization:view' exists
    contentToRender = (
      <div className="table-lists-container">
        {" "}
        {/* You might want a specific class for the tree */}
        <OrganizationTree />
        {/* <p>Show your organization tree here.</p> */}
      </div>
    );
  }

  return (
    <>

      {contentToRender}
    </>
  );
};

// export default DepartmentSection;

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

export default OrganizationSection;
