// File: EmployeeForm.jsx
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import BasicDetails from './BasicDetails';
import AddressDetails from './AddressDetails';
import ProfilePhoto from './ProfilePhoto';
import "./style.css"
import { Link } from 'react-router-dom';

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  employeeId: '',
  department: '',
  reportingTo: '',
  designation: '',
  dateOfJoining: '',
  address: '',
  city: '',
  province: '',
  postalCode: '',
  country: '',
  profilePhoto: null,
};

const validationSchema = Yup.object({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string().required('Phone number is required'),
  employeeId: Yup.string().required('Employee ID is required'),
  department: Yup.string().required('Department is required'),
  reportingTo: Yup.string().required('Reporting To is required'),
  designation: Yup.string().required('Designation is required'),
  dateOfJoining: Yup.date().required('Date of joining is required'),
  address: Yup.string().required('Address is required'),
  city: Yup.string().required('City is required'),
  province: Yup.string().required('Province is required'),
  postalCode: Yup.string().required('Postal Code is required'),
  country: Yup.string().required('Country is required'),
});

export default function EmployeeForm() {
  const handleSubmit = (values) => {
    console.log('Form values:', values);
  };

  return (
    <>
      <div className='pageTanDiv'>
        <ul className='pageTabPane'>
          <li className='active'>
            <Link to="/admin/employees">Employees</Link>
          </li>
        </ul>
      </div>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ setFieldValue }) => (
          <Form className='form-list-container'>
            <div className='row'>
              <div className='col-12'>
                <div className='form-list-wrapper'>
                  <BasicDetails />
                  <AddressDetails />
                  <ProfilePhoto setFieldValue={setFieldValue} />
                  <div className='submit-btn-block'>
                    <button className='theme-btn btn-border' type='button'>Cancel</button>
                    <button className='theme-btn btn-blue' type='submit'>Save Employee</button>
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
