import { useMemo, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import BasicDetails from "./BasicDetails";
import AddressDetails from "./AddressDetails";
import ProfilePhoto from "./ProfilePhoto";
import "./style.css";
import { Link } from "react-router-dom";
import { useGetDepartmentsQuery } from "../../../services/features/departments/departmentApi";
import { useAddUserMutation, useGetReportersQuery } from "../../../services/features/users/userApi";
import { useApiErrorToast } from "../../../hooks/useApiErrorToast";
import { mapToSelectOptions } from "../../../utils/utils";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";
import { useGetDesignationsQuery } from "../../../services/features/designation/designationApi";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  employeeId: "",
  department: "",
  reportingTo: "",
  designation: "",
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
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
  employeeId: Yup.string().required("Employee ID is required"),
  department: Yup.string().required("Department is required"),
  reportingTo: Yup.string().required("Reporting To is required"),
  designation: Yup.string().required("Designation is required"),
  dateOfJoining: Yup.date().max(new Date(), 'Date of joining cannot be in the future').required("Date of joining is required"),
  address: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),
  province: Yup.string().required("Province is required"),
  postalCode: Yup.string().required("Postal Code is required"),
  country: Yup.string().required("Country is required"),
});

export default function EmployeeForm() {

  const [addUser, {isLoading:isAddEmployeeLoading}] = useAddUserMutation()
   const [previewUrl, setPreviewUrl] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);



  const {
    data: designationsData,
    isLoading: isDesignationLoading,
    isError: isDesignationError,
    error: designationError,
  } = useGetDesignationsQuery();

  const {
    data: departmentsData,
    isLoading: isdepartmentdataLoading,
    isError: isDepartmentdataError,
    error: departmentDataError,
  } = useGetDepartmentsQuery();
  const {
    data: reportersData,
    isLoading: isReporterLoading,
    isError: isReporterError,
    error: reporterError,
  } = useGetReportersQuery();

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

    const handleSubmit = async(values) => {
   try {
    const { profilePhoto, ...rest } = values;
    const formData = new FormData();
    formData.append("user", JSON.stringify(rest));
    formData.append("image", profilePhoto);
    const response = await addUser(formData).unwrap();
    console.log("Response:", response);
    showSuccessToast("Employee added successfully!");
   } catch (error) {
    console.warn("Error submitting form:", error);
    showErrorToast(`Failed to add employee. ${error?.data?.message || ''}`);
   }
  };

  const handleRemove = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    // handleFileChange(null);
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
                    departments={departments}
                    isdepartmentdataLoading={isdepartmentdataLoading}
                    reportingManagers={reportingManagers}
                    isReporterLoading={isReporterLoading}
                    designations={designations}
                    isDesignationLoading={isDesignationLoading}
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
                    <button className="theme-btn btn-border" type="button" onClick={() =>{ 
                      resetForm(initialValues)
                      handleRemove();
                    }}>
                      Cancel
                    </button>
                    <button className="theme-btn btn-blue" type="submit" disabled={isSubmitting || isAddEmployeeLoading}>
                      {isSubmitting || isAddEmployeeLoading ? 'Saving...' : 'Save Employee'}
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
