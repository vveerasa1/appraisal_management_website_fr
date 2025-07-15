import { useState, useMemo, useEffect } from "react";
import "./style.css";
import { Link, useParams, useNavigate } from "react-router-dom";
import ProfileImg from "../../../assets/images/user.png";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import BasicDetails from "./BasicDetails"; // Assuming these are external components if still needed
import AddressDetails from "./AddressDetails"; // Assuming these are external components if still needed
import ProfilePhoto from "./ProfilePhoto"; // Assuming these are external components if still needed
import { useGetDepartmentsQuery } from "../../../services/features/departments/departmentApi";
import {
  useGetReportersQuery,
  useGetUserQuery,
  useDeleteUserMutation,
  useAddUserMutation, // Assuming this is used for update as well
} from "../../../services/features/users/userApi";
import { useApiErrorToast } from "../../../hooks/useApiErrorToast";
import { mapToSelectOptions } from "../../../utils/utils";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";
import { useGetDesignationsQuery } from "../../../services/features/designation/designationApi";
import { useGetRolesQuery } from "../../../services/features/roles/roleApi";
import { useSelector } from "react-redux";
import { usePermission } from "../../../hooks/usePermission";

const InitialValues = {
  id: "",
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  employeeId: "",
  department: null,
  reportingTo: "",
  designation: null,
  role: "",
  status: "Active", // <-- ADDED: Status field with a default value
  dateOfJoining: "",
  dob: "",
  address: "",
  city: "",
  province: "",
  postalCode: "",
  country: "",
  modifierId: "",
  profilePhoto: null,
};

const validationSchema = Yup.object({
  firstName: Yup.string()
    .required("First Name is required")
    .matches(/^[a-zA-Z ]+$/, "First Name must contain only letters and spaces"),

  lastName: Yup.string()
    .required("Last Name is required")
    .matches(/^[a-zA-Z ]+$/, "Last Name must contain only letters and spaces"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: Yup.string().matches(
    /^[0-9]{10}$/,
    "Phone number must be exactly 10 digits and contain only numbers"
  ),

  employeeId: Yup.string(),
  // department: Yup.string(),
  reportingTo: Yup.string().required("Reporting to is required"),
  role: Yup.string().required("Role is required"),
  // designation: Yup.string(),
  dateOfJoining: Yup.date()
    .max(new Date(), "Date of joining cannot be in the future")
    .required("Date of joining is required"),
  dob: Yup.date() // NEW: Validation for DOB
    .max(new Date(), "Date of birth cannot be in the future"),
  address: Yup.string(),
  city: Yup.string()
    .matches(/^[a-zA-Z ]*$/, "City must contain only letters and spaces")
    .nullable(), // Or .optional() if it's not always required

  province: Yup.string()
    .matches(/^[a-zA-Z ]*$/, "Province must contain only letters and spaces")
    .nullable(), // Or .optional()

  postalCode: Yup.string()
    .matches(
      /^[a-zA-Z0-9]*$/,
      "Postal Code must contain only letters and numbers"
    )
    .nullable(), // Or .optional()

  country: Yup.string()
    .matches(/^[a-zA-Z ]*$/, "Country must contain only letters and spaces")
    .nullable(), // Or .optional()
});

// `isEdit` is typically derived from `id` presence, but keeping your original definition
const isEdit = true;

const EditEmployee = () => {
  const { id } = useParams();
  const {
    data: userData,
    isLoading: isUserDataLoading,
    isError: isUserDataError,
    error: userDataError,
    refetch,
  } = useGetUserQuery(id); // Use the actual `id` from useParams
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

  const [updateUser, { isLoading: isUpdating }] = useAddUserMutation(); // Assuming this mutation handles updates
  const [initialValues, setInitialValues] = useState(InitialValues);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();
  const userId = useSelector((state) => state.users.id); // Get current logged-in user ID for modifierId
  const { hasPermission } = usePermission(); // Initialize usePermission hook

  // Fetch roles
  const { data: rolesData, isLoading: isRolesLoading } = useGetRolesQuery({
    search: "",
  });

  // Define status options
  const statusOptions = [
    { value: "Active", label: "Active" },
    { value: "Inactive", label: "Inactive" },
  ];

  useEffect(() => {
    if (userData?.data) {
      const {
        reportingTo,
        dateOfJoining,
        profilePhotoUrl,
        role,
        department,
        designation,
        dob,
        status, // <-- Destructure status from userData
        ...rest
      } = userData.data;

      setInitialValues({
        id: userData.data._id,
        ...rest,
        dateOfJoining: dateOfJoining
          ? new Date(dateOfJoining).toISOString().split("T")[0]
          : "",
        dob: dob ? new Date(dob).toISOString().split("T")[0] : "",
        reportingTo: reportingTo?._id || "",
        role: role?._id || "",
        department: department?._id || "",
        designation: designation?._id || "",
        status: status || "Active", // <-- Set initial status from fetched data, default to "Active"
        profilePhoto: profilePhotoUrl || null,
      });
      setSelectedFile(profilePhotoUrl || null);
      setPreviewUrl(profilePhotoUrl || null);
    }
  }, [userData]);

  const {
    data: designationsData,
    isLoading: isDesignationLoading,
    isError: isDesignationError,
    error: designationError,
  } = useGetDesignationsQuery({ search: "" });

  const {
    data: departmentsData,
    isLoading: isdepartmentdataLoading,
    isError: isDepartmentdataError,
    error: departmentDataError,
  } = useGetDepartmentsQuery({ search: "" });
  const {
    data: reportersData,
    isLoading: isReporterLoading,
    isError: isReporterError,
    error: reporterError,
  } = useGetReportersQuery();

  useApiErrorToast(
    isUserDataError,
    userDataError,
    "Failed to retrieve user information"
  );
  useApiErrorToast(
    isDepartmentdataError,
    departmentDataError,
    "Failed to load departments"
  );
  useApiErrorToast(
    isReporterError,
    reporterError,
    "Failed to load reporting managers"
  );
  useApiErrorToast(
    isDesignationError,
    designationError,
    "Failed to load designations"
  );

  // --- START: Apply 'Active' status filter to dropdown options ---

  const designations = useMemo(() => {
    if (!designationsData || !designationsData.data) return [];
    // Filter designations to only include 'Active' ones
    const activeDesignations = designationsData.data.filter(
      (item) => item.status === "Active"
    );
    return mapToSelectOptions(activeDesignations, {
      label: "name",
      value: "_id",
    });
  }, [designationsData]);

  const departments = useMemo(() => {
    if (!departmentsData || !departmentsData.data) return [];
    // Filter departments to only include 'Active' ones
    const activeDepartments = departmentsData.data.filter(
      (item) => item.status === "Active"
    );
    return mapToSelectOptions(activeDepartments, {
      label: "name",
      value: "_id",
    });
  }, [departmentsData]);

  const reportingManagers = useMemo(() => {
    if (!reportersData || !reportersData.data) return [];
    return mapToSelectOptions(reportersData.data, {
      label: (item) =>
        `${item.firstName} ${item.lastName} (${item.designation?.name})`,
      value: "_id",
    });
  }, [reportersData]);

  // Roles dropdown options - filter to only include 'Active' roles
  const roles = useMemo(() => {
    if (!rolesData || !rolesData.data) return [];
    const activeRoles = rolesData.data.filter(
      (item) => item.status === "Active"
    );
    return mapToSelectOptions(activeRoles, {
      label: "name",
      value: "_id",
    });
  }, [rolesData]);
  const handleDelete = async () => {
    if (!userData?.data?._id) return;
    if (!window.confirm("Are you sure you want to delete this User?")) return;
    try {
      await deleteUser(id).unwrap();
      showSuccessToast("User deleted successfully!");
      navigate("/admin/employees");
    } catch (err) {
      const errorMsg =
        err?.data?.message ||
        err?.error ||
        err?.message ||
        "Failed to delete User.";
      showErrorToast(errorMsg);
    }
  };

  // --- END: Apply 'Active' status filter to dropdown options ---

  const handleSubmit = async (values) => {
    try {
      if (!userId) {
        showErrorToast("User ID not available for modification.");
        return; // Prevent submission if userId is missing
      }

      const { profilePhoto, ...rest } = values; // Exclude profilePhoto from the JSON part

      const formData = new FormData();
      formData.append(
        "user",
        JSON.stringify({ ...rest, modifierId: userId, id: userData.data._id })
      ); // Include modifierId and id here

      // Handle profile photo update logic
      if (selectedFile instanceof File) {
        // New file selected
        formData.append("image", selectedFile);
      }
      // If selectedFile is a URL (existing photo) and not explicitly removed, don't re-upload it.
      // If no change, or photo was removed and backend needs no signal, no action needed.

      await updateUser(formData).unwrap();
      showSuccessToast("Employee updated successfully!");
      navigate(`/admin/employee/view/${rest.id}`); // Navigate back after successful update
      refetch(); // Refetch user data to update the view
    } catch (error) {
      showErrorToast(
        `Failed to update employee. ${
          error?.data?.message || error?.message || ""
        }`
      );
      console.error("Update employee error:", error);
    }
  };

  const handleRemove = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    // When photo is removed, set profilePhoto field in Formik to null
    // This is crucial for Formik to know the field is cleared
    setInitialValues((prev) => ({ ...prev, profilePhoto: null }));
  };

  if (isUserDataLoading) {
    return <p>Loading employee details...</p>;
  }

  if (isUserDataError || !userData?.data) {
    return <p>Error: Could not load employee details.</p>;
  }
  const CAN_DELETE_USER = "user:delete";

  return (
    <>
      <div className="pageTanDiv">
        <div className="viewPageTopDiv">
          <div className="lvDiv">
            <Link to="/admin/employees">
              <i className="fa fa-angle-left"></i>
            </Link>
            <img
              className="img-fluid"
              src={previewUrl || ProfileImg}
              alt="Profile"
            />{" "}
            {/* Use previewUrl for live update */}
            <p>
              {userData?.data?.employeeId} - {userData?.data?.firstName}{" "}
              {userData?.data?.lastName}{" "}
            </p>
          </div>
          <div className="rvDiv">
            {hasPermission(CAN_DELETE_USER) && (
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
      </div>
      <div className="view-container">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize={true}
        >
          {({ setFieldValue, values, isSubmitting }) => (
            <Form className="form-list-container">
              <div className="row">
                <div className="col-12 col-md-12 col-lg-12">
                  <div className="view-other-info">
                    <div className="row">
                      {/* First Name */}
                      <div className="col-12 col-md-6 col-lg-4">
                        <div className="editform-group">
                          <label className="editform-label">First Name</label>
                          <Field
                            name="firstName"
                            className="editform-input"
                            type="text"
                          />
                          <ErrorMessage
                            name="firstName"
                            component="div"
                            className="error"
                          />
                        </div>
                      </div>
                      {/* Last Name */}
                      <div className="col-12 col-md-6 col-lg-4">
                        <div className="editform-group">
                          <label className="editform-label">Last Name</label>
                          <Field
                            name="lastName"
                            className="editform-input"
                            type="text"
                          />
                          <ErrorMessage
                            name="lastName"
                            component="div"
                            className="error"
                          />
                        </div>
                      </div>
                      {/* Email (not editable) */}
                      <div className="col-12 col-md-6 col-lg-4">
                        <div className="editform-group">
                          <label className="editform-label">Email</label>
                          <Field
                            name="email"
                            className="editform-input"
                            type="text"
                            disabled // Keep email disabled as per your comment
                          />
                        </div>
                      </div>
                      {/* Phone Number */}
                      <div className="col-12 col-md-6 col-lg-4">
                        <div className="editform-group">
                          <label className="editform-label">Phone Number</label>
                          <Field
                            name="phoneNumber"
                            className="editform-input"
                            type="text"
                          />
                          <ErrorMessage
                            name="phoneNumber"
                            component="div"
                            className="error"
                          />
                        </div>
                      </div>
                      {/* Employee ID (not editable) */}
                      <div className="col-12 col-md-6 col-lg-4">
                        <div className="editform-group">
                          <label className="editform-label">Employee ID</label>
                          <Field
                            name="employeeId"
                            className="editform-input"
                            type="text"
                          />
                        </div>
                      </div>
                      {/* Department */}
                      <div className="col-12 col-md-6 col-lg-4">
                        <div className="editform-group">
                          <label className="editform-label">Department</label>
                          <Field
                            as="select"
                            name="department"
                            className="editform-input"
                          >
                            <option value="">Select Department</option>
                            {departments.map((dept) => (
                              <option key={dept.value} value={dept.value}>
                                {dept.label}
                              </option>
                            ))}
                          </Field>
                        </div>
                      </div>
                      {/* Reporting To */}
                      <div className="col-12 col-md-6 col-lg-4">
                        <div className="editform-group">
                          <label className="editform-label">Reporting To</label>
                          <Field
                            as="select"
                            name="reportingTo"
                            className="editform-input"
                          >
                            <option value="">Select Reporting Manager</option>
                            {reportingManagers.map((mgr) => (
                              <option key={mgr.value} value={mgr.value}>
                                {mgr.label}
                              </option>
                            ))}
                          </Field>
                          <ErrorMessage
                            name="reportingTo"
                            component="div"
                            className="error"
                          />
                        </div>
                      </div>
                      {/* Designation */}
                      <div className="col-12 col-md-6 col-lg-4">
                        <div className="editform-group">
                          <label className="editform-label">Designation</label>
                          <Field
                            as="select"
                            name="designation"
                            className="editform-input"
                          >
                            <option value="">Select Designation</option>
                            {designations.map((des) => (
                              <option key={des.value} value={des.value}>
                                {des.label}
                              </option>
                            ))}
                          </Field>
                        </div>
                      </div>
                      {/* Role */}
                      <div className="col-12 col-md-6 col-lg-4">
                        <div className="editform-group">
                          <label className="editform-label">Role</label>
                          <Field
                            as="select"
                            name="role"
                            className="editform-input"
                          >
                            <option value="">Select Role</option>
                            {roles.map((role) => (
                              <option key={role.value} value={role.value}>
                                {role.label}
                              </option>
                            ))}
                          </Field>
                          <ErrorMessage
                            name="role"
                            component="div"
                            className="error"
                          />
                        </div>
                      </div>
                      {/* Status Dropdown - NEWLY ADDED */}
                      <div className="col-12 col-md-6 col-lg-4">
                        <div className="editform-group">
                          <label className="editform-label">Status</label>
                          <Field
                            as="select"
                            name="status"
                            className="editform-input"
                          >
                            {statusOptions.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </Field>
                          <ErrorMessage
                            name="status"
                            component="div"
                            className="error"
                          />
                        </div>
                      </div>
                      {/* Date of Joining */}
                      <div className="col-12 col-md-6 col-lg-4">
                        <div className="editform-group">
                          <label className="editform-label">
                            Date of Joining
                          </label>
                          <Field
                            name="dateOfJoining"
                            className="editform-input"
                            type="date"
                          />
                          <ErrorMessage
                            name="dateOfJoining"
                            component="div"
                            className="error"
                          />
                        </div>
                      </div>
                      {/* DOB */}
                      <div className="col-12 col-md-6 col-lg-4">
                        <div className="editform-group">
                          <label className="editform-label">
                            Date of Birth
                          </label>
                          <Field
                            name="dob"
                            className="editform-input"
                            type="date"
                          />
                          <ErrorMessage
                            name="dob"
                            component="div"
                            className="error"
                          />
                        </div>
                      </div>

                      {/* Address Details (assuming this component handles its own fields and errors) */}
                      {/* You might need to pass setFieldValue to AddressDetails if it's not a direct Field component */}
                      <AddressDetails isEdit={isEdit} />

                      {/* Profile Photo */}
                      <ProfilePhoto
                        fileName={values.profilePhoto}
                        setFieldValue={setFieldValue}
                        previewUrl={previewUrl}
                        selectedFile={selectedFile}
                        setPreviewUrl={setPreviewUrl}
                        setSelectedFile={setSelectedFile}
                        handleRemove={handleRemove}
                      />
                      <div className="col-12 col-md-12 col-lg-12">
                        <div className="submit-btn-block">
                          <button
                            className="theme-btn btn-blue"
                            type="submit"
                            disabled={isSubmitting || isUpdating}
                          >
                            {isUpdating ? "Saving.." : "Save Changes"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default EditEmployee;
