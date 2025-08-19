import React, { useState, useEffect } from "react";
import "./style.css";
import { Link, useParams, useNavigate } from "react-router-dom";
import ProfileImg from "../../../assets/images/user.png";
import {
  useAddAttendanceMutation,
  useDeleteAttendanceMutation,
  useGetAttendanceQuery,
} from "../../../services/features/attendance/attendanceApi";
import dayjs from "dayjs";
import { showSuccessToast, showErrorToast } from "../../../utils/toast";
import { useSelector } from "react-redux";

const AdminEditAttendance = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetAttendanceQuery(id);
  const userId = useSelector((state) => state.users.id);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    employeeId: "",
    date: "",
    status: "",
    checkInTime: "",
    checkOutTime: "",
    permissionFromTime: "",
    permissionToTime: "",
    note: "",
  });
  const [addAttendance, { isLoading: isAddingAttendance }] =
    useAddAttendanceMutation();
  const [deleteAttendance, { isLoading: isDeleting }] =
    useDeleteAttendanceMutation();

  const [errors, setErrors] = React.useState({});

  const convertTo24HourFormat = (timeStr) => {
    if (!timeStr) {
      return ""; // Return an empty string if there's no time data
    }

    // Split the time string into hours, minutes, and AM/PM parts
    const [time, period] = timeStr.split(" ");
    const [hours, minutes] = time.split(":");
    let newHours = parseInt(hours);

    // Adjust hours for PM
    if (period === "PM" && newHours !== 12) {
      newHours += 12;
    }
    // Adjust hours for 12:xx AM
    if (period === "AM" && newHours === 12) {
      newHours = 0;
    }

    // Pad the hours with a leading zero if needed
    const formattedHours = newHours.toString().padStart(2, "0");

    // Return the new 24-hour format string
    return `${formattedHours}:${minutes}`;
  };

  useEffect(() => {
    if (data) {
      setFormData({
        employeeId: data.data.employeeId._id,
        employeeName: `${data.data.employeeId.firstName} ${data.data.employeeId.lastName}`,
        employeeCode: "ABC1234",
        date: dayjs(data.data.date).format("YYYY-MM-DD"),
        status: data.data.status,
        checkInTime: convertTo24HourFormat(data.data.checkInTime),
        checkOutTime: convertTo24HourFormat(data.data.checkOutTime),
        permissionFromTime: convertTo24HourFormat(data.data.permissionFromTime),
        permissionToTime: convertTo24HourFormat(data.data.permissionToTime),
        note: data.data.note || "",
      });
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      employeeIds: [formData.employeeId],
      date: formData.date,
      status: formData.status,
      note: formData.remarks,
    };

    const isTimingRequired =
      formData.status !== "Leave" && formData.status !== "Absent";
    if (isTimingRequired) {
      payload.checkInTime = formData.checkInTime;
      payload.checkOutTime = formData.checkOutTime;
    }

    if (formData.status === "Permission") {
      payload.permissionFromTime = formData.permissionFrom;
      payload.permissionToTime = formData.permissionTo;
    }

    payload.userId = userId; // Ensure this path is correct for your Redux store
    try {
      await addAttendance(payload).unwrap();
      showSuccessToast("Attendance updated successfully!");
      navigate("/admin/attendance");
      setErrors({});
    } catch (error) {
      showErrorToast(
        err?.data?.message ||
          err?.error ||
          err?.message ||
          "Failed to update attendence."
      );
    }
  };
  const handleDelete = async () => {
    if (!data?.data?._id) return;
    if (!window.confirm("Are you sure you want to delete this Attendence?"))
      return;
    try {
      await deleteAttendance(data?.data?._id).unwrap();
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

  if (!data || !formData.employeeId) {
    return <div className="not-found-message">No attendance record found.</div>;
  }

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
              {formData.employeeCode} - {formData.employeeName}
            </p>
          </div>
          <div className="rvDiv">
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
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-12 col-md-6 col-lg-4">
                    <div className="editform-group">
                      <label className="editform-label">Employee</label>
                      <input
                        type="text"
                        className="editform-input"
                        value={formData.employeeName}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-6 col-lg-4">
                    <div className="editform-group">
                      <label className="editform-label">Date</label>
                      <input
                        type="date"
                        className="editform-input"
                        value={formData.date}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-6 col-lg-4">
                    <div className="editform-group">
                      <label className="editform-label">Status</label>
                      <select
                        className="editform-input"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                      >
                        <option value="Present">Present</option>
                        <option value="Absent">Absent</option>
                        <option value="Permission">Permission</option>
                        <option value="HalfDay">Half Day</option>
                        <option value="Leave">Leave</option>
                      </select>
                    </div>
                  </div>
                  {formData.status === "Permission" && (
                    <>
                      <div className="col-12 col-md-6 col-lg-4">
                        <div className="editform-group">
                          <label className="editform-label">
                            Permission From Time
                          </label>
                          <input
                            type="time"
                            className="editform-input"
                            name="permissionFromTime"
                            value={formData.permissionFromTime}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-12 col-md-6 col-lg-4">
                        <div className="editform-group">
                          <label className="editform-label">
                            Permission To Time
                          </label>
                          <input
                            type="time"
                            className="editform-input"
                            name="permissionToTime"
                            value={formData.permissionToTime}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </>
                  )}
                  {/* Conditional rendering for check-in and check-out fields */}
                  {formData.status !== "Absent" &&
                    formData.status !== "Leave" && (
                      <>
                        <div className="col-12 col-md-6 col-lg-4">
                          <div className="editform-group">
                            <label className="editform-label">
                              Check-in Time
                            </label>
                            <input
                              type="time"
                              className="editform-input"
                              name="checkInTime"
                              value={formData.checkInTime}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-4">
                          <div className="editform-group">
                            <label className="editform-label">
                              Check-out Time
                            </label>
                            <input
                              type="time"
                              className="editform-input"
                              name="checkOutTime"
                              value={formData.checkOutTime}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      </>
                    )}
                  <div className="col-12 col-md-6 col-lg-12">
                    <div className="editform-group">
                      <label className="editform-label">Note</label>
                      <textarea
                        cols={30}
                        rows={3}
                        className="editform-input"
                        name="note"
                        value={formData.note}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                  </div>
                  <div className="col-12 col-md-12 col-lg-12">
                    <div className="submit-btn-block">
                      <button
                        className="theme-btn btn-blue"
                        type="submit"
                        disabled={isAddingAttendance}
                      >
                        {isAddingAttendance ? "Saving..." : "Save"}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminEditAttendance;
