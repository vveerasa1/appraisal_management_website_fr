import { useState, useEffect } from "react";
import "./style.css";
import { useParams, Link } from "react-router-dom";
import {
  useGetDepartmentByIdQuery,
  useGetDepartmentsQuery,
  useAddDepartmentMutation,
  useDeleteDepartmentMutation,
} from "../../../../services/features/departments/departmentApi";
import { useSelector } from "react-redux";
import { showSuccessToast, showErrorToast } from "../../../../utils/toast";
import { useGetReportersQuery } from "../../../../services/features/users/userApi";
import ProfileImg from "../../../../assets/images/user.png";
import Select from "react-select";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";

const ViewDepartment = () => {
  const { id } = useParams();
  const { data, isLoading, error, refetch } = useGetDepartmentByIdQuery(id);
  const department = data?.data;
  const userId = useSelector((state) => state.users.id);

  // Fetch all departments for Parent Department dropdown
  const { data: departmentsData } = useGetDepartmentsQuery();
  const departments = departmentsData?.data || [];

  // Fetch all employees for Department Lead dropdown
  const { data: reportersData, isLoading: reportersLoading } =
    useGetReportersQuery();
  const reporters = reportersData?.data || [];
  const [deleteDepartment, { isLoading: isDeleting }] =
    useDeleteDepartmentMutation();

  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    name: "",
    departmentLead: "",
    parentDepartment: "",
  });

  const [addDepartment, { isLoading: isSaving }] = useAddDepartmentMutation();

  useEffect(() => {
    if (department) {
      setForm({
        name: department.name || "",
        departmentLead: department.departmentLead?._id || "",
        parentDepartment: department.parentDepartment?._id || "",
      });
    }
  }, [department]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEdit = () => setEditMode(true);
  const handleCancel = () => {
    setEditMode(false);
    if (department) {
      setForm({
        name: department.name || "",
        departmentLead: department.departmentLead?._id || "",
        parentDepartment: department.parentDepartment?._id || "",
      });
    }
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

  // TODO: Implement save logic with API call
  const handleSave = async () => {
    try {
      await addDepartment({
        id: department._id,
        name: form.name,
        userId: userId, // static userId
        departmentLead: form.departmentLead,
        parentDepartment: form.parentDepartment,
      }).unwrap();
      setEditMode(false);
      // Optionally show a success message or refetch data
      showSuccessToast("Department updated successfully!");
      refetch();
    } catch (err) {
      // Optionally handle error
      const errorMsg =
        err?.data?.message ||
        err?.error ||
        err?.message ||
        "Failed to update department.";
      showErrorToast(errorMsg);
      console.error("Failed to update department", err);
    }
  };

  return (
    <>
      <div className="pageTanDiv">
        <ul className="pageTabPane">
          {/* <li>
            <Link to="/admin/employees">Employee</Link>
          </li> */}
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
          <button
            className="rvDiv-btns"
            type="button"
            onClick={() => setEditMode(true)}
            title="Edit"
          >
            <i className="fa fa-pencil"></i>
          </button>
          <button
            className="rvDiv-btns delete"
            type="button"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            <i className="fa fa-trash"></i>
          </button>
        </div>
      </div>
      <div className="view-container">
        <div className="row">
          <div className="col-12 col-md-12 col-lg-12">
            <div className="view-other-info">
              <h3 className="small-heading">Department Details</h3>
              {isLoading ? (
                <p>Loading...</p>
              ) : error ? (
                <p>Failed to load department details.</p>
              ) : (
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
                      {!editMode && (
                        <div className="ef-actionbtns">
                          <button
                            className="editform-btn"
                            type="button"
                            onClick={handleEdit}
                          >
                            <i className="fa fa-pencil"></i>
                          </button>
                        </div>
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
                          disabled={reportersLoading}
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
                      {!editMode && (
                        <div className="ef-actionbtns">
                          <button
                            className="editform-btn"
                            type="button"
                            onClick={handleEdit}
                          >
                            <i className="fa fa-pencil"></i>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  {/* Parent Department */}
                  <div className="col-12 col-md-6 col-lg-4">
                    <div className="editform-group">
                      <label className="editform-label">
                        Parent Department
                      </label>
                      {editMode ? (
                        <select
                          className="editform-input"
                          name="parentDepartment"
                          value={form.parentDepartment}
                          onChange={handleChange}
                        >
                          <option value="">Select Parent</option>
                          {departments
                            .filter((d) => d._id !== department?._id)
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
                      {!editMode && (
                        <div className="ef-actionbtns">
                          <button
                            className="editform-btn"
                            type="button"
                            onClick={handleEdit}
                          >
                            <i className="fa fa-pencil"></i>
                          </button>
                        </div>
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
                          department?.updatedAt
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
                            Save Changes
                          </button>
                          <button
                            className="theme-btn btn-grey"
                            type="button"
                            onClick={handleCancel}
                          >
                            Cancel
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewDepartment;
