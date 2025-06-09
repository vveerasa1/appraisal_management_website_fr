import React, { useState } from "react";
import "./style.css"
import { Link } from 'react-router-dom'

const HRDashboard = () => {
    const data = [
        { eid: "PB0001", name: "Alice Manty", designation: "Senior Developer", balance: "450", updated: "May 20, 2025" },
        { eid: "PB0002", name: "John Doe", designation: "Senior Developer", balance: "450", updated: "May 20, 2025" },
        { eid: "PB0003", name: "William Smith", designation: "Senior Developer", balance: "450", updated: "May 20, 2025" },
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [sortConfig, setSortConfig] = useState({ key: "eid", direction: "asc" });

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
    return (
        <>
            <div className='breadcrumb-wrapper'>
                <h3 className='page-name'>Team Members</h3>
                <ul className='breadcrumb-lists'>
                    <li><Link to="/hr/dashboard" className="page-link">Home</Link></li>
                    <li><p>Team Members</p></li>
                </ul>
            </div>
            <div className='table-lists-container'>
                <div className='table-top-block'>
                    <div className='filters'>
                        <div className='filter-item'>
                            <select className='filter-input'>
                                <option>Select Employee</option>
                                <option></option>
                            </select>
                        </div>
                    </div>
                    <div className='searchblock'>
                        <input className='search-input' type='text' placeholder='Search...' />
                        <i className='fa fa-search'></i>
                    </div>
                </div>
                <div className='tables'>
                    <table className="table table-striped">
                        <thead>
                            <tr>
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
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentRows.map((row) => (
                                <tr key={row.eid}>
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
                                    <td>
                                        <div className='table-action-btns'>
                                            <Link to="/hr/team-member/view" className='tbtn edit'><i className='fa fa-eye'></i></Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
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

export default HRDashboard;