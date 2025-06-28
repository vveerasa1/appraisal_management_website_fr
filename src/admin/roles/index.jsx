import { useState, useEffect, useRef } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import Select from "react-select";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { useGetRolesQuery } from "../../services/features/roles/roleApi";

const Roles = () => {
  // Fetch roles from API

  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearch(searchInput.trim());
    }, 400);
    return () => clearTimeout(timeout);
  }, [searchInput]);

  const { data, isLoading, error } = useGetRolesQuery({ search });
  const roles = data?.data || [];

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

  const sortedData = [...roles].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  const currentRows = sortedData.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(roles.length / rowsPerPage);

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

  const handleCheckboxChange = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
      setIsAllSelected(false);
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

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

  const options = [
    { value: "active-view", label: "Active Role View" },
    { value: "inactive-view", label: "Inactive Role View" },
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
        <div className="viewPageTopDiv">
          <div className="lvDiv">
            <Link to="/admin/overview">
              <i className="fa fa-angle-left"></i>
            </Link>
            <p>Users</p>
          </div>
          <div className="rvDiv">
            <Link
              to="/admin/role/add"
              type="button"
              className="theme-btn btn-blue"
            >
              <i className="fa fa-plus-circle"></i>Add Role
            </Link>
          </div>
        </div>
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
                    </select>
                  </div>
                  <div className="filter-select">
                    <label>Designation</label>
                    <select>
                      <option>All Designation</option>
                    </select>
                  </div>
                  <div className="filter-checkbox">
                    <h3 className="filterdrop-heading">Role Type</h3>
                    <div className="filtercheck-wrapper">
                      <label>
                        <input type="checkbox" />
                        Admin
                      </label>
                      <label>
                        <input type="checkbox" />
                        HR
                      </label>
                      <label>
                        <input type="checkbox" />
                        Employee
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
              <p>Loading...</p>
            ) : error ? (
              <p>Failed to load roles.</p>
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
                    <th></th>
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
                      </td>
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
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          <div className="pagination-wrapper">
            <span className="table-datas">
              Showing {indexOfFirstRow + 1} to{" "}
              {Math.min(indexOfLastRow, roles.length)} of {roles.length} entries
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
