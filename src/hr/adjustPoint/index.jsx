import { useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import ProfileImg from "../../assets/images/user.png";
import {
  useGetUserQuery,
  useGetTeamMembersQuery,
} from "../../services/features/users/userApi";
import { showSuccessToast, showErrorToast } from "../../utils/toast";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useCreatePointMutation } from "../../services/features/points/pointApi";
import { usePermission } from "../../hooks/usePermission";

const AddPoints = () => {
  const [createPoint, { isLoading: isSaving }] = useCreatePointMutation();
  const userId = useSelector((state) => state.users.id);
  const [selectedUser, setSelectedUser] = useState("");
  const [points, setPoints] = useState("");
  const [reason, setReason] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { hasPermission } = usePermission();

  const CAN_VIEW_POINT = "team:view";

  // This will fetch once when the component mounts or if userId changes.
  // It will NOT cause continuous loading unless the component itself is
  // constantly unmounted/remounted, or userId is unstable.
  const { data, isLoading: areUsersLoading } = useGetTeamMembersQuery(
    { userId },
    {
      refetchOnMountOrArgChange: true, // This ensures a fresh load on page entry
    }
  );
  const users = data?.data?.users || [];

  // This will fetch when selectedUser changes, and only if selectedUser is not empty.
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
          userId: userId,
          reason,
        };
        await createPoint(payload).unwrap();
        showSuccessToast("Points saved successfully!");
        await refetch();
        navigate("/hr/points");
        // No explicit refetch() needed here. RTK Query's invalidatesTags
        // in pointApi.js will automatically refresh useGetUserQuery for selectedUser.
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
          <li>
            <Link to="/hr/team-members">Team Members</Link>
          </li>
          <li className="active">
            <Link to="/hr/adjust-points">Adjust Points</Link>
          </li>
          {hasPermission(CAN_VIEW_POINT) && (
            <li>
              <Link to="/hr/points">Points History</Link>
            </li>
          )}
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
                      disabled={areUsersLoading}
                    >
                      <option value="">---Select Team Member---</option>
                      {users.length === 0 && !areUsersLoading && (
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
                      type="number"
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
                      onClick={() => navigate(-1)}
                    >
                      Cancel
                    </button>
                    <button
                      className="theme-btn btn-blue"
                      type="button"
                      onClick={handleSave}
                      disabled={isSaving}
                    >
                      {isSaving ? "Saving..." : "Save Points"}
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
