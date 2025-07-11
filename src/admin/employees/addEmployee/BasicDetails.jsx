import React from "react";
import { Field, ErrorMessage } from "formik";
import TextInput from "../../../components/common/TextInput";
import SelectInput from "../../../components/common/SelectInput";

const BasicDetails = ({
  departments,
  reportingManagers,
  isReporterLoading,
  roles,
  isroledataLoading,
  isdepartmentdataLoading,
  designations,
  isDesignationLoading,
}) => (
  <div className="row">
    <div className="col-12">
      <h3 className="small-heading">Basic Details</h3>
    </div>

    {[
      { label: "First Name", name: "firstName", type: "text" },
      { label: "Last Name", name: "lastName", type: "text" },
      { label: "Email Address", name: "email", type: "email" },
      { label: "Phone Number", name: "phoneNumber", type: "text" },
      { label: "Employee ID", name: "employeeId", type: "text" },
      { label: "Date of Birth", name: "dob", type: "date" },
      { label: "Date of Joining", name: "dateOfJoining", type: "date" },
    ].map(({ label, name, type }) => (
      <div key={name} className="col-12 col-md-6 col-lg-4">
        <TextInput
          label={label}
          name={name}
          type={type}
          placeholder=""
          isEdit={false}
        />
      </div>
    ))}
    <div className="col-12 col-md-6 col-lg-4">
      <SelectInput
        label="Designation"
        name="designation"
        placeholder="Select Designation"
        isEdit={false}
        options={designations}
        loading={isDesignationLoading}
      />
    </div>

    <div className="col-12 col-md-6 col-lg-4">
      <SelectInput
        label="Department"
        name="department"
        placeholder="Select Department"
        isEdit={false}
        options={departments}
        loading={isdepartmentdataLoading}
      />
    </div>

    <div className="col-12 col-md-6 col-lg-4">
      <SelectInput
        label="Reporting To"
        name="reportingTo"
        placeholder="Select Reporting Manager"
        isEdit={false}
        options={reportingManagers}
        loading={isReporterLoading}
      />
    </div>
    <div className="col-12 col-md-6 col-lg-4">
      <SelectInput
        label="Role"
        name="role"
        placeholder="Select Role"
        isEdit={false}
        options={roles}
        loading={isroledataLoading}
      />
    </div>
  </div>
);

export default BasicDetails;
