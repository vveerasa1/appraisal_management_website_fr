import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  useGetEmployeeTreeQuery,
  useGetDepartmentTreeQuery,
} from "../../../services/features/users/userApi";
import { usePermission } from "../../../hooks/usePermission";
import { Tree, TreeNode } from "react-organizational-chart";
import { Box, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

// ✅ Compact Custom Node Component
const NodeBox = ({ title, subtitle }) => (
  <Box
    sx={{
      p: 1, // reduced padding
      borderRadius: 1.5,
      backgroundColor: "#fff",
      border: "1px solid #ddd",
      minWidth: 120, // smaller box
      textAlign: "center",
      boxShadow: 1,
      display: "inline-block",
      fontSize: "0.75rem",
      transition: "all 0.2s ease",
      "&:hover": {
        boxShadow: 3,
        backgroundColor: "#f9f9f9",
      },
    }}
  >
    <AccountCircleIcon fontSize="small" sx={{ color: "#1976d2", mb: 0.5 }} />
    <Typography
      variant="body2"
      fontWeight="bold"
      noWrap
      sx={{ fontSize: "0.8rem" }}
    >
      {title}
    </Typography>
    <Typography
      variant="caption"
      color="text.secondary"
      sx={{ display: "block", fontSize: "0.7rem" }}
    >
      {subtitle}
    </Typography>
  </Box>
);

// ✅ Recursive Employee Tree Renderer
const renderEmployeeTree = (employee) => {
  if (!employee) return null;
  return (
    <TreeNode
      key={employee._id}
      label={
        <NodeBox
          title={`${employee.firstName} ${employee.lastName}`}
          subtitle={employee.designation?.name || "Team Leader"}
        />
      }
    >
      {employee.team && employee.team.map((child) => renderEmployeeTree(child))}
    </TreeNode>
  );
};

// ✅ Recursive Department Tree Renderer
const renderDepartmentTree = (departments) => {
  if (!departments || !departments.length) {
    return <Typography>No departments found.</Typography>;
  }
  return departments.map((dept) => (
    <TreeNode
      key={dept._id}
      label={
        <NodeBox
          title={dept.name}
          subtitle={`Users: ${dept.users?.length || 0}`}
        />
      }
    >
      {dept.users?.map((user) => (
        <TreeNode
          key={user._id}
          label={
            <NodeBox
              title={`${user.firstName} ${user.lastName}`}
              subtitle={user.designation?.name || "-"}
            />
          }
        />
      ))}
    </TreeNode>
  ));
};

const OrganizationTree = () => {
  const [activeTab, setActiveTab] = useState("dmembers");

  // API calls
  const { data, isLoading, error } = useGetEmployeeTreeQuery();
  const {
    data: deptData,
    isLoading: deptLoading,
    error: deptError,
  } = useGetDepartmentTreeQuery();

  const { hasPermission } = usePermission();
  const CAN_VIEW_DEPARTMENT = "department:view";
  const CAN_VIEW_DESIGNATION = "designation:view";

  return (
    <>
      {/* ✅ Top Navigation Tabs */}
      <div className="pageTanDiv">
        <ul className="pageTabPane">
          {hasPermission(CAN_VIEW_DEPARTMENT) && (
            <li>
              <Link to="/admin/organization/department">Department</Link>
            </li>
          )}
          {hasPermission(CAN_VIEW_DESIGNATION) && (
            <li>
              <Link to="/admin/organization/designation">Designation</Link>
            </li>
          )}
          <li className="active">
            <Link to="/admin/organization/tree">Organization Tree</Link>
          </li>
        </ul>
      </div>

      {/* ✅ Tree Tabs */}
      <div className="tree-lists-container pt-1 tree ovdash-memebrs-count">
        <ul className="nav nav-tabs custom-tabs">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "employee" ? "active" : ""}`}
              onClick={() => setActiveTab("employee")}
            >
              Employees Tree
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "dmembers" ? "active" : ""}`}
              onClick={() => setActiveTab("dmembers")}
            >
              Department Tree
            </button>
          </li>
        </ul>

        {/* ✅ Employee Tree */}
        {activeTab === "employee" && (
          <Box
            sx={{
              mt: 3,
              display: "flex",
              justifyContent: "center",
              pb: 4,
              overflow: "auto",
            }}
          >
            <Box sx={{ transform: "scale(1)", transformOrigin: "top center" }}>
              {isLoading && <p>Loading...</p>}
              {error && <p>Error loading tree.</p>}
              {data?.data && (
                <Tree
                  lineWidth={"1.5px"}
                  lineColor={"#1976d2"}
                  lineBorderRadius={"8px"}
                  label={
                    <NodeBox
                      title={`${data.data.firstName} ${data.data.lastName}`}
                      subtitle={data.data.designation?.name || "Team Leader"}
                    />
                  }
                >
                  {data.data.team &&
                    data.data.team.map((child) => renderEmployeeTree(child))}
                </Tree>
              )}
            </Box>
          </Box>
        )}

        {/* ✅ Department Tree */}
        {activeTab === "dmembers" && (
          <Box
            sx={{
              mt: 3,
              display: "flex",
              pb: 4,
              overflowX: "auto",
              overflowY: "hidden", // ✅ prevents vertical scroll glitch
              WebkitOverflowScrolling: "touch", // ✅ smooth scrolling on mobile
            }}
          >
            <Box sx={{ flexShrink: 0 }}>
              {deptLoading && <p>Loading...</p>}
              {deptError && <p>Error loading department tree.</p>}
              {!deptLoading && !deptError && deptData?.data && (
                <Tree
                  lineWidth={"1.5px"}
                  lineColor={"#9c27b0"}
                  lineBorderRadius={"8px"}
                  label={
                    <NodeBox
                      title="Departments"
                      subtitle="Organization Structure"
                    />
                  }
                >
                  {renderDepartmentTree(deptData.data)}
                </Tree>
              )}
            </Box>
          </Box>
        )}
      </div>
    </>
  );
};

export default OrganizationTree;
