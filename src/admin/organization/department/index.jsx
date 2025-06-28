import { useState, useEffect, useRef } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import ProfileImg from "../../../assets/images/user.png";
import Select from "react-select";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { useGetDepartmentsQuery } from "../../../services/features/departments/departmentApi";

const Department = () => {
  // Fetch departments from API

  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const {
    data: apiData,
    isLoading,
    error,
  } = useGetDepartmentsQuery({ search });
  const departments = apiData?.data || [];

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearch(searchInput.trim());
    }, 400);
    return () => clearTimeout(timeout);
  }, [searchInput]);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "asc",
  });
  const [selectedRows, setSelectedRows] = useState([]);
  const [isAllSelected, setIsAllSelected] = useState(false);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  // Sorting logic
  const sortedData = [...departments].sort((a, b) => {
    if (!a[sortConfig.key] || !b[sortConfig.key]) return 0;
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  const currentRows = sortedData.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(departments.length / rowsPerPage);

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

  const options = [
    { value: "active-view", label: "Active Department View" },
    { value: "inactive-view", label: "Inactive Department View" },
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

  return (
    <>
      <div className="pageTanDiv">
        <ul className="pageTabPane">
          {/* <li>
            <Link to="/admin/employees">Employees</Link>
          </li> */}
          <li className="active">
            <Link to="/admin/organization/department">Department</Link>
          </li>
          <li>
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
            {/* <Select
              options={options}
              defaultValue={options[0]}
              styles={customStyles}
            /> */}
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
            {/* <div className="filters">
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
                  <h3 className="filterdrop-heading">FIlter</h3>
                  <div className="filter-search">
                    <input type="text" placeholder="" />
                    <i className="fa fa-search"></i>
                  </div>
                  <div className="filter-select">
                    <label>Department</label>
                    <select>
                      <option>All Department</option>
                      {departments.map((dept) => (
                        <option key={dept._id} value={dept._id}>
                          {dept.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="filter-select">
                    <label>Designation</label>
                    <select>
                      <option>All Designation</option>
                    </select>
                  </div>
                  <div className="filter-checkbox">
                    <h3 className="filterdrop-heading">Fields</h3>
                    <div className="filtercheck-wrapper">
                      <label>
                        <input type="checkbox" />
                        Department Name
                      </label>
                      <label>
                        <input type="checkbox" />
                        Parent Department
                      </label>
                      <label>
                        <input type="checkbox" />
                        Department Lead
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div> */}
          </div>
        </div>
        <div className="tables">
          <div className="table-wrapper">
            {isLoading ? (
              <div>Loading...</div>
            ) : error ? (
              <div>Failed to load departments.</div>
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th style={{ width: "50px" }}>
                      <button className="table-head-btn">
                        <i className="fa fa-tasks"></i>
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
                      <button
                        className="table-head-btn"
                        onClick={() => handleSort("name")}
                      >
                        Department Name{" "}
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
                        onClick={() => handleSort("departmentLead")}
                      >
                        Department Lead{" "}
                        {sortConfig.key === "departmentLead" && (
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
                        onClick={() => handleSort("parentDepartment")}
                      >
                        Parent Department{" "}
                        {sortConfig.key === "parentDepartment" && (
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
                        Status
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
                        onClick={() => handleSort("createdAt")}
                      >
                        Added Time{" "}
                        {sortConfig.key === "createdAt" && (
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
                                to={`/admin/organization/department/view/${row._id}`}
                                className="dropdown-item"
                              >
                                View
                              </Link>
                              <Link
                                to={`/admin/organization/department/edit/${row._id}`}
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
                        <Link
                          to={`/admin/organization/department/view/${row._id}`}
                          className="tlink"
                        >
                          {row.name}
                        </Link>
                      </td>
                      <td>
                        {row.departmentLead
                          ? `${row.departmentLead.firstName} ${row.departmentLead.lastName}`
                          : "-"}
                      </td>
                      <td>{row.parentDepartment?.name || "-"}</td>
                      <td>Active</td>
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
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          <div className="pagination-wrapper">
            <span className="table-datas">
              Showing {indexOfFirstRow + 1} to{" "}
              {Math.min(indexOfLastRow, departments.length)} of{" "}
              {departments.length} entries
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

export default Department;
