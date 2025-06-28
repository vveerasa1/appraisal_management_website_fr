import { useState } from "react";
import "./style.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useResetPasswordMutation } from "../../services/features/users/userApi";
import { showSuccessToast, showErrorToast } from "../../utils/toast";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "";
  console.log("ResetPassword email:", email); // <-- Print in console

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!newPassword || !confirmPassword) {
      setError("Both fields are required.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    console.log(
      "Reset password body:",
      JSON.stringify({
        email,
        newPassword,
        confirmPassword,
      })
    );

    try {
      await resetPassword({ email, newPassword, confirmPassword }).unwrap();
      showSuccessToast("Password reset successful!");
      navigate("/signin");
    } catch (err) {
      setError(err?.data?.message || "Failed to reset password.");
      showErrorToast(err?.data?.message || "Failed to reset password.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <form className="auth-form-container" onSubmit={handleSubmit}>
          <div className="auth-form-top">
            <h1 className="auth-heading">Reset Your Password</h1>
            <p className="auth-description">
              Create a new password for your account.
            </p>
          </div>
          <div className="auth-form-fields">
            <div className="auth-group">
              <i className="fa fa-lock"></i>
              <input
                className="auth-input"
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="auth-group">
              <i className="fa fa-lock"></i>
              <input
                className="auth-input"
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            {error && (
              <div style={{ color: "red", fontSize: 14, marginTop: 4 }}>
                {error}
              </div>
            )}
            <div className="auth-submit">
              <button className="auth-btn" type="submit" disabled={isLoading}>
                {isLoading ? "Resetting..." : "Reset Password"}
              </button>
            </div>
            <div className="bottom-link mt-4">
              <p>
                Remembered it?
                <Link to="/signin" className="blue-link-text">
                  &nbsp;Login
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
