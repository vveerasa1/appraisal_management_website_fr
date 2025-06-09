import { useState } from 'react'
import "./style.css"
import { Link } from 'react-router-dom'

const Roles = () => {
    const data = [
        { rid: "1", role: "Admin", access: "Full system access", permission: "6" },
        { rid: "2", role: "Manager", access: "Can manage users", permission: "4" },
        { rid: "3", role: "HR", access: "Can manage users", permission: "6" },
        { rid: "3", role: "User", access: "View personal data only", permission: "1" },
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [sortConfig, setSortConfig] = useState({ key: "rid", direction: "asc" });

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
                <h3 className='page-name'>Roles Management</h3>
                <ul className='breadcrumb-lists'>
                    <li><Link to="/admin/dashboad" className="page-link">Home</Link></li>
                    <li><p>Roles</p></li>
                </ul>
            </div>
            <div className='table-lists-container'>
                <div className='table-top-block'>
                    <div className='filters'>
                        <div className='filter-item'>
                            <select className='filter-input'>
                                <option>Roles</option>
                                <option>Admin</option>
                                <option>Manager</option>
                                <option>HR</option>
                                <option>User</option>
                            </select>
                        </div>
                    </div>
                    <div className='searchblock'>
                        <input className='search-input' type='text' placeholder='Search...' />
                        <i className='fa fa-search'></i>
                    </div>
                    <Link to="/admin/role/add" className='theme-btn btn-blue'><i className='fa fa-plus-circle'></i>Add Role</Link>
                </div>
                <div className='tables'>
                    <table className="table table-striped">
                        <thead>
                            <tr>
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
                                        <Link to={`/admin/role/view`} className="tlink">
                                            {row.rid}
                                        </Link>
                                    </td>
                                    <td>
                                        <Link to={`/admin/role/view`} className="tlink">
                                            {row.role}
                                        </Link>
                                    </td>
                                    <td>{row.access}</td>
                                    <td>{row.permission}</td>
                                    <td>
                                        <div className='table-action-btns'>
                                            <Link to="/admin/role/edit" className='tbtn edit'><i className='fa fa-edit'></i></Link>
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

export default Roles;