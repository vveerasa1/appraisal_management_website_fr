import { useState } from "react";
import "./style.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useVerifyOtpMutation } from "../../services/features/auth/authApi";
import { showSuccessToast, showErrorToast } from "../../utils/toast";

const OTPVerify = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || ""; // get email from navigation state

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();

  const handleChange = (idx, value) => {
    if (!/^\d*$/.test(value)) return; // Only allow digits
    const newOtp = [...otp];
    newOtp[idx] = value.slice(-1); // Only one digit per box
    setOtp(newOtp);
    // Auto-focus next input
    if (value && idx < 5) {
      document.getElementById(`otp-input-${idx + 1}`)?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const otpValue = otp.join("");
    if (otpValue.length !== 6) {
      setError("Please enter the 6-digit OTP.");
      return;
    }
    try {
      await verifyOtp({ email, otp: otpValue }).unwrap();
      showSuccessToast("OTP verified successfully!");
      navigate("/reset-password", { state: { email } }); // or wherever you want to go next
    } catch (err) {
      setError(err?.data?.message || "Invalid OTP.");
      showErrorToast(err?.data?.message || "Invalid OTP.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <form className="auth-form-container" onSubmit={handleSubmit}>
          <div className="auth-form-top">
            <h1 className="auth-heading">Verify Your Account</h1>
            <p className="auth-description">
              We’ve sent a 6-digit verification code to your registered email
            </p>
          </div>
          <div className="auth-form-fields">
            <div className="otp-inputs-group">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  id={`otp-input-${idx}`}
                  className="otp-input"
                  type="text"
                  minLength={1}
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(idx, e.target.value)}
                  autoFocus={idx === 0}
                />
              ))}
            </div>
            {error && (
              <div style={{ color: "red", fontSize: "14px", marginTop: "8px" }}>
                {error}
              </div>
            )}
            <div className="auth-submit">
              <button className="auth-btn" type="submit" disabled={isLoading}>
                {isLoading ? "Verifying..." : "Login Now"}
              </button>
            </div>
            <div className="bottom-link mt-4">
              <p>
                Didn’t receive the code?
                <Link to="/" className="blue-link-text">
                  &nbsp;Resend Code
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OTPVerify;
