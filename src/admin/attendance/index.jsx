import { useState, useEffect, useMemo } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import dayjs from "dayjs";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useGetReportersQuery } from "../../services/features/users/userApi";
import { useGetAttendanceSummaryQuery } from "../../services/features/attendance/attendanceApi";

const localizer = dayjsLocalizer(dayjs);

// --- Updated CustomEvent component to display check-in/out times ---
const CustomEvent = ({ event }) => {
  const showTimes = event.checkInTime && event.checkOutTime;

  return (
    <Link to={`/admin/attendance/view/${event.id}`} className="ceStatusWrap">
      <div className="ceStatusTop">
        <h4>{event.name}</h4>
        <p>{event.status}</p>
      </div>
      {showTimes && (
        <div className="ceStatusBottom">
          {event.checkInTime} - {event.checkOutTime}
        </div>
      )}
    </Link>
  );
};

// This function now takes the raw API data and transforms it for the calendar
const generateEvents = (attendanceData) => {
  if (!attendanceData || !Array.isArray(attendanceData)) {
    return [];
  }
  return attendanceData.map((record) => ({
    id: record._id,
    title: `${record.name} - ${record.status}`,
    name: record.name,
    status: record.status,
    // Pass check-in/out times to the event object
    checkInTime: record.checkInTime,
    checkOutTime: record.checkOutTime,
    start: new Date(record.date),
    end: new Date(record.date),
    allDay: true,
  }));
};

const AdminAttendance = () => {
  // Fetch all reporters for the employee list sidebar
  const {
    data: reportersData,
    isLoading: isLoadingReporters,
    isError: isErrorReporters,
  } = useGetReportersQuery({});

  // Calendar state
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [calendarView, setCalendarView] = useState("month");
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // --- Dynamic Query Parameters based on calendar view ---
  const queryParams = useMemo(() => {
    // Return null to skip the query if no employee is selected
    if (!selectedEmployee) {
      return null;
    }

    const params = {
      userId: selectedEmployee,
      mode: calendarView,
    };

    if (calendarView === "month") {
      params.month = selectedDate.format("MMMM").toLowerCase(); // e.g., 'july'
      params.year = selectedDate.format("YYYY"); // e.g., '2025'
    } else if (calendarView === "week") {
      params.startDate = selectedDate.startOf("week").format("YYYY-MM-DD");
      params.endDate = selectedDate.endOf("week").format("YYYY-MM-DD");
    } else if (calendarView === "day") {
      params.date = selectedDate.format("YYYY-MM-DD");
    }

    return params;
  }, [selectedEmployee, calendarView, selectedDate]);

  // Fetch attendance summary based on the dynamic query parameters
  const {
    data: attendanceData,
    isLoading: isLoadingAttendance,
    isError: isErrorAttendance,
  } = useGetAttendanceSummaryQuery(queryParams, { skip: !queryParams });

  const handleDateChange = (e) => {
    const picked = dayjs(e.target.value);
    if (picked.isValid()) setSelectedDate(picked);
  };

  // Memoize the events to avoid unnecessary re-renders
  const events = useMemo(
    () => generateEvents(attendanceData?.data),
    [attendanceData]
  );

  return (
    <>
      <div className="pageTanDiv">
        <ul className="pageTabPane">
          <li className="active">
            <Link to="/admin/attendance">Attendance</Link>
          </li>
          <li>
            <Link to="/admin/holidays">Holidays</Link>
          </li>
        </ul>
      </div>
      <div className="table-lists-container">
        <div className="table-top-block">
          <div className="ttb-left">
            <h3 className="smallheading">Attendance Calendar</h3>
          </div>
          <div className="ttb-right">
            <div className="dateSelect">
              <label>
                <input
                  type="date"
                  value={selectedDate.format("YYYY-MM-DD")}
                  onChange={handleDateChange}
                  className="date-input"
                />
              </label>
            </div>
            <div className="searchblock">
              <input
                className="search-input"
                type="text"
                placeholder="Search..."
              />
              <i className="fa fa-search"></i>
            </div>
            <Link
              to="/admin/attendance/add"
              className="theme-btn btn-blue"
              title="Add Attendance"
              style={{ display: "flex", alignItems: "center", gap: "6px" }}
            >
              <i className="fa fa-plus-circle" aria-hidden="true"></i> Add
              Attendance
            </Link>
          </div>
        </div>
        <div className="tables">
          <div className="table-wrapper calendar">
            <div className="calendarWrapper">
              {/* Employee List Sidebar */}
              <div className="calendarEmployeeList">
                <h4 className="cemployeeHeading">Employees</h4>
                {isLoadingReporters ? (
                  <div className="loading-message">Loading employees...</div>
                ) : isErrorReporters ? (
                  <div className="error-text">Error fetching employees.</div>
                ) : (
                  reportersData?.data?.map((reporter) => (
                    <div
                      key={reporter._id}
                      onClick={() => setSelectedEmployee(reporter._id)}
                      className={`cEmployeeItem ${
                        selectedEmployee === reporter._id ? "active" : ""
                      }`}
                    >
                      <span className="cEmployeeIcon">
                        {reporter.firstName?.charAt(0).toUpperCase()}
                      </span>
                      {`${reporter.firstName} ${reporter.lastName}`}
                    </div>
                  ))
                )}
              </div>

              {/* Calendar Content Area */}
              <div className="calendarContent">
                {isLoadingAttendance && selectedEmployee ? (
                  <div className="loading-message">Loading attendance...</div>
                ) : isErrorAttendance ? (
                  <div className="error-text">
                    Error fetching attendance data.
                  </div>
                ) : (
                  <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    views={["month", "week", "day"]}
                    view={calendarView}
                    onView={(newView) => setCalendarView(newView)}
                    date={selectedDate.toDate()}
                    onNavigate={(newDate) => setSelectedDate(dayjs(newDate))}
                    style={{ borderRadius: 8, background: "#fff" }}
                    components={{
                      event: CustomEvent,
                    }}
                    // --- Updated eventPropGetter with all statuses ---
                    eventPropGetter={(event) => {
                      let bg = "#0cb422ff"; // Default color (Present)
                      if (event.status === "Absent") bg = "#ff5252";
                      if (event.status === "HalfDay") bg = "#ffa726";
                      if (event.status === "Leave") bg = "#42a5f5";
                      if (event.status === "Permission") bg = "#8e24aa"; // Distinct color for Permission
                      if (event.status === "Holiday") bg = "#757575"; // Distinct color for Holiday
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
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminAttendance;
