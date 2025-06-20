import { useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import User from "../../assets/images/user-thumbnail.png";
import SampleLogo from "../../assets/images/sampleLogo.png";
import Activity from "../../assets/images/history.png";
import {
  useGetUserQuery,
  useGetDashboardQuery,
} from "../../services/features/users/userApi";

const Overview = () => {
  const [activeTab, setActiveTab] = useState("employee");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const [overviewactionTab, setOverviewactionTab] = useState("activity");

  const handleOTabChange = (tab) => {
    setOverviewactionTab(tab);
  };

  const userId = "684a825680c56bf96d63bf4b"; // Replace with your static ID
  const { data: userData, isLoading: isUserLoading } = useGetUserQuery(userId);
  const role = "Super Admin";
  const user = userData?.data;
  const { data: dashboardData, isLoading } = useGetDashboardQuery({
    userId,
    role,
  });
  const dashboard = dashboardData?.data || {};

  const activities = [
    {
      id: 1,
      action: "Removed Employee",
      details: "ABC1234",
      date: "28-12-2024 12:34PM",
    },
    {
      id: 2,
      action: "Added Employee",
      details: "DEF5678",
      date: "28-12-2024 01:00PM",
    },
    {
      id: 3,
      action: "Updated Profile",
      details: "GHI91011",
      date: "28-12-2024 01:30PM",
    },
    {
      id: 4,
      action: "Removed Employee",
      details: "JKL1213",
      date: "28-12-2024 02:00PM",
    },
  ];

  const colors = ["#0EE027", "#0AB4DA", "#D9B215"];

  return (
    <>
      <div className="pageTanDiv">
        <ul className="pageTabPane">
          <li className="active">
            <Link to="/admin/overview">Overview</Link>
          </li>
          <li>
            <Link to="/admin/dashboard">Dashboard</Link>
          </li>
        </ul>
      </div>
      <div className="pageOverview">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-md-8 col-lg-9 mb-4">
              <div className="overview-main-wrapper">
                <div className="overviewTop">
                  <div className="overviewTop-info">
                    <div className="oi-logo">
                      <img className="img-fluid" src={SampleLogo} alt="Logo" />
                    </div>
                    <div className="oi-info">
                      <h2>
                        Good Afternoon{" "}
                        {user ? `${user.firstName} ${user.lastName}` : ""}
                      </h2>
                      <p>Have a productive day!</p>
                    </div>
                  </div>
                </div>
                {/* tabs */}
                <div className="overviewTabs">
                  <ul className="nav nav-tabs">
                    <li className="nav-item">
                      <button
                        className={`nav-link ${
                          overviewactionTab === "activity" ? "active" : ""
                        }`}
                        onClick={() => handleOTabChange("activity")}
                      >
                        Activities
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        className={`nav-link ${
                          overviewactionTab === "profile" ? "active" : ""
                        }`}
                        onClick={() => handleOTabChange("profile")}
                      >
                        Profile
                      </button>
                    </li>
                  </ul>

                  {/* Tab Content */}
                  <div className="tab-content mt-3">
                    {overviewactionTab === "activity" && (
                      <div className="tab-pane fade show active">
                        <div className="recent-activities-list">
                          {activities.map((activity, index) => (
                            <div className="ra-item" key={activity.id}>
                              <div
                                className="ra-icon"
                                style={{
                                  backgroundColor:
                                    colors[index % colors.length],
                                }}
                              >
                                <img
                                  className="img-fluid"
                                  src={Activity}
                                  alt={activity.action}
                                />
                              </div>
                              <div className="ra-info">
                                <h3>
                                  {activity.action}{" "}
                                  <span>{activity.details}</span>
                                </h3>
                                <p>{activity.date}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {overviewactionTab === "profile" && (
                      <div className="tab-pane fade show active">
                        <div className="view-other-info">
                          <h3 className="small-heading">Employee Details</h3>
                          {isUserLoading ? (
                            <p>Loading...</p>
                          ) : user ? (
                            <ul className="otherInfo-lists">
                              <li>
                                <p>Email:</p>
                                <h4>{user.email}</h4>
                              </li>
                              <li>
                                <p>Mobile Number:</p>
                                <h4>{user.phoneNumber}</h4>
                              </li>
                              <li>
                                <p>Employee ID:</p>
                                <h4>{user.employeeId}</h4>
                              </li>
                              <li>
                                <p>Department:</p>
                                <h4>
                                  {user.department?.name || user.department}
                                </h4>
                              </li>
                              <li>
                                <p>Designation:</p>
                                <h4>
                                  {user.designation?.name || user.designation}
                                </h4>
                              </li>
                              <li>
                                <p>DOJ:</p>
                                <h4>
                                  {user.dateOfJoining
                                    ? new Date(
                                        user.dateOfJoining
                                      ).toLocaleDateString()
                                    : ""}
                                </h4>
                              </li>
                              <li>
                                <p>Reporting to:</p>
                                <h4>
                                  {user.reportingTo
                                    ? `${user.reportingTo.firstName} ${user.reportingTo.lastName}`
                                    : ""}
                                </h4>
                              </li>
                              <li>
                                <p>Address:</p>
                                <h4>{user.address}</h4>
                              </li>
                              <li>
                                <p>Added By:</p>
                                <h4>
                                  {user.createdBy?.firstName &&
                                  user.createdBy?.lastName
                                    ? `${user.createdBy.firstName} ${user.createdBy.lastName}`
                                    : user.createdBy}{" "}
                                </h4>
                              </li>
                              <li>
                                <p>Added Time:</p>
                                <h4>
                                  {user.createdAt
                                    ? new Date(user.createdAt).toLocaleString()
                                    : ""}
                                </h4>
                              </li>
                            </ul>
                          ) : (
                            <p>No user data found.</p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4 col-lg-3 mb-4">
              <div className="overview-rwrapper">
                <div className="overview-rhead">
                  <h3 className="dash-title">Your Account</h3>
                </div>
                <div className="ovdash-profile">
                  <img className="img-fluid" src={User} alt="Profile" />
                  <div className="ovdash-pInfo">
                    <h3>
                      <span>{user?.employeeId} -</span> {user?.firstName}{" "}
                      {user?.lastName}
                    </h3>
                    <p>{user?.designation?.name || user?.designation}</p>
                  </div>
                </div>
                <div className="ovdash-rprofile">
                  <img className="img-fluid" src={User} alt="Profile" />
                  <div className="ovdash-pInfo">
                    <p>Reporting To</p>
                    <h3>
                      <span>{user?.reportingTo?.employeeId} -</span>{" "}
                      {user?.reportingTo?.firstName}{" "}
                      {user?.reportingTo?.lastName}
                    </h3>
                  </div>
                </div>
                <div className="ovdash-memebrs-count">
                  {/* Nav Tabs */}
                  <ul className="nav nav-tabs">
                    <li className="nav-item">
                      <button
                        className={`nav-link ${
                          activeTab === "employee" ? "active" : ""
                        }`}
                        onClick={() => handleTabChange("employee")}
                      >
                        Employees
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        className={`nav-link ${
                          activeTab === "dmembers" ? "active" : ""
                        }`}
                        onClick={() => handleTabChange("dmembers")}
                      >
                        Department
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        className={`nav-link ${
                          activeTab === "nhires" ? "active" : ""
                        }`}
                        onClick={() => handleTabChange("nhires")}
                      >
                        New Hires
                      </button>
                    </li>
                  </ul>

                  {/* Tab Content */}
                  <div className="tab-content mt-3">
                    {activeTab === "employee" && (
                      <div className="tab-pane fade show active">
                        <h4>
                          {isLoading ? "..." : dashboard?.totalUsers ?? 0}
                        </h4>
                        <p>Total Employees</p>
                      </div>
                    )}
                    {activeTab === "dmembers" && (
                      <div className="tab-pane fade show active">
                        <h4>
                          {isLoading ? "..." : dashboard?.totalDepartments ?? 0}
                        </h4>
                        <p>Department Team Members</p>
                      </div>
                    )}
                    {activeTab === "nhires" && (
                      <div className="tab-pane fade show active">
                        <h4>
                          {isLoading ? "..." : dashboard?.newHiresCount ?? 0}
                        </h4>
                        <p>New Hires This Week</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="overview-tmembers">
                <div className="overview-rhead">
                  <h3 className="dash-title">Department Members</h3>
                </div>
                <ul className="dmemebers-list">
                  {dashboard.departmentEmployees &&
                  dashboard.departmentEmployees.length > 0 ? (
                    dashboard.departmentEmployees.map((emp) => (
                      <li key={emp.employeeId}>
                        <div className="dmemebers-wrapper">
                          <img className="img-fluid" src={User} alt="Profile" />
                          <h3>
                            <span>{emp.employeeId} -</span> {emp.firstName}{" "}
                            {emp.lastName}
                          </h3>
                        </div>
                      </li>
                    ))
                  ) : (
                    <li>
                      <div className="dmemebers-wrapper">
                        <h3>No users</h3>
                      </div>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Overview;
