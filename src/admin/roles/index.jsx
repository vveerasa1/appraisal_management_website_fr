import { useState, useEffect, useRef } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import Select from "react-select";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import {
  useGetRolesQuery,
  useDeleteRoleMutation,
} from "../../services/features/roles/roleApi";
import { showSuccessToast, showErrorToast } from "../../utils/toast";

const Roles = () => {
  // State for search and status filters
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  // State for status filter, default to "Active"
  const [statusFilter, setStatusFilter] = useState("Active");
  const [deleteRole, { isLoading: isDeleting }] = useDeleteRoleMutation();
  // Debounce search input
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearch(searchInput.trim());
    }, 400);
    return () => clearTimeout(timeout);
  }, [searchInput]);

  // Fetch roles from API. We are NO LONGER passing 'status' to the query.
  const { data, isLoading, error } = useGetRolesQuery({
    search,
    // We assume the backend now returns ALL roles (or handles search only)
    // status: statusFilter, // REMOVE THIS LINE if backend doesn't support status param
  });

  // Get raw roles data from the API response
  const allRoles = data?.data || [];

  // --- NEW: Client-Side Filtering by Status ---
  const filteredRolesByStatus = allRoles.filter((role) => {
    if (statusFilter === "All") {
      // Added 'All' option for status dropdown
      return true;
    }
    return role.status === statusFilter;
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "asc",
  });
  const [selectedRows, setSelectedRows] = useState([]);
  const [isAllSelected, setIsAllSelected] = useState(false);

  // Sorting logic now applies to filtered data
  const sortedData = [...filteredRolesByStatus].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  // Pagination logic now applies to filtered and sorted data
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = sortedData.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredRolesByStatus.length / rowsPerPage); // Total pages based on filtered count

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
  const handleDelete = async (id) => {
    console.log(id);
    if (!id) return;
    // if (!window.confirm("Are you sure you want to delete this role?")) return;
    try {
      console.log(id);

      await deleteRole(id).unwrap();
      showSuccessToast("Role deleted successfully!");
    } catch (err) {
      const errorMsg =
        err?.data?.message ||
        err?.error ||
        err?.message ||
        "Failed to delete role.";
      showErrorToast(errorMsg);
    }
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

  const handleCheckboxChange = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
      setIsAllSelected(false);
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  // Dropdown and filter UI logic
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRefs = useRef({});
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef(null);

  const toggleDropdown = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
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

  // Options for the React-Select dropdown, now including "All"
  const options = [
    { value: "Active", label: "Active Roles" },
    { value: "Inactive", label: "Inactive Roles" },
    { value: "All", label: "All Roles" }, // NEW: Option to view all roles
  ];

  // Determine the current default value for the Select component based on statusFilter
  const defaultSelectValue = options.find(
    (option) => option.value === statusFilter
  );

  const handleSelectChange = (selectedOption) => {
    setStatusFilter(selectedOption.value);
    setCurrentPage(1); // Reset to first page when filter changes
  };

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

  return (
    <>
      <div className="pageTanDiv">
        <div className="viewPageTopDiv">
          <div className="lvDiv">
            <Link to="/admin/overview">
              <i className="fa fa-angle-left"></i>
            </Link>
            <p>Roles</p>
          </div>
        </div>
      </div>
      {/* <div className="table-top-block">
        <div className="ttb-left">
          <Select
            options={options}
            value={defaultSelectValue}
            onChange={handleSelectChange}
            styles={customStyles}
          />
        </div>
        <div className="ttb-right" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div className="searchblock" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <input
              className="search-input"
              type="text"
              placeholder="Search..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <i className="fa fa-search"></i>

            <Link
              to="/admin/role/add"
              className="theme-btn btn-blue"
              title="Add Role"
              style={{ display: "flex", alignItems: "center", gap: "6px" }}
            >
              <i className="fa fa-plus-circle" aria-hidden="true"></i> Add Role
            </Link>
          </div>
        </div>
      </div> */}
      <div className="table-lists-container">
        <div className="table-top-block">
          <div className="ttb-left">
            <Select
              options={options}
              value={defaultSelectValue}
              onChange={handleSelectChange}
              styles={customStyles}
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
              to="/admin/role/add"
              className="theme-btn btn-blue"
              title="Add Role"
              style={{ display: "flex", alignItems: "center", gap: "6px" }}
            >
              <i className="fa fa-plus-circle" aria-hidden="true"></i> Add Role
            </Link>
          </div>
        </div>
        <div className="tables">
          <div className="table-wrapper">
            {isLoading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>Failed to load roles.</p>
            ) : (
              <table className="table table-striped">
                <thead>
                  <tr>
                    {/* <th style={{ width: "50px" }}>
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
                </th> */}
                    <th>
                      <button
                        className="table-head-btn"
                        onClick={() => handleSort("name")}
                      >
                        Role{" "}
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
                        onClick={() => handleSort("description")}
                      >
                        Description{" "}
                        {sortConfig.key === "description" && (
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
                        onClick={() => handleSort("permissions")}
                      >
                        Permissions{" "}
                        {sortConfig.key === "permissions" && (
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
                        onClick={() => handleSort("status")}
                      >
                        Status{" "}
                        {sortConfig.key === "status" && (
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
                    </th>{" "}
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentRows.map((row) => (
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
                              to={`/admin/role/view/${row._id}`}
                              className="dropdown-item"
                            >
                              View
                            </Link>
                            <Link
                              to={`/admin/role/edit/${row._id}`}
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
                          to={`/admin/role/view/${row._id}`}
                          className="tlink"
                        >
                          {row.name}
                        </Link>
                      </td>
                      <td>{row.description}</td>
                      <td>
                        {Array.isArray(row.permissions)
                          ? row.permissions.length
                          : 0}
                      </td>
                      <td>{row.status}</td> {/* Display Role Status */}
                      <td>
                        <>
                          <button
                            className="btn"
                            title="Edit"
                            onClick={(e) => {
                              e.stopPropagation();
                              window.location.assign(`/admin/role/edit/${row._id}`);
                            }}
                            style={{ marginRight: "8px" }}
                          >
                            <i className="fa fa-pencil" style={{ color: "blue" }} />
                          </button>
                          <button
                            className="btn"
                            title="Delete"
                            onClick={(e) => {
                              e.stopPropagation();
                              // Add your delete logic here
                              // alert(`Delete clicked for ${row._id}`);
                              handleDelete(row._id);
                            }}
                          >
                            <i className="fa fa-trash" style={{ color: "red" }} />
                          </button>
                        </>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          <div className="pagination-wrapper">
            <span className="table-datas">
              Showing {indexOfFirstRow + 1} to{" "}
              {Math.min(indexOfLastRow, filteredRolesByStatus.length)} of{" "}
              {filteredRolesByStatus.length} entries
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

export default Roles;
