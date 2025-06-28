import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSendOtpMutation } from "../../services/features/auth/authApi"; // adjust path if needed
import { showSuccessToast, showErrorToast } from "../../utils/toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sendOtp, { isLoading }] = useSendOtpMutation();
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleContinue = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    // Simple email validation
    if (!email) {
      setError("Email is required.");
      return;
    }
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setError("Enter a valid email address.");
      return;
    }
    try {
      await sendOtp({ email }).unwrap();
      showSuccessToast("OTP sent to your email.");
      navigate("/otp-verify", { state: { email } }); // Pass email to next page
    } catch (err) {
      showErrorToast(
        err?.data?.message ||
          err?.error ||
          err?.message ||
          "Failed to send OTP."
      );
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <form className="auth-form-container" onSubmit={handleContinue}>
          <div className="auth-form-top">
            <h1 className="auth-heading">Forgot Your Password?</h1>
            <p className="auth-description">
              Don’t worry! We’ll help you reset it.
            </p>
            <p className="auth-description">
              Enter your registered email, and we’ll send you a password reset
              link or OTP.
            </p>
          </div>
          <div className="auth-form-fields">
            <div className="auth-group">
              <i className="fa fa-envelope"></i>
              <input
                className="auth-input"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>
            {error && <div className="auth-error">{error}</div>}
            {success && <div className="auth-success">{success}</div>}
            <div className="auth-submit">
              <button className="auth-btn" type="submit" disabled={isLoading}>
                {isLoading ? "Sending..." : "Continue"}
              </button>
            </div>
            <div className="mt-4">
              <Link to="/" className="blue-link-text">
                Send Reset Link
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
