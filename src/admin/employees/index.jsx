import { useState, useEffect, useRef } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import ProfileImg from "../../assets/images/user.png";
import Select from "react-select";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { useGetAllUsersQuery } from "../../services/features/users/userApi";
import { useSelector } from "react-redux";
import { useApiErrorToast } from "../../hooks/useApiErrorToast";

const Employees = () => {
  const data = [
    {
      eid: "PB0001",
      firstname: "Alice",
      lastname: "Manty",
      email: "alic2e@gmail.com",
      department: "Software Development",
      designation: "HR",
      doj: "11-Jun-2025",
      reporting: "Mary Joe ABC12345",
      mobilenumber: "123456789",
      address: "1234, New Winston Road, New York",
      status: "Active",
      addedby: "PBY01001 - Vijay Ram - Veeraswamy",
      addedtime: "11-Jun-2025 09:00 AM",
    },
    {
      eid: "PB0002",
      firstname: "John",
      lastname: "Doe",
      email: "alic24e@gmail.com",
      department: "Software Development",
      designation: "HR",
      doj: "11-Jun-2025",
      reporting: "Mary Joe ABC12345",
      mobilenumber: "123456789",
      address: "1234, New Winston Road, New York",
      status: "Active",
      addedby: "PBY01001 - Vijay Ram - Veeraswamy",
      addedtime: "11-Jun-2025 09:00 AM",
    },
    {
      eid: "PB0003",
      firstname: "William",
      lastname: "Smith",
      email: "alic45e@gmail.com",
      department: "Software Development",
      designation: "HR",
      doj: "11-Jun-2025",
      reporting: "Mary Joe ABC12345",
      mobilenumber: "123456789",
      address: "1234, New Winston Road, New York",
      status: "Active",
      addedby: "PBY01001 - Vijay Ram - Veeraswamy",
      addedtime: "11-Jun-2025 09:00 AM",
    },
  ];
  const userId = useSelector((store) => store.users.id);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [sortConfig, setSortConfig] = useState({
    key: "eid",
    direction: "asc",
  });
  const [selectedRows, setSelectedRows] = useState([]);
  const [isAllSelected, setIsAllSelected] = useState(false);

  const [queryParams, setQueryParams] = useState({
    page: 1,
    limit: 50,
    search: "",
    role: "",
    status: "",
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const {
    data: allUserData,
    isLoading: allUsersLoading,
    isError: isUsersError,
    error: usersError,
  } = useGetAllUsersQuery({ id: "684fe62b3d87c714b1a7a360" });
  useApiErrorToast(isUsersError, usersError, "Failed to retrieve all users");
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  const sortedData = [...allUserData.data.users].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
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
      setSelectedRows(currentRows.map((row) => row.eid));
      setIsAllSelected(true);
    } else {
      setSelectedRows([]);
      setIsAllSelected(false);
    }
  };

  const handleCheckboxChange = (eid) => {
    if (selectedRows.includes(eid)) {
      setSelectedRows(selectedRows.filter((id) => id !== eid));
      setIsAllSelected(false);
    } else {
      setSelectedRows([...selectedRows, eid]);
    }
  };

  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRefs = useRef({});

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef(null);

  const toggleDropdown = (eid) => {
    setOpenDropdown(openDropdown === eid ? null : eid);
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
    { value: "active-view", label: "Active Employee View" },
    { value: "inactive-view", label: "Inactive Employee View" },
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
          <li className="active">
            <Link to="/admin/employees">Employees</Link>
          </li>
        </ul>
      </div>
      <div className="table-lists-container">
        <div className="table-top-block">
          <div className="ttb-left">
            <Select
              options={[...options]}
              defaultValue={options[0]}
              styles={customStyles}
            />
          </div>
          <div className="ttb-right">
            <div className="searchblock">
              <input
                className="search-input"
                type="text"
                placeholder="Search..."
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
                    <h3 className="filterdrop-heading">Fields</h3>
                    <div className="filtercheck-wrapper">
                      <label>
                        <input type="checkbox" />
                        Employee ID
                      </label>
                      <label>
                        <input type="checkbox" />
                        Name
                      </label>
                      <label>
                        <input type="checkbox" />
                        Designation
                      </label>
                      <label>
                        <input type="checkbox" />
                        Email
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="tables">
          <div className="table-wrapper">
            <table className="table large-table">
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
                      onClick={() => handleSort("eid")}
                    >
                      Employee ID{" "}
                      {sortConfig.key === "eid" && (
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
                      onClick={() => handleSort("firstname")}
                    >
                      First Name{" "}
                      {sortConfig.key === "firstname" && (
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
                      onClick={() => handleSort("lastname")}
                    >
                      Last Name{" "}
                      {sortConfig.key === "lastname" && (
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
                      onClick={() => handleSort("email")}
                    >
                      Email{" "}
                      {sortConfig.key === "email" && (
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
                      onClick={() => handleSort("department")}
                    >
                      Department{" "}
                      {sortConfig.key === "department" && (
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
                      onClick={() => handleSort("doj")}
                    >
                      Date of Joining{" "}
                      {sortConfig.key === "doj" && (
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
                      onClick={() => handleSort("reporting")}
                    >
                      Reporting to{" "}
                      {sortConfig.key === "reporting" && (
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
                      onClick={() => handleSort("mobilenumber")}
                    >
                      Mobile Number{" "}
                      {sortConfig.key === "mobilenumber" && (
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
                      onClick={() => handleSort("address")}
                    >
                      Address{" "}
                      {sortConfig.key === "address" && (
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
                  </th>
                  <th>
                    <button
                      className="table-head-btn"
                      onClick={() => handleSort("addedby")}
                    >
                      Added By{" "}
                      {sortConfig.key === "addedby" && (
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
                      onClick={() => handleSort("addedtime")}
                    >
                      Added Time{" "}
                      {sortConfig.key === "addedtime" && (
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
                  <tr key={row.eid}>
                    <td>
                      <div
                        ref={(el) => (dropdownRefs.current[row.eid] = el)}
                        className="dropdown"
                      >
                        <button
                          className="tdadd-drop"
                          type="button"
                          onClick={() => toggleDropdown(row.eid)}
                        >
                          <i className="fa fa-ellipsis-h"></i>
                        </button>
                        {openDropdown === row.eid && (
                          <div className="dropdown-menu tddropOptions show">
                            <Link
                              to="/admin/employee/view"
                              className="dropdown-item"
                            >
                              View
                            </Link>
                            <Link
                              to="/admin/employee/edit"
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
                        onChange={() => handleCheckboxChange(row.eid)}
                        checked={selectedRows.includes(row.eid)}
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
                      <Link to={`/admin/employee/view`} className="tlink">
                        {row.eid}
                      </Link>
                    </td>
                    <td>{row.firstname}</td>
                    <td>{row.lastname}</td>
                    <td>
                      <a className="tlink" href="mailto:">
                        {row.email}
                      </a>
                    </td>
                    <td>{row.department}</td>
                    <td>{row.designation}</td>
                    <td>{row.doj}</td>
                    <td>{row.reporting}</td>
                    <td>{row.mobilenumber}</td>
                    <td>{row.address}</td>
                    <td>{row.status}</td>
                    <td>{row.addedby}</td>
                    <td>{row.addedtime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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

export default Employees;
