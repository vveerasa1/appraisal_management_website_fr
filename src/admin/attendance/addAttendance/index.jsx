import React, { useState } from "react";
import "./style.css";
import { Link } from 'react-router-dom'
import { useGetAllUsersForAppraisalQuery } from "../../../services/features/users/userApi";
import { useSelector } from "react-redux";

const AdminAddAttendance = () => {
    const userId = useSelector((state) => state.users.id);
    const { data, isLoading } = useGetAllUsersForAppraisalQuery(userId);
    const users = data?.data?.users || [];

    // State management for form fields
    const [employeeId, setEmployeeId] = useState("");
    const [date, setDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [status, setStatus] = useState("");
    const [remarks, setRemarks] = useState("");

    // State for error messages
    const [errors, setErrors] = useState({});

    // Reset form fields and errors to initial state
    const resetForm = () => {
        setEmployeeId("");
        setDate("");
        setStartTime("");
        setEndTime("");
        setStatus("");
        setRemarks("");
        setErrors({});
    };

    // Validate form fields and set error messages
    const validateForm = () => {
        const newErrors = {};
        if (!employeeId) {
            newErrors.employeeId = "Please select an employee.";
        }
        if (!date) {
            newErrors.date = "Please select a date.";
        }
        if (!startTime) {
            newErrors.startTime = "Please select a start time.";
        }
        if (!endTime) {
            newErrors.endTime = "Please select an end time.";
        }
        if (!status) {
            newErrors.status = "Please select a status.";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission (placeholder)
    const handleSaveAttendance = () => {
        if (!validateForm()) {
            return;
        }
        // Placeholder for API call or further processing
        console.log({
            employeeId,
            date,
            startTime,
            endTime,
            status,
            remarks,
        });
        alert("Attendance saved successfully!");
        resetForm();
    };

    return (
        <>
            <div className='pageTanDiv'>
                <ul className='pageTabPane'>
                    <li className='active'>
                        <Link to="/admin/attendance">Attendance</Link>
                    </li>
                </ul>
            </div>
            <form className='form-list-container' onSubmit={e => e.preventDefault()}>
                <div className='row'>
                    <div className="col-12 col-md-12 col-lg-12">
                        <div className='form-list-wrapper'>
                            <div className='row'>
                                <div className='col-12 col-md-6 col-lg-4'>
                                    <div className='forn-group'>
                                        <label className='form-label'>Employee</label>
                                        <select
                                            className='form-input'
                                            value={employeeId}
                                            onChange={(e) => setEmployeeId(e.target.value)}
                                        >
                                            <option value="">---Select Employee---</option>
                                            {users.length === 0 && !isLoading && (
                                                <option disabled>No users found</option>
                                            )}
                                            {users.map((user) => (
                                                <option key={user._id} value={user._id}>
                                                    {user.firstName} {user.lastName}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.employeeId && (
                                            <div className="error-message">{errors.employeeId}</div>
                                        )}
                                    </div>
                                </div>
                                <div className='col-12 col-md-6 col-lg-4'>
                                    <div className='forn-group'>
                                        <label className='form-label'>Date</label>
                                        <input
                                            type='date'
                                            className='form-input'
                                            value={date}
                                            onChange={(e) => setDate(e.target.value)}
                                        />
                                        {errors.date && (
                                            <div className="error-message">{errors.date}</div>
                                        )}
                                    </div>
                                </div>
                                <div className='col-12 col-md-6 col-lg-4'>
                                    <div className='forn-group'>
                                        <label className='form-label'>Start Time</label>
                                        <input
                                            type='time'
                                            className='form-input'
                                            value={startTime}
                                            onChange={(e) => setStartTime(e.target.value)}
                                        />
                                        {errors.startTime && (
                                            <div className="error-message">{errors.startTime}</div>
                                        )}
                                    </div>
                                </div>
                                <div className='col-12 col-md-6 col-lg-4'>
                                    <div className='forn-group'>
                                        <label className='form-label'>End Time</label>
                                        <input
                                            type='time'
                                            className='form-input'
                                            value={endTime}
                                            onChange={(e) => setEndTime(e.target.value)}
                                        />
                                        {errors.endTime && (
                                            <div className="error-message">{errors.endTime}</div>
                                        )}
                                    </div>
                                </div>
                                <div className='col-12 col-md-6 col-lg-4'>
                                    <div className='forn-group'>
                                        <label className='form-label'>Status</label>
                                        <select
                                            className='form-input'
                                            value={status}
                                            onChange={(e) => setStatus(e.target.value)}
                                        >
                                            <option value="">---Select Status---</option>
                                            <option value="Leave">Leave</option>
                                            <option value="Absent">Absent</option>
                                            <option value="Present">Present</option>
                                        </select>
                                        {errors.status && (
                                            <div className="error-message">{errors.status}</div>
                                        )}
                                    </div>
                                </div>

                                <div className="col-12 col-md-6 col-lg-12">
                                    <div className="forn-group">
                                        <label className="form-label">
                                            Remarks
                                        </label>
                                        <textarea
                                            cols={30}
                                            rows={3}
                                            className="form-input"
                                            value={remarks}
                                            onChange={(e) => setRemarks(e.target.value)}
                                        ></textarea>
                                    </div>
                                </div>

                                <div className='col-12 col-md-12 col-lg-12'>
                                    <div className='submit-btn-block'>
                                        <button
                                            className='theme-btn btn-border'
                                            type='button'
                                            onClick={resetForm}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            className='theme-btn btn-blue'
                                            type='button'
                                            onClick={handleSaveAttendance}
                                        >
                                            Save Attendance
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
