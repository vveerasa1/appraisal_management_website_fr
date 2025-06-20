import { useState } from 'react'
import "./style.css"
import { Link } from 'react-router-dom'
import PartyPaper from '../../assets/images/party-popper.png'
import ProfileImg from '../../assets/images/user.png'
import User from "../../assets/images/user-thumbnail.png";
import {
    useGetUserQuery,
    useGetDashboardQuery,
} from "../../services/features/users/userApi";

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState("employee");

    const handleTabChange = (tab) => {
        setActiveTab(tab);
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

    return (
        <>
            <div className='pageTanDiv'>
                <ul className='pageTabPane'>
                    <li className='active'>
                        <Link to="/admin/dashboard">Dashboard</Link>
                    </li>
                </ul>
            </div>
            <div className='dashboard-wrapper'>
                <div className='dashboard-cards-wrapper'>
                    {/* <div className='row'>
                    <div className='col-12 col-md-6 col-lg-6'>
                        <div className='dashcounts-wrapper'>
                            <div className='dashcounts-item'>
                                <p>Employees</p>
                                <h2>10</h2>
                            </div>
                            <div className='dashcounts-item'>
                                <p>Roles</p>
                                <h2>3</h2>
                            </div>
                            <div className='dashcounts-item'>
                                <p>New Hires</p>
                                <h2>2</h2>
                            </div>
                        </div>
                    </div>
                </div> */}
                    <div className='row mt-2'>
                        <div className='col-12 col-md-9 col-lg-9'>
                            <div className='row'>
                                <div className='col-12 col-md-6 col-lg-6 mb-4'>
                                    <div className='dashbord-cards-wrapper'>
                                        <div className='dc-head'>
                                            <h3 className='dash-title'>New Hires</h3>
                                        </div>
                                        <div className='dc-body'>
                                            <ul className='dc-list'>
                                                <li>
                                                    <div className='dc-list-inner'>
                                                        <img className='img-fluid dc-list-img' src={ProfileImg} alt='Profile' />
                                                        <div className='dc-list-info'>
                                                            <h3>Welcome On-Board John Doe!</h3>
                                                            <p>16 May 2020, 6:57 PM</p>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-12 col-md-6 col-lg-6 mb-4'>
                                    <div className='dashbord-cards-wrapper'>
                                        <div className='dc-head'>
                                            <h3 className='dash-title'>Work Anniversary</h3>
                                        </div>
                                        <div className='dc-body'>
                                            <ul className='dc-list'>
                                                <li>
                                                    <div className='dc-list-inner'>
                                                        <img className='img-fluid dc-list-img' src={ProfileImg} alt='Profile' />
                                                        <div className='dc-list-info'>
                                                            <h3>Mary Joe</h3>
                                                            <p>Completing <b>10</b> Years<img className='img-fluid small-img' src={PartyPaper} alt='Profile' /></p>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-12 col-md-6 col-lg-6 mb-4'>
                                    <div className='dashbord-cards-wrapper'>
                                        <div className='dc-head'>
                                            <h3 className='dash-title'>Birthdays</h3>
                                        </div>
                                        <div className='dc-body'>
                                            <div className='no-results-wrapper'>
                                                <p>No results found.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-12 col-md-3 col-lg-3'>
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
                                                className={`nav-link ${activeTab === "employee" ? "active" : ""
                                                    }`}
                                                onClick={() => handleTabChange("employee")}
                                            >
                                                Employees
                                            </button>
                                        </li>
                                        <li className="nav-item">
                                            <button
                                                className={`nav-link ${activeTab === "dmembers" ? "active" : ""
                                                    }`}
                                                onClick={() => handleTabChange("dmembers")}
                                            >
                                                Department
                                            </button>
                                        </li>
                                        <li className="nav-item">
                                            <button
                                                className={`nav-link ${activeTab === "nhires" ? "active" : ""
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

export default Dashboard;