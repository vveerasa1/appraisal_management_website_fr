import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import AppLayout from './layout';
// auth
import SignIn from './auth/signin' 
import ForgotPassword from './auth/forgotPassword'
import OTPVerify from './auth/otpVerify'
import ResetPassword from './auth/resetPassword'
import ResetSuccess from './auth/resetSuccess'
// admin dashboard
import AdminDashboard from './admin/dashboard'
import AdminReports from './admin/reports'
import AdminSettings from './admin/settings'
import AdminPendingApprisals from './admin/pendingAppraisals'
import AdminViewPendingApprisals from './admin/viewPendingAppraisals'
// admin users
import AdminUsers from './admin/users'
import AdminAddUser from './admin/users/addUser'
import AdminEditUser from './admin/users/editUser'
import AdminViewUser from './admin/users/viewUser'
// admin employees
import AdminEmployees from './admin/employees'
import AdminAddEmployee from './admin/employees/addEmployee'
import AdminEditEmployee from './admin/employees/editEmployee'
import AdminViewEmployee from './admin/employees/viewEmployee'
// admin appraisal
import AdminAppraisals from './admin/appraisal'
import AdminAddAppraisal from './admin/appraisal/addAppraisal'
import AdminEditAppraisal from './admin/appraisal/editAppraisal'
import AdminViewAppraisal from './admin/appraisal/viewAppraisal'
// admin points
import AdminPoints from './admin/points'
import AdminAddPoints from './admin/points/addPoint'
import AdminEditPoints from './admin/points/editPoint'
import AdminViewPoints from './admin/points/viewPoint'
// admin roles
import AdminRoles from './admin/roles'
import AdminAddRoles from './admin/roles/addRole'
import AdminEditRoles from './admin/roles/editRole'
import AdminViewRoles from './admin/roles/viewRole'

// ***** employee ***** //
import EmployeeDashboard from './employee/dashboard'
import EmployeeAppraisals from './employee/appraisals'
import EmployeePoints from './employee/points'

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
        {/* admin */}
        <Route 
          path="/admin/dashboard" 
          element={<AppLayout><AdminDashboard /></AppLayout>} 
        />
        <Route 
          path="/admin/reports" 
          element={<AppLayout><AdminReports /></AppLayout>} 
        />
        <Route 
          path="/admin/settings" 
          element={<AppLayout><AdminSettings /></AppLayout>} 
        />
        <Route 
          path="/admin/pending-appraisals" 
          element={<AppLayout><AdminPendingApprisals /></AppLayout>} 
        />
        <Route 
          path="/admin/view-pending-appraisals" 
          element={<AppLayout><AdminViewPendingApprisals /></AppLayout>} 
        />
        <Route 
          path="/admin/users" 
          element={<AppLayout><AdminUsers /></AppLayout>} 
        />
        <Route 
          path="/admin/user/add" 
          element={<AppLayout><AdminAddUser /></AppLayout>} 
        />
        <Route 
          path="/admin/user/edit" 
          element={<AppLayout><AdminEditUser /></AppLayout>} 
        />
        <Route 
          path="/admin/user/view" 
          element={<AppLayout><AdminViewUser /></AppLayout>} 
        />
        <Route 
          path="/admin/employees" 
          element={<AppLayout><AdminEmployees /></AppLayout>} 
        />
        <Route 
          path="/admin/employee/add" 
          element={<AppLayout><AdminAddEmployee /></AppLayout>} 
        />
        <Route 
          path="/admin/employee/edit" 
          element={<AppLayout><AdminEditEmployee /></AppLayout>} 
        />
        <Route 
          path="/admin/employee/view" 
          element={<AppLayout><AdminViewEmployee /></AppLayout>} 
        />
        <Route 
          path="/admin/appraisals" 
          element={<AppLayout><AdminAppraisals /></AppLayout>} 
        />
        <Route 
          path="/admin/appraisal/add" 
          element={<AppLayout><AdminAddAppraisal /></AppLayout>} 
        />
        <Route 
          path="/admin/appraisal/edit" 
          element={<AppLayout><AdminEditAppraisal /></AppLayout>} 
        />
        <Route 
          path="/admin/appraisal/view" 
          element={<AppLayout><AdminViewAppraisal /></AppLayout>} 
        />
        <Route 
          path="/admin/points" 
          element={<AppLayout><AdminPoints /></AppLayout>} 
        />
        <Route 
          path="/admin/point/add" 
          element={<AppLayout><AdminAddPoints /></AppLayout>} 
        />
        <Route 
          path="/admin/point/edit" 
          element={<AppLayout><AdminEditPoints /></AppLayout>} 
        />
        <Route 
          path="/admin/point/view" 
          element={<AppLayout><AdminViewPoints /></AppLayout>} 
        />
        <Route 
          path="/admin/roles" 
          element={<AppLayout><AdminRoles /></AppLayout>} 
        />
        <Route 
          path="/admin/role/add" 
          element={<AppLayout><AdminAddRoles /></AppLayout>} 
        />
        <Route 
          path="/admin/role/edit" 
          element={<AppLayout><AdminEditRoles /></AppLayout>} 
        />
        <Route 
          path="/admin/role/view" 
          element={<AppLayout><AdminViewRoles /></AppLayout>} 
        />
        {/* hr */}
        {/* <Route 
          path="/hr/dashboard" 
          element={<AppLayout><Dashboard /></AppLayout>} 
        /> */}
        {/* manager */}
        {/* <Route 
          path="/manager/dashboard" 
          element={<AppLayout><Dashboard /></AppLayout>} 
        /> */}
        {/* employee */}
        <Route 
          path="/employee/dashboard" 
          element={<AppLayout><EmployeeDashboard /></AppLayout>} 
        />
        <Route 
          path="/employee/appraisals" 
          element={<AppLayout><EmployeeAppraisals /></AppLayout>} 
        />
        <Route 
          path="/employee/points" 
          element={<AppLayout><EmployeePoints /></AppLayout>} 
        />
      </Routes>
    </Router>
  )
}

export default App
