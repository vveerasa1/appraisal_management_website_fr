import { useState, useEffect, useRef } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import ProfileImg from "../../../assets/images/user.png"; // Keeping for consistency, though likely not used directly here
import Select from "react-select";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { useGetDesignationsQuery,
  useDeleteDesignationMutation,
 } from "../../../services/features/designation/designationApi";
import { usePermission } from "../../../hooks/usePermission";
import { showSuccessToast, showErrorToast } from "../../../utils/toast";

const Designation = () => {
  // State for search query
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const { hasPermission } = usePermission();
  const CAN_VIEW_DEPARTMENT = "department:view";

  // State for status filter (frontend controlled)
  const [selectedStatus, setSelectedStatus] = useState("Active"); // Default to 'Active'
  const [deleteDesignation, { isLoading: isDeleting }] =
    useDeleteDesignationMutation();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearch(searchInput.trim());
    }, 400);
    return () => clearTimeout(timeout);
  }, [searchInput]);

  // Fetch all designations from API (no status filter passed here)
  const {
    data: apiData,
    isLoading,
    error,
  } = useGetDesignationsQuery({ search });

  // Get all designations from API data
  const allDesignations = apiData?.data || [];

  // Frontend filtering by status
  const designations = allDesignations.filter(
    (designation) => designation.status === selectedStatus
  );
  // IMPORTANT: Ensure your 'designation' object has a 'status' field (e.g., 'Active', 'Inactive')

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "asc",
  });
  const [selectedRows, setSelectedRows] = useState([]);
  const [isAllSelected, setIsAllSelected] = useState(false);
 const handleDelete = async (id) => {
    if (!id) return;
    if (!window.confirm("Are you sure you want to delete this designation?"))
      return;
    try {
      await deleteDesignation(id).unwrap();
      showSuccessToast("Designation deleted successfully!");
      // navigate("/admin/organization/designation");
    } catch (err) {
      console.log(err);
      const errorMsg =
        err?.data?.message ||
        err?.error ||
        err?.message ||
        "Failed to delete designation.";
      showErrorToast(errorMsg);
    }
  };
  // Reset pagination when any filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedStatus]); // Added selectedStatus to dependencies

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  // Sorting logic - now applies to the `designations` (filtered) array
  const sortedData = [...designations].sort((a, b) => {
    let aValue, bValue;

    if (sortConfig.key === "addedBy") {
      aValue = a.addedBy ? `${a.addedBy.firstName} ${a.addedBy.lastName}` : "";
      bValue = b.addedBy ? `${b.addedBy.firstName} ${b.addedBy.lastName}` : "";
    } else if (sortConfig.key === "createdAt") {
      aValue = new Date(a.createdAt).getTime(); // Compare timestamps for date sorting
      bValue = new Date(b.createdAt).getTime();
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
  const totalPages = Math.ceil(designations.length / rowsPerPage); // Total pages based on filtered 'designations'

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
      // Changed to row._id as per your existing checkbox logic
      setSelectedRows(currentRows.map((row) => row._id));
      setIsAllSelected(true);
    } else {
      setSelectedRows([]);
      setIsAllSelected(false);
    }
  };

  const handleCheckboxChange = (_id) => {
    // Changed to _id as per your existing checkbox logic
    if (selectedRows.includes(_id)) {
      setSelectedRows(selectedRows.filter((id) => id !== _id));
      setIsAllSelected(false);
    } else {
      setSelectedRows([...selectedRows, _id]);
    }
  };

  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRefs = useRef({});

  const [isFilterOpen, setIsFilterOpen] = useState(false); // filter dropdown, currently commented out
  const filterRef = useRef(null);

  const toggleDropdown = (_id) => {
    // Changed to _id
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

  // Options for the status dropdown
  const statusOptions = [
    { value: "Active", label: "Active Designation View" },
    { value: "Inactive", label: "Inactive Designation View" },
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
      color: data.value === "create-view" ? "gray" : provided.color, // Keeping this if you have a 'create-view' option
      zIndex: 1000,
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      padding: "6px",
    }),
  };

  // Handler for status select change
  const handleStatusChange = (selectedOption) => {
    setSelectedStatus(selectedOption.value);
  };

  return (
    <>
      <div className="pageTanDiv">
        <ul className="pageTabPane">
          {hasPermission(CAN_VIEW_DEPARTMENT) && (
            <li>
              <Link to="/admin/organization/department">Department</Link>
            </li>
          )}
          <li className="active">
            <Link to="/admin/organization/designation">Designation</Link>
          </li>
          <li>
            <Link to="/admin/organization/tree">Organization Tree</Link>
          </li>
        </ul>
      </div>
      <div className="table-lists-container">
        <div className="table-top-block">
          <div className="ttb-left">
            <Select
              options={statusOptions}
              defaultValue={statusOptions[0]} // Default to Active Designation View
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
              <i className="fa fa-search"></i>
            </div>
            <Link
              to="/admin/organization/designation/add"
              className="theme-btn btn-blue"
              title="Add Designation"
              style={{ display: "flex", alignItems: "center", gap: "6px" }}
            >
              <i className="fa fa-plus-circle" aria-hidden="true"></i> Add Designation
            </Link>
          </div>
        </div>
        <div className="tables">
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  {/* <th style={{ width: "50px" }}>
                    <button className="table-head-btn">
                      <i className="fa fa-tasks"></i>
                    </button>
                  </th> */}
                  {/* <th>
                    <input
                      className="tablecheck"
                      type="checkbox"
                      onChange={handleSelectAll}
                      checked={isAllSelected}
                    />
                  </th> */}
                  <th>
                    <button
                      className="table-head-btn"
                      onClick={() => handleSort("name")}
                    >
                      Designation Name{" "}
                      {sortConfig.key === "name" && (
                        <span
                          className={`ml-1 arrow ${sortConfig.direction === "asc"
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
                      onClick={() => handleSort("status")}
                    >
                      Status{" "}
                      {sortConfig.key === "status" && (
                        <span
                          className={`ml-1 arrow ${sortConfig.direction === "asc"
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
                      onClick={() => handleSort("addedBy")}
                    >
                      Added By{" "}
                      {sortConfig.key === "addedBy" && (
                        <span
                          className={`ml-1 arrow ${sortConfig.direction === "asc"
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
                      onClick={() => handleSort("createdAt")}
                    >
                      Added Time{" "}
                      {sortConfig.key === "createdAt" && (
                        <span
                          className={`ml-1 arrow ${sortConfig.direction === "asc"
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
                    <button className="table-head-btn">Actions</button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={6}>Loading designations...</td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan={6}>
                      Error: {error.message || "Failed to load designations."}
                    </td>
                  </tr>
                ) : (
                  currentRows.map((row) => (
                    <tr key={row._id}>
                      {/* <td>
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
                                to={`/admin/organization/designation/view/${row._id}`}
                                className="dropdown-item"
                              >
                                View
                              </Link>
                              <Link
                                to={`/admin/organization/designation/edit/${row._id}`}
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
                      </td> */}
                      <td>
                        <Link
                          to={`/admin/organization/designation/view/${row._id}`}
                          className="tlink"
                        >
                          {row.name}
                        </Link>
                      </td>
                      <td>{row.status || "Active"}</td>{" "}
                      {/* Display row.status or default to "Active" */}
                      <td>
                        {row.addedBy
                          ? `${row.addedBy.firstName} ${row.addedBy.lastName}`
                          : "-"}
                      </td>
                      <td>
                        {row.createdAt
                          ? new Date(row.createdAt).toLocaleString()
                          : "-"}
                      </td>
                      <td>
                        <button
                          className="btn"
                          title="Delete"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(row._id)
                            // Add your delete logic here
                            // alert(`Delete clicked for ${row._id}`);
                          }}
                        >
                          <i className="fa fa-trash" style={{ color: "red" }} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="pagination-wrapper">
            <span className="table-datas">
              Showing {indexOfFirstRow + 1} to{" "}
              {Math.min(indexOfLastRow, designations.length)} of{" "}
              {designations.length} entries
            </span>
            <nav>
              <ul className="pagination">
                {Array.from({ length: totalPages }, (_, i) => (
                  <li
                    key={i}
                    className={`page-item ${i + 1 === currentPage ? "active" : ""
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

export default Designation;
