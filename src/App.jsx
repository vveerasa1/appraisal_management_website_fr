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
import AdminEditPoints from "./admin/points/editPoint";
import AdminViewPoints from "./admin/points/viewPoint";
// admin roles
import AdminRoles from "./admin/roles";
import AdminAddRoles from "./admin/roles/addRole";
import AdminEditRoles from "./admin/roles/editRole";
import AdminViewRoles from "./admin/roles/viewRole";
// admin organization
import AdminDepartment from "./admin/organization/department";
import AdminAddDepartment from "./admin/organization/department/addDepartment";
import AdminEditDepartment from "./admin/organization/department/editDepartment";
import AdminViewDepartment from "./admin/organization/department/viewDepartment";
import AdminDesignation from "./admin/organization/designation";
import AdminAddDesignation from "./admin/organization/designation/addDesignation";
import AdminEditDesignation from "./admin/organization/designation/editDesignation";
import AdminViewDesignation from "./admin/organization/designation/viewDesignation";
import AdminOrganizationTree from "./admin/organization/organizationTree";

// ***** employee ***** //
import EmployeeDashboard from './employee/dashboard'
import EmployeePoints from './employee/points'

// ***** hr ***** //
import HRDashboard from './hr/dashboard'
import HRTeamMembers from './hr/teamMembers'
import HRTeamMemberView from './hr/teamMemberView'
import HRMyPoints from './hr/myPoints'
import HRAdjustPoints from './hr/adjustPoint'

import HREmployees from "./hr/employees";
import HRAddEmployee from "./hr/employees/addEmployee";
import HREditEmployee from "./hr/employees/editEmployee";
import HRViewEmployee from "./hr/employees/viewEmployee";

import HRPoints from './hr/points'
import HRAddPoints from './hr/points/addPoint'
import HREditPoints from './hr/points/editPoint'
import HRViewPoints from './hr/points/viewPoint'

import Profile from './components/profile'
import ChangePassword from './components/profile/changePassword'

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect default route ("/") to "/signin" */}
        <Route path="/" element={<SignIn />} />

        {/* Auth Route */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/otp-verify" element={<OTPVerify />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/reset-success" element={<ResetSuccess />} />

        {/* Routes for pages with Sidebar and Topbar */}
        <Route
          path="/profile"
          element={<AppLayout><Profile /></AppLayout>}
        />
        <Route
          path="/profile/change-password"
          element={<AppLayout><ChangePassword /></AppLayout>}
        />
        {/* admin */}
        <Route
          path="/admin/dashboard"
          element={
            <AppLayout>
              <AdminDashboard />
            </AppLayout>
          }
        />
        <Route
          path="/admin/overview"
          element={
            <AppLayout>
              <AdminOverview />
            </AppLayout>
          }
        />
        <Route
          path="/admin/reports"
          element={
            <AppLayout>
              <AdminReports />
            </AppLayout>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <AppLayout>
              <AdminSettings />
            </AppLayout>
          }
        />
        <Route
          path="/admin/users"
          element={
            <AppLayout>
              <AdminUsers />
            </AppLayout>
          }
        />
        <Route
          path="/admin/user/add"
          element={
            <AppLayout>
              <AdminAddUser />
            </AppLayout>
          }
        />
        <Route
          path="/admin/user/edit"
          element={
            <AppLayout>
              <AdminEditUser />
            </AppLayout>
          }
        />
        <Route
          path="/admin/user/view"
          element={
            <AppLayout>
              <AdminViewUser />
            </AppLayout>
          }
        />
        <Route
          path="/admin/employees"
          element={
            <AppLayout>
              <AdminEmployees />
            </AppLayout>
          }
        />
        <Route
          path="/admin/employee/add"
          element={
            <AppLayout>
              <AdminAddEmployee />
            </AppLayout>
          }
        />
        <Route
          path="/admin/employee/edit/:id"
          element={
            <AppLayout>
              <AdminEditEmployee />
            </AppLayout>
          }
        />
        <Route
          path="/admin/employee/view/:id"
          element={
            <AppLayout>
              <AdminViewEmployee />
            </AppLayout>
          }
        />
        <Route
          path="/admin/points"
          element={
            <AppLayout>
              <AdminPoints />
            </AppLayout>
          }
        />
        <Route
          path="/admin/point/add"
          element={
            <AppLayout>
              <AdminAddPoints />
            </AppLayout>
          }
        />
        <Route
          path="/admin/point/edit"
          element={
            <AppLayout>
              <AdminEditPoints />
            </AppLayout>
          }
        />
        <Route
          path="/admin/point/view/:id"
          element={
            <AppLayout>
              <AdminViewPoints />
            </AppLayout>
          }
        />
        <Route
          path="/admin/roles"
          element={
            <AppLayout>
              <AdminRoles />
            </AppLayout>
          }
        />
        <Route
          path="/admin/role/add"
          element={
            <AppLayout>
              <AdminAddRoles />
            </AppLayout>
          }
        />
        <Route
          path="/admin/role/edit"
          element={
            <AppLayout>
              <AdminEditRoles />
            </AppLayout>
          }
        />
        <Route
          path="/admin/role/view/:id"
          element={
            <AppLayout>
              <AdminViewRoles />
            </AppLayout>
          }
        />
        <Route
          path="/admin/organization"
          element={
            <AppLayout>
              <AdminOrganization />
            </AppLayout>
          }
        />
        <Route
          path="/admin/organization/department"
          element={
            <AppLayout>
              <AdminDepartment />
            </AppLayout>
          }
        />
        <Route
          path="/admin/organization/department/add"
          element={
            <AppLayout>
              <AdminAddDepartment />
            </AppLayout>
          }
        />
        <Route
          path="/admin/organization/department/edit"
          element={
            <AppLayout>
              <AdminEditDepartment />
            </AppLayout>
          }
        />
        <Route
          path="/admin/organization/department/view/:id"
          element={
            <AppLayout>
              <AdminViewDepartment />
            </AppLayout>
          }
        />
        <Route
          path="/admin/organization/designation"
          element={
            <AppLayout>
              <AdminDesignation />
            </AppLayout>
          }
        />
        <Route
          path="/admin/organization/designation/add"
          element={
            <AppLayout>
              <AdminAddDesignation />
            </AppLayout>
          }
        />
        <Route
          path="/admin/organization/designation/edit"
          element={
            <AppLayout>
              <AdminEditDesignation />
            </AppLayout>
          }
        />
        <Route
          path="/admin/organization/designation/view/:id"
          element={
            <AppLayout>
              <AdminViewDesignation />
            </AppLayout>
          }
        />
        <Route
          path="/admin/organization/tree"
          element={
            <AppLayout>
              <AdminOrganizationTree />
            </AppLayout>
          }
        />

        {/* employee */}
        <Route
          path="/employee/dashboard"
          element={
            <AppLayout>
              <EmployeeDashboard />
            </AppLayout>
          }
        />
        <Route
          path="/employee/points"
          element={<AppLayout><EmployeePoints /></AppLayout>}
        />

        {/* hr */}
        <Route
          path="/hr/dashboard"
          element={
            <AppLayout>
              <HRDashboard />
            </AppLayout>
          }
        />
        <Route
          path="/hr/team-members"
          element={
            <AppLayout>
              <HRTeamMembers />
            </AppLayout>
          }
        />
        <Route
          path="/hr/team-member/view"
          element={
            <AppLayout>
              <HRTeamMemberView />
            </AppLayout>
          }
        />
        <Route
          path="/hr/my-points"
          element={<AppLayout><HRMyPoints /></AppLayout>}
        /> 
        <Route
          path="/hr/adjust-points"
          element={
            <AppLayout>
              <HRAdjustPoints />
            </AppLayout>
          }
        />
        <Route
          path="/hr/employees"
          element={
            <AppLayout>
              <HREmployees />
            </AppLayout>
          }
        />
        <Route
          path="/hr/employee/add"
          element={
            <AppLayout>
              <HRAddEmployee />
            </AppLayout>
          }
        />
        <Route
          path="/hr/employee/edit"
          element={
            <AppLayout>
              <HREditEmployee />
            </AppLayout>
          }
        />
        <Route
          path="/hr/employee/view"
          element={
            <AppLayout>
              <HRViewEmployee />
            </AppLayout>
          }
        />
        <Route
          path="/hr/points"
          element={
            <AppLayout>
              <HRPoints />
            </AppLayout>
          }
        />
        <Route
          path="/hr/point/add"
          element={
            <AppLayout>
              <HRAddPoints />
            </AppLayout>
          }
        />
        <Route
          path="/hr/point/edit"
          element={
            <AppLayout>
              <HREditPoints />
            </AppLayout>
          }
        />
        <Route
          path="/hr/point/view"
          element={
            <AppLayout>
              <HRViewPoints />
            </AppLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
