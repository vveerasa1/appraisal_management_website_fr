import { useState, useEffect, useRef } from 'react';
import "./style.css"
import { Link } from 'react-router-dom'
import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import dayjs from "dayjs";
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = dayjsLocalizer(dayjs);

// Dummy employee list
const employees = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" },
];

// ✅ Attendance data
const attendanceRecords = [
    { employeeId: 1, name: 'Alice', date: "2025-07-15", time: '11:59:54 AM - 11:59:54 AM', status: "Present" },
    { employeeId: 1, name: 'Alice', date: "2025-07-15", time: '11:59:54 AM - 11:59:54 AM', status: "Absent" },
    { employeeId: 2, name: 'Bob', date: "2025-07-16", time: '11:59:54 AM - 11:59:54 AM', status: "Present" },
    { employeeId: 3, name: 'Charlie', date: "2025-07-15", time: '11:59:54 AM - 11:59:54 AM', status: "Present" },
    { employeeId: 3, name: 'Charlie', date: "2025-07-16", time: '11:59:54 AM - 11:59:54 AM', status: "Half Day" },
];

const CustomEvent = ({ event }) => (
    <Link to="/admin/attendance/view" className='ceStatusWrap'>
        <div className='ceStatusTop'>
            <h4>{event.name}</h4>
            <p>{event.status}</p>
        </div>
        <div className='ceStatusBottom'>{event.time}</div>
    </Link>
);

// Convert records to events
const generateEvents = (employeeId) => {
    return attendanceRecords
        .filter((record) => !employeeId || record.employeeId === employeeId)
        .map((record) => ({
            title: `${record.name} - ${record.status}${record.time ? `\n${record.time}` : ''}`,
            name: record.name,
            status: record.status,
            time: record.time,
            start: new Date(record.date),
            end: new Date(record.date),
            allDay: true,
        }));
};

const AdminAttendance = () => {

    // calendar
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [calendarView, setCalendarView] = useState("month");
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const handleDateChange = (e) => {
        const picked = dayjs(e.target.value);
        if (picked.isValid()) setSelectedDate(picked);
    };

    return (
        <>
            <div className="pageTanDiv">
                <ul className="pageTabPane">
                    <li className="active">
                        <Link to="/admin/attendance">Attendance</Link>
                    </li>
                </ul>
            </div>
            <div className='table-lists-container'>
                <div className='table-top-block'>
                    <div className='ttb-left'>
                        <h3 className='smallheading'>Attendance Calendar</h3>
                    </div>
                    <div className='ttb-right'>
                        <div className='dateSelect'>
                            <label>
                                <input
                                    type="date"
                                    value={selectedDate.format("YYYY-MM-DD")}
                                    onChange={handleDateChange}
                                    className='date-input'
                                />
                            </label>
                        </div>
                        <div className='searchblock'>
                            <input className='search-input' type='text' placeholder='Search...' />
                            <i className='fa fa-search'></i>
                        </div>
                        <Link
                            to="/admin/attendance/add"
                            className="theme-btn btn-blue"
                            title="Add Attendance"
                            style={{ display: "flex", alignItems: "center", gap: "6px" }}
                        >
                            <i className="fa fa-plus-circle" aria-hidden="true"></i> Add Attendance
                        </Link>
                    </div>
                </div>
                <div className='tables'>
                    <div className='table-wrapper calendar'>
                        <div className='calendarWrapper'>
                            {/* ✅ Employee List Sidebar */}
                            <div className='calendarEmployeeList'>
                                <h4 className='cemployeeHeading'>Employees</h4>
                                {employees.map((emp) => (
                                    <div
                                        key={emp.id}
                                        onClick={() => setSelectedEmployee(emp.id)}
                                        className={`cEmployeeItem ${selectedEmployee === emp.id ? 'active' : ''}`}
                                    >
                                        <span className='cEmployeeIcon'>{emp.name.charAt(0).toUpperCase()}</span>
                                        {emp.name}
                                    </div>
                                ))}
                            </div>

                            {/* ✅ Calendar Content Area */}
                            <div className='calendarContent'>
                                <Calendar
                                    localizer={localizer}
                                    events={generateEvents(selectedEmployee)}
                                    startAccessor="start"
                                    endAccessor="end"
                                    views={["month", "week", "day"]}
                                    view={calendarView}
                                    onView={setCalendarView}
                                    date={selectedDate.toDate()}
                                    onNavigate={(newDate) => setSelectedDate(dayjs(newDate))}
                                    style={{ borderRadius: 8, background: "#fff" }}
                                    components={{
                                        event: CustomEvent
                                    }}
                                    eventPropGetter={(event) => {
                                        let bg = "#0cb422ff";
                                        if (event.status === "Absent") bg = "#ff5252";
                                        if (event.status === "Half Day") bg = "#ffa726";
                                        if (event.status === "Leave") bg = "#42a5f5";
                                        return {
                                            style: {
                                                backgroundColor: bg,
                                                color: "#fff",
                                                padding: "4px",
                                                borderRadius: "4px",
                                            },
                                        };
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminAttendance;