import { useState, useEffect, useRef } from 'react';
import "./style.css"
import { Link, NavLink } from 'react-router-dom'

const AdminHolidays = () => {
    const data = [
        { hid: "1", name: "Holiday 1", date: "10-01-2022", description: "Lorem ipsum sit amit" },
        { hid: "2", name: "Holiday 2", date: "10-02-2022", description: "Lorem ipsum sit amit" },
        { hid: "3", name: "Holiday 3", date: "10-03-2022", description: "Lorem ipsum sit amit" },
        { hid: "4", name: "Holiday 4", date: "10-04-2022", description: "Lorem ipsum sit amit" },
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(50);
    const [sortConfig, setSortConfig] = useState({ key: "hid", direction: "asc" });

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
            <div className="pageTanDiv">
                <ul className="pageTabPane">
                    <li>
                        <Link to="/admin/attendance">Attendance</Link>
                    </li>
                    <li className="active">
                        <Link to="/admin/holidays">Holidays</Link>
                    </li>
                </ul>
            </div>
            <div className='table-lists-container'>
                <div className='table-top-block'>
                    <div className='ttb-left'>
                    </div>
                    <div className='ttb-right'>
                        <div className='searchblock'>
                            <input className='search-input' style={{ paddingRight: '10px' }} type='date' placeholder='Search...' />
                        </div>
                        <Link
                            to="/admin/holiday/add"
                            className="theme-btn btn-blue"
                            title="Add Holiday"
                            style={{ display: "flex", alignItems: "center", gap: "6px" }}
                        >
                            <i className="fa fa-plus-circle" aria-hidden="true"></i> Add Holiday
                        </Link>
                    </div>
                </div>
                <div className='tables'>
                    <div className='table-wrapper'>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>
                                        <button
                                            className="table-head-btn"
                                            onClick={() => handleSort("hid")}
                                        >
                                            Holiday ID {sortConfig.key === "hid" && (
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
                                            Holiday Name {sortConfig.key === "name" && (
                                                <span className={`ml-1 arrow ${sortConfig.direction === "asc" ? "arrow-up" : "arrow-down"}`}>
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
                                            Date {sortConfig.key === "date" && (
                                                <span className={`ml-1 arrow ${sortConfig.direction === "asc" ? "arrow-up" : "arrow-down"}`}>
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
                                            Description {sortConfig.key === "description" && (
                                                <span className={`ml-1 arrow ${sortConfig.direction === "asc" ? "arrow-up" : "arrow-down"}`}>
                                                    {sortConfig.direction === "asc" ? "▲" : "▼"}
                                                </span>
                                            )}
                                        </button>
                                    </th>
                                    <th><button className="table-head-btn">Action</button></th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentRows.map((row) => (
                                    <tr key={row.hid}>
                                        <td>
                                            {row.hid}
                                        </td>
                                        <td>
                                            <Link to={`/admin/holiday/view`} className="tlink">
                                                {row.name}
                                            </Link>
                                        </td>
                                        <td>{row.date}</td>
                                        <td>{row.description}</td>
                                        <td><Link
                                            className="btn"
                                            title="Edit"
                                            to="/admin/holiday/edit"
                                            style={{ marginRight: "8px" }}
                                        >
                                            <i className="fa fa-pencil" style={{ color: 'blue' }} />
                                        </Link>
                                            <button
                                                className="btn"
                                                title="Delete"
                                            >
                                                <i className="fa fa-trash" style={{ color: 'red' }} />
                                            </button></td>
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

export default AdminHolidays;