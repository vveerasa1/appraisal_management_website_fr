import { useState, useEffect } from "react";
import "./style.css";
import { Link, useParams, useNavigate } from "react-router-dom";
import ProfileImg from "../../../assets/images/user.png";
import {
  useGetRoleByIdQuery,
  useAddRoleMutation,
  useDeleteRoleMutation,
} from "../../../services/features/roles/roleApi";
import { showSuccessToast, showErrorToast } from "../../../utils/toast";
import { useSelector } from "react-redux";

const PERMISSIONS = [
  { entity: "User", actions: ["Add", "Edit", "View", "Delete"] },
  { entity: "Department", actions: ["Add", "Edit", "View", "Delete"] },
  { entity: "Designation", actions: ["Add", "Edit", "View", "Delete"] },
  { entity: "Appraisal", actions: ["Add", "Edit", "View", "Delete"] },
  { entity: "Team", actions: ["Add", "Edit", "View", "Delete"] },
];

const permissionMap = {
  User: {
    Add: "user:create",
    Edit: "user:update",
    View: "user:view",
    Delete: "user:delete",
  },
  Department: {
    Add: "department:create",
    Edit: "department:update",
    View: "department:view",
    Delete: "department:delete",
  },
  Designation: {
    Add: "designation:create",
    Edit: "designation:update",
    View: "designation:view",
    Delete: "designation:delete",
  },
  Appraisal: {
    Add: "appraisal:create",
    Edit: "appraisal:update",
    View: "appraisal:view",
    Delete: "appraisal:delete",
  },
  Team: {
    Add: "team:create",
    Edit: "team:update",
    View: "team:view",
    Delete: "team:delete",
  },
};

const getDefaultChecked = (rolePermissions = []) => {
  const checked = {};
  PERMISSIONS.forEach(({ entity, actions }) => {
    actions.forEach((action) => {
      const perm = permissionMap[entity][action];
      checked[`${entity}-${action}`] = rolePermissions.includes(perm);
    });
  });
  return checked;
};

const getPermissionsArray = (checked) => {
  let perms = [];
  PERMISSIONS.forEach(({ entity, actions }) => {
    actions.forEach((action) => {
      if (checked[`${entity}-${action}`]) {
        perms.push(permissionMap[entity][action]);
      }
    });
  });
  return perms;
};

// Options for the Status dropdown
const statusOptions = [
  { value: "Active", label: "Active" },
  { value: "Inactive", label: "Inactive" },
];

const ViewRole = () => {
  const userId = useSelector((state) => state.users.id);

  const { id } = useParams();
  const { data, isLoading, error, refetch } = useGetRoleByIdQuery(id);
  const role = data?.data;
  const navigate = useNavigate();

  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    status: "Active",
  }); // Added status to form state
  const [checked, setChecked] = useState(getDefaultChecked(role?.permissions));
  const [addRole, { isLoading: isSaving }] = useAddRoleMutation(); // Assuming this mutation also handles updates

  const [deleteRole, { isLoading: isDeleting }] = useDeleteRoleMutation();

  useEffect(() => {
    if (role) {
      setForm({
        name: role.name || "",
        description: role.description || "",
        status: role.status || "Active", // Initialize status from fetched data
      });
      setChecked(getDefaultChecked(role.permissions));
    }
  }, [role]);

  const handleCheckboxChange = (entity, action) => {
    const key = `${entity}-${action}`;
    let updated = { ...checked };

    if (action === "View") {
      // If unchecking View, uncheck all others for this entity
      if (checked[key]) {
        PERMISSIONS.find((e) => e.entity === entity).actions.forEach((a) => {
          if (a !== "View") updated[`${entity}-${a}`] = false;
        });
      }
      updated[key] = !checked[key];
    } else {
      // If checking any other, ensure View is checked
      updated[key] = !checked[key];
      if (!checked[key]) {
        updated[`${entity}-View`] = true;
      }
    }
    setChecked(updated);
  };

  const handleInputChange = (e) => {
    setForm((prevForm) => ({ ...prevForm, [e.target.name]: e.target.value }));
  };

  const handleDelete = async () => {
    if (!role?._id) return;
    if (!window.confirm("Are you sure you want to delete this role?")) return;
    try {
      await deleteRole(role._id).unwrap();
      showSuccessToast("Role deleted successfully!");
      navigate("/admin/roles"); // Redirect after delete
    } catch (err) {
      const errorMsg =
        err?.data?.message ||
        err?.error ||
        err?.message ||
        "Failed to delete role.";
      showErrorToast(errorMsg);
    }
  };

  const handleSave = async () => {
    try {
      await addRole({
        id: role._id, // Pass ID for update operation
        userId,
        name: form.name,
        description: form.description,
        permissions: getPermissionsArray(checked),
        status: form.status, // Include status in the payload
      }).unwrap();
      setEditMode(false);
      showSuccessToast("Role updated successfully!");
      refetch(); // Refetch data to display updated information
    } catch (err) {
      const errorMsg =
        err?.data?.message ||
        err?.error ||
        err?.message ||
        "Failed to update role.";
      showErrorToast(errorMsg);
      console.error("Failed to update role:", errorMsg);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (!role) return <p>Role not found.</p>;

  return (
    <>
      <div className="pageTanDiv">
        <div className="viewPageTopDiv">
          <div className="lvDiv">
            <Link to="/admin/roles">
              {" "}
              {/* Corrected link to roles page */}
              <i className="fa fa-angle-left"></i>
            </Link>
            <img className="img-fluid" src={ProfileImg} alt="Profile" />
            <p>
              {role.name} - {role.description}
            </p>
          </div>
          <div className="rvDiv">
            {!editMode && (
              <button
                className="rvDiv-btns"
                type="button"
                onClick={() => setEditMode(true)}
              >
                <i className="fa fa-pencil"></i>
              </button>
            )}
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
      </div>
      <div className="view-container">
        <div className="row">
          <div className="col-12 col-md-12 col-lg-12">
            <div className="view-other-info">
              <h3 className="small-heading">Role Details</h3>
              <div className="row">
                <div className="col-12 col-md-6 col-lg-4">
                  <div className="editform-group">
                    <label className="editform-label">Role Name</label>
                    <input
                      type="text"
                      className="editform-input"
                      name="name"
                      value={form.name}
                      onChange={handleInputChange}
                      disabled={!editMode}
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-8">
                  <div className="editform-group">
                    <label className="editform-label">Description</label>
                    <input
                      type="text"
                      className="editform-input"
                      name="description"
                      value={form.description}
                      onChange={handleInputChange}
                      disabled={!editMode}
                    />
                  </div>
                </div>
                {/* Status Dropdown */}
                <div className="col-12 col-md-6 col-lg-4">
                  <div className="editform-group">
                    <label className="editform-label">Status</label>
                    {editMode ? (
                      <select
                        className="editform-input"
                        name="status"
                        value={form.status}
                        onChange={handleInputChange}
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
                        value={role.status || "-"}
                        disabled
                      />
                    )}
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                  <div className="editform-group">
                    <label className="editform-label">Added By</label>
                    <input
                      type="text"
                      className="editform-input"
                      value={
                        role.addedBy
                          ? `${role.addedBy.firstName} ${role.addedBy.lastName}`
                          : "-"
                      }
                      placeholder=""
                      disabled
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                  <div className="editform-group">
                    <label className="editform-label">Added Time</label>
                    <input
                      type="text"
                      className="editform-input"
                      value={
                        role.createdAt
                          ? new Date(role.createdAt).toLocaleString()
                          : "-"
                      }
                      placeholder=""
                      disabled
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                  <div className="editform-group">
                    <label className="editform-label">Modified By</label>
                    <input
                      type="text"
                      className="editform-input"
                      value={
                        role.modifiedBy
                          ? `${role.modifiedBy.firstName} ${role.modifiedBy.lastName}`
                          : "-"
                      }
                      placeholder=""
                      disabled
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                  <div className="editform-group">
                    <label className="editform-label">Modified Time</label>
                    <input
                      type="text"
                      className="editform-input"
                      value={
                        role.updatedAt
                          ? new Date(role.updatedAt).toLocaleString()
                          : "-"
                      }
                      placeholder=""
                      disabled
                    />
                  </div>
                </div>
                <div className="col-12 col-md-12">
                  <h3 className="small-heading">Permissions</h3>
                </div>
                <div className="col-12 col-md-12 col-lg-12">
                  <div className="forn-group">
                    {PERMISSIONS.map(({ entity, actions }) => (
                      <div
                        key={entity}
                        className="permission-row"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginBottom: "12px",
                        }}
                      >
                        <span style={{ minWidth: 120 }}>{entity}</span>
                        {actions.map((action) => (
                          <label
                            key={action}
                            style={{ marginRight: "24px", marginLeft: "24px" }}
                          >
                            <input
                              type="checkbox"
                              name={`${entity}-${action}`}
                              checked={checked[`${entity}-${action}`] || false}
                              onChange={() =>
                                editMode && handleCheckboxChange(entity, action)
                              }
                              style={{ marginRight: 6 }}
                              disabled={!editMode}
                            />
                            {action}
                          </label>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
                {editMode && (
                  <div className="col-12 col-md-12 col-lg-12">
                    <div className="submit-btn-block">
                      <button
                        className="theme-btn btn-blue"
                        type="button"
                        onClick={handleSave}
                        disabled={isSaving}
                      >
                        Save
                      </button>
                      <button
                        className="theme-btn btn-grey"
                        type="button"
                        onClick={() => {
                          setEditMode(false);
                          setForm({
                            name: role.name || "",
                            description: role.description || "",
                            status: role.status || "Active", // Reset status on cancel
                          });
                          setChecked(getDefaultChecked(role.permissions));
                        }}
                        style={{ marginLeft: 12 }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewRole;
