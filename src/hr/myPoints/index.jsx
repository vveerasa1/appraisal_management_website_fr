import React from "react";
import "./style.css";
import { Link, useParams } from "react-router-dom"; // Import useParams
import Coin from "../../assets/images/coin.png";
import { useGetAllPointsByUserIdQuery } from "../../services/features/points/pointApi"; // Ensure correct path
import { useSelector } from "react-redux";

const Points = () => {
  const { id } = useParams(); // Get the user ID from URL, assuming this page is for a specific user's points history
  const userId = useSelector((state) => state.users.id);
  const { data, isLoading, isError } = useGetAllPointsByUserIdQuery(userId);

  if (isLoading) {
    return <div className="loading-state">Loading points data...</div>;
  }
  if (isError || !data?.data) {
    return <div className="error-state">Failed to load points data.</div>;
  }

  const { user, transactions } = data.data; // Destructure user and transactions from data.data

  // Function to format date and time
  const formatDateTime = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    // Example: "July 01, 2025, 10:30 AM"
    return date.toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Get the last update date from the most recent transaction, or a fallback
  const lastUpdateDate =
    transactions.length > 0
      ? formatDateTime(transactions[0].createdAt) // Assuming transactions are sorted newest first from API
      : "N/A";

  return (
    <>
      <div className="pageTanDiv">
        <ul className="pageTabPane">
          <li className="active">
            <Link to="/hr/my-points">Points</Link>
          </li>
        </ul>
      </div>
      <div className="page-wrapper">
        <div className="row">
          <div className="col-12 col-md-4 col-lg-4 mb-4">
            <div className="tpoints-card">
              <p>Your points</p>
              <h2>
                <img className="img-fluid" src={Coin} alt="Coin" />
                <span>{user?.totalPoints || 0} Points</span>{" "}
                {/* Display totalPoints from API */}
              </h2>
              <div className="date-text">Last update: {lastUpdateDate}</div>{" "}
              {/* Display last update */}
            </div>
          </div>
          <div className="col-12 col-md-8 col-lg-8 mb-4">
            <div className="tpoints-list-top">
              <h3>Point History</h3>
              {/* Filter and Sort buttons removed */}
            </div>
            <div className="tpoints-lists">
              <div className="row">
                {transactions.length > 0 ? (
                  transactions.map((transaction) => (
                    <div
                      className="col-12 col-md-12 col-lg-12 mb-3"
                      key={transaction._id}
                    >
                      <div className="recents-item">
                        <div className="ri-left">
                          <div className="ri-info">
                            <h3 className="tpoint-heading">
                              {transaction.reason || "N/A"}
                            </h3>
                            <p>
                              Given by: {transaction.createdBy?.firstName}{" "}
                              {transaction.createdBy?.lastName}
                            </p>
                          </div>
                        </div>
                        <div className="ri-right">
                          <div className="ri-points">
                            <p className="text font-12px">
                              {formatDateTime(transaction.createdAt)}
                            </p>
                          </div>
                          <div className="ri-points">
                            <img className="img-fluid" src={Coin} alt="Coin" />
                            <p
                              className={
                                transaction.transactionType === "bonuses"
                                  ? "add"
                                  : "deduct"
                              }
                            >
                              {transaction.pointsChange > 0 ? "+" : ""}
                              {transaction.pointsChange}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-12 text-center">
                    <p>No point transactions found.</p>
                  </div>
                )}
                <div className="col-md-12">
                  {/* Pagination is simplified or can be enhanced with actual pagination logic later */}
                  <div className="pagination-wrapper mypoints">
                    <nav>
                      <ul className="pagination">
                        {/* Render pagination based on data.data.totalPages and data.data.page */}
                        {[...Array(data.data.totalPages)].map((_, index) => (
                          <li
                            className={`page-item ${
                              data.data.page === index + 1 ? "active" : ""
                            }`}
                            key={index}
                          >
                            <button className="page-link">{index + 1}</button>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Comment, Sort, and Filter Modals are removed */}
    </>
  );
};

export default Points;
