import { useState, useMemo, useEffect } from "react";
import "./style.css";
import { Link, useParams, useNavigate } from "react-router-dom";
import ProfileImg from "../../../assets/images/user.png";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import BasicDetails from "./BasicDetails";
import AddressDetails from "./AddressDetails";
import ProfilePhoto from "./ProfilePhoto";
import { useGetDepartmentsQuery } from "../../../services/features/departments/departmentApi";
import {
  useGetReportersQuery,
  useGetUserQuery,
  useAddUserMutation,
} from "../../../services/features/users/userApi";
import { useApiErrorToast } from "../../../hooks/useApiErrorToast";
import { mapToSelectOptions } from "../../../utils/utils";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";
import { useGetDesignationsQuery } from "../../../services/features/designation/designationApi";
import { useGetRolesQuery } from "../../../services/features/roles/roleApi"; // <-- Import roles API

const InitialValues = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  employeeId: "",
  department: "",
  reportingTo: "",
  designation: "",
  role: "",
  dateOfJoining: "",
  address: "",
  city: "",
  province: "",
  postalCode: "",
  country: "",
  profilePhoto: null,
};

const validationSchema = Yup.object({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().email("Invalid email"), // not required, not editable
  phoneNumber: Yup.string().required("Phone number is required"),
  employeeId: Yup.string(), // not required, not editable
  department: Yup.string(), // not required
  reportingTo: Yup.string().required("Reporting To is required"),
  designation: Yup.string(), // not required
  role: Yup.string().required("Role is required"),
  dateOfJoining: Yup.date()
    .max(new Date(), "Date of joining cannot be in the future")
    .required("Date of joining is required"),
  address: Yup.string(), // not required
  city: Yup.string().required("City is required"),
  province: Yup.string().required("Province is required"),
  postalCode: Yup.string().required("Postal Code is required"),
  country: Yup.string().required("Country is required"),
});

const isEdit = true;

const EditEmployee = () => {
  const { id } = useParams();
  const tempUserId = id || "684fe62b3d87c714b1a7a360";
  const {
    data: userData,
    isLoading: isUserDataLoading,
    isError: isUserDataError,
    error: userDataError,
    refetch,
  } = useGetUserQuery(id);
  const [updateUser, { isLoading: isUpdating }] = useAddUserMutation();
  const [initialValues, setInitialValues] = useState(InitialValues);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();

  // Fetch roles
  const { data: rolesData, isLoading: isRolesLoading } = useGetRolesQuery({
    search: "",
  });

  useEffect(() => {
    if (userData) {
      const { reportingTo, dateOfJoining, profilePhotoUrl, role, ...rest } =
        userData.data;
      setInitialValues({
        ...rest,
        dateOfJoining: new Date(dateOfJoining).toISOString().split("T")[0],
        reportingTo: reportingTo?._id,
        role: role?._id || "",
        profilePhoto: profilePhotoUrl,
      });
      setSelectedFile(profilePhotoUrl);
      setPreviewUrl(profilePhotoUrl);
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

  const designations = useMemo(() => {
    if (!designationsData || !designationsData.data) return [];
    return mapToSelectOptions(designationsData?.data, {
      label: "name",
      value: "_id",
    });
  }, [designationsData]);

  const departments = useMemo(() => {
    if (!departmentsData || !departmentsData.data) return [];
    return mapToSelectOptions(departmentsData?.data, {
      label: "name",
      value: "_id",
    });
  }, [departmentsData]);

  const reportingManagers = useMemo(() => {
    if (!reportersData || !reportersData.data) return [];
    return mapToSelectOptions(reportersData?.data, {
      label: (item) =>
        `${item.firstName} ${item.lastName} (${item.designation?.name})`,
      value: "_id",
    });
  }, [reportersData]);

  // Roles dropdown options
  const roles = useMemo(() => {
    if (!rolesData || !rolesData.data) return [];
    return mapToSelectOptions(rolesData.data, {
      label: "name",
      value: "_id",
    });
  }, [rolesData]);

  const handleSubmit = async (values) => {
    console.log("here");
    try {
      const { profilePhoto, ...rest } = values;
      // Add id to the user object
      const userWithId = { ...rest, id: tempUserId };
      const formData = new FormData();
      formData.append("user", JSON.stringify(userWithId));
      if (userData.profilePhoto !== profilePhoto) {
        formData.append("image", profilePhoto);
      }
      await updateUser(formData).unwrap();
      navigate("/admin/employees");

      refetch();
      showSuccessToast("Employee updated successfully!");
    } catch (error) {
      showErrorToast(
        `Failed to update employee. ${error?.data?.message || ""}`
      );
    }
  };

  const handleRemove = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  return (
    <>
      <div className="pageTanDiv">
        <div className="viewPageTopDiv">
          <div className="lvDiv">
            <Link to="/admin/users">
              <i className="fa fa-angle-left"></i>
            </Link>
            <img className="img-fluid" src={ProfileImg} alt="Profile" />
            <p>
              {userData?.data?.employeeId} - {userData?.data?.firstName}{" "}
              {userData?.data?.lastName}{" "}
            </p>
          </div>
          <div className="rvDiv">
            <button className="rvDiv-btns delete" type="button">
              <i className="fa fa-trash"></i>
            </button>
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
                            disabled
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
                            disabled
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
                      {/* Address Details */}
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
