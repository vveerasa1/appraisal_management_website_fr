import { React, useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { useCreatePointMutation } from "../../../services/features/points/pointApi";
import {
  useGetUserQuery,
  useGetAllUsersForAppraisalQuery,
} from "../../../services/features/users/userApi";
import { showSuccessToast, showErrorToast } from "../../../utils/toast";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AddPoints = () => {
  const [createPoint, { isLoading: isSaving }] = useCreatePointMutation();
  const userId = useSelector((state) => state.users.id);
  const [selectedUser, setSelectedUser] = useState("");
  const [points, setPoints] = useState("");
  const [reason, setReason] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const { data, isLoading } = useGetAllUsersForAppraisalQuery(userId);
  const users = data?.data?.users || [];

  const {
    data: userDetails,
    isFetching: isPointsLoading,
    refetch,
  } = useGetUserQuery(selectedUser, {
    skip: !selectedUser,
  });
  const currentPoints = userDetails?.data?.totalPoints ?? 0;

  const handleSave = async (e) => {
    e.preventDefault();
    let tempErrors = {};
    if (!selectedUser) tempErrors.user = "User is required";
    if (!points || isNaN(points) || Number(points) === 0) {
      tempErrors.points = "Points count is required";
    } else if (Number(points) > 10) {
      tempErrors.points = "Points count should not exceed 10";
    }
    if (!reason) tempErrors.reason = "Reason is required";
    setErrors(tempErrors);

    if (Object.keys(tempErrors).length === 0) {
      try {
        const balanceAfter = Number(currentPoints);
        const payload = {
          employeeId: selectedUser,
          pointsChange: Number(points),
          balanceAfter,
          reason,
          userId: userId,
        };
        await createPoint(payload).unwrap();
        showSuccessToast("Points saved successfully!");
        await refetch();
        navigate("/admin/points");
      } catch (error) {
        showErrorToast("Failed to save points.");
        console.error("Mutation error:", error);
      }
    }
  };
  return (
    <>
      <div className="pageTanDiv">
        <ul className="pageTabPane">
          <li className="active">
            <Link to="/admin/points">Points</Link>
          </li>
        </ul>
      </div>
      <form className="form-list-container">
        <div className="row">
          <div className="col-12 col-md-12 col-lg-12">
            <div className="form-list-wrapper">
              <div className="row">
                <div className="col-12 col-md-6 col-lg-4">
                  <div className="forn-group">
                    <label className="form-label">User</label>
                    <select
                      className="form-input"
                      value={selectedUser}
                      onChange={(e) => setSelectedUser(e.target.value)}
                      disabled={isLoading}
                    >
                      <option value="">---Select User---</option>
                      {users.length === 0 && !isLoading && (
                        <option disabled>No users found</option>
                      )}
                      {users.map((user) => (
                        <option key={user._id} value={user._id}>
                          {user.firstName} {user.lastName}
                        </option>
                      ))}
                    </select>
                    {errors.user && (
                      <span className="error">{errors.user}</span>
                    )}
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                  <div className="forn-group">
                    <label className="form-label">
                      Current Points Balance (Read-Only)
                    </label>
                    <input
                      type="email"
                      className="form-input"
                      placeholder=""
                      value={isPointsLoading ? "Loading..." : currentPoints}
                      disabled
                    />
                  </div>
                </div>
                <div className="col-12 col-md-12 col-lg-12">
                  <h3 className="small-heading">Adjust Points</h3>
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                  <div className="forn-group">
                    <label className="form-label">Points Count</label>
                    <input
                      type="number"
                      className="form-input"
                      placeholder=""
                      value={points}
                      onChange={(e) => setPoints(e.target.value)}
                      step="1"
                      onKeyDown={(e) => {
                        // Allow: numbers, minus, backspace, delete, arrows, tab, home, end
                        if (
                          !(
                            (e.key >= "0" && e.key <= "9") ||
                            e.key === "-" ||
                            e.key === "Backspace" ||
                            e.key === "Tab" ||
                            e.key === "Delete" ||
                            e.key === "ArrowLeft" ||
                            e.key === "ArrowRight" ||
                            e.key === "Home" ||
                            e.key === "End"
                          )
                        ) {
                          e.preventDefault();
                        }
                      }}
                    />
                    {errors.points && (
                      <span className="error">{errors.points}</span>
                    )}
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-12">
                  <div className="forn-group">
                    <label className="form-label">
                      Reason/Note for Adjustment
                    </label>
                    <textarea
                      cols={30}
                      rows={4}
                      className="form-input"
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                    ></textarea>
                    {errors.reason && (
                      <span className="error">{errors.reason}</span>
                    )}
                  </div>
                </div>

                <div className="col-12 col-md-12 col-lg-12">
                  <div className="submit-btn-block">
                    <button
                      className="theme-btn btn-border"
                      type="button"
                      onClick={() => {
                        // resetForm(initialValues);
                        // handleRemove();
                        navigate("/admin/points");
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      className="theme-btn btn-blue"
                      type="button"
                      onClick={handleSave}
                    >
                      Save
                    </button>
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

export default AddPoints;
