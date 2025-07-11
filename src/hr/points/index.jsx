import { useState, useEffect, useRef } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import ProfileImg from "../../assets/images/user.png";
import Select from "react-select";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { useGetAllPointsQuery } from "../../services/features/points/pointApi";
import { useSelector } from "react-redux";
import { usePermission } from "../../hooks/usePermission";

const Points = () => {
  const userId = useSelector((store) => store.users.id);
  const { hasPermission } = usePermission();

  const CAN_ADJUST_POINT = "team:create";

  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("Active"); // Default to 'Active'

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearch(searchInput.trim());
    }, 400); // 400ms debounce
    return () => clearTimeout(timeout);
  }, [searchInput]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const dateRange =
    startDate && endDate
      ? `${startDate} 00:00:00.000 - ${endDate} 00:00:00.000`
      : "";

  const [maxPoints, setMaxPoints] = useState(200);
  const pointsRange = `-200-${maxPoints}`;
  const createdBy = userId;

  const {
    data: apiData,
    isLoading,
    error,
  } = useGetAllPointsQuery({
    createdBy,
    search,
    dateRange,
    pointsRange,
  });

  const allPoints = apiData?.data || [];

  const data = allPoints.filter(
    (row) => row.employeeId?.status === selectedStatus
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [sortConfig, setSortConfig] = useState({
    key: "eid",
    direction: "asc",
  });
  const [selectedRows, setSelectedRows] = useState([]);
  const [isAllSelected, setIsAllSelected] = useState(false);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, dateRange, pointsRange, selectedStatus]);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  const sortedData = [...data].sort((a, b) => {
    let aValue, bValue;

    switch (sortConfig.key) {
      case "employeeId": // Sorting by employee ID string
        aValue = a.employeeId?.employeeId || "";
        bValue = b.employeeId?.employeeId || "";
        break;
      case "name": // Sorting by employee name (first + last)
        aValue = `${a.employeeId?.firstName || ""} ${
          a.employeeId?.lastName || ""
        }`;
        bValue = `${b.employeeId?.firstName || ""} ${
          b.employeeId?.lastName || ""
        }`;
        break;
      case "date": // Sorting by date (assuming createdAt for the point entry itself)
        aValue = new Date(a.createdAt).getTime();
        bValue = new Date(b.createdAt).getTime();
        break;
      default: // For 'pointsChange', 'balanceAfter', 'reason', '_id'
        aValue = a[sortConfig.key];
        bValue = b[sortConfig.key];
    }

    // Handle null/undefined values for consistent sorting
    if (aValue === null || aValue === undefined)
      return sortConfig.direction === "asc" ? 1 : -1;
    if (bValue === null || bValue === undefined)
      return sortConfig.direction === "asc" ? -1 : 1;

    if (aValue < bValue) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  const currentRows = sortedData.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(data.length / rowsPerPage);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1); // Reset to the first page
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(currentRows.map((row) => row._id));
      setIsAllSelected(true);
    } else {
      setSelectedRows([]);
      setIsAllSelected(false);
    }
  };

  const handleCheckboxChange = (eid) => {
    if (selectedRows.includes(eid)) {
      setSelectedRows(selectedRows.filter((id) => id !== _id));
      setIsAllSelected(false);
    } else {
      setSelectedRows([...selectedRows, _id]);
    }
  };

  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRefs = useRef({});

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef(null);

  const toggleDropdown = (_id) => {
    setOpenDropdown(openDropdown === _id ? null : _id);
  };

  const toggleFilterDropdown = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleClickOutside = (event) => {
    if (
      openDropdown &&
      (!dropdownRefs.current[openDropdown] ||
        !dropdownRefs.current[openDropdown].contains(event.target))
    ) {
      setOpenDropdown(null);
    }

    // Close filter dropdown
    if (
      isFilterOpen &&
      filterRef.current &&
      !filterRef.current.contains(event.target)
    ) {
      setIsFilterOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDropdown, isFilterOpen]);

  const statusOptions = [
    { value: "Active", label: "Active Employee View" },
    { value: "Inactive", label: "Inactive Employee View" },
  ];

  const customStyles = {
    control: (provided) => ({
      ...provided,
      width: "200px",
      borderRadius: "8px",
      minHeight: "35px",
    }),
    menu: (provided) => ({
      ...provided,
      borderTop: "1px solid #ddd",
      zIndex: 1000,
    }),
    option: (provided, { data }) => ({
      ...provided,
      color: data.value === "create-view" ? "gray" : provided.color,
      zIndex: 1000,
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      padding: "6px",
    }),
  };

  const [value, setValue] = useState(50);

  const handleStatusChange = (selectedOption) => {
    setSelectedStatus(selectedOption.value);
  };

  return (
    <>
      <div className="pageTanDiv">
        <ul className="pageTabPane">
          <li>
            <Link to="/hr/team-members">Team Members</Link>
          </li>
          {hasPermission(CAN_ADJUST_POINT) && (
            <li>
              <Link to="/hr/adjust-points">Adjust Points</Link>
            </li>
          )}
          <li className="active">
            <Link to="/hr/points">Points History</Link>
          </li>
        </ul>
      </div>
      <div className="table-lists-container">
        <div className="table-top-block">
          <div className="ttb-left">
            <Select
              options={statusOptions}
              defaultValue={statusOptions[0]} // Default to Active Employee View
              styles={customStyles}
              onChange={handleStatusChange} // Handle status change
            />
          </div>
          <div className="ttb-right">
            <div className="searchblock">
              <input
                className="search-input"
                type="text"
                placeholder="Search..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <button
                type="button"
                style={{ background: "none", border: "none", padding: 0 }}
                tabIndex={-1}
              >
                <i className="fa fa-search"></i>
              </button>
            </div>
            <div className="filters">
              <button
                type="button"
                className="filterbtn"
                onClick={toggleFilterDropdown}
              >
                <FilterAltOutlinedIcon />
              </button>
              {isFilterOpen && (
                <div
                  ref={filterRef}
                  className="dropdown-menu filter-dropdown show"
                >
                  <h3 className="filterdrop-heading">Filter</h3>

                  <div
                    className="filter-date-range"
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                  >
                    <input
                      className="fdateinput"
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      style={{ width: 120 }}
                    />
                    <span style={{ margin: "0 4px" }}>-</span>
                    <input
                      className="fdateinput"
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      style={{ width: 120 }}
                    />
                  </div>
                  <div className="frange-slider">
                    <h3 className="filterdrop-heading">
                      Points Range 0-{maxPoints}
                    </h3>
                    <input
                      type="range"
                      min="0"
                      max="200"
                      value={maxPoints}
                      onChange={(e) => setMaxPoints(Number(e.target.value))}
                      style={{ width: "100%" }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="tables">
          <div className="table-wrapper">
            {isLoading ? (
              <div>Loading...</div>
            ) : error ? (
              <div>Failed to load points.</div>
            ) : (
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th style={{ width: "50px" }}>
                      <button className="table-head-btn">
                        {" "}
                        <i className="fa fa-tasks"></i>{" "}
                      </button>
                    </th>
                    <th>
                      <input
                        className="tablecheck"
                        type="checkbox"
                        onChange={handleSelectAll}
                        checked={isAllSelected}
                      />
                    </th>
                    <th>
                      <button className="table-head-btn"> Photo </button>
                    </th>
                    <th>
                      <button
                        className="table-head-btn"
                        onClick={() => handleSort("employeeId")}
                      >
                        Employee ID{" "}
                        {sortConfig.key === "employeeId" && (
                          <span
                            className={`ml-1 arrow ${
                              sortConfig.direction === "asc"
                                ? "arrow-up"
                                : "arrow-down"
                            }`}
                          >
                            {sortConfig.direction === "asc" ? "▲" : "▼"}
                          </span>
                        )}
                      </button>
                    </th>
                    <th>
                      <button
                        className="table-head-btn"
                        onClick={() => handleSort("name")}
                      >
                        Name{" "}
                        {sortConfig.key === "name" && (
                          <span
                            className={`ml-1 arrow ${
                              sortConfig.direction === "asc"
                                ? "arrow-up"
                                : "arrow-down"
                            }`}
                          >
                            {sortConfig.direction === "asc" ? "▲" : "▼"}
                          </span>
                        )}
                      </button>
                    </th>
                    <th>
                      <button
                        className="table-head-btn"
                        onClick={() => handleSort("pointsChange")}
                      >
                        Points{" "}
                        {sortConfig.key === "pointsChange" && (
                          <span
                            className={`ml-1 arrow ${
                              sortConfig.direction === "asc"
                                ? "arrow-up"
                                : "arrow-down"
                            }`}
                          >
                            {sortConfig.direction === "asc" ? "▲" : "▼"}
                          </span>
                        )}
                      </button>
                    </th>
                    <th>
                      <button
                        className="table-head-btn"
                        onClick={() => handleSort("balanceAfter")}
                      >
                        Balance{" "}
                        {sortConfig.key === "balanceAfter" && (
                          <span
                            className={`ml-1 arrow ${
                              sortConfig.direction === "asc"
                                ? "arrow-up"
                                : "arrow-down"
                            }`}
                          >
                            {sortConfig.direction === "asc" ? "▲" : "▼"}
                          </span>
                        )}
                      </button>
                    </th>
                    <th>
                      <button
                        className="table-head-btn"
                        onClick={() => handleSort("reason")}
                      >
                        Reason{" "}
                        {sortConfig.key === "reason" && (
                          <span
                            className={`ml-1 arrow ${
                              sortConfig.direction === "asc"
                                ? "arrow-up"
                                : "arrow-down"
                            }`}
                          >
                            {sortConfig.direction === "asc" ? "▲" : "▼"}
                          </span>
                        )}
                      </button>
                    </th>
                    <th>
                      <button
                        className="table-head-btn"
                        onClick={() => handleSort("date")}
                      >
                        Date{" "}
                        {sortConfig.key === "date" && (
                          <span
                            className={`ml-1 arrow ${
                              sortConfig.direction === "asc"
                                ? "arrow-up"
                                : "arrow-down"
                            }`}
                          >
                            {sortConfig.direction === "asc" ? "▲" : "▼"}
                          </span>
                        )}
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentRows.map((row) => (
                    <tr key={row._id}>
                      <td>
                        <div
                          ref={(el) => (dropdownRefs.current[row._id] = el)}
                          className="dropdown"
                        >
                          <button
                            className="tdadd-drop"
                            type="button"
                            onClick={() => toggleDropdown(row._id)}
                          >
                            <i className="fa fa-ellipsis-h"></i>
                          </button>
                          {openDropdown === row._id && (
                            <div className="dropdown-menu tddropOptions show">
                              <Link
                                to={`/admin/point/view/${row._id}`}
                                className="dropdown-item"
                              >
                                View
                              </Link>
                            </div>
                          )}
                        </div>
                      </td>
                      <td>
                        <input
                          className="tablecheck"
                          type="checkbox"
                          onChange={() => handleCheckboxChange(row._id)}
                          checked={selectedRows.includes(row._id)}
                        />
                      </td>
                      <td>
                        <img
                          className="img-fluid tableProfileImg"
                          src={ProfileImg}
                          alt="User"
                        />
                      </td>
                      <td>
                        <Link
                          to={`/admin/point/view/${row._id}`}
                          className="tlink"
                        >
                          {row.employeeId?.employeeId}
                        </Link>
                      </td>
                      <td>
                        {" "}
                        {row.employeeId?.firstName} {row.employeeId?.lastName}
                      </td>
                      <td
                        style={{
                          color:
                            row.pointsChange > 0
                              ? "green"
                              : row.pointsChange < 0
                              ? "red"
                              : "black",
                        }}
                      >
                        {row.pointsChange > 0
                          ? `+${row.pointsChange}`
                          : row.pointsChange}
                      </td>
                      <td>{row.balanceAfter}</td>
                      <td>{row.reason}</td>
                      <td>{new Date(row.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          <div className="pagination-wrapper">
            <span className="table-datas">
              Showing {indexOfFirstRow + 1} to{" "}
              {Math.min(indexOfLastRow, data.length)} of {data.length} entries
            </span>
            <nav>
              <ul className="pagination">
                {Array.from({ length: totalPages }, (_, i) => (
                  <li
                    key={i}
                    className={`page-item ${
                      i + 1 === currentPage ? "active" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(i + 1)}
                    >
                      {i + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="table-list-show">
              <label>Rows per page:</label>
              <select
                className="form-control"
                value={rowsPerPage}
                onChange={handleRowsPerPageChange}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Points;
