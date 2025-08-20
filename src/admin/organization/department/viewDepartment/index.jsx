import { useState, useEffect } from "react";
import "./style.css";
import { useParams, Link } from "react-router-dom";
import {
  useGetDepartmentByIdQuery,
  useGetDepartmentsQuery,
  useAddDepartmentMutation, // Assuming this handles update as well
  useDeleteDepartmentMutation,
} from "../../../../services/features/departments/departmentApi";
import { useSelector } from "react-redux";
import { showSuccessToast, showErrorToast } from "../../../../utils/toast";
import { useGetReportersQuery } from "../../../../services/features/users/userApi";
import { usePermission } from "../../../../hooks/usePermission";

// Removed unused imports
// import ProfileImg from "../../../../assets/images/user.png";
// import Select from "react-select";
// import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";

const ViewDepartment = () => {
  const { id, type } = useParams();
  const { data, isLoading, error, refetch } = useGetDepartmentByIdQuery(id);
  const department = data?.data;
  const userId = useSelector((state) => state.users.id);
  const { hasPermission } = usePermission();

  const CAN_UPDATE_DEPARTMENT = "department:update";
  const CAN_DELETE_DEPARTMENT = "department:delete";

  // Fetch all departments for Parent Department dropdown
  const { data: departmentsData } = useGetDepartmentsQuery({ search: "" });
  const departments = departmentsData?.data || [];

  // Fetch all employees for Department Lead dropdown
  const { data: reportersData, isLoading: reportersLoading } =
    useGetReportersQuery({ employeeId: "" });
  const reporters = reportersData?.data || [];

  const [deleteDepartment, { isLoading: isDeleting }] =
    useDeleteDepartmentMutation();

  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    name: "",
    departmentLead: "",
    parentDepartment: "",
    status: "Active", // Add status to form state, default to "Active"
  });

  const [addDepartment, { isLoading: isSaving }] = useAddDepartmentMutation();

  // Options for the Status dropdown
  const statusOptions = [
    { value: "Active", label: "Active" },
    { value: "Inactive", label: "Inactive" },
  ];

  useEffect(() => {
    if (department) {
      setForm({
        name: department.name || "",
        departmentLead: department.departmentLead?._id || "",
        parentDepartment: department.parentDepartment?._id || "",
        status: department.status || "Active", // Initialize status from fetched data
      });
    }
  }, [department]);
  useEffect(() => {
    if (type === "edit") {
      setEditMode(true);
    }
  }, [type]);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEdit = () => {
    setEditMode(true);
    navigate(`/admin/organization/department/edit/${id}`);
  };
  const handleCancel = () => {
    setEditMode(false);
    if (department) {
      setForm({
        name: department.name || "",
        departmentLead: department.departmentLead?._id || "",
        parentDepartment: department.parentDepartment?._id || "",
        status: department.status || "Active", // Reset status on cancel
      });
    }
    navigate(`/admin/organization/department`);
  };

  const handleDelete = async () => {
    if (!department?._id) return;
    if (!window.confirm("Are you sure you want to delete this department?"))
      return;
    try {
      await deleteDepartment(department._id).unwrap();
      showSuccessToast("Department deleted successfully!");
      // Optionally redirect after delete:
      window.location.href = "/admin/organization/department";
    } catch (err) {
      const errorMsg =
        err?.data?.message ||
        err?.error ||
        err?.message ||
        "Failed to delete department.";
      showErrorToast(errorMsg);
    }
  };

  const handleSave = async () => {
    try {
      await addDepartment({
        id: department._id, // Pass ID for update operation
        name: form.name,
        departmentLead: form.departmentLead || null, // Send null if no lead selected
        parentDepartment: form.parentDepartment || null, // Send null if no parent selected
        status: form.status, // Include status in the payload
        modifiedBy: userId, // Add modifiedBy for tracking changes
      }).unwrap();
      setEditMode(false);
      showSuccessToast("Department updated successfully!");
      refetch(); // Refetch data to display updated information
    } catch (err) {
      const errorMsg =
        err?.data?.message ||
        err?.error ||
        err?.message ||
        "Failed to update department.";
      showErrorToast(errorMsg);
      console.error("Failed to update department", err);
    }
  };

  // Display loading, error, or no department found messages
  if (isLoading) {
    return <p>Loading department details...</p>;
  }

  if (error) {
    return (
      <p>
        Failed to load department details: {error.message || "Unknown error"}
      </p>
    );
  }

  if (!department) {
    return <p>No department found with this ID.</p>;
  }

  return (
    <>
      <div className="pageTanDiv">
        <ul className="pageTabPane">
          <Link to="/admin/organization/department">
            <i className="fa fa-angle-left"></i>
          </Link>
          <li className="active">
            <Link to="/admin/organization/department">Department</Link>
          </li>
          <li>
            <Link to="/admin/organization/designation">Designation</Link>
          </li>
          <li>
            <Link to="/admin/organization/tree">Organization Tree</Link>
          </li>
        </ul>
        <div className="rvDiv">
          {hasPermission(CAN_UPDATE_DEPARTMENT) && !editMode && (
            <button
              className="rvDiv-btns"
              type="button"
              onClick={handleEdit} // Use handleEdit directly
              title="Edit"
            >
              <i className="fa fa-pencil"></i>
            </button>
          )}
          {hasPermission(CAN_DELETE_DEPARTMENT) && (
            <button
              className="rvDiv-btns delete"
              type="button"
              onClick={handleDelete}
              disabled={isDeleting}
              title="Delete"
            >
              <i className="fa fa-trash"></i>
            </button>
          )}
        </div>
      </div>
      <div className="view-container">
        <div className="row">
          <div className="col-12 col-md-12 col-lg-12">
            <div className="view-other-info">
              <h3 className="small-heading">Department Details</h3>
              <div className="row">
                {/* Department Name */}
                <div className="col-12 col-md-6 col-lg-4">
                  <div className="editform-group">
                    <label className="editform-label">Department Name</label>
                    {editMode ? (
                      <input
                        type="text"
                        className="editform-input"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                      />
                    ) : (
                      <input
                        type="text"
                        className="editform-input"
                        value={department?.name || ""}
                        disabled
                      />
                    )}
                  </div>
                </div>

                {/* Department Lead */}
                <div className="col-12 col-md-6 col-lg-4">
                  <div className="editform-group">
                    <label className="editform-label">Department Lead</label>
                    {editMode ? (
                      <select
                        className="editform-input"
                        name="departmentLead"
                        value={form.departmentLead}
                        onChange={handleChange}
                        disabled={reportersLoading} // Disable if reporters are still loading
                      >
                        <option value="">Select Lead</option>
                        {reporters.map((rep) => (
                          <option key={rep._id} value={rep._id}>
                            {rep.firstName} {rep.lastName}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type="text"
                        className="editform-input"
                        value={
                          department?.departmentLead
                            ? `${department.departmentLead.firstName} ${department.departmentLead.lastName}`
                            : "-"
                        }
                        disabled
                      />
                    )}
                  </div>
                </div>

                {/* Parent Department */}
                <div className="col-12 col-md-6 col-lg-4">
                  <div className="editform-group">
                    <label className="editform-label">Parent Department</label>
                    {editMode ? (
                      <select
                        className="editform-input"
                        name="parentDepartment"
                        value={form.parentDepartment}
                        onChange={handleChange}
                      >
                        <option value="">Select Parent</option>
                        {departments
                          .filter((d) => d._id !== department?._id) // Prevent a department from being its own parent
                          .map((dept) => (
                            <option key={dept._id} value={dept._id}>
                              {dept.name}
                            </option>
                          ))}
                      </select>
                    ) : (
                      <input
                        type="text"
                        className="editform-input"
                        value={department?.parentDepartment?.name || "-"}
                        disabled
                      />
                    )}
                  </div>
                </div>

                {/* Status Dropdown - NEWLY ADDED */}
                <div className="col-12 col-md-6 col-lg-4">
                  <div className="editform-group">
                    <label className="editform-label">Status</label>
                    {editMode ? (
                      <select
                        className="editform-input"
                        name="status"
                        value={form.status}
                        onChange={handleChange} // Re-use the existing handleChange
                      >
                        {statusOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type="text"
                        className="editform-input"
                        value={department?.status || "-"}
                        disabled
                      />
                    )}
                  </div>
                </div>

                {/* Added By */}
                <div className="col-12 col-md-6 col-lg-4">
                  <div className="editform-group">
                    <label className="editform-label">Added By</label>
                    <input
                      type="text"
                      className="editform-input"
                      value={
                        department?.addedBy
                          ? `${department.addedBy.firstName} ${department.addedBy.lastName}`
                          : "-"
                      }
                      disabled
                    />
                  </div>
                </div>

                {/* Added Time */}
                <div className="col-12 col-md-6 col-lg-4">
                  <div className="editform-group">
                    <label className="editform-label">Added Time</label>
                    <input
                      type="text"
                      className="editform-input"
                      value={
                        department?.createdAt
                          ? new Date(department.createdAt).toLocaleString()
                          : "-"
                      }
                      disabled
                    />
                  </div>
                </div>

                {/* Modified By */}
                <div className="col-12 col-md-6 col-lg-4">
                  <div className="editform-group">
                    <label className="editform-label">Modified By</label>
                    <input
                      type="text"
                      className="editform-input"
                      value={
                        department?.modifiedBy
                          ? `${department.modifiedBy.firstName} ${department.modifiedBy.lastName}`
                          : "-"
                      }
                      disabled
                    />
                  </div>
                </div>

                {/* Modified Time */}
                <div className="col-12 col-md-6 col-lg-4">
                  <div className="editform-group">
                    <label className="editform-label">Modified Time</label>
                    <input
                      type="text"
                      className="editform-input"
                      value={
                        department?.updatedAt // Use 'updatedAt' for last modification time
                          ? new Date(department.updatedAt).toLocaleString()
                          : "-"
                      }
                      disabled
                    />
                  </div>
                </div>

                {/* Save/Cancel Buttons */}
                <div className="col-12 col-md-12 col-lg-12">
                  <div className="submit-btn-block">
                    {editMode && (
                      <>
                        <button
                          className="theme-btn btn-blue"
                          type="button"
                          onClick={handleSave}
                          disabled={isSaving}
                        >
                          {isSaving ? "Saving..." : "Save"}
                        </button>
                        <button
                          className="theme-btn btn-grey"
                          type="button"
                          onClick={handleCancel}
                          disabled={isSaving}
                        >
                          Cancel
                        </button>
                      </>
                    )}
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

export default ViewDepartment;
