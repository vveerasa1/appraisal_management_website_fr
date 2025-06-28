import { useState } from "react";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import { useAddRoleMutation } from "../../../services/features/roles/roleApi";
import { showSuccessToast, showErrorToast } from "../../../utils/toast";

const PERMISSIONS = [
  { entity: "User", actions: ["Add", "Edit", "View", "Delete"] },
  { entity: "Department", actions: ["Add", "Edit", "View", "Delete"] },
  { entity: "Designation", actions: ["Add", "Edit", "View", "Delete"] },
  { entity: "Appraisal", actions: ["Add", "Edit", "View", "Delete"] },
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
};

const getDefaultChecked = () => {
  const checked = {};
  PERMISSIONS.forEach(({ entity, actions }) => {
    actions.forEach((action) => {
      checked[`${entity}-${action}`] = false;
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

const AddRole = () => {
  const [form, setForm] = useState({ name: "", description: "" });
  const [checked, setChecked] = useState(getDefaultChecked());
  const [addRole, { isLoading }] = useAddRoleMutation();
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

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
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Role Name is required";
    if (!form.description.trim())
      newErrors.description = "Role Description is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await addRole({
        name: form.name,
        description: form.description,
        permissions: getPermissionsArray(checked),
      }).unwrap();
      showSuccessToast("Role added successfully!");
      navigate("/admin/roles");
    } catch (err) {
      showErrorToast(
        err?.data?.message ||
          err?.error ||
          err?.message ||
          "Failed to add role."
      );
    }
  };

  return (
    <>
      <div className="pageTanDiv">
        <ul className="pageTabPane">
          <li className="active">
            <Link to="/admin/roles">Roles</Link>
          </li>
        </ul>
      </div>
      <form className="form-list-container" onSubmit={handleSave}>
        <div className="row">
          <div className="col-12 col-md-12 col-lg-12">
            <div className="form-list-wrapper">
              <div className="row">
                <div className="col-12 col-md-6 col-lg-4">
                  <div className="forn-group">
                    <label className="form-label">Role Name</label>
                    <input
                      type="text"
                      className="form-input"
                      name="name"
                      value={form.name}
                      onChange={handleInputChange}
                    />
                    {errors.name && (
                      <span className="form-error">{errors.name}</span>
                    )}
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-8">
                  <div className="forn-group">
                    <label className="form-label">Role Description</label>
                    <input
                      type="text"
                      className="form-input"
                      name="description"
                      value={form.description}
                      onChange={handleInputChange}
                    />
                    {errors.description && (
                      <span className="form-error">{errors.description}</span>
                    )}
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
                                handleCheckboxChange(entity, action)
                              }
                              style={{ marginRight: 6 }}
                            />
                            {action}
                          </label>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="col-12 col-md-12 col-lg-12">
                  <div className="submit-btn-block">
                    <button
                      className="theme-btn btn-border"
                      type="button"
                      onClick={() => navigate("/admin/roles")}
                      disabled={isLoading}
                    >
                      Cancel
                    </button>
                    <button
                      className="theme-btn btn-blue"
                      type="submit"
                      disabled={isLoading}
                    >
                      Save Role
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

export default AddRole;
