import { useState } from 'react'
import "./style.css"
import { Link } from 'react-router-dom'

const Employees = () => {
    const data = [
        { tid: "T001", template: "Quarterly Appraisal", assigned: "50", pending: "12" },
        { tid: "T002", template: "Spot Award", assigned: "50", pending: "12" },
        { tid: "T003", template: "Yearly Appraisal", assigned: "50", pending: "12" },
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [sortConfig, setSortConfig] = useState({ key: "tid", direction: "asc" });

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
                <h3 className='page-name'>Appraisal Management</h3>
                <ul className='breadcrumb-lists'>
                    <li><Link to="/admin/dashboad" className="page-link">Home</Link></li>
                    <li><p>Appraisals</p></li>
                </ul>
            </div>
            <div className='table-lists-container'>
                <div className='table-top-block'>
                    <div className='filters'>
                        <div className='filter-item'>
                            <select className='filter-input'>
                                <option>Select template</option>
                                <option></option>
                                <option></option>
                                <option></option>
                            </select>
                        </div>
                    </div>
                    <div className='searchblock'>
                        <input className='search-input' type='text' placeholder='Search...' />
                        <i className='fa fa-search'></i>
                    </div>
                    <Link to="/admin/appraisal/add" className='theme-btn btn-blue'><i className='fa fa-plus-circle'></i>Add Appraisal</Link>
                </div>
                <div className='tables'>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>
                                    <button
                                        className="table-head-btn"
                                        onClick={() => handleSort("tid")}
                                    >
                                        Template ID {sortConfig.key === "tid" && (
                                            <span className={`ml-1 arrow ${sortConfig.direction === "asc" ? "arrow-up" : "arrow-down"}`}>
                                                {sortConfig.direction === "asc" ? "▲" : "▼"}
                                            </span>
                                        )}
                                    </button>
                                </th>
                                <th>
                                    <button
                                        className="table-head-btn"
                                        onClick={() => handleSort("template")}
                                    >
                                        Template {sortConfig.key === "template" && (
                                            <span className={`ml-1 arrow ${sortConfig.direction === "asc" ? "arrow-up" : "arrow-down"}`}>
                                                {sortConfig.direction === "asc" ? "▲" : "▼"}
                                            </span>
                                        )}
                                    </button>
                                </th>
                                <th>
                                    <button
                                        className="table-head-btn"
                                        onClick={() => handleSort("assigned")}
                                    >
                                        Assigned {sortConfig.key === "assigned" && (
                                            <span className={`ml-1 arrow ${sortConfig.direction === "asc" ? "arrow-up" : "arrow-down"}`}>
                                                {sortConfig.direction === "asc" ? "▲" : "▼"}
                                            </span>
                                        )}
                                    </button>
                                </th>
                                <th>
                                    <button
                                        className="table-head-btn"
                                        onClick={() => handleSort("pending")}
                                    >
                                        Pending {sortConfig.key === "pending" && (
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
                                <tr key={row.tid}>
                                    <td>
                                        <Link to={`/admin/appraisal/view`} className="tlink">
                                            {row.tid}
                                        </Link>
                                    </td>
                                    <td>
                                        <Link to={`/admin/appraisal/view`} className="tlink">
                                            {row.template}
                                        </Link>
                                    </td>
                                    <td>{row.assigned}</td>
                                    <td>{row.pending}</td>
                                    <td>
                                        <div className='table-action-btns'>
                                            <Link to="/admin/appraisal/edit" className='tbtn edit'><i className='fa fa-edit'></i></Link>
                                            <button className='tbtn delete'><i className='fa fa-trash'></i></button>
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

export default Employees;