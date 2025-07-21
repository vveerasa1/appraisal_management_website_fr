import { React, useState, useEffect } from "react";
import "./style.css";
import { useGetPointQuery, useDeletePointMutation, useUpdatePointMutation } from "../../../services/features/points/pointApi";
import { useParams, Link, useNavigate } from "react-router-dom";
import ProfileImg from "../../../assets/images/user.png";
import { showSuccessToast, showErrorToast } from "../../../utils/toast";
import { usePermission } from "../../../hooks/usePermission";
import { useSelector } from "react-redux";



const ViewPoint = () => {
  const { id ,type} = useParams(); // Get the point ID from the URL
  const { data, isLoading, error } = useGetPointQuery(id);
  const userId = useSelector((state) => state.users.id);  

  const point = data?.data;
  const [deletePoints, { isLoading: isDeleting }] =
    useDeletePointMutation();

  const CAN_UPDATE_APPRAISAL = "appraisal:update";
  const CAN_DELETE_APPRAISAL= "appraisal:delete";

  const [editMode, setEditMode] = useState(false);
  const [pointsChange, setPointsChange] = useState(point?.pointsChange ?? "");
  const [reason, setReason] = useState(point?.reason ?? "");
  const [errors, setErrors] = useState({});
  const { hasPermission } = usePermission(); // Initialize usePermission hook
  const navigate = useNavigate()
  const [updatePoint, { isLoading: isUpdating }] = useUpdatePointMutation();
  const handleDelete = async () => {
    if (!id) return;
    if (!window.confirm("Are you sure you want to delete this department?"))
      return;
    try {
      await deletePoints(id).unwrap();
      showSuccessToast("Points deleted successfully!");
      navigate('/admin/points')
    } catch (err) {
      const errorMsg =
        err?.data?.message ||
        err?.error ||
        err?.message ||
        "Failed to delete Points.";
      showErrorToast(errorMsg);
    }
  };
  // Update local state when point data changes
  useEffect(() => {
    if (point) {
      setPointsChange(point.pointsChange ?? "");
      setReason(point.reason ?? "");
    }
  }, [point]);

  const handleEditToggle = () => {
    setEditMode(!editMode);
    setErrors({});
  };
useEffect(() => {
  if (type === "edit") {
    setEditMode(true);
  };
}, [type]);
  const handleSave = async () => {
    let tempErrors = {};
    if (!pointsChange || isNaN(pointsChange) || Number(pointsChange) === 0) {
      tempErrors.pointsChange = "Points count is required";
    } else if (Number(pointsChange) > 10) {
      tempErrors.pointsChange = "Points count should not exceed 10";
    }
    if (!reason) tempErrors.reason = "Reason is required";

    setErrors(tempErrors);

    if (Object.keys(tempErrors).length === 0) {
      try {
        await updatePoint({ id, userId, pointsChange: Number(pointsChange), reason, employeeId: point.employeeId._id }).unwrap();
        showSuccessToast("Point updated successfully!");
        setEditMode(false);
        navigate('/admin/points')
      } catch (err) {
        const errorMsg =
          err?.data?.message ||
          err?.error ||
          err?.message ||
          "Failed to update points.";
        showErrorToast(errorMsg);
      }
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Failed to load point details.</p>;
  const handleEdit = () =>{ 
    setEditMode(true);
    navigate(`/admin/point/edit/${id}`);
    
  }
  const handleCancel = () => {
    setEditMode(false);
    // setPointsChange(originalData.pointsChange);
    // setReason(originalData.reason);
    setErrors({});
    navigate('/admin/points')
  };
  const createdAt = new Date(point?.createdAt);
const now = new Date();
const diffInHours = (now - createdAt) / (1000 * 60 * 60);
const canEditOrDelete = diffInHours <= 24;

  return (
    <>
      <div className="pageTanDiv">
        <div className="viewPageTopDiv">
          <div className="lvDiv">
            <Link to="/admin/points">
              <i className="fa fa-angle-left"></i>
            </Link>
            <img className="img-fluid" src={ProfileImg} alt="Profile" />
            <p>
              {point?.employeeId?.employeeId || "-"} -{" "}
              {point?.employeeId?.firstName} {point?.employeeId?.lastName}
            </p>{" "}
          </div>
          <div className="rvDiv">
            {hasPermission(CAN_UPDATE_APPRAISAL) && 
          canEditOrDelete &&!editMode && (
           <button
              className="rvDiv-btns"
              type="button"
              onClick={handleEdit} // Use handleEdit directly
              title="Edit"
            >
              <i className="fa fa-pencil"></i>
            </button>
          )}
            {hasPermission(CAN_DELETE_APPRAISAL) && 
           canEditOrDelete && (    <button
              className="rvDiv-btns delete"
              type="button"
              onClick={handleDelete}
              disabled={isDeleting}
              title="Delete"
            >
              <i className="fa fa-trash"></i>
            </button>
          )}
          </div>
        </div>
      </div>
      <div className="view-container">
        <div className="row">
          <div className="col-12 col-md-12 col-lg-12">
            <div className="view-other-info">
              <h3 className="small-heading">Point Details</h3>
              <div className="row">
                <div className="col-12 col-md-6 col-lg-4">
                  <div className="editform-group">
                    <label className="editform-label">User</label>
                    <input
                      type="text"
                      className="editform-input"
                      value={
                        point?.employeeId
                          ? `${point.employeeId.firstName} ${point.employeeId.lastName}`
                          : ""
                      }
                      placeholder=""
                      disabled
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                  <div className="editform-group">
                    <label className="editform-label">Points Balance</label>
                    <input
                      type="text"
                      className="editform-input"
                      value={point?.balanceAfter ?? ""}
                      placeholder=""
                      disabled
                    />
                  </div>
                </div>
                <div className="col-12 col-md-12">
                  <h3 className="small-heading">Adjust Points</h3>
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                  <div className="editform-group">
                    <label className="editform-label">Points Count</label>
                    <input
                      type="number"
                      className="editform-input"
                      value={pointsChange}
                      placeholder=""
                      disabled={!editMode}
                      onChange={(e) => setPointsChange(e.target.value)}
                    />
                    {errors.pointsChange && (
                      <span className="error">{errors.pointsChange}</span>
                    )}
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-8">
                  <div className="editform-group">
                    <label className="editform-label">
                      Reason/Note for Adjustment
                    </label>
                    <input
                      type="text"
                      className="editform-input"
                      value={reason}
                      placeholder=""
                      disabled={!editMode}
                      onChange={(e) => setReason(e.target.value)}
                    />
                    {errors.reason && (
                      <span className="error">{errors.reason}</span>
                    )}
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                  <div className="editform-group">
                    <label className="editform-label">Added By</label>
                    <input
                      type="text"
                      className="editform-input"
                      value={
                        point?.createdBy
                          ? `${point.createdBy.firstName} ${point.createdBy.lastName}`
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
                        point?.createdAt
                          ? new Date(point.createdAt).toLocaleString()
                          : ""
                      }
                      placeholder=""
                      disabled
                    />
                  </div>
                </div>
                <div className="col-12 col-md-12 col-lg-12">
                  <div className="submit-btn-block">
                    {editMode && (
                      <>
                        <button
                          className="theme-btn btn-blue"
                          type="button"
                          onClick={handleSave}
                          disabled={isUpdating}
                        >
                          {isUpdating ? "Saving..." : "Save"}
                        </button>
                        <button
                          className="theme-btn btn-grey"
                          type="button"
                          onClick={handleCancel}
                          disabled={isUpdating}
                        >
                          Cancel
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewPoint;
