import React, { useState } from "react";
import "./style.css";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { useUpdatePasswordMutation } from "../../../services/features/users/userApi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify"; // Assuming you have react-toastify setup for toasts

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(""); // State for local validation errors

  const navigate = useNavigate(); // Initialize useNavigate hook

  // Correctly destructure the hook to get the mutation function and its state
  const [updatePassword, { isLoading }] = useUpdatePasswordMutation();

  // Get userId from Redux store
  // Make sure your Redux state structure actually has state.users.id
  // If it's stored directly in authUser or similar, adjust this line.
  const userId = useSelector((state) => state.users.id); // Ensure this path is correct for your Redux store

  // Helper functions for toasts
  const showSuccessToast = (message) => {
    toast.success(message);
  };

  const showErrorToast = (message) => {
    toast.error(message);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors on new submission attempt

    // --- Client-side validation ---
    if (!oldPassword.trim()) {
      setError("Old password is required.");
      return;
    }
    if (!newPassword.trim()) {
      setError("New password is required.");
      return;
    }
    if (!confirmPassword.trim()) {
      setError("Confirm password is required.");
      return;
    }

    // Ensure userId is available before proceeding
    if (!userId) {
      showErrorToast("User ID not found. Unable to update password.");
      return;
    }

    try {
      // Call the mutation with an object containing 'id' and the 'body' payload
      await updatePassword({
        id: userId, // Pass userId as 'id' property for the path variable
        oldPassword,
        newPassword,
        confirmPassword,
      }).unwrap(); // .unwrap() to get the actual payload or throw an error

      showSuccessToast("Password updated successfully!");
      // Navigate after successful password change
      navigate("/profile"); // Or wherever appropriate after changing password
    } catch (err) {
      console.error("Failed to update password:", err); // Log the full error for debugging

      // Provide a more specific error message from the API response
      showErrorToast(
        err?.data?.message ||
        err?.error || // For RTK Query fetchBaseQuery errors
        err?.message ||
        "Failed to update password. Please try again."
      );
    }
  };

  return (
    <>
      <div className="pageTanDiv">
        <ul className="pageTabPane">
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li className="active">
            <Link to="/profile/change-password">Change Password</Link>
          </li>
        </ul>
      </div>
      <div className="view-container"> {/* Removed onSubmit from here, added to form below */}
        <form onSubmit={handleSave}> {/* Wrap your content in a <form> and add onSubmit here */}
          <div className="row">
            <div className="col-12 col-md-12 col-lg-12">
              <div className="view-other-info">
                <div className="row">
                  <div className="col-12 col-md-6 col-lg-6">
                    <div className="forn-group">
                      <label className="form-label">Old Password</label>
                      <input
                        type="password" // Changed to password type for security
                        className="form-input"
                        value={oldPassword}
                        onChange={(e) => {
                          setOldPassword(e.target.value);
                          setError("");
                        }}
                        placeholder=""
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-6 col-lg-6">
                    <div className="forn-group">
                      <label className="form-label">New Password</label>
                      <input
                        type="password" // Changed to password type for security
                        className="form-input"
                        value={newPassword}
                        onChange={(e) => {
                          setNewPassword(e.target.value);
                          setError("");
                        }}
                        placeholder=""
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-6 col-lg-6">
                    <div className="forn-group">
                      <label className="form-label">Confirm Password</label>
                      <input
                        type="password" // Changed to password type for security
                        className="form-input"
                        value={confirmPassword}
                        onChange={(e) => {
                          setConfirmPassword(e.target.value);
                          setError("");
                        }}
                        placeholder=""
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-12 col-lg-12">
                    {/* Display error message globally for the form */}
                    {error && <span className="form-error">{error}</span>}
                    <div className="submit-btn-block">
                      {/* <button className="theme-btn btn-border" type="button">
                        Cancel
                      </button> */}
                      <button
                        className="theme-btn btn-blue"
                        type="submit"
                        disabled={isLoading} // Disable button while loading
                      >
                        {isLoading ? "Updating..." : "Update Password"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ChangePassword;