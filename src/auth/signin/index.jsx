import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import "./style.css"
import { Link } from 'react-router-dom'
import { useLoginMutation } from '../../services/features/auth/authApi';
import { showErrorToast, showSuccessToast } from '../../utils/toast';
import { useDispatch } from 'react-redux';
import { addToken } from '../../services/features/auth/authSlice';
import { addUserInfo } from '../../services/features/users/userSlice';

const Signin = () => {
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch()

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().min(6, 'Minimum 6 characters').required('Required'),
  });
  
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await login(values).unwrap();
      const {access_token,role,user} = response.data
      dispatch(addToken({role,accessToken:access_token}))
      const {_id,firstName,lastName,email,status} = user
      dispatch(addUserInfo({id:_id,name:`${firstName} ${lastName}`,email:email,status:status}))
      showSuccessToast("Success")
    } catch (error) {
      console.error('Login Failed:', error);
      showErrorToast(error?.data?.message)
    }
    setSubmitting(false);
  };
    return (
        <div className='auth-container'>
            <div className='auth-wrapper'>
                <div className='auth-form-container'>
                    <div className='auth-form-top'>
                        <h3 className='auth-small-heading'>Login</h3>
                        <h1 className='auth-heading'>Hello Welcome Back</h1>
                        <p className='auth-description'>Welcome back please sign in again</p>
                    </div>
                     <Formik
                        initialValues={{ email: '', password: '' }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                        >
                        {({ isSubmitting }) => (
                        <Form className='auth-form-fields'>
                            <div className='auth-group'>
                                <i className='fa fa-envelope'></i>
                                <Field
                                className='auth-input'
                                type='email'
                                name='email'
                                placeholder='Email'
                                />
                                 <ErrorMessage
                                name='email'
                                component='div'
                                className='form-error'
                            />
                            </div>
                           

                            <div className='auth-group'>
                                <i className='fa fa-lock'></i>
                                <Field
                                className='auth-input'
                                type='password'
                                name='password'
                                placeholder='Password'
                                />
                                <ErrorMessage
                                name='password'
                                component='div'
                                className='form-error'
                                />
                            </div>
                          

                            <div className='forgot-password'>
                                <Link to='/forgot-password' className='link-text'>
                                Forgot Password?
                                </Link>
                            </div>
                            
                            <div className='auth-submit'>
                                <button className='auth-btn' type='submit' disabled={isSubmitting || isLoading}>
                                {isLoading || isSubmitting ? 'Logging in...' : 'Login Now'}
                                </button>
                            </div>
                        </Form>
                        )}
                     </Formik>   
                </div>
            </div>
        </div>
    );
};

export default Signin;