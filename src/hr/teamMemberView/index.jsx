import React, { useState } from "react";
import "./style.css";
import { Link, useParams } from "react-router-dom"; // Import useParams
import ProfileImg from "../../assets/images/user.png";
import { useGetUserQuery } from "../../services/features/users/userApi"; // Ensure correct path

const TeamMemberView = () => {
  const { id } = useParams(); // Get the ID from the URL parameters
  const { data, isLoading, isError } = useGetUserQuery(id); // Pass the ID to the query

  if (isLoading) {
    return <div className="loading-state">Loading employee data...</div>;
  }
  if (isError || !data?.data) {
    return <div className="error-state">Failed to load employee data.</div>;
  }

  const user = data.data; // Access the user object from data.data

  // Function to format date
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB"); // Adjust locale as needed (e.g., 'en-US' for MM/DD/YYYY)
  };

  return (
    <>
      <div className="pageTanDiv">
        <ul className="pageTabPane">
          <div className="lvDiv">
            <Link to="/hr/team-members">
              <i className="fa fa-angle-left"></i>
            </Link>
            <img
              className="img-fluid"
              src={user.profilePhotoUrl || ProfileImg} // Use actual profile photo if available, else fallback
              alt={`${user.firstName} ${user.lastName}'s Profile`}
            />
            <p>
              {user.employeeId} - {user.firstName} {user.lastName}
            </p>
          </div>
          {/* <li>
            <Link to={`/hr/adjust-points/${user._id}`}>Adjust Points</Link>{" "}
          </li>
          <li>
            <Link to={`/hr/points-history/${user._id}`}>Points History</Link>{" "}
          </li> */}
        </ul>
      </div>
      <div className="view-container">
        <div className="row">
          <div className="col-12 col-md-12 col-lg-12">
            <div className="view-other-info">
              <h3 className="small-heading">Employee Details</h3>
              <div className="row">
                <div className="col-12 col-md-6 col-lg-4">
                  <div className="editform-group">
                    <label className="editform-label">First Name</label>
                    <input
                      type="text"
                      className="editform-input"
                      value={user.firstName || ""} // Use actual data
                      placeholder=""
                      readOnly // Make it read-only for view mode
                    />
                    {/* Placeholder for edit functionality - will require state management for edit mode */}
                    {/* <div className="ef-actionbtns">
                      <button className="editform-btn" type="button">
                        <i className="fa fa-pencil"></i>
                      </button>
                    </div> */}
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                  <div className="editform-group">
                    <label className="editform-label">Last Name</label>
                    <input
                      type="text"
                      className="editform-input"
                      value={user.lastName || ""} // Use actual data
                      placeholder=""
                      readOnly
                    />
                    {/* <div className="ef-actionbtns">
                      <button className="editform-btn" type="button">
                        <i className="fa fa-pencil"></i>
                      </button>
                    </div> */}
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                  <div className="editform-group">
                    <label className="editform-label">Email Address</label>
                    <input
                      type="text"
                      className="editform-input"
                      value={user.email || ""} // Use actual data
                      placeholder=""
                      disabled // Disabled as per original code, or use readOnly
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                  <div className="editform-group">
                    <label className="editform-label">Phone Number</label>
                    <input
                      type="text"
                      className="editform-input"
                      value={user.phoneNumber || ""} // Use actual data
                      placeholder=""
                      readOnly
                    />
                    {/* <div className="ef-actionbtns">
                      <button className="editform-btn" type="button">
                        <i className="fa fa-pencil"></i>
                      </button>
                    </div> */}
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                  <div className="editform-group">
                    <label className="editform-label">Employee ID</label>
                    <input
                      type="text"
                      className="editform-input"
                      value={user.employeeId || ""} // Use actual data
                      placeholder=""
                      readOnly
                    />
                    {/* <div className="ef-actionbtns">
                      <button className="editform-btn" type="button">
                        <i className="fa fa-pencil"></i>
                      </button>
                    </div> */}
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                  <div className="editform-group">
                    <label className="editform-label">Department</label>
                    <input
                      type="text"
                      className="editform-input"
                      value={user.department?.name || ""} // Access nested property
                      placeholder=""
                      readOnly
                    />
                    {/* <div className="ef-actionbtns">
                      <button className="editform-btn" type="button">
                        <i className="fa fa-pencil"></i>
                      </button>
                    </div> */}
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                  <div className="editform-group">
                    <label className="editform-label">Reporting to</label>
                    <input
                      type="text"
                      className="editform-input"
                      value={
                        user.reportingTo
                          ? `${user.reportingTo.employeeId} - ${user.reportingTo.firstName} ${user.reportingTo.lastName}`
                          : ""
                      } // Access nested property
                      placeholder=""
                      readOnly
                    />
                    {/* <div className="ef-actionbtns">
                      <button className="editform-btn" type="button">
                        <i className="fa fa-pencil"></i>
                      </button>
                    </div> */}
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                  <div className="editform-group">
                    <label className="editform-label">Designation</label>
                    <input
                      type="text"
                      className="editform-input"
                      value={user.designation?.name || ""} // Access nested property
                      placeholder=""
                      readOnly
                    />
                    {/* <div className="ef-actionbtns">
                      <button className="editform-btn" type="button">
                        <i className="fa fa-pencil"></i>
                      </button>
                    </div> */}
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                  <div className="editform-group">
                    <label className="editform-label">Date of Joining</label>
                    <input
                      type="text"
                      className="editform-input"
                      value={formatDate(user.dateOfJoining)} // Format date
                      placeholder=""
                      readOnly
                    />
                    {/* <div className="ef-actionbtns">
                      <button className="editform-btn" type="button">
                        <i className="fa fa-pencil"></i>
                      </button>
                    </div> */}
                  </div>
                </div>
                {/* --- Address Details --- */}
                <div className="col-12 col-md-12 col-lg-12">
                  <h3 className="small-heading">Address Details</h3>
                </div>
                <div className="col-12 col-md-6 col-lg-6">
                  <div className="editform-group">
                    <label className="editform-label">Address</label>
                    <input
                      type="text"
                      className="editform-input"
                      value={user.address || ""} // Use actual data
                      placeholder=""
                      readOnly
                    />
                    {/* <div className="ef-actionbtns">
                      <button className="editform-btn" type="button">
                        <i className="fa fa-pencil"></i>
                      </button>
                    </div> */}
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-3">
                  <div className="editform-group">
                    <label className="editform-label">City</label>
                    <input
                      type="text"
                      className="editform-input"
                      value={user.city || ""} // Use actual data
                      placeholder=""
                      readOnly
                    />
                    {/* <div className="ef-actionbtns">
                      <button className="editform-btn" type="button">
                        <i className="fa fa-pencil"></i>
                      </button>
                    </div> */}
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-3">
                  <div className="editform-group">
                    <label className="editform-label">Province</label>
                    <input
                      type="text"
                      className="editform-input"
                      value={user.province || ""} // Use actual data
                      placeholder=""
                      readOnly
                    />
                    {/* <div className="ef-actionbtns">
                      <button className="editform-btn" type="button">
                        <i className="fa fa-pencil"></i>
                      </button>
                    </div> */}
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                  <div className="editform-group">
                    <label className="editform-label">Postal Code</label>
                    <input
                      type="text"
                      className="editform-input"
                      value={user.postalCode || ""} // Use actual data
                      placeholder=""
                      readOnly
                    />
                    {/* <div className="ef-actionbtns">
                      <button className="editform-btn" type="button">
                        <i className="fa fa-pencil"></i>
                      </button>
                    </div> */}
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                  <div className="editform-group">
                    <label className="editform-label">Country</label>
                    <input
                      type="text"
                      className="editform-input"
                      value={user.country || ""} // Use actual data
                      placeholder=""
                      readOnly
                    />
                    {/* <div className="ef-actionbtns">
                      <button className="editform-btn" type="button">
                        <i className="fa fa-pencil"></i>
                      </button>
                    </div> */}
                  </div>
                </div>
                <div className="col-12 col-md-12 col-lg-12">
                  <div className="submit-btn-block">
                    {/* <button className="theme-btn btn-blue" type="button">
                      Save Changes
                    </button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeamMemberView;
