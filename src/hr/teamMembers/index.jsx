import { useState, useEffect, useRef } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import Select from "react-select";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import ProfileImg from "../../assets/images/user.png";
import { useGetTeamMembersQuery } from "../../services/features/users/userApi";
import { useSelector } from "react-redux";
import { useGetDesignationsQuery } from "../../services/features/designation/designationApi";
import { useGetDepartmentsQuery } from "../../services/features/departments/departmentApi";
import { usePermission } from "../../hooks/usePermission";

const HRDashboard = () => {
  const userId = useSelector((store) => store.users.id);
  const { hasPermission } = usePermission();

  const CAN_ADJUST_POINT = "team:create";
  const CAN_VIEW_POINT = "team:view";

  const {
    data: departmentsData,
    isError: isDepartmentdataError,
    error: departmentDataError,
  } = useGetDepartmentsQuery({ search: "" });
  const {
    data: designationsData,
    isError: isDesignationError,
    error: designationError,
  } = useGetDesignationsQuery({ search: "" });

  // State for search query
  const [search, setSearch] = useState("");
  // States for department and designation filters
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedDesignation, setSelectedDesignation] = useState("");
  // State for status filter (frontend controlled)
  const [selectedStatus, setSelectedStatus] = useState("Active"); // Default to 'Active'

  // RTK Query hook to fetch all team members (no status filter passed here)
  const {
    data: apiData,
    isLoading,
    error,
    // refetch, // No need to refetch on status change if filtering client-side
  } = useGetTeamMembersQuery({
    userId,
    search,
    department: selectedDepartment,
    designation: selectedDesignation,
    // Removed 'status' here as we are filtering on frontend
  });

  // Get all teams from API data
  const allTeams = apiData?.data?.users || [];

  // Frontend filtering by status
  const teams = allTeams.filter((member) => member.status === selectedStatus);
  // IMPORTANT: Ensure your 'member' object has a 'status' field (e.g., 'Active', 'Inactive')

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [sortConfig, setSortConfig] = useState({
    key: "_id",
    direction: "asc",
  });
  const [selectedRows, setSelectedRows] = useState([]);
  const [isAllSelected, setIsAllSelected] = useState(false);

  // Reset pagination when any filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedDepartment, selectedDesignation, selectedStatus]);

  // Pagination calculations - now based on the `teams` (filtered by status)
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  // Sort data based on sortConfig
  const sortedData = [...teams].sort((a, b) => {
    let aValue, bValue;

    if (sortConfig.key === "name") {
      aValue = `${a.firstName} ${a.lastName}`;
      bValue = `${b.firstName} ${b.lastName}`;
    } else if (sortConfig.key === "designation") {
      aValue = a.designation?.name;
      bValue = b.designation?.name;
    } else if (sortConfig.key === "balance") {
      aValue = a.totalPoints;
      bValue = b.totalPoints;
    } else if (sortConfig.key === "updated") {
      aValue = a.updatedAt;
      bValue = b.updatedAt;
    } else {
      aValue = a[sortConfig.key];
      bValue = b[sortConfig.key];
    }

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
  const totalPages = Math.ceil(teams.length / rowsPerPage); // totalPages based on filtered 'teams'

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
    setCurrentPage(1);
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

  const handleCheckboxChange = (_id) => {
    if (selectedRows.includes(_id)) {
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

  // Options for the status dropdown
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
      color: data.value === "create-view" ? "gray" : provided.color, // Keep original logic if needed
      zIndex: 1000,
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      padding: "6px",
    }),
  };

  const [balanceRangeValue, setBalanceRangeValue] = useState(5000); // Unused in this version, but kept for context

  const handleBalanceRangeChange = (e) => {
    setBalanceRangeValue(e.target.value);
  };

  // Handlers for department and designation select changes
  const handleDepartmentChange = (e) => {
    setSelectedDepartment(e.target.value);
    // setCurrentPage(1); // Already handled by the useEffect above
  };

  const handleDesignationChange = (e) => {
    setSelectedDesignation(e.target.value);
    // setCurrentPage(1); // Already handled by the useEffect above
  };

  // Handler for status select change
  const handleStatusChange = (selectedOption) => {
    setSelectedStatus(selectedOption.value);
    // setCurrentPage(1); // Already handled by the useEffect above
  };

  // Error handling for department and designation data
  useEffect(() => {
    if (isDepartmentdataError) {
      console.error("Error fetching departments:", departmentDataError);
    }
    if (isDesignationError) {
      console.error("Error fetching designations:", designationError);
    }
  }, [
    isDepartmentdataError,
    departmentDataError,
    isDesignationError,
    designationError,
  ]);

  if (isLoading) {
    return <div className="loading-state">Loading team members...</div>;
  }

  if (error) {
    return (
      <div className="error-state">
        Error: {error.message || "Failed to fetch team members."}
      </div>
    );
  }

  return (
    <>
      <div className="pageTanDiv">
        <ul className="pageTabPane">
          <li className="active">
            <Link to="/hr/team-members">Team Members</Link>
          </li>
          {hasPermission(CAN_ADJUST_POINT) && (
            <li>
              <Link to="/hr/adjust-points">Adjust Points</Link>
            </li>
          )}
          {hasPermission(CAN_VIEW_POINT) && (
            <li>
              <Link to="/hr/points">Points History</Link>
            </li>
          )}
        </ul>
      </div>
      <div className="table-lists-container">
        <div className="table-top-block">
          <div className="ttb-left">
            <Select
              options={statusOptions} // Use statusOptions here
              defaultValue={statusOptions[0]} // Default to Active
              styles={customStyles}
              onChange={handleStatusChange} // Use the new handler
            />
          </div>
          <div className="ttb-right">
            <div className="searchblock">
              <input
                className="search-input"
                type="text"
                placeholder="Search by Employee ID, Name, Email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <i className="fa fa-search"></i>
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
                  <div className="filter-select">
                    <label>Department</label>
                    <select
                      value={selectedDepartment}
                      onChange={handleDepartmentChange}
                    >
                      <option value="">All Department</option>
                      {departmentsData?.data?.map((dept) => (
                        <option key={dept._id} value={dept._id}>
                          {dept.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="filter-select">
                    <label>Designation</label>
                    <select
                      value={selectedDesignation}
                      onChange={handleDesignationChange}
                    >
                      <option value="">All Designation</option>
                      {designationsData?.data?.map((desig) => (
                        <option key={desig._id} value={desig._id}>
                          {desig.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="tables">
          <div className="table-wrapper">
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
                      onClick={() => handleSort("designation")}
                    >
                      Designation{" "}
                      {sortConfig.key === "designation" && (
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
                      onClick={() => handleSort("balance")}
                    >
                      Balance{" "}
                      {sortConfig.key === "balance" && (
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
                      onClick={() => handleSort("updated")}
                    >
                      Last Updated{" "}
                      {sortConfig.key === "updated" && (
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
                              to={`/hr/team-members/view/${row._id}`}
                              className="dropdown-item"
                            >
                              View
                            </Link>
                            <Link
                              to={`/hr/team-members/edit/${row._id}`}
                              className="dropdown-item"
                            >
                              Edit
                            </Link>
                            <button className="dropdown-item">Delete</button>
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
                        alt={`${row.firstName} ${row.lastName}`}
                      />
                    </td>
                    <td>
                      <Link
                        to={`/hr/team-members/view/${row._id}`}
                        className="tlink"
                      >
                        {row.employeeId}{" "}
                      </Link>
                    </td>
                    <td>
                      <Link
                        to={`/hr/team-members/view/${row._id}`}
                        className="tlink"
                      >
                        {row.firstName} {row.lastName}{" "}
                      </Link>
                    </td>
                    <td>{row.designation?.name}</td> <td>{row.totalPoints}</td>{" "}
                    <td>{new Date(row.updatedAt).toLocaleDateString()}</td>{" "}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="pagination-wrapper">
            <span className="table-datas">
              Showing {indexOfFirstRow + 1} to{" "}
              {Math.min(indexOfLastRow, teams.length)} of {teams.length} entries
            </span>
            <nav>
              <ul className="pagination">
                {Array.from({ length: totalPages }, (_, i) => (
                  <li
                    key={i}
                    className={`page-item ${
                      i + 1 === currentPage ? "Active" : ""
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
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={30}>30</option>
                <option value={40}>40</option>
                <option value={50}>50</option>
                <option value={75}>75</option>
                <option value={100}>100</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HRDashboard;
