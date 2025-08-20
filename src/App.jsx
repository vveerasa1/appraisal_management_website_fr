import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AppLayout from "./layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// auth
import SignIn from "./auth/signin";
import ForgotPassword from "./auth/forgotPassword";
import OTPVerify from "./auth/otpVerify";
import ResetPassword from "./auth/resetPassword";
import ResetSuccess from "./auth/resetSuccess";
// admin dashboard
import AdminDashboard from "./admin/dashboard";
import AdminReports from "./admin/reports";
import AdminSettings from "./admin/settings";
import AdminOverview from "./admin/overview";
import AdminOrganization from "./admin/organization";
// admin users
import AdminUsers from "./admin/users";
import AdminAddUser from "./admin/users/addUser";
import AdminEditUser from "./admin/users/editUser";
import AdminViewUser from "./admin/users/viewUser";
// admin employees
import AdminEmployees from "./admin/employees";
import AdminAddEmployee from "./admin/employees/addEmployee";
import AdminEditEmployee from "./admin/employees/editEmployee";
import AdminViewEmployee from "./admin/employees/viewEmployee";
// admin points
import AdminPoints from "./admin/points";
import AdminAddPoints from "./admin/points/addPoint";
// import AdminEditPoints from "./admin/points/editPoint";
import AdminViewPoints from "./admin/points/viewPoint";
// admin roles
import AdminRoles from "./admin/roles";
import AdminAddRoles from "./admin/roles/addRole";
import AdminEditRoles from "./admin/roles/editRole";
import AdminViewRoles from "./admin/roles/viewRole";
// admin organization
import AdminDepartment from "./admin/organization/department";
import AdminAddDepartment from "./admin/organization/department/addDepartment";
// import AdminEditDepartment from "./admin/organization/department/editDepartment";
import AdminViewDepartment from "./admin/organization/department/viewDepartment";
import AdminDesignation from "./admin/organization/designation";
import AdminAddDesignation from "./admin/organization/designation/addDesignation";
import AdminEditDesignation from "./admin/organization/designation/editDesignation";
import AdminViewDesignation from "./admin/organization/designation/viewDesignation";
import AdminOrganizationTree from "./admin/organization/organizationTree";
// admin Attendance
import AdminAttendance from "./admin/attendance";
import AdminAddAttendance from "./admin/attendance/addAttendance";
import AdminEditAttendance from "./admin/attendance/editAttendance"
import AdminViewAttendance from "./admin/attendance/viewAttendance"
// holidays
import AdminHolidays from "./admin/holidays";
import AdminAddHoliday from "./admin/holidays/HolidayForm";

// ***** employee ***** //
import EmployeeDashboard from "./employee/dashboard";
import EmployeePoints from "./employee/points";
import Attendance from './employee/attendance';
import AddAttendance from './employee/attendance/addAttendance';
import EditAttendance from './employee/attendance/editAttendance';
import ViewAttendance from './employee/attendance/viewAttendance';

// ***** hr ***** //
import HRDashboard from "./hr/dashboard";
import HRTeamMembers from "./hr/teamMembers";
import HRTeamMemberView from "./hr/teamMemberView";
import HRMyPoints from "./hr/myPoints";
import HRAdjustPoints from "./hr/adjustPoint";

import HREmployees from "./hr/employees";
import HRAddEmployee from "./hr/employees/addEmployee";
import HREditEmployee from "./hr/employees/editEmployee";
import HRViewEmployee from "./hr/employees/viewEmployee";

import HRPoints from "./hr/points";
import HRAddPoints from "./hr/points/addPoint";
import HREditPoints from "./hr/points/editPoint";
import HRViewPoints from "./hr/points/viewPoint";

import Profile from "./components/profile";
import ChangePassword from "./components/profile/changePassword";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import SuperAdminProtectedRoute from "./routes/protected/SuperAdminProtectedRoute";
import AuthProtectedRoute from "./routes/protected/AuthProtectedRoute";
import CognitoLoginRedirect from './CognitoLoginRedirect'
import Callback from "./Callback";
import SubscribeToHRMS from "./auth/SubscribeToHRMS";

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect default route ("/") to "/signin" */}
        <Route path="/" element={<CognitoLoginRedirect />} />

        {/* Auth Route */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/otp-verify" element={<OTPVerify />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/reset-success" element={<ResetSuccess />} />
        <Route path="/callback" element={<Callback />} />
        <Route path="/subscribe-hrms" element={<SubscribeToHRMS />} />

        {/* Routes for pages with Sidebar and Topbar */}
        <Route
          path="/profile"
          element={
            <AuthProtectedRoute>
              <AppLayout>
                <Profile />
              </AppLayout>
            </AuthProtectedRoute>
          }
        />
        <Route
          path="/profile/change-password"
          element={
            <AuthProtectedRoute>
              <AppLayout>
                <ChangePassword />
              </AppLayout>
            </AuthProtectedRoute>
          }
        />
        {/* admin */}
        <Route
          path="/admin/dashboard"
          element={
            <SuperAdminProtectedRoute>
              <AppLayout>
                <AdminDashboard />
              </AppLayout>
            </SuperAdminProtectedRoute>
          }
        />
        <Route
          path="/admin/overview"
          element={
            <AuthProtectedRoute>
              <AppLayout>
                <AdminOverview />
              </AppLayout>
            </AuthProtectedRoute>
          }
        />
        <Route
          path="/admin/reports"
          element={
            <AuthProtectedRoute>
              <AppLayout>
                <AdminReports />
              </AppLayout>
            </AuthProtectedRoute>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <AuthProtectedRoute>
              <AppLayout>
                <AdminSettings />
              </AppLayout>
            </AuthProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <AuthProtectedRoute>
              <AppLayout>
                <AdminUsers />
              </AppLayout>
            </AuthProtectedRoute>
          }
        />
        <Route
          path="/admin/user/add"
          element={
            <AuthProtectedRoute>
              <AppLayout>
                <AdminAddUser />
              </AppLayout>
            </AuthProtectedRoute>
          }
        />
        <Route
          path="/admin/user/edit"
          element={
            <AuthProtectedRoute>
              <AppLayout>
                <AdminEditUser />
              </AppLayout>
            </AuthProtectedRoute>
          }
        />
        <Route
          path="/admin/user/view"
          element={
            <AuthProtectedRoute>
              <AppLayout>
                <AdminViewUser />
              </AppLayout>
            </AuthProtectedRoute>
          }
        />
        <Route
          path="/admin/employees"
          element={
            <AuthProtectedRoute>
              <AppLayout>
                <AdminEmployees />
              </AppLayout>
            </AuthProtectedRoute>
          }
        />
        <Route
          path="/admin/employee/add"
          element={
            <AuthProtectedRoute>
              <AppLayout>
                <AdminAddEmployee />
              </AppLayout>
            </AuthProtectedRoute>
          }
        />
        <Route
          path="/admin/employee/edit/:id"
          element={
            <AuthProtectedRoute>
              <AppLayout>
                <AdminEditEmployee />
              </AppLayout>
            </AuthProtectedRoute>
          }
        />
        <Route
          path="/admin/employee/view/:id"
          element={
            <AuthProtectedRoute>
              <AppLayout>
                <AdminViewEmployee />
              </AppLayout>
            </AuthProtectedRoute>
          }
        />
        <Route
          path="/admin/points"
          element={
            <AuthProtectedRoute>
              <AppLayout>
                <AdminPoints />
              </AppLayout>
            </AuthProtectedRoute>
          }
        />
        <Route
          path="/admin/point/add"
          element={
            <AuthProtectedRoute>
              <AppLayout>
                <AdminAddPoints />
              </AppLayout>
            </AuthProtectedRoute>
          }
        />
        {/* <Route
          path="/admin/point/edit"
          element={
            <AuthProtectedRoute>
              <AppLayout>
                <AdminEditPoints />
              </AppLayout>
            </AuthProtectedRoute>
          }
        /> */}
        <Route
          path="/admin/point/:type/:id"
          element={
            <AuthProtectedRoute>
              <AppLayout>
                <AdminViewPoints />
              </AppLayout>
            </AuthProtectedRoute>
          }
        />
        <Route
          path="/admin/roles"
          element={
            <SuperAdminProtectedRoute>
              <AppLayout>
                <AdminRoles />
              </AppLayout>
            </SuperAdminProtectedRoute>
          }
        />
        <Route
          path="/admin/role/add"
          element={
            <AuthProtectedRoute>
              <AppLayout>
                <AdminAddRoles />
              </AppLayout>
            </AuthProtectedRoute>
          }
        />
        <Route
          path="/admin/role/edit"
          element={
            <AuthProtectedRoute>
              <AppLayout>
                <AdminEditRoles />
              </AppLayout>
            </AuthProtectedRoute>
          }
        />
        <Route
          path="/admin/role/:type/:id"
          element={
            <AuthProtectedRoute>
              <AppLayout>
                <AdminViewRoles />
              </AppLayout>
            </AuthProtectedRoute>
          }
        />
        <Route
          path="/admin/organization"
          element={
            <AuthProtectedRoute>
              <AppLayout>
                <AdminOrganization />
              </AppLayout>
            </AuthProtectedRoute>
          }
        />
        <Route
          path="/admin/organization/department"
          element={
            <AuthProtectedRoute>
              <AppLayout>
                <AdminDepartment />
              </AppLayout>
            </AuthProtectedRoute>
          }
        />
        <Route
          path="/admin/organization/department/add"
          element={
            <AuthProtectedRoute>
              <AppLayout>
                <AdminAddDepartment />
              </AppLayout>
            </AuthProtectedRoute>
          }
        />
        {/* <Route
          path="/admin/organization/department/edit"
          element={
            <AuthProtectedRoute>
              <AppLayout>
                <AdminEditDepartment />
              </AppLayout>
            </AuthProtectedRoute>
          }
        /> */}
        <Route
          path="/admin/organization/department/:type/:id"
          element={
            <AuthProtectedRoute>
              <AppLayout>
                <AdminViewDepartment />
              </AppLayout>
            </AuthProtectedRoute>
          }
        />
        <Route
          path="/admin/organization/designation"
          element={
            <AuthProtectedRoute>
              <AppLayout>
                <AdminDesignation />
              </AppLayout>
            </AuthProtectedRoute>
          }
        />
        <Route
          path="/admin/organization/designation/add"
          element={
            <AuthProtectedRoute>
              <AppLayout>
                <AdminAddDesignation />
              </AppLayout>
            </AuthProtectedRoute>
          }
        />
        <Route
          path="/admin/organization/designation/edit"
          element={
            <AuthProtectedRoute>
              <AppLayout>
                <AdminEditDesignation />
              </AppLayout>
            </AuthProtectedRoute>
          }
        />
        <Route
          path="/admin/organization/designation/:type/:id"
          element={
            <AuthProtectedRoute>
              <AppLayout>
                <AdminViewDesignation />
              </AppLayout>
            </AuthProtectedRoute>
          }
        />
        <Route
          path="/admin/organization/tree"
          element={
            <AuthProtectedRoute>
              <AppLayout>
                <AdminOrganizationTree />
              </AppLayout>
            </AuthProtectedRoute>
          }
        />
        <Route
          path="/admin/attendance"
          element={
            <AuthProtectedRoute>
              <AppLayout>
                <AdminAttendance />
              </AppLayout>
            </AuthProtectedRoute>
          }
        />
        <Route
          path="/admin/attendance/add"
          element={
            <AuthProtectedRoute>
              <AppLayout>
                <AdminAddAttendance />
              </AppLayout>
            </AuthProtectedRoute>
          }
        />
        <Route
          path="/admin/attendance/edit/:id"
          element={
            <AuthProtectedRoute>
              <AppLayout>
                <AdminEditAttendance />
              </AppLayout>
            </AuthProtectedRoute>
          }
        />
        <Route
          path="/admin/attendance/view/:id"
          element={
            <AuthProtectedRoute>
              <AppLayout>
                <AdminViewAttendance />
              </AppLayout>
            </AuthProtectedRoute>
          }
        />
        <Route
          path="/admin/holidays"
          element={
            <AuthProtectedRoute>
              <AppLayout>
                <AdminHolidays />
              </AppLayout>
            </AuthProtectedRoute>
          }
        />
        <Route
          path="/admin/holiday/:type?/:id?"
          element={
            <AuthProtectedRoute>
              <AppLayout>
                <AdminAddHoliday />
              </AppLayout>
            </AuthProtectedRoute>
          }
        />
        {/* <Route
          path="/admin/holiday/edit"
          element={
            <AuthProtectedRoute>
              <AppLayout>
                <AdminEditHoliday />
              </AppLayout>
            </AuthProtectedRoute>
          }
        />
        <Route
          path="/admin/holiday/view"
          element={
            <AuthProtectedRoute>
              <AppLayout>
                <AdminViewHoliday />
              </AppLayout>
            </AuthProtectedRoute>
          }
        /> */}

        {/* employee */}
        <Route
          path="/employee/dashboard"
          element={
            <AuthProtectedRoute>
              <AppLayout>
                <EmployeeDashboard />
              </AppLayout>
            </AuthProtectedRoute>
          }
        />
        <Route
          path="/employee/points"
          element={
            <AuthProtectedRoute>
              <AppLayout>
                <EmployeePoints />
              </AppLayout>
            </AuthProtectedRoute>
          }
        />
        <Route
          path="/employee/attendance"
          element={
            <AuthProtectedRoute>
              <AppLayout>
                <Attendance />
              </AppLayout>
            </AuthProtectedRoute>
          }
        />
        <Route
          path="/employee/attendance/add"
          element={
            <AuthProtectedRoute>
              <AppLayout>
                <AddAttendance />
              </AppLayout>
            </AuthProtectedRoute>
          }
        />
        <Route
          path="/employee/attendance/edit"
          element={
            <AuthProtectedRoute>
              <AppLayout>
                <EditAttendance />
              </AppLayout>
            </AuthProtectedRoute>
          }
        />
        <Route
          path="/employee/attendance/view"
          element={
            <AuthProtectedRoute>
              <AppLayout>
                <ViewAttendance />
              </AppLayout>
            </AuthProtectedRoute>
          }
        />

        {/* hr */}
        <Route
          path="/dashboard"
          element={
            <AuthProtectedRoute>
              <AppLayout>
                <HRDashboard />
              </AppLayout>
            </AuthProtectedRoute>
          }
        />
        <Route
          path="/hr/team-members"
          element={
            <AuthProtectedRoute>
              <AppLayout>
                <HRTeamMembers />
              </AppLayout>
            </AuthProtectedRoute>
          }
        />
        <Route
          path="/hr/team-members/view/:id"
          element={
            <AuthProtectedRoute>
              <AppLayout>
                <HRTeamMemberView />
              </AppLayout>
            </AuthProtectedRoute>
          }
        />
        <Route
          path="/hr/my-points"
          element={
            <AuthProtectedRoute>
              <AppLayout>
                <HRMyPoints />
              </AppLayout>
            </AuthProtectedRoute>
          }
        />
        <Route
          path="/hr/adjust-points"
          element={
            <AuthProtectedRoute>
              <AppLayout>
                <HRAdjustPoints />
              </AppLayout>
            </AuthProtectedRoute>
          }
        />
        <Route
          path="/hr/employees"
          element={
            <AuthProtectedRoute>
              <AppLayout>
                <HREmployees />
              </AppLayout>
            </AuthProtectedRoute>
          }
        />
        <Route
          path="/hr/employee/add"
          element={
            <AuthProtectedRoute>
              <AppLayout>
                <HRAddEmployee />
              </AppLayout>
            </AuthProtectedRoute>
          }
        />
        <Route
          path="/hr/employee/edit"
          element={
            <AuthProtectedRoute>
              <AppLayout>
                <HREditEmployee />
              </AppLayout>
            </AuthProtectedRoute>
          }
        />
        <Route
          path="/hr/employee/view"
          element={
            <AuthProtectedRoute>
              <AppLayout>
                <HRViewEmployee />
              </AppLayout>
            </AuthProtectedRoute>
          }
        />
        <Route
          path="/hr/points"
          element={
            <AuthProtectedRoute>
              <AppLayout>
                <HRPoints />
              </AppLayout>
            </AuthProtectedRoute>
          }
        />
        <Route
          path="/hr/point/add"
          element={
            <AuthProtectedRoute>
              <AppLayout>
                <HRAddPoints />
              </AppLayout>
            </AuthProtectedRoute>
          }
        />
        <Route
          path="/hr/point/edit"
          element={
            <AuthProtectedRoute>
              <AppLayout>
                <HREditPoints />
              </AppLayout>
            </AuthProtectedRoute>
          }
        />
        <Route
          path="/hr/point/view"
          element={
            <AuthProtectedRoute>
              <AppLayout>
                <HRViewPoints />
              </AppLayout>
            </AuthProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
