import React from 'react';
import { Field, ErrorMessage } from 'formik';
import TextInput from '../../../components/common/TextInput';
import SelectInput from '../../../components/common/SelectInput';

const BasicDetails = ({departments, reportingManagers,isReporterLoading, isdepartmentdataLoading,designations,isDesignationLoading, isEdit }) => 
  (
  <div className='row'>
    <div className='col-12'><h3 className='small-heading'>Employee Details</h3></div>

    {[
        { label: "First Name", name: "firstName", type: "text" },
        { label: "Last Name", name: "lastName", type: "text" },
        { label: "Email Address", name: "email", type: "text", disabled: true },
        { label: "Phone Number", name: "phoneNumber", type: "text" },
        { label: "Employee ID", name: "employeeId", type: "text" },
        { label: 'Date of Joining', name: 'dateOfJoining', type: 'date' },
    ].map(({ label, name, type }) => (
      <div key={name} className='col-12 col-md-6 col-lg-4'>
            <TextInput label={label} name={name} type={type} placeholder='' isEdit={isEdit} />
      </div>
    ))}
    <div className='col-12 col-md-6 col-lg-4'>
      <SelectInput label='Designation' name='designation' placeholder='Select Designation' isEdit={isEdit} options={designations} loading={isDesignationLoading} />
    </div>

    <div className='col-12 col-md-6 col-lg-4'>
      <SelectInput label='Department' name='department' placeholder='Select Department' isEdit={isEdit} options={departments} loading={isdepartmentdataLoading}/>
    </div>

    <div className='col-12 col-md-6 col-lg-4'>
      <SelectInput label='Reporting To' name='reportingTo' placeholder='Select Reporting Manager' isEdit={isEdit} options={reportingManagers} loading={isReporterLoading}/>
    </div>
  </div>
);

export default BasicDetails;