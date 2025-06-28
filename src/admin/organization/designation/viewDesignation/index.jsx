import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import {
  useGetDesignationByIdQuery,
  useAddDesignationMutation,
  useDeleteDesignationMutation,
} from "../../../../services/features/designation/designationApi";
import { showSuccessToast, showErrorToast } from "../../../../utils/toast";
import "./style.css";
import ProfileImg from "../../../../assets/images/user.png";
import Select from "react-select";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";

const ViewDesignation = () => {
  const { id } = useParams();
  const { data, isLoading, error, refetch } = useGetDesignationByIdQuery(id);
  const designation = data?.data;
  const navigate = useNavigate();
  const userId = useSelector((state) => state.users.id);

  // Add edit mode and form state
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ name: "" });

  // Import your addDesignation mutation (adjust path as needed)
  const [addDesignation, { isLoading: isSaving }] = useAddDesignationMutation();
  const [deleteDesignation, { isLoading: isDeleting }] =
    useDeleteDesignationMutation(); // <-- add this

  useEffect(() => {
    if (designation) {
      setForm({ name: designation.name || "" });
    }
  }, [designation]);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEdit = () => setEditMode(true);

  const handleCancel = () => {
    setEditMode(false);
    if (designation) setForm({ name: designation.name || "" });
  };
  const handleDelete = async () => {
    if (!designation?._id) return;
    if (!window.confirm("Are you sure you want to delete this designation?"))
      return;
    try {
      await deleteDesignation(designation._id).unwrap();
      showSuccessToast("Designation deleted successfully!");
      // Optionally redirect after delete:
      navigate("/admin/organization/designation");
    } catch (err) {
      const errorMsg =
        err?.data?.message ||
        err?.error ||
        err?.message ||
        "Failed to delete designation.";
      showErrorToast(errorMsg);
    }
  };
  const handleSave = async () => {
    try {
      await addDesignation({
        id: designation._id,
        name: form.name,
        userId: userId, // static userId
      }).unwrap();
      setEditMode(false);
      showSuccessToast("Designation updated successfully!");
      refetch(); // Ensure refetch completes before UI updates
    } catch (err) {
      const errorMsg =
        err?.data?.message ||
        err?.error ||
        err?.message ||
        "Failed to update designation.";
      showErrorToast(errorMsg);
    }
  };

  return (
    <>
      <div className="pageTanDiv">
        <ul className="pageTabPane">
          {/* <li>
            <Link to="/admin/employees">Employee</Link>
          </li> */}
          <li>
            <Link to="/admin/organization/department">Department</Link>
          </li>
          <li className="active">
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
              <h3 className="small-heading">Designation Details</h3>
              {isLoading ? (
                <p>Loading...</p>
              ) : error ? (
                <p>Failed to load designation details.</p>
              ) : (
                <div className="row">
                  <div className="col-12 col-md-6 col-lg-4">
                    <div className="editform-group">
                      <label className="editform-label">Designation Name</label>
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
                          value={designation?.name || ""}
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
                  <div className="col-12 col-md-6 col-lg-4">
                    <div className="editform-group">
                      <label className="editform-label">Added By</label>
                      <input
                        type="text"
                        className="editform-input"
                        value={
                          designation?.addedBy
                            ? `${designation.addedBy.firstName} ${designation.addedBy.lastName}`
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
                          designation?.createdAt
                            ? new Date(designation.createdAt).toLocaleString()
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
                          designation?.modifiedBy
                            ? `${designation.modifiedBy.firstName} ${designation.modifiedBy.lastName}`
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
                          designation?.modifiedTime
                            ? new Date(
                                designation.modifiedTime
                              ).toLocaleString()
                            : "-"
                        }
                        placeholder=""
                        disabled
                      />
                    </div>
                  </div>
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

export default ViewDesignation;
