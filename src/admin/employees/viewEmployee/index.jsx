import { useParams, Link } from "react-router-dom";
import { useGetUserQuery } from "../../../services/features/users/userApi";
import ProfileImg from "../../../assets/images/user.png";
import "./style.css";

const ViewEmployee = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetUserQuery(id);

  if (isLoading) return <div>Loading...</div>;
  if (isError || !data?.data) return <div>Failed to load employee data.</div>;

  const user = data.data;

  return (
    <>
      <div className="pageTanDiv">
        <div className="viewPageTopDiv">
          <div className="lvDiv">
            <Link to="/admin/employees">
              <i className="fa fa-angle-left"></i>
            </Link>
            <img className="img-fluid" src={ProfileImg} alt="Profile" />
            <p>
              {user.employeeId} - {user.firstName} {user.lastName}
            </p>
          </div>
          <div className="rvDiv">
            <Link
              to={`/admin/employee/edit/${user._id}`}
              className="rvDiv-btns"
              type="button"
            >
              <i className="fa fa-pencil"></i>
            </Link>
            <button className="rvDiv-btns delete" type="button">
              <i className="fa fa-trash"></i>
            </button>
          </div>
        </div>
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
                      value={user.firstName || ""}
                      disabled
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                  <div className="editform-group">
                    <label className="editform-label">Last Name</label>
                    <input
                      type="text"
                      className="editform-input"
                      value={user.lastName || ""}
                      disabled
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                  <div className="editform-group">
                    <label className="editform-label">Email Address</label>
                    <input
                      type="text"
                      className="editform-input"
                      value={user.email || ""}
                      disabled
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                  <div className="editform-group">
                    <label className="editform-label">Phone Number</label>
                    <input
                      type="text"
                      className="editform-input"
                      value={user.phoneNumber || ""}
                      disabled
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                  <div className="editform-group">
                    <label className="editform-label">Employee ID</label>
                    <input
                      type="text"
                      className="editform-input"
                      value={user.employeeId || ""}
                      disabled
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                  <div className="editform-group">
                    <label className="editform-label">Department</label>
                    <input
                      type="text"
                      className="editform-input"
                      value={user.department?.name || ""}
                      disabled
                    />
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
                      }
                      disabled
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                  <div className="editform-group">
                    <label className="editform-label">Roles</label>
                    <input
                      type="text"
                      className="editform-input"
                      value={user.role ? `${user.role?.name}` : ""}
                      disabled
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                  <div className="editform-group">
                    <label className="editform-label">Designation</label>
                    <input
                      type="text"
                      className="editform-input"
                      value={user.designation?.name || ""}
                      disabled
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                  <div className="editform-group">
                    <label className="editform-label">Date of Joining</label>
                    <input
                      type="text"
                      className="editform-input"
                      value={
                        user.dateOfJoining
                          ? user.dateOfJoining.slice(0, 10)
                          : ""
                      }
                      disabled
                    />
                  </div>
                </div>
                <div className="col-12 col-md-12 col-lg-12">
                  <h3 className="small-heading">Address Details</h3>
                </div>
                <div className="col-12 col-md-6 col-lg-6">
                  <div className="editform-group">
                    <label className="editform-label">Address</label>
                    <input
                      type="text"
                      className="editform-input"
                      value={user.address || ""}
                      disabled
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-3">
                  <div className="editform-group">
                    <label className="editform-label">City</label>
                    <input
                      type="text"
                      className="editform-input"
                      value={user.city || ""}
                      disabled
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-3">
                  <div className="editform-group">
                    <label className="editform-label">Province</label>
                    <input
                      type="text"
                      className="editform-input"
                      value={user.province || ""}
                      disabled
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                  <div className="editform-group">
                    <label className="editform-label">Postal Code</label>
                    <input
                      type="text"
                      className="editform-input"
                      value={user.postalCode || ""}
                      disabled
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                  <div className="editform-group">
                    <label className="editform-label">Country</label>
                    <input
                      type="text"
                      className="editform-input"
                      value={user.country || ""}
                      disabled
                    />
                  </div>
                </div>
                <div className="col-12 col-md-12 col-lg-12">
                  <h3 className="small-heading">Other Details</h3>
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                  <div className="editform-group">
                    <label className="editform-label">Added By</label>
                    <input
                      type="text"
                      className="editform-input"
                      value={
                        user.createdBy
                          ? `${user.createdBy.firstName} ${user.createdBy.lastName}`
                          : "-"
                      }
                      disabled
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                  <div className="editform-group">
                    <label className="editform-label">Added Time</label>
                    <input
                      type="text"
                      className="editform-input"
                      value={
                        user.createdAt
                          ? new Date(user.createdAt).toLocaleString()
                          : "-"
                      }
                      disabled
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                  <div className="editform-group">
                    <label className="editform-label">Modified By</label>
                    <input
                      type="text"
                      className="editform-input"
                      value={
                        user.modifiedBy
                          ? `${user.modifiedBy.firstName} ${user.modifiedBy.lastName}`
                          : "-"
                      }
                      disabled
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                  <div className="editform-group">
                    <label className="editform-label">Modified Time</label>
                    <input
                      type="text"
                      className="editform-input"
                      value={
                        user.modifiedTime
                          ? new Date(user.modifiedTime).toLocaleString()
                          : "-"
                      }
                      disabled
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                  <div className="editform-group">
                    <label className="editform-label">Total Points</label>
                    <input
                      type="text"
                      className="editform-input"
                      value={user.totalPoints ?? "-"}
                      disabled
                    />
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

export default ViewEmployee;
