import { useState } from "react";
import "./style.css";
import { useGetPointQuery } from "../../../services/features/points/pointApi";
import { useParams, Link } from "react-router-dom";
import ProfileImg from "../../../assets/images/user.png";

const ViewPoint = () => {
  const { id } = useParams(); // Get the point ID from the URL
  const { data, isLoading, error } = useGetPointQuery(id);
  const point = data?.data;
  console.log(id);
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
          {/* <div className="rvDiv">
            <Link to="/admin/point/edit" className="rvDiv-btns" type="button">
              <i className="fa fa-pencil"></i>
            </Link>
            <button className="rvDiv-btns delete" type="button">
              <i className="fa fa-trash"></i>
            </button>
          </div> */}
        </div>
      </div>
      <div className="view-container">
        <div className="row">
          <div className="col-12 col-md-12 col-lg-12">
            <div className="view-other-info">
              <h3 className="small-heading">Point Details</h3>
              {isLoading ? (
                <p>Loading...</p>
              ) : error ? (
                <p>Failed to load point details.</p>
              ) : (
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
                      />
                      {/* <div className="ef-actionbtns">
                        <button className="editform-btn" type="button">
                          <i className="fa fa-pencil"></i>
                        </button>
                      </div> */}
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
                        type="text"
                        className="editform-input"
                        value={point?.pointsChange ?? ""}
                        placeholder=""
                        disabled
                      />
                      {/* <div className="ef-actionbtns">
                        <button className="editform-btn" type="button">
                          <i className="fa fa-pencil"></i>
                        </button>
                      </div> */}
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
                        value={point?.reason ?? ""}
                        placeholder=""
                        disabled
                      />
                      {/* <div className="ef-actionbtns">
                        <button className="editform-btn" type="button">
                          <i className="fa fa-pencil"></i>
                        </button>
                      </div> */}
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
                  {/* <div className='col-12 col-md-6 col-lg-4'>
                                    <div className='editform-group'>
                                        <label className='editform-label'>Modified By</label>
                                        <input type='text' className='editform-input' value="Admin" placeholder='' disabled />
                                    </div>
                                </div> */}
                  {/* <div className='col-12 col-md-6 col-lg-4'>
                                    <div className='editform-group'>
                                        <label className='editform-label'>Modified Time</label>
                                        <input type='text' className='editform-input' value="20/07/2024" placeholder='' disabled />
                                    </div>
                                </div> */}
                  {/* <div className="col-12 col-md-12 col-lg-12">
                  <div className="submit-btn-block">
                    <button className="theme-btn btn-blue" type="button">
                      Save Changes
                    </button>
                  </div>
                </div> */}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewPoint;
