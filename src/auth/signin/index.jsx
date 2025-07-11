import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../services/features/auth/authApi";
import { useLazyGetRoleByIdQuery } from "../../services/features/roles/roleApi";
import { showErrorToast, showSuccessToast } from "../../utils/toast";
import { useDispatch } from "react-redux";
import {
  addToken,
  setPermissions,
} from "../../services/features/auth/authSlice";
import { addUserInfo } from "../../services/features/users/userSlice";

const Signin = () => {
  const [login, { isLoading }] = useLoginMutation();
  const [getRoleDetails, { isLoading: isRoleLoading }] =
    useLazyGetRoleByIdQuery();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Minimum 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await login(values).unwrap();
      const { access_token, role, user } = response.data;
      localStorage.setItem("authUser", JSON.stringify(response.data));
      dispatch(addToken({ role, accessToken: access_token }));
      const { _id, firstName, lastName, email, status } = user;
      dispatch(
        addUserInfo({
          id: _id,
          name: `${firstName} ${lastName}`,
          email: email,
          status: status,
        })
      );
      const roleDetailsResponse = await getRoleDetails(
        user?.role?._id
      ).unwrap();
      const fetchedPermissions = roleDetailsResponse.data?.permissions || []; // Adjust path as needed!
      console.log("fetchedPermissions :" + fetchedPermissions);
      dispatch(setPermissions(fetchedPermissions));

      showSuccessToast("Login Successfully");
      navigate("/admin/dashboard");
    } catch (err) {
      showErrorToast(
        err?.data?.message || err?.error || err?.message || "Login Failed."
      );
    }
    setSubmitting(false);
  };
  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <div className="auth-form-container">
          <div className="auth-form-top">
            <h3 className="auth-small-heading">Login</h3>
            <h1 className="auth-heading">Hello Welcome Back</h1>
            <p className="auth-description">
              Welcome back please sign in again
            </p>
          </div>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="auth-form-fields">
                <div className="auth-group">
                  <i className="fa fa-envelope"></i>
                  <Field
                    className="auth-input"
                    type="email"
                    name="email"
                    placeholder="Email"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="form-error"
                  />
                </div>

                <div className="auth-group">
                  <i className="fa fa-lock"></i>
                  <Field
                    className="auth-input"
                    type="password"
                    name="password"
                    placeholder="Password"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="form-error"
                  />
                </div>

                <div className="forgot-password">
                  <Link to="/forgot-password" className="link-text">
                    Forgot Password?
                  </Link>
                </div>

                <div className="auth-submit">
                  <button
                    className="auth-btn"
                    type="submit"
                    disabled={isSubmitting || isLoading}
                  >
                    {isLoading || isSubmitting ? "Logging in..." : "Login Now"}
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
