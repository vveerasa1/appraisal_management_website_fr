import React from 'react';
import { Field, ErrorMessage } from 'formik';
import TextInput from '../../../components/common/TextInput';

const BasicDetails = () => (
  <div className='row'>
    <div className='col-12'><h3 className='small-heading'>Basic Details</h3></div>

    {[
      { label: 'First Name', name: 'firstName', type: 'text' },
      { label: 'Last Name', name: 'lastName', type: 'text' },
      { label: 'Email Address', name: 'email', type: 'email' },
      { label: 'Phone Number', name: 'phone', type: 'text' },
      { label: 'Employee ID', name: 'employeeId', type: 'text' },
      { label: 'Designation', name: 'designation', type: 'text' },
      { label: 'Date of Joining', name: 'dateOfJoining', type: 'date' },
    ].map(({ label, name, type }) => (
      <div key={name} className='col-12 col-md-6 col-lg-4'>
            <TextInput label={label} name={name} type={type} placeholder='' />
      </div>
    ))}

    <div className='col-12 col-md-6 col-lg-4'>
      <div className='forn-group'>
        <label className='form-label'>Department</label>
        <Field as='select' name='department' className='form-input'>
          <option value=''>---Select Department---</option>
          <option value='HR'>HR</option>
          <option value='Engineering'>Engineering</option>
        </Field>
        <ErrorMessage name='department' component='div' className='form-error' />
      </div>
    </div>

    <div className='col-12 col-md-6 col-lg-4'>
      <div className='forn-group'>
        <label className='form-label'>Reporting To</label>
        <Field as='select' name='reportingTo' className='form-input'>
          <option value=''>---Select---</option>
          <option value='Manager1'>Manager 1</option>
          <option value='Manager2'>Manager 2</option>
        </Field>
        <ErrorMessage name='reportingTo' component='div' className='form-error' />
      </div>
    </div>
  </div>
);

export default BasicDetails;