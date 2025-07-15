import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik"; // Import Formik components
import * as Yup from "yup"; // For validation schema

import {
  useGetDesignationByIdQuery,
  useAddDesignationMutation,
  useDeleteDesignationMutation,
} from "../../../../services/features/designation/designationApi";
// Removed: useGetAllReportingManagersQuery - as you don't want the Reporting To dropdown

import { showSuccessToast, showErrorToast } from "../../../../utils/toast";
import "./style.css";
import { usePermission } from "../../../../hooks/usePermission";

// Removed: Select from "react-select"; - as we're no longer using it for status

const ViewDesignation = () => {
  const { id } = useParams();
  const { data, isLoading, error, refetch } = useGetDesignationByIdQuery(id);
  const designation = data?.data;
  const navigate = useNavigate();
  const userId = useSelector((state) => state.users.id);
  const { hasPermission } = usePermission();

  const CAN_UPDATE_DESIGNATION = "designation:update";
  const CAN_DELETE_DESIGNATION = "designation:delete";

  // State to manage edit mode
  const [editMode, setEditMode] = useState(false);

  // No longer fetching reporting managers
  // const { data: managersData, isLoading: managersLoading, error: managersError } = useGetAllReportingManagersQuery();
  // const reportingManagers = managersData?.data?.map(...) || [];

  const [addDesignation, { isLoading: isSaving }] = useAddDesignationMutation();
  const [deleteDesignation, { isLoading: isDeleting }] =
    useDeleteDesignationMutation();

  // Options for the status dropdown (now used with native select)
  const statusOptions = [
    { value: "Active", label: "Active" },
    { value: "Inactive", label: "Inactive" },
  ];

  // Removed: customStyles - as react-select is no longer used for status

  // Define Validation Schema with Yup
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Designation name is required"),
    status: Yup.string().required("Status is required"),
    // Removed: reportingTo validation as the field is removed
  });

  const handleEdit = () => setEditMode(true);

  const handleDelete = async () => {
    if (!designation?._id) return;
    if (!window.confirm("Are you sure you want to delete this designation?"))
      return;
    try {
      await deleteDesignation(designation._id).unwrap();
      showSuccessToast("Designation deleted successfully!");
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

  const handleSave = async (values, { setSubmitting }) => {
    try {
      await addDesignation({
        id: designation._id,
        name: values.name,
        status: values.status,
        // Removed: reportingTo from payload
        modifiedBy: userId,
      }).unwrap();
      setEditMode(false);
      showSuccessToast("Designation updated successfully!");
      refetch();
    } catch (err) {
      const errorMsg =
        err?.data?.message ||
        err?.error ||
        err?.message ||
        "Failed to update designation.";
      showErrorToast(errorMsg);
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) {
    return <p>Loading designation details...</p>;
  }

  if (error) {
    return <p>Error loading designation: {error.message || "Unknown error"}</p>;
  }

  if (!designation) {
    return <p>No designation found with this ID.</p>;
  }

  return (
    <>
      <div className="pageTanDiv">
        <ul className="pageTabPane">
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
          {hasPermission(CAN_UPDATE_DESIGNATION) && (
            <button
              className="rvDiv-btns"
              type="button"
              onClick={handleEdit}
              title="Edit"
            >
              <i className="fa fa-pencil"></i>
            </button>
          )}
          {hasPermission(CAN_DELETE_DESIGNATION) && (
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
              <h3 className="small-heading">Designation Details</h3>
              <Formik
                initialValues={{
                  name: designation.name || "",
                  status: designation.status || "Active",
                  // Removed: reportingTo from initialValues
                }}
                validationSchema={validationSchema}
                onSubmit={handleSave}
                enableReinitialize={true}
              >
                {({ values, setFieldValue, isSubmitting, resetForm }) => (
                  <Form>
                    <div className="row">
                      {/* Designation Name Field */}
                      <div className="col-12 col-md-6 col-lg-4">
                        <div className="editform-group">
                          <label className="editform-label">
                            Designation Name
                          </label>
                          {editMode ? (
                            <Field
                              type="text"
                              className="editform-input"
                              name="name"
                            />
                          ) : (
                            <input
                              type="text"
                              className="editform-input"
                              value={values.name}
                              disabled
                            />
                          )}
                          <ErrorMessage
                            name="name"
                            component="div"
                            className="error"
                          />
                          {/* {!editMode && (
                            <div className="ef-actionbtns">
                              <button
                                className="editform-btn"
                                type="button"
                                onClick={handleEdit}
                              >
                                <i className="fa fa-pencil"></i>
                              </button>
                            </div>
                          )} */}
                        </div>
                      </div>

                      {/* Status Dropdown (now using Field as="select") */}
                      <div className="col-12 col-md-6 col-lg-4">
                        <div className="editform-group">
                          <label className="editform-label">Status</label>
                          {editMode ? (
                            <Field
                              as="select"
                              name="status"
                              className="editform-input"
                            >
                              {/* Option for default/placeholder if needed, though status usually has a default */}
                              {/* <option value="">Select Status</option> */}
                              {statusOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </Field>
                          ) : (
                            <input
                              type="text"
                              className="editform-input"
                              value={values.status}
                              disabled
                            />
                          )}
                          <ErrorMessage
                            name="status"
                            component="div"
                            className="error"
                          />
                        </div>
                      </div>

                      {/* Removed: Reporting To Dropdown */}

                      {/* Added By Field */}
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
                            disabled
                          />
                        </div>
                      </div>

                      {/* Added Time Field */}
                      <div className="col-12 col-md-6 col-lg-4">
                        <div className="editform-group">
                          <label className="editform-label">Added Time</label>
                          <input
                            type="text"
                            className="editform-input"
                            value={
                              designation?.createdAt
                                ? new Date(
                                    designation.createdAt
                                  ).toLocaleString()
                                : "-"
                            }
                            disabled
                          />
                        </div>
                      </div>

                      {/* Modified By Field */}
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
                            disabled
                          />
                        </div>
                      </div>

                      {/* Modified Time Field */}
                      <div className="col-12 col-md-6 col-lg-4">
                        <div className="editform-group">
                          <label className="editform-label">
                            Modified Time
                          </label>
                          <input
                            type="text"
                            className="editform-input"
                            value={
                              designation?.updatedAt
                                ? new Date(
                                    designation.updatedAt
                                  ).toLocaleString()
                                : "-"
                            }
                            disabled
                          />
                        </div>
                      </div>

                      {/* Action Buttons (Save/Cancel) */}
                      <div className="col-12 col-md-12 col-lg-12">
                        <div className="submit-btn-block">
                          {editMode && (
                            <>
                              <button
                                className="theme-btn btn-blue"
                                type="submit"
                                disabled={isSubmitting || isSaving}
                              >
                                {isSubmitting || isSaving
                                  ? "Saving..."
                                  : "Save"}
                              </button>
                              <button
                                className="theme-btn btn-grey"
                                type="button"
                                onClick={() => {
                                  resetForm();
                                  setEditMode(false);
                                }}
                                disabled={isSubmitting || isSaving}
                              >
                                Cancel
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewDesignation;
