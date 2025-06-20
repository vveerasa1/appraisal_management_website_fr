import { useState, useEffect, useRef } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import ProfileImg from "../../assets/images/user.png";
import Select from "react-select";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { useGetAllPointsQuery } from "../../services/features/points/pointApi";
import { useGetDepartmentsQuery } from "../../services/features/departments/departmentApi";
import { useGetDesignationsQuery } from "../../services/features/designation/designationApi";

const Points = () => {
  const { data: apiData, isLoading, error } = useGetAllPointsQuery();
  const data = apiData?.data || [];

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [sortConfig, setSortConfig] = useState({
    key: "_id",
    direction: "asc",
  });
  const [selectedRows, setSelectedRows] = useState([]);
  const [isAllSelected, setIsAllSelected] = useState(false);

  const { data: deptData, isLoading: isDeptLoading } = useGetDepartmentsQuery();
  const { data: desgData, isLoading: isDesgLoading } =
    useGetDesignationsQuery();

  const departments = deptData?.data || [];
  const designations = desgData?.data || [];

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  const sortedData = [...data].sort((a, b) => {
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
      setSelectedRows(currentRows.map((row) => row._id));
      setIsAllSelected(true);
    } else {
      setSelectedRows([]);
      setIsAllSelected(false);
    }
  };

  const handleCheckboxChange = (_id) => {
    if (selectedRows.includes(eid)) {
      setSelectedRows(selectedRows.filter((id) => id !== _id));
      setIsAllSelected(false);
    } else {
      setSelectedRows([...selectedRows, eid]);
    }
  };

  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRefs = useRef({});

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef(null);

  const toggleDropdown = (_id) => {
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

  const [value, setValue] = useState(50);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      <div className="pageTanDiv">
        <ul className="pageTabPane">
          <li className="active">
            <Link to="/admin/points">Points</Link>
          </li>
        </ul>
      </div>
      <div className="table-lists-container">
        <div className="table-top-block">
          <div className="ttb-left">
            <Select
              options={options}
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
                  {/* <div className="filter-search">
                    <input type="text" placeholder="" />
                    <i className="fa fa-search"></i>
                  </div> */}
                  {/* <div className="filter-select">
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
                      {designations.map((desg) => (
                        <option key={desg._id} value={desg._id}>
                          {desg.name}
                        </option>
                      ))}
                    </select>
                  </div> */}
                  <div className="filter-checkbox">
                    <div className="filtercheck-wrapper">
                      <label>
                        <input type="radio" />
                        Date (Old-New)
                      </label>
                      <label>
                        <input type="radio" />
                        Points (High-Low)
                      </label>
                      <label>
                        <input type="radio" />
                        Transactions (Bonuses First)
                      </label>
                    </div>
                    <div className="filter-date-range">
                      <input className="fdateinput" type="date" />
                    </div>
                    <div className="frange-slider">
                      <h3 className='filterdrop-heading'>Points Range 0-{value}</h3>
                      <input
                        type="range"
                        min="0"
                        max="200"
                        value={value}
                        onChange={handleChange}
                        style={{ width: '100%' }}
                      />
                    </div>
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
                        onClick={() => handleSort("_id")}
                      >
                        Employee ID{" "}
                        {sortConfig.key === "_id" && (
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
                        onClick={() => handleSort("employeeId")}
                      >
                        Name{" "}
                        {sortConfig.key === "employeeId" && (
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
                        onClick={() => handleSort("pointsChange")}
                      >
                        Points{" "}
                        {sortConfig.key === "pointsChange" && (
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
                        onClick={() => handleSort("balanceAfter")}
                      >
                        Balance{" "}
                        {sortConfig.key === "balanceAfter" && (
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
                        onClick={() => handleSort("reason")}
                      >
                        Reason{" "}
                        {sortConfig.key === "reason" && (
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
                        onClick={() => handleSort("date")}
                      >
                        Date{" "}
                        {sortConfig.key === "date" && (
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
                              {/* <Link
                                to={`/admin/point/edit/${row._id}`}
                                className="dropdown-item"
                              >
                                Edit
                              </Link> */}
                              {/* <button className="dropdown-item">Delete</button> */}
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
