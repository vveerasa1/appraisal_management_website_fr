import { useState, useEffect, useRef } from 'react';
import "./style.css"
import { Link } from 'react-router-dom'
import Select from "react-select";
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import ProfileImg from '../../assets/images/user.png'

const HRDashboard = () => {
    const data = [
        { eid: "PB0001", name: "Alice Manty", designation: "Senior Developer", balance: "450", updated: "May 20, 2025" },
        { eid: "PB0002", name: "John Doe", designation: "Senior Developer", balance: "450", updated: "May 20, 2025" },
        { eid: "PB0003", name: "William Smith", designation: "Senior Developer", balance: "450", updated: "May 20, 2025" },
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
        { value: "active-view", label: "Active Employee View" },
        { value: "inactive-view", label: "Inactive Employee View" },
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

    const [value, setValue] = useState(50);

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    return (
        <>
            <div className="pageTanDiv">
                <ul className="pageTabPane">
                    <li className="active">
                        <Link to="/hr/team-members">Team Members</Link>
                    </li>
                </ul>
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
                                    <div className="frange-slider">
                                        <h3 className='filterdrop-heading'>Balance Range 0-{value}</h3>
                                        <input
                                            type="range"
                                            min="0"
                                            max="5000"
                                            value={value}
                                            onChange={handleChange}
                                            style={{ width: '100%' }}
                                        />
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
                                    <th><button className="table-head-btn"> Photo </button></th>
                                    <th>
                                        <button
                                            className="table-head-btn"
                                            onClick={() => handleSort("eid")}
                                        >
                                            Employee ID {sortConfig.key === "eid" && (
                                                <span className={`ml-1 arrow ${sortConfig.direction === "asc" ? "arrow-up" : "arrow-down"}`}>
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
                                            Name {sortConfig.key === "name" && (
                                                <span className={`ml-1 arrow ${sortConfig.direction === "asc" ? "arrow-up" : "arrow-down"}`}>
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
                                            Designation {sortConfig.key === "designation" && (
                                                <span className={`ml-1 arrow ${sortConfig.direction === "asc" ? "arrow-up" : "arrow-down"}`}>
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
                                            Balance {sortConfig.key === "balance" && (
                                                <span className={`ml-1 arrow ${sortConfig.direction === "asc" ? "arrow-up" : "arrow-down"}`}>
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
                                            Last Updated {sortConfig.key === "updated" && (
                                                <span className={`ml-1 arrow ${sortConfig.direction === "asc" ? "arrow-up" : "arrow-down"}`}>
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
                                                        <Link to="/hr/team-members/view" className="dropdown-item">View</Link>
                                                        <Link to="/hr/team-members/edit" className="dropdown-item">Edit</Link>
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
                                            <img className='img-fluid tableProfileImg' src={ProfileImg} alt='User' />
                                        </td>
                                        <td>
                                            <Link to={`/hr/team-member/view`} className="tlink">
                                                {row.eid}
                                            </Link>
                                        </td>
                                        <td>
                                            <Link to={`/hr/team-member/view`} className="tlink">
                                                {row.name}
                                            </Link>
                                        </td>
                                        <td>
                                            {row.designation}
                                        </td>
                                        <td>{row.balance}</td>
                                        <td>{row.updated}</td>
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