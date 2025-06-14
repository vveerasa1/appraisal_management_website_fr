import { useState, useEffect, useRef } from 'react';
import "./style.css"
import { Link } from 'react-router-dom'
import ProfileImg from '../../assets/images/user.png'
import Select from "react-select";
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';

const Roles = () => {
    const data = [
        { rid: "1", role: "Admin", access: "Full system access", permission: "6" },
        { rid: "2", role: "Manager", access: "Can manage users", permission: "4" },
        { rid: "3", role: "HR", access: "Can manage users", permission: "6" },
        { rid: "3", role: "User", access: "View personal data only", permission: "1" },
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(50);
    const [sortConfig, setSortConfig] = useState({ key: "eid", direction: "asc" });
    const [selectedRows, setSelectedRows] = useState([]);
    const [isAllSelected, setIsAllSelected] = useState(false);

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
        if (isFilterOpen && filterRef.current && !filterRef.current.contains(event.target)) {
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
            minHeight: '35px',
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
            <div className='pageTanDiv'>
                <div className='viewPageTopDiv'>
                    <div className='lvDiv'>
                        <Link to="/admin/roles"><i className='fa fa-angle-left'></i></Link>
                        <p>Users</p>
                    </div>
                    <div className='rvDiv'>
                        <Link to="/admin/role/add" type='button' className='theme-btn btn-blue'><i className='fa fa-plus-circle'></i>Add Role</Link>
                    </div>
                </div>
            </div>
            <div className='table-lists-container'>
                <div className='table-top-block'>
                    <div className='ttb-left'>
                        <Select
                            options={[
                                ...options,
                            ]}
                            defaultValue={options[0]}
                            styles={customStyles}
                        />
                    </div>
                    <div className='ttb-right'>
                        <div className='searchblock'>
                            <input className='search-input' type='text' placeholder='Search...' />
                            <i className='fa fa-search'></i>
                        </div>
                        <div className='filters'>
                            <button type="button" className="filterbtn" onClick={toggleFilterDropdown}>
                                <FilterAltOutlinedIcon />
                            </button>
                            {isFilterOpen && (
                                <div ref={filterRef} className="dropdown-menu filter-dropdown show">
                                    <h3 className='filterdrop-heading'>FIlter</h3>
                                    <div className='filter-search'>
                                        <input type='text' placeholder='' />
                                        <i className='fa fa-search'></i>
                                    </div>
                                    <div className='filter-select'>
                                        <label>Department</label>
                                        <select>
                                            <option>All Department</option>
                                        </select>
                                    </div>
                                    <div className='filter-select'>
                                        <label>Designation</label>
                                        <select>
                                            <option>All Designation</option>
                                        </select>
                                    </div>
                                    <div className='filter-checkbox'>
                                        <h3 className='filterdrop-heading'>Role Type</h3>
                                        <div className='filtercheck-wrapper'>
                                            <label>
                                                <input type='checkbox' />
                                                Admin
                                            </label>
                                            <label>
                                                <input type='checkbox' />
                                                HR
                                            </label>
                                            <label>
                                                <input type='checkbox' />
                                                Employee
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className='tables'>
                    <div className='table-wrapper'>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th style={{ width: '50px' }}><button className="table-head-btn"> <i className='fa fa-tasks'></i> </button></th>
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
                                            onClick={() => handleSort("rid")}
                                        >
                                            Role ID {sortConfig.key === "rid" && (
                                                <span className={`ml-1 arrow ${sortConfig.direction === "asc" ? "arrow-up" : "arrow-down"}`}>
                                                    {sortConfig.direction === "asc" ? "▲" : "▼"}
                                                </span>
                                            )}
                                        </button>
                                    </th>
                                    <th>
                                        <button
                                            className="table-head-btn"
                                            onClick={() => handleSort("role")}
                                        >
                                            Role {sortConfig.key === "role" && (
                                                <span className={`ml-1 arrow ${sortConfig.direction === "asc" ? "arrow-up" : "arrow-down"}`}>
                                                    {sortConfig.direction === "asc" ? "▲" : "▼"}
                                                </span>
                                            )}
                                        </button>
                                    </th>
                                    <th>
                                        <button
                                            className="table-head-btn"
                                            onClick={() => handleSort("access")}
                                        >
                                            Access {sortConfig.key === "access" && (
                                                <span className={`ml-1 arrow ${sortConfig.direction === "asc" ? "arrow-up" : "arrow-down"}`}>
                                                    {sortConfig.direction === "asc" ? "▲" : "▼"}
                                                </span>
                                            )}
                                        </button>
                                    </th>
                                    <th>
                                        <button
                                            className="table-head-btn"
                                            onClick={() => handleSort("permission")}
                                        >
                                            Permissions {sortConfig.key === "permission" && (
                                                <span className={`ml-1 arrow ${sortConfig.direction === "asc" ? "arrow-up" : "arrow-down"}`}>
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
                                    <tr key={row.rid}>
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
                                                        <Link to="/admin/role/view" className="dropdown-item">View</Link>
                                                        <Link to="/admin/role/edit" className="dropdown-item">Edit</Link>
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
                                            {row.rid}
                                        </td>
                                        <td>
                                            <Link to={`/admin/role/view`} className="tlink">
                                                {row.role}
                                            </Link>
                                        </td>
                                        <td>{row.access}</td>
                                        <td>{row.permission}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="pagination-wrapper">
                        <span className='table-datas'>
                            Showing {indexOfFirstRow + 1} to{" "}
                            {Math.min(indexOfLastRow, data.length)} of {data.length} entries
                        </span>
                        <nav>
                            <ul className="pagination">
                                {Array.from({ length: totalPages }, (_, i) => (
                                    <li
                                        key={i}
                                        className={`page-item ${i + 1 === currentPage ? "active" : ""}`}
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