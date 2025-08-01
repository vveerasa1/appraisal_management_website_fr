import React, { useState, useEffect, useMemo } from "react";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import MultiSelectWithSearch from "../../../components/common/MultiSelectWithSearch";
import { useAddAttendanceMutation } from "../../../services/features/attendance/attendanceApi";
import { useGetReportersQuery } from "../../../services/features/users/userApi";
import { useSelector } from "react-redux";
import { showSuccessToast, showErrorToast } from "../../../utils/toast";

const AdminAddAttendance = () => {
  // --- Calculate Today's Date ---
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed, add 1, pad with '0'
  const day = String(today.getDate()).padStart(2, "0"); // Pad with '0'
  const defaultDate = `${year}-${month}-${day}`;

  const userId = useSelector((state) => state.users.id);
  const navigate = useNavigate();

  // --- Initialize formData with default values ---
  const [formData, setFormData] = React.useState({
    selectedEmployeeIds: [],
    date: defaultDate, // Default to today's date
    checkInTime: "09:30", // Default check-in time
    checkOutTime: "18:30", // Default check-out time
    status: "",
    permissionFrom: "",
    permissionTo: "",
    remarks: "",
  });

  const [errors, setErrors] = React.useState({});

  const [addAttendance, { isLoading: isAddingAttendance }] =
    useAddAttendanceMutation();

  const {
    data: reportersData,
    isLoading: isLoadingReporters,
    isError: isErrorReporters,
    error: reportersError,
  } = useGetReportersQuery();

  const employeeOptions = useMemo(() => {
    // Corrected access to data and added a console.log for debugging
    if (
      reportersData?.data &&
      Array.isArray(reportersData.data) &&
      reportersData.data.length > 0
    ) {
      // console.log("Actual Reporters Data Structure:", reportersData.data); // Keep this for debugging if needed
      return reportersData.data.map((reporter) => ({
        id: reporter._id, // Use _id from API as the unique identifier
        // Ensure 'firstName' and 'lastName' are the correct property names from your backend API response
        label: `${reporter.firstName || ""} ${reporter.lastName || ""}`, // Combine first and last name for display, handle potential undefined
      }));
    }
    return [];
  }, [reportersData]);

  const handleEmployeeSelection = (selectedIds) => {
    if (selectedIds.includes("all")) {
      setFormData((prev) => ({
        ...prev,
        selectedEmployeeIds: employeeOptions.map((emp) => emp.id),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        selectedEmployeeIds: selectedIds,
      }));
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (formData.selectedEmployeeIds.length === 0) {
      newErrors.employees = "Please select at least one employee.";
    }
    if (!formData.date) {
      newErrors.date = "Please select a date.";
    }

    const isTimingRequired =
      formData.status !== "Leave" && formData.status !== "Absent";
    if (isTimingRequired) {
      if (!formData.checkInTime) {
        newErrors.checkInTime = "Please select check-in time.";
      }
      if (!formData.checkOutTime) {
        newErrors.checkOutTime = "Please select check-out time.";
      }
      if (
        formData.checkInTime &&
        formData.checkOutTime &&
        formData.checkInTime >= formData.checkOutTime
      ) {
        newErrors.checkInOutTime =
          "Check-out time must be after check-in time.";
      }
    }

    if (formData.status === "Permission") {
      if (!formData.permissionFrom) {
        newErrors.permissionFrom = "Please select permission start time.";
      }
      if (!formData.permissionTo) {
        newErrors.permissionTo = "Please select permission end time.";
      }
      if (
        formData.permissionFrom &&
        formData.permissionTo &&
        formData.permissionFrom >= formData.permissionTo
      ) {
        newErrors.permissionTime =
          "Permission end time must be after permission start time.";
      }
    }

    if (!formData.status) {
      newErrors.status = "Please select status.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      employeeIds: formData.selectedEmployeeIds,
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

    // Assuming you get the current user's ID from Redux state
    payload.userId = userId; // Ensure this path is correct for your Redux store

    console.log("Submitting payload:", payload);

    try {
      await addAttendance(payload).unwrap();
      showSuccessToast("Attendance added successfully!");
      navigate("/admin/attendance");

      // Reset form on success
      setFormData({
        selectedEmployeeIds: [],
        date: defaultDate, // Reset to today's date
        checkInTime: "09:30", // Reset to default check-in time
        checkOutTime: "18:30", // Reset to default check-out time
        status: "",
        permissionFrom: "",
        permissionTo: "",
        remarks: "",
      });
      setErrors({});
    } catch (error) {
      showErrorToast(
        err?.data?.message ||
          err?.error ||
          err?.message ||
          "Failed to add attendence."
      );
    }
  };

  const showCheckInOutTimes =
    formData.status !== "Leave" && formData.status !== "Absent";
  const showPermissionTimes = formData.status === "Permission";

  return (
    <>
      <div className="pageTanDiv">
        <ul className="pageTabPane">
          <li className="active">
            <Link to="/admin/attendance">Attendance</Link>
          </li>
        </ul>
      </div>
      <form className="form-list-container" onSubmit={handleSubmit} noValidate>
        <div className="row">
          <div className="col-12 col-md-12 col-lg-12">
            <div className="form-list-wrapper">
              <div className="row">
                <div className="col-12 col-md-6 col-lg-4">
                  <div className="forn-group">
                    <label className="form-label">Employee</label>
                    {isLoadingReporters ? (
                      <div>Loading employees...</div>
                    ) : isErrorReporters ? (
                      <div className="error-text">
                        Error loading employees:{" "}
                        {reportersError?.message || "Unknown error"}
                      </div>
                    ) : (
                      <MultiSelectWithSearch
                        options={employeeOptions}
                        value={formData.selectedEmployeeIds}
                        onChange={handleEmployeeSelection}
                        placeholder="Select employees"
                      />
                    )}
                    {errors.employees && (
                      <div className="error-text">{errors.employees}</div>
                    )}
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                  <div className="forn-group">
                    <label className="form-label">Date</label>
                    <input
                      type="date"
                      className="form-input"
                      value={formData.date}
                      onChange={(e) => handleChange("date", e.target.value)}
                    />
                    {errors.date && (
                      <div className="error-text">{errors.date}</div>
                    )}
                  </div>
                </div>

                <div className="col-12 col-md-6 col-lg-4">
                  <div className="forn-group">
                    <label className="form-label">Status</label>
                    <select
                      className="form-input"
                      value={formData.status}
                      onChange={(e) => handleChange("status", e.target.value)}
                    >
                      <option value="">---Select Status---</option>
                      <option value="Leave">Leave</option>
                      <option value="Absent">Absent</option>
                      <option value="Present">Present</option>
                      <option value="HalfDay">Half Day</option>
                      <option value="Permission">Permission</option>
                    </select>
                    {errors.status && (
                      <div className="error-text">{errors.status}</div>
                    )}
                  </div>
                </div>

                {showCheckInOutTimes && (
                  <>
                    <div className="col-12 col-md-6 col-lg-4">
                      <div className="forn-group">
                        <label className="form-label">Check-in Time</label>
                        <input
                          type="time"
                          className="form-input"
                          value={formData.checkInTime}
                          onChange={(e) =>
                            handleChange("checkInTime", e.target.value)
                          }
                        />
                        {errors.checkInTime && (
                          <div className="error-text">{errors.checkInTime}</div>
                        )}
                      </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
                      <div className="forn-group">
                        <label className="form-label">Check-out Time</label>
                        <input
                          type="time"
                          className="form-input"
                          value={formData.checkOutTime}
                          onChange={(e) =>
                            handleChange("checkOutTime", e.target.value)
                          }
                          min={formData.checkInTime}
                        />
                        {errors.checkOutTime && (
                          <div className="error-text">
                            {errors.checkOutTime}
                          </div>
                        )}
                        {errors.checkInOutTime && (
                          <div className="error-text">
                            {errors.checkInOutTime}
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}

                {showPermissionTimes && (
                  <>
                    <div className="col-12 col-md-6 col-lg-4">
                      <div className="forn-group">
                        <label className="form-label">Permission From</label>
                        <input
                          type="time"
                          className="form-input"
                          value={formData.permissionFrom}
                          onChange={(e) =>
                            handleChange("permissionFrom", e.target.value)
                          }
                        />
                        {errors.permissionFrom && (
                          <div className="error-text">
                            {errors.permissionFrom}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
                      <div className="forn-group">
                        <label className="form-label">Permission To</label>
                        <input
                          type="time"
                          className="form-input"
                          value={formData.permissionTo}
                          onChange={(e) =>
                            handleChange("permissionTo", e.target.value)
                          }
                          min={formData.permissionFrom}
                        />
                        {errors.permissionTo && (
                          <div className="error-text">
                            {errors.permissionTo}
                          </div>
                        )}
                        {errors.permissionTime && (
                          <div className="error-text">
                            {errors.permissionTime}
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}

                <div className="col-12 col-md-6 col-lg-12">
                  <div className="forn-group">
                    <label className="form-label">Note</label>
                    <textarea
                      cols={30}
                      rows={3}
                      className="form-input"
                      value={formData.remarks}
                      onChange={(e) => handleChange("remarks", e.target.value)}
                    ></textarea>
                  </div>
                </div>

                <div className="col-12 col-md-12 col-lg-12">
                  <div className="submit-btn-block">
                    <button
                      className="theme-btn btn-border"
                      type="button"
                      onClick={() => window.history.back()}
                    >
                      Cancel
                    </button>
                    <button
                      className="theme-btn btn-blue"
                      type="submit"
                      disabled={isAddingAttendance || isLoadingReporters}
                    >
                      {isAddingAttendance
                        ? "Saving..."
                        : isLoadingReporters
                        ? "Loading Employees..."
                        : "Save"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default AdminAddAttendance;
