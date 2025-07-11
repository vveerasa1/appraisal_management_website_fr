import React, { useState, useEffect } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import DefaultProfileImg from "../../assets/images/user.png"; // Default profile image
import { useSelector } from "react-redux";
import { toast } from "react-toastify"; // Assuming react-toastify setup
import {
  useGetUserQuery,
  useUpdateUserProfileMutation,
} from "../../services/features/users/userApi"; // Adjust path as needed
import ProfilePhoto from "../../admin/employees/editEmployee/ProfilePhoto";

const Profile = () => {
  const [phoneNumber, setPhoneNumber] = useState(""); // State specifically for phoneNumber
  const [selectedFile, setSelectedFile] = useState(null); // State for the selected image file
  const [profileImagePreview, setProfileImagePreview] =
    useState(DefaultProfileImg); // State for image URL preview

  const userId = useSelector((state) => state.users.id); // Ensure this path is correct for your Redux store
  // Example: const userId = useSelector((state) => state.auth.user?.id);

  // Fetch user data
  const {
    data: userData,
    isLoading: isProfileLoading,
    isError: isProfileError,
    error: profileError,
  } = useGetUserQuery(userId, {
    skip: !userId, // Skip fetching if userId is not available
  });

  // Mutation for updating profile
  const [
    updateUserProfile,
    {
      isLoading: isUpdatingProfile,
      isSuccess: updateSuccess,
      isError: updateError,
      error: updateProfileError,
    },
  ] = useUpdateUserProfileMutation();

  // Effect to populate form fields when user data is loaded
  useEffect(() => {
    if (userData?.data) {
      const user = userData.data;
      setPhoneNumber(user.phoneNumber || "");
      if (user.profilePhotoUrl) {
        setProfileImagePreview(user.profilePhotoUrl);
      } else {
        setProfileImagePreview(DefaultProfileImg);
      }
      setSelectedFile(user.profilePhotoUrl || null); // Ensure no old file is held in state when data loads
    }
  }, [userData]);

  // Effect for displaying success/error toasts after profile update attempt
  useEffect(() => {
    if (updateSuccess) {
      toast.success("Profile updated successfully!");
      setSelectedFile(null);
    }
    if (updateError) {
      console.error("Failed to update profile:", updateProfileError);
      toast.error(
        updateProfileError?.data?.message ||
          updateProfileError?.error ||
          "Failed to update profile. Please try again."
      );
    }
  }, [updateSuccess, updateError, updateProfileError]);

  const handleRemoveProfilePhoto = () => {
    setSelectedFile(null);
    setProfileImagePreview(
      userData?.data?.profilePhotoUrl || DefaultProfileImg
    ); // Revert to existing or default
    // If your backend supports removing the image by sending a specific flag (e.g., image: "REMOVE"),
    // you would need to set another state here to indicate that.
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (!userId) {
      toast.error("User ID not found. Cannot save profile.");
      return;
    }

    // Check if either phone number changed OR a file was selected/removed
    const isPhoneNumberChanged =
      phoneNumber.trim() !== (userData?.data?.phoneNumber || "");
    const isFileSelected = selectedFile !== null;
    const isImageRemoved =
      selectedFile === null &&
      userData?.data?.profilePhotoUrl &&
      profileImagePreview === DefaultProfileImg;

    if (!isPhoneNumberChanged && !isFileSelected && !isImageRemoved) {
      toast.info("No changes to save.");
      return;
    }

    const formData = new FormData();

    // Append phone number if it has changed
    if (isPhoneNumberChanged) {
      formData.append("phoneNumber", phoneNumber.trim());
    }

    // Append the selected file if one is chosen
    if (selectedFile) {
      formData.append("image", selectedFile); // 'image' must match your backend's expected field name
    } else if (isImageRemoved) {
      // If the user removed the image and there was an existing one,
      // you might need to send a specific flag to the backend to delete it.
      // For example:
      formData.append("image", "REMOVE"); // Or whatever flag your API expects to delete the image
      // If your API doesn't support a "REMOVE" flag, you might need a separate endpoint for deletion.
    }

    try {
      await updateUserProfile({ userId, formData }).unwrap();
    } catch (err) {
      console.error("Mutation call failed:", err);
    }
  };

  if (isProfileLoading) {
    return <div className="loading-state">Loading profile...</div>;
  }

  if (isProfileError) {
    return (
      <div className="error-state">
        Error loading profile:{" "}
        {profileError?.data?.message || profileError?.error || "Unknown error"}
      </div>
    );
  }

  const user = userData?.data;

  return (
    <>
      <div className="pageTanDiv">
        <ul className="pageTabPane">
          <li className="active">
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/profile/change-password">Change Password</Link>
          </li>
        </ul>
      </div>
      <div className="view-container">
        <form onSubmit={handleSave}>
          {" "}
          {/* Wrap entire content in a form */}
          <div className="row">
            <div className="col-12 col-md-12 col-lg-12">
              <div className="view-other-info">
                <h3 className="small-heading">Profile Details</h3>
                <div className="row">
                  {/* First Name, Last Name, Email - Read-only or editable if desired */}
                  <div className="col-12 col-md-6 col-lg-4">
                    <div className="editform-group">
                      <label className="editform-label">First Name</label>
                      <input
                        type="text"
                        className="editform-input"
                        name="firstName"
                        value={user?.firstName || ""}
                        disabled // Disabled as per your request to only update phone and image
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-6 col-lg-4">
                    <div className="editform-group">
                      <label className="editform-label">Last Name</label>
                      <input
                        type="text"
                        className="editform-input"
                        name="lastName"
                        value={user?.lastName || ""}
                        disabled // Disabled as per your request
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-6 col-lg-4">
                    <div className="editform-group">
                      <label className="editform-label">Email Address</label>
                      <input
                        type="text"
                        className="editform-input"
                        value={user?.email || ""}
                        placeholder=""
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-6 col-lg-4">
                    <div className="editform-group">
                      <label className="editform-label">Phone Number</label>
                      <input
                        type="text"
                        className="editform-input"
                        name="phoneNumber"
                        value={phoneNumber} // Controlled by local state
                        onChange={handlePhoneNumberChange} // Specific handler for phone number
                        placeholder=""
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-6 col-lg-4">
                    <div className="editform-group">
                      <label className="editform-label">Employee ID</label>
                      <input
                        type="text"
                        className="editform-input"
                        value={user?.employeeId || ""}
                        placeholder=""
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-6 col-lg-4">
                    <div className="editform-group">
                      <label className="editform-label">Department</label>
                      <input
                        type="text"
                        className="editform-input"
                        value={user?.department?.name || ""}
                        placeholder=""
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-6 col-lg-4">
                    <div className="editform-group">
                      <label className="editform-label">Reporting to</label>
                      <input
                        type="text"
                        className="editform-input"
                        value={
                          user?.reportingTo
                            ? `${user.reportingTo.employeeId} - ${user.reportingTo.firstName} ${user.reportingTo.lastName}`
                            : ""
                        }
                        placeholder=""
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-6 col-lg-4">
                    <div className="editform-group">
                      <label className="editform-label">Designation</label>
                      <input
                        type="text"
                        className="editform-input"
                        value={user?.designation?.name || ""}
                        placeholder=""
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-6 col-lg-4">
                    <div className="editform-group">
                      <label className="editform-label">Date of Joining</label>
                      <input
                        type="text"
                        className="editform-input"
                        value={
                          user.dateOfJoining
                            ? user.dateOfJoining.slice(0, 10)
                            : ""
                        }
                        placeholder=""
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-12 col-lg-12">
                    <h3 className="small-heading">Address Details</h3>
                  </div>
                  {/* Address, City, Province, etc. - Disabled as per your request to only update phone and image */}
                  <div className="col-12 col-md-6 col-lg-6">
                    <div className="editform-group">
                      <label className="editform-label">Address</label>
                      <input
                        type="text"
                        className="editform-input"
                        name="address"
                        value={user?.address || ""}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-6 col-lg-3">
                    <div className="editform-group">
                      <label className="editform-label">City</label>
                      <input
                        type="text"
                        className="editform-input"
                        name="city"
                        value={user?.city || ""}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-6 col-lg-3">
                    <div className="editform-group">
                      <label className="editform-label">Province</label>
                      <input
                        type="text"
                        className="editform-input"
                        name="province"
                        value={user?.province || ""}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-6 col-lg-4">
                    <div className="editform-group">
                      <label className="editform-label">Postal Code</label>
                      <input
                        type="text"
                        className="editform-input"
                        name="postalCode"
                        value={user?.postalCode || ""}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-6 col-lg-4">
                    <div className="editform-group">
                      <label className="editform-label">Country</label>
                      <input
                        type="text"
                        className="editform-input"
                        name="country"
                        value={user?.country || ""}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-6 col-lg-4">
                    <div className="editform-group">
                      <label className="editform-label">Added By</label>
                      <input
                        type="text"
                        className="editform-input"
                        value={
                          user?.createdBy
                            ? `${user.createdBy.firstName} ${
                                user.createdBy.lastName || ""
                              }`
                            : ""
                        }
                        placeholder=""
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-6 col-lg-4">
                    <div className="editform-group">
                      <label className="editform-label">Added Time</label>
                      <input
                        type="text"
                        className="editform-input"
                        value={
                          user.createdBy
                            ? `${user.createdBy.firstName} ${user.createdBy.lastName}`
                            : "-"
                        }
                        placeholder=""
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-6 col-lg-4">
                    <div className="editform-group">
                      <label className="editform-label">Modified By</label>
                      <input
                        type="text"
                        className="editform-input"
                        value={
                          user?.modifiedBy
                            ? `${user.modifiedBy.firstName} ${
                                user.modifiedBy.lastName || ""
                              }`
                            : ""
                        }
                        placeholder=""
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-6 col-lg-4">
                    <div className="editform-group">
                      <label className="editform-label">Modified Time</label>
                      <input
                        type="text"
                        className="editform-input"
                        value={
                          user.modifiedTime
                            ? new Date(user.modifiedTime).toLocaleString()
                            : "-"
                        }
                        placeholder=""
                        disabled
                      />
                    </div>
                  </div>

                  <ProfilePhoto
                    fileName={
                      selectedFile?.name ||
                      (user?.profilePhotoUrl
                        ? user.profilePhotoUrl.split("/").pop()
                        : "")
                    }
                    setFieldValue={(fieldName, file) => setSelectedFile(file)} // Map to setSelectedFile
                    previewUrl={profileImagePreview}
                    selectedFile={selectedFile}
                    setPreviewUrl={setProfileImagePreview}
                    setSelectedFile={setSelectedFile}
                    handleRemove={handleRemoveProfilePhoto}
                  />
                  <div className="col-12 col-md-12 col-lg-12">
                    <div className="submit-btn-block">
                      <button
                        className="theme-btn btn-blue"
                        type="submit"
                        disabled={isUpdatingProfile}
                      >
                        {isUpdatingProfile ? "Saving..." : "Save Changes"}
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

export default Profile;
