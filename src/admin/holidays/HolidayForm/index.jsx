import React, { useState, useEffect } from 'react';
import "./style.css";
import { Link, useParams } from 'react-router-dom';
import { useAddHolidayMutation } from '../../../services/features/holidays/holidayApi';

const HolidayForm = () => {
  const { id, type } = useParams(); // Assuming id param for edit mode
  const [formData, setFormData] = useState({
    holidayName: '',
    date: '',
    description: '',
  });
  const [createPoint, { isLoading: isSaving }] = useAddHolidayMutation();

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (id) {
      // TODO: Fetch existing holiday data by id and populate form
      // Simulated fetch:
      const fetchHoliday = async () => {
        // Replace with actual API call
        const holidayData = {
          holidayName: 'Sample Holiday',
          date: '2023-12-25',
          description: 'Christmas Day',
        };
        setFormData(holidayData);
      };
      fetchHoliday();
    }
  }, [id]);

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!formData.holidayName.trim() || typeof formData.holidayName !== 'string' || !nameRegex.test(formData.holidayName)) {
      newErrors.holidayName = 'Holiday name is required and must contain only letters and spaces.';
    }else{
      newErrors.holidayName = '';
    }
    if (!formData.date) {
      newErrors.date = 'Date is required.';
    }else{
      newErrors.date = '';
    }
    setErrors(newErrors);
    const isError=newErrors.date||newErrors.holidayName
    return !isError
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (id) {
      // TODO: Replace with actual API call to update holiday
      console.log('Updating holiday:', formData);
      alert('Holiday updated successfully!');
    } else {
      // TODO: Replace with actual API call to add holiday
      console.log('Adding holiday:', formData);
      createPoint(formData)
      alert('Holiday added successfully!');
    }

    // Reset form
    setFormData({
      holidayName: '',
      date: '',
      description: '',
    });
    setErrors({});
  };

  return (
    <>
      <div className='pageTanDiv'>
        <ul className='pageTabPane'>
          <li className='active'>
            <Link to="/admin/holidays">Holidays</Link>
          </li>
        </ul>
      </div>
      <form className='form-list-container' onSubmit={handleSubmit} noValidate>
        <div className='row'>
          <div className="col-12 col-md-12 col-lg-12">
            <div className='form-list-wrapper'>
              <div className='row'>
                <div className={type === 'edit' || type === 'view' ? 'col-12 col-md-6 col-lg-4' : 'col-12 col-md-6 col-lg-6'}>
                  <div className={type === 'edit' || type === 'view' ? 'editform-group' : 'forn-group'}>
                    <label className={type === 'edit' || type === 'view' ? 'editform-label' : 'form-label'}>Holiday Name</label>
                    <input
                      type='text'
                      className={type === 'edit' || type === 'view' ? 'editform-input' : 'form-input'}
                      value={formData.holidayName}
                      onChange={(e) => handleChange('holidayName', e.target.value)}
                      placeholder=''
                      disabled={type === 'view'}
                    />
                    {errors.holidayName && <div className="error-text" style={{ color: 'red' }}>{errors.holidayName}</div>}
                  </div>
                </div>
                <div className={type === 'edit' || type === 'view' ? 'col-12 col-md-6 col-lg-4' : 'col-12 col-md-6 col-lg-6'}>
                  <div className={type === 'edit' || type === 'view' ? 'editform-group' : 'forn-group'}>
                    <label className={type === 'edit' || type === 'view' ? 'editform-label' : 'form-label'}>Date</label>
                    <input
                      type='date'
                      className={type === 'edit' || type === 'view' ? 'editform-input' : 'form-input'}
                      value={formData.date}
                      onChange={(e) => handleChange('date', e.target.value)}
                      placeholder=''
                      disabled={type === 'view'}
                    />
                    {errors.date && <div className="error-text" style={{ color: 'red' }}>{errors.date}</div>}
                  </div>
                </div>
                <div className={type === 'edit' || type === 'view' ? 'col-12 col-md-6 col-lg-4' : 'col-12 col-md-6 col-lg-12'}>
                  <div className={type === 'edit' || type === 'view' ? 'editform-group' : 'forn-group'}>
                    <label className={type === 'edit' || type === 'view' ? 'editform-label' : 'form-label'}>Description</label>
                    <textarea
                      cols={30}
                      rows={3}
                      className={type === 'edit' || type === 'view' ? 'editform-input' : 'form-input'}
                      value={formData.description}
                      onChange={(e) => handleChange('description', e.target.value)}
                      placeholder=''
                      disabled={type === 'view'}
                    ></textarea>
                  </div>
                </div>
                {type != 'add' && <>
                  <div className='col-12 col-md-6 col-lg-4'>
                    <div className='editform-group'>
                      <label className='editform-label'>Added By</label>
                      <input type='text' className='editform-input' value="Admin" placeholder='' disabled />
                    </div>
                  </div>
                  <div className='col-12 col-md-6 col-lg-4'>
                    <div className='editform-group'>
                      <label className='editform-label'>Added Time</label>
                      <input type='text' className='editform-input' value="20/07/2024" placeholder='' disabled />
                    </div>
                  </div>
                  <div className='col-12 col-md-6 col-lg-4'>
                    <div className='editform-group'>
                      <label className='editform-label'>Modified By</label>
                      <input type='text' className='editform-input' value="Admin" placeholder='' disabled />
                    </div>
                  </div>
                  <div className='col-12 col-md-6 col-lg-4'>
                    <div className='editform-group'>
                      <label className='editform-label'>Modified Time</label>
                      <input type='text' className='editform-input' value="20/07/2024" placeholder='' disabled />
                    </div>
                  </div>
                </>}

                <div className='col-12 col-md-12 col-lg-12'>
                  <div className='submit-btn-block'>
                    <button className='theme-btn btn-border' type='button' onClick={() => window.history.back()}>Cancel</button>
                    <button className='theme-btn btn-blue' type='submit'>{id ? 'Save' : 'Create'}</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default HolidayForm;