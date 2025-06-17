import { useState, useMemo, useEffect } from "react";
import "./style.css";
import { Link, useParams } from "react-router-dom";
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
  useUpdateUserMutation,
} from "../../../services/features/users/userApi";
import { useApiErrorToast } from "../../../hooks/useApiErrorToast";
import { mapToSelectOptions } from "../../../utils/utils";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";
import { useGetDesignationsQuery } from "../../../services/features/designation/designationApi";

const InitialValues = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
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
  phoneNumber: Yup.string().required("Phone number is required"),
  employeeId: Yup.string().required("Employee ID is required"),
  department: Yup.string().required("Department is required"),
  reportingTo: Yup.string().required("Reporting To is required"),
  designation: Yup.string().required("Designation is required"),
  dateOfJoining: Yup.date()
    .max(new Date(), "Date of joining cannot be in the future")
    .required("Date of joining is required"),
  address: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),
  province: Yup.string().required("Province is required"),
  postalCode: Yup.string().required("Postal Code is required"),
  country: Yup.string().required("Country is required"),
});

const isEdit = true

const EditEmployee = () => {
  const {userId} = useParams()
  const tempUserId = '684fe62b3d87c714b1a7a360'
  const {data:userData , isLoading:isUserDataLoading, isError:isUserDataError, error:userDataError, refetch } = useGetUserQuery(tempUserId)
  const [updateUser, {isLoading:isUpdating}] = useUpdateUserMutation()
  const [initialValues, setInitialValues] = useState(InitialValues);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
  if (userData) {
    console.log(userData.data, "userData")
    const {reportingTo, dateOfJoining,profilePhotoUrl, ...rest} = userData.data
    setInitialValues({
        ...rest,
        dateOfJoining:new Date(dateOfJoining).toISOString().split('T')[0],
        reportingTo:reportingTo?._id,
        profilePhoto:profilePhotoUrl
        });
    setSelectedFile(profilePhotoUrl)
    setPreviewUrl(profilePhotoUrl)
  }
}, [userData]);

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
    isUserDataError,
    userDataError,
    "Failed to retrieve user information"
 )

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
    console.log(values, "ofrm")
    const formData = new FormData();
    formData.append("user", JSON.stringify(rest));
    if(userData.profilePhoto !== profilePhoto){
        formData.append("image", profilePhoto);   
    }
    console.log({userId:tempUserId,formData}, "my formData")
    const response = await updateUser({userId:tempUserId,formData}).unwrap();
    refetch()
    console.log("Response:", response);
    showSuccessToast("Employee updated successfully!");
   } catch (error) {
    console.warn("Error submitting form:", error);
    showErrorToast(`Failed to update employee. ${error?.data?.message || ''}`);
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
        <div className="viewPageTopDiv">
          <div className="lvDiv">
            <Link to="/admin/users">
              <i className="fa fa-angle-left"></i>
            </Link>
            <img className="img-fluid" src={ProfileImg} alt="Profile" />
            <p>{userData?.data?.employeeId} - {userData?.data?.firstName} {userData?.data?.lastName} </p>
          </div>
          <div className="rvDiv">
            <button className="rvDiv-btns delete" type="button">
              <i className="fa fa-trash"></i>
            </button>
          </div>
        </div>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {({ setFieldValue, values, isSubmitting }) => (
          <Form className="form-list-container">
            <div className="view-container">
              <div className="row">
                <div className="col-12 col-md-12 col-lg-12">
                  <div className="view-other-info">
                    
                    <div className="row">
                      <BasicDetails
                        departments={departments}
                        isdepartmentdataLoading={isdepartmentdataLoading}
                        reportingManagers={reportingManagers}
                        isReporterLoading={isReporterLoading}
                        designations={designations}
                        isDesignationLoading={isDesignationLoading}
                        isEdit={isEdit}
                      />
                      <AddressDetails isEdit={isEdit} />
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
                          <button className="theme-btn btn-blue" type="submit" disabled={isSubmitting||isUpdating}>
                            {isUpdating?"Saving..": "Save Changes"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default EditEmployee;
