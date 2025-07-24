import React, { useState } from "react";
import "./style.css";
import { Link } from 'react-router-dom';
import MultiSelectWithSearch from '../../../components/common/MultiSelectWithSearch';

const employeeOptions = [
  { id: 1, label: 'John Doe' },
  { id: 2, label: 'Mary Joe' },
  { id: 3, label: 'William Smith' },
];

const AdminAddAttendance = () => {
  const [formData, setFormData] = React.useState({
    selectedEmployeeIds: [],
    date: '',
    startTime: '',
    endTime: '',
    status: '',
    remarks: '',
  });

  const [errors, setErrors] = React.useState({});

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (formData.selectedEmployeeIds.length === 0) {
      newErrors.employees = 'Please select at least one employee.';
    }
    if (!formData.date) {
      newErrors.date = 'Please select a date.';
    }
    if (!formData.startTime) {
      newErrors.startTime = 'Please select start time.';
    }
    if (!formData.endTime) {
      newErrors.endTime = 'Please select end time.';
    }
    if (formData.startTime && formData.endTime && formData.startTime >= formData.endTime) {
      newErrors.time = 'End time must be after start time.';
    }
    if (!formData.status) {
      newErrors.status = 'Please select status.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const attendanceData = {
      employees: formData.selectedEmployeeIds,
      date: formData.date,
      startTime: formData.startTime,
      endTime: formData.endTime,
      status: formData.status,
      remarks: formData.remarks,
    };

    // TODO: Replace with actual API call
    console.log('Submitting attendance:', attendanceData);
    alert('Attendance saved successfully!');
    // Reset form
    setFormData({
      selectedEmployeeIds: [],
      date: '',
      startTime: '',
      endTime: '',
      status: '',
      remarks: '',
    });
    setErrors({});
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
      <form className='form-list-container' onSubmit={handleSubmit} noValidate>
        <div className='row'>
          <div className="col-12 col-md-12 col-lg-12">
            <div className='form-list-wrapper'>
              <div className='row'>
                <div className='col-12 col-md-6 col-lg-4'>
                  <div className='forn-group'>
                    <label className='form-label'>Employee</label>
                    <MultiSelectWithSearch
                      options={employeeOptions}
                      value={formData.selectedEmployeeIds}
                      onChange={(val) => handleChange('selectedEmployeeIds', val)}
                      placeholder="Select employees"
                    />
                    {errors.employees && <div className="error-text">{errors.employees}</div>}
                  </div>
                </div>
                <div className='col-12 col-md-6 col-lg-4'>
                  <div className='forn-group'>
                    <label className='form-label'>Date</label>
                    <input
                      type='date'
                      className='form-input'
                      value={formData.date}
                      onChange={(e) => handleChange('date', e.target.value)}
                    />
                    {errors.date && <div className="error-text">{errors.date}</div>}
                  </div>
                </div>

                <div className='col-12 col-md-6 col-lg-4'>
                  <div className='forn-group'>
                    <label className='form-label'>Status</label>
                    <select
                      className='form-input'
                      value={formData.status}
                      onChange={(e) => handleChange('status', e.target.value)}
                    >
                      <option value=''>---Select Status---</option>
                      <option value='Leave'>Leave</option>
                      <option value='Absent'>Absent</option>
                      <option value='Present'>Present</option>
                      <option value='HalfDay'>Half Day</option>
                      <option value='Permission'>Permission</option>
                    </select>
                    {errors.status && <div className="error-text">{errors.status}</div>}
                  </div>
                </div>
                {formData.status === 'Permission' &&
                  <div className='col-12 col-md-6 col-lg-4'>
                    <div className='forn-group'>
                      <label className='form-label'>Start Time</label>
                      <input
                        type='time'
                        className='form-input'
                        value={formData.startTime}
                        onChange={(e) => handleChange('startTime', e.target.value)}
                      />
                      {errors.startTime && <div className="error-text">{errors.startTime}</div>}
                    </div>
                  </div>}
                  {formData.status === 'Permission' && formData.startTime && <div className='col-12 col-md-6 col-lg-4'>
                  <div className='forn-group'>
                    <label className='form-label'>End Time</label>
                    <input
                      type='time'
                      className='form-input'
                      value={formData.endTime}
                      onChange={(e) => handleChange('endTime', e.target.value)}
                      min={formData.startTime}
                      max={
                        formData.status === 'Permission' && formData.startTime
                          ? (() => {
                              const [hours, minutes] = formData.startTime.split(':').map(Number);
                              let endHour = hours + 2;
                              let endMinutes = minutes;
                              if (endHour >= 24) endHour = 23;
                              const pad = (num) => num.toString().padStart(2, '0');
                              return `${pad(endHour)}:${pad(endMinutes)}`;
                            })()
                          : undefined
                      }
                    />
                    {errors.endTime && <div className="error-text">{errors.endTime}</div>}
                    {errors.time && <div className="error-text">{errors.time}</div>}
                  </div>
                </div>}
                <div className="col-12 col-md-6 col-lg-12">
                  <div className="forn-group">
                    <label className="form-label">Remarks</label>
                    <textarea
                      cols={30}
                      rows={3}
                      className="form-input"
                      value={formData.remarks}
                      onChange={(e) => handleChange('remarks', e.target.value)}
                    ></textarea>
                  </div>
                </div>

                <div className='col-12 col-md-12 col-lg-12'>
                  <div className='submit-btn-block'>
                    <button className='theme-btn btn-border' type='button' onClick={() => window.history.back()}>Cancel</button>
                    <button className='theme-btn btn-blue' type='submit'>Save Attendance</button>
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
