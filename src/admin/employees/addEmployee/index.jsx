import { useMemo, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import BasicDetails from "./BasicDetails";
import AddressDetails from "./AddressDetails";
import ProfilePhoto from "./ProfilePhoto";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import { useGetDepartmentsQuery } from "../../../services/features/departments/departmentApi";
import { useGetRolesQuery } from "../../../services/features/roles/roleApi";
import {
  useAddUserMutation,
  useGetReportersQuery,
} from "../../../services/features/users/userApi";

import { useApiErrorToast } from "../../../hooks/useApiErrorToast";
import { mapToSelectOptions } from "../../../utils/utils";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";
import { useGetDesignationsQuery } from "../../../services/features/designation/designationApi";
import { useSelector } from "react-redux";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  employeeId: "",
  department: null,
  reportingTo: "",
  role: "",
  designation: null,
  dateOfJoining: "",
  dob: "", // NEW: Add date of birth
  address: "",
  city: "",
  province: "",
  postalCode: "",
  country: "",
  createdBy: "",
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
  phoneNumber: Yup.string()
    .matches(
      /^[0-9]{10}$/,
      "Phone number must be exactly 10 digits and contain only numbers"
    )
    .required("Phone number is required"),
  employeeId: Yup.string(),
  // departme nt: Yup.string(),
  reportingTo: Yup.string().required("Reporting to is required"),
  role: Yup.string().required("Role is required"),
  // designation: Yup.string(),
  dateOfJoining: Yup.date().max(
    new Date(),
    "Date of joining cannot be in the future"
  ),
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

export default function EmployeeForm() {
  const [addUser, { isLoading: isAddEmployeeLoading }] = useAddUserMutation();
  const [previewUrl, setPreviewUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();
  const userId = useSelector((state) => state.users.id);

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

  const {
    data: rolesData,
    isLoading: isRoleLoading,
    isError: isRoleError,
    error: roleError,
  } = useGetRolesQuery({ search: "" });

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
  useApiErrorToast(isRoleError, roleError, "Failed to load roles");

  useApiErrorToast(
    isDesignationError,
    designationError,
    "Failed to load designations"
  );

  // Filter and map only active designations
  const designations = useMemo(() => {
    if (!designationsData || !designationsData.data) return [];
    // Filter by status === 'Active'
    const activeDesignations = designationsData.data.filter(
      (item) => item.status === "Active"
    );
    return mapToSelectOptions(activeDesignations, {
      label: "name",
      value: "_id",
    });
  }, [designationsData]);

  // Filter and map only active departments
  const departments = useMemo(() => {
    if (!departmentsData || !departmentsData.data) return [];
    // Filter by status === 'Active'
    const activeDepartments = departmentsData.data.filter(
      (item) => item.status === "Active"
    );
    return mapToSelectOptions(activeDepartments, {
      label: "name",
      value: "_id",
    });
  }, [departmentsData]);

  // Reporting managers don't have a 'status' field in your context,
  // so we keep this as is. If they did, you'd apply a similar filter.
  const reportingManagers = useMemo(() => {
    if (!reportersData || !reportersData.data) return [];
    return mapToSelectOptions(reportersData.data, {
      label: (item) =>
        `${item.firstName} ${item.lastName} (${item.designation?.name})`,
      value: "_id",
    });
  }, [reportersData]);

  // Filter and map only active roles
  const roles = useMemo(() => {
    if (!rolesData || !rolesData.data) return [];
    // Filter by status === 'Active'
    const activeRoles = rolesData.data.filter(
      (item) => item.status === "Active"
    );
    return mapToSelectOptions(activeRoles, {
      label: (item) => `${item.name}`,
      value: "_id",
    });
  }, [rolesData]); // Dependency changed from reportersData to rolesData

  const handleSubmit = async (values) => {
    try {
      values.createdBy = userId;
      const { profilePhoto, ...rest } = values; // 'rest' now includes dob
      const formData = new FormData();
      formData.append("user", JSON.stringify(rest)); // 'rest' sent as 'user' object
      formData.append("image", profilePhoto);
      const response = await addUser(formData).unwrap();
      console.log("Response:", response);
      showSuccessToast("Employee added successfully!");
      navigate("/admin/employees");
    } catch (err) {
      showErrorToast(
        err?.data?.message ||
          err?.error ||
          err?.message ||
          "Failed to add employee." // Changed from 'role' to 'employee'
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
        <ul className="pageTabPane">
          <li className="active">
            <Link to="/admin/employees">Employees</Link>
          </li>
        </ul>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values, isSubmitting, resetForm }) => (
          <Form className="form-list-container">
            <div className="row">
              <div className="col-12">
                <div className="form-list-wrapper">
                  <BasicDetails
                    // Existing props
                    departments={departments}
                    isdepartmentdataLoading={isdepartmentdataLoading}
                    reportingManagers={reportingManagers}
                    isReporterLoading={isReporterLoading}
                    roles={roles}
                    isroledataLoading={isRoleLoading}
                    designations={designations}
                    isDesignationLoading={isDesignationLoading}
                    // Pass setFieldValue and values to BasicDetails
                    setFieldValue={setFieldValue} // Pass to BasicDetails
                    values={values} // Pass to BasicDetails
                  />
                  <AddressDetails />
                  <ProfilePhoto
                    fileName={values.profilePhoto}
                    setFieldValue={setFieldValue}
                    previewUrl={previewUrl}
                    selectedFile={selectedFile}
                    setPreviewUrl={setPreviewUrl}
                    setSelectedFile={setSelectedFile}
                    handleRemove={handleRemove}
                  />
                  <div className="submit-btn-block">
                    <button
                      className="theme-btn btn-border"
                      type="button"
                      onClick={() => {
                        resetForm(initialValues);
                        handleRemove();
                        navigate('/admin/employees')
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      className="theme-btn btn-blue"
                      type="submit"
                      disabled={isSubmitting || isAddEmployeeLoading}
                    >
                      {isSubmitting || isAddEmployeeLoading
                        ? "Saving..."
                        : "Save Employee"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}
