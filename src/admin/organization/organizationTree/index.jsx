import { useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import {
  useGetEmployeeTreeQuery,
  useGetDepartmentTreeQuery,
} from "../../../services/features/users/userApi";

import ProfileImg from "../../../assets/images/user.png";
import Select from "react-select";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";

const renderEmployeeTree = (employee) => {
  if (!employee) return null;
  // If this employee has a team, render as has-employee
  if (employee.team && employee.team.length > 0) {
    return (
      <div className="tree-empItem has-employee" key={employee._id}>
        <div className="tree-empItem-has-parent">
          <div className="te-has-item">
            <div className="tree-info-wrapper">
              <span className="ti-icon">
                {employee.firstName?.[0]?.toUpperCase()}
                {employee.lastName?.[0]?.toUpperCase()}
              </span>
              <div className="ti-detail">
                <h3>
                  {employee.firstName} {employee.lastName}
                </h3>
                <p>{employee.designation?.name || "Team Leader"}</p>
              </div>
            </div>
            <span className="tcount">{employee.team.length}</span>
          </div>
        </div>
        <div className="tree-empItem-has-list">
          {employee.team.map((child) => renderEmployeeTree(child))}
        </div>
      </div>
    );
  }

  // If no team, render as a leaf
  return (
    <div className="tree-empItem" key={employee._id}>
      <div className="tree-info-wrapper">
        <span className="ti-icon">
          {employee.firstName?.[0]?.toUpperCase()}
          {employee.lastName?.[0]?.toUpperCase()}
        </span>
        <div className="ti-detail">
          <h3>
            {employee.firstName} {employee.lastName}
          </h3>
          <p>{employee.designation?.name || "Team Leader"}</p>
        </div>
      </div>
    </div>
  );
};

const renderDepartmentTree = (departments) => {
  if (!departments || !departments.length) return <p>No departments found.</p>;
  return departments.map((dept) => (
    <div className="tree-item" key={dept._id}>
      <div className="tree-first-parent">
        <div className="tree-info-wrapper">
          <span className="ti-icon">
            {dept.name
              ?.split(" ")
              .map((w) => w[0])
              .join("")
              .toUpperCase()}
          </span>
          <div className="ti-detail">
            <h3>{dept.name}</h3>
          </div>
        </div>
        <span className="tcount">{dept.users?.length || 0}</span>
      </div>
      <div className="tree-employee-list">
        {dept.users && dept.users.length > 0 ? (
          dept.users.map((user) => (
            <div className="tree-empItem" key={user._id}>
              <div className="tree-info-wrapper">
                <span className="ti-icon">
                  {user.firstName?.[0]?.toUpperCase()}
                  {user.lastName?.[0]?.toUpperCase()}
                </span>
                <div className="ti-detail">
                  <h3>
                    {user.firstName} {user.lastName}
                  </h3>
                  <p>{user.designation?.name || "-"}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="tree-empItem">
            <div className="tree-info-wrapper">
              <span className="ti-icon">-</span>
              <div className="ti-detail">
                <h3>No Users</h3>
                <p>-</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  ));
};

const OrganizationTree = () => {
  const [activeTab, setActiveTab] = useState("dmembers");
  const { data, isLoading, error } = useGetEmployeeTreeQuery();

  const {
    data: deptData,
    isLoading: deptLoading,
    error: deptError,
  } = useGetDepartmentTreeQuery();

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <div className="pageTanDiv">
        <ul className="pageTabPane">
          {/* <li>
            <Link to="/admin/employees">Employees</Link>
          </li> */}
          <li>
            <Link to="/admin/organization/department">Department</Link>
          </li>
          <li>
            <Link to="/admin/organization/designation">Designation</Link>
          </li>
          <li className="active">
            <Link to="/admin/organization/tree">Organization Tree</Link>
          </li>
        </ul>
      </div>
      <div className="tree-lists-container pt-1 tree ovdash-memebrs-count">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "employee" ? "active" : ""}`}
              onClick={() => handleTabChange("employee")}
            >
              Employees Tree
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "dmembers" ? "active" : ""}`}
              onClick={() => handleTabChange("dmembers")}
            >
              Department Tree
            </button>
          </li>
        </ul>
        <div className="tab-content mt-3">
          {activeTab === "employee" && (
            <div className="tab-pane fade show active">
              <div className="tree-wrapper">
                <div className="tree-item">
                  {isLoading && <p>Loading...</p>}
                  {error && <p>Error loading tree.</p>}
                  {data?.data && (
                    <>
                      <div className="tree-first-parent">
                        <div className="tree-info-wrapper">
                          <span className="ti-icon">
                            {data.data.firstName?.[0]?.toUpperCase()}
                            {data.data.lastName?.[0]?.toUpperCase()}
                          </span>
                          <div className="ti-detail">
                            <h3>
                              {data.data.firstName} {data.data.lastName}
                            </h3>
                            <p>
                              {data.data.designation?.name || "Team Leader"}
                            </p>
                          </div>
                        </div>
                        <span className="tcount">
                          {data.data.team?.length || 0}
                        </span>
                      </div>
                      <div className="tree-employee-list">
                        {data.data.team &&
                          data.data.team.map((child) =>
                            renderEmployeeTree(child)
                          )}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
          {activeTab === "dmembers" && (
            <div className="tab-pane fade show active">
              <div className="tree-wrapper">
                {deptLoading && <p>Loading...</p>}
                {deptError && <p>Error loading department tree.</p>}
                {!deptLoading &&
                  !deptError &&
                  (!deptData?.data || deptData.data.length === 0) && (
                    <p>No data found.</p>
                  )}
                {!deptLoading &&
                  !deptError &&
                  deptData?.data &&
                  renderDepartmentTree(deptData.data)}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default OrganizationTree;
