import { useState } from "react";
import "./style.css";
import { Link, useParams, useNavigate } from "react-router-dom";
import ProfileImg from "../../../assets/images/user.png";
import { useGetAttendanceQuery, useDeleteAttendanceMutation } from "../../../services/features/attendance/attendanceApi";
import dayjs from "dayjs";
import { showSuccessToast, showErrorToast } from "../../../utils/toast";

const AdminViewAttendance = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetAttendanceQuery(id);
  const navigate = useNavigate();

  const [deleteAttendance, { isLoading: isDeleting }] =
    useDeleteAttendanceMutation();

  if (isLoading) {
    return <div className="loading-message">Loading attendance details...</div>;
  }

  if (error) {
    return (
      <div className="error-message">
        Error: Unable to fetch data. Please try again.
      </div>
    );
  }

  const attendanceData = data?.data;

  const handleDelete = async () => {
    if (!attendanceData?._id) return;
    if (!window.confirm("Are you sure you want to delete this Attendence?"))
      return;
    try {
      await deleteAttendance(attendanceData?._id).unwrap();
      showSuccessToast("Attendance deleted successfully!");
      // Optionally redirect after delete:
      navigate("/admin/attendance");
    } catch (err) {
      const errorMsg =
        err?.data?.message ||
        err?.error ||
        err?.message ||
        "Failed to delete Attendence.";
      showErrorToast(errorMsg);
    }
  };

  // Handle case where no data is found for the given ID
  if (!attendanceData) {
    return <div className="not-found-message">No attendance record found.</div>;
  }

  // Use a null-safe approach for nested data
  const employeeName = attendanceData.employeeId
    ? `${attendanceData.employeeId.firstName} ${attendanceData.employeeId.lastName}`
    : "Unknown Employee";

  const addedByName = attendanceData.addedBy
    ? `${attendanceData.addedBy.firstName} ${attendanceData.addedBy.lastName}`
    : "Unknown User";

  const modifiedByName = attendanceData.modifiedBy
    ? `${attendanceData.modifiedBy.firstName} ${attendanceData.modifiedBy.lastName}`
    : null;

  console.log("Check-in Time from API:", attendanceData.checkInTime);

  return (
    <>
      <div className="pageTanDiv">
        <div className="viewPageTopDiv">
          <div className="lvDiv">
            <Link to="/admin/attendance">
              <i className="fa fa-angle-left"></i>
            </Link>
            <img className="img-fluid" src={ProfileImg} alt="Profile" />
            <p>
              {attendanceData.employeeId.employeeId} - {employeeName}
            </p>
          </div>
          <div className="rvDiv">
            <Link
              to={`/admin/attendance/edit/${attendanceData._id}`}
              className="rvDiv-btns"
              type="button"
            >
              <i className="fa fa-pencil"></i>
            </Link>
            <button
              className="rvDiv-btns delete"
              type="button"
              onClick={handleDelete}
              disabled={isDeleting}
              title="Delete"
            >
              <i className="fa fa-trash"></i>
            </button>
          </div>
        </div>
      </div>
      <div className="view-container">
        <div className="row">
          <div className="col-12 col-md-12 col-lg-12">
            <div className="view-other-info">
              <h3 className="small-heading">Attendance Details</h3>
              <div className="row">
                <div className="col-12 col-md-6 col-lg-4">
                  <div className="editform-group">
                    <label className="editform-label">Employee</label>
                    <input
                      type="text"
                      className="editform-input"
                      value={employeeName}
                      disabled
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                  <div className="editform-group">
                    <label className="editform-label">Date</label>
                    <input
                      type="text"
                      className="editform-input"
                      value={dayjs(attendanceData.date).format("YYYY-MM-DD")}
                      disabled
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                  <div className="editform-group">
                    <label className="editform-label">Check-in Time</label>
                    <input
                      type="text"
                      className="editform-input"
                      value={attendanceData.checkInTime}
                      disabled
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                  <div className="editform-group">
                    <label className="editform-label">Check-out Time</label>
                    <input
                      type="text"
                      className="editform-input"
                      value={attendanceData.checkOutTime}
                      disabled
                    />
                  </div>
                </div>
                {/* --- Conditional rendering for Permission Times --- */}
                {attendanceData.permissionFromTime &&
                  attendanceData.permissionToTime && (
                    <>
                      <div className="col-12 col-md-6 col-lg-4">
                        <div className="editform-group">
                          <label className="editform-label">
                            Permission From Time
                          </label>
                          <input
                            type="text"
                            className="editform-input"
                            value={attendanceData.permissionFromTime}
                            disabled
                          />
                        </div>
                      </div>
                      <div className="col-12 col-md-6 col-lg-4">
                        <div className="editform-group">
                          <label className="editform-label">
                            Permission To Time
                          </label>
                          <input
                            type="text"
                            className="editform-input"
                            value={attendanceData.permissionToTime}
                            disabled
                          />
                        </div>
                      </div>
                    </>
                  )}
                <div className="col-12 col-md-6 col-lg-4">
                  <div className="editform-group">
                    <label className="editform-label">Status</label>
                    <input
                      type="text"
                      className="editform-input"
                      value={attendanceData.status}
                      disabled
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-12">
                  <div className="editform-group">
                    <label className="editform-label">Note</label>
                    <textarea
                      cols={30}
                      rows={3}
                      className="editform-input"
                      value={attendanceData.note}
                      disabled
                    ></textarea>
                  </div>
                </div>
                <div className="col-12">
                  <h3 className="small-heading">Other Details</h3>
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                  <div className="editform-group">
                    <label className="editform-label">Added By</label>
                    <input
                      type="text"
                      className="editform-input"
                      value={addedByName}
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
                      value={dayjs(attendanceData.createdAt).format(
                        "MM/DD/YYYY, h:mm:ss A"
                      )}
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
                      value={modifiedByName}
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
                        attendanceData.modifiedTime
                          ? dayjs(attendanceData.modifiedTime).format(
                              "MM/DD/YYYY, h:mm:ss A"
                            )
                          : ""
                      }
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

export default AdminViewAttendance;
