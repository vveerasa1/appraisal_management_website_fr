import { useState, useEffect, useRef, useMemo } from "react";
import React from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import dayjs from "dayjs";
import "./style.css";
import { Link } from "react-router-dom";
import ProfileImg from "../../assets/images/user.png";
import Select from "react-select";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { useGetAllUsersQuery } from "../../services/features/users/userApi";
import { useSelector } from "react-redux";
import { useApiErrorToast } from "../../hooks/useApiErrorToast";
import ActiveInactiveSelect from "../../components/common/ActiveInacitve";
import SearchInput from "../../components/common/SearchInput";
import FilterContainer from "../../components/wrapper/FilterWrapper";
import { createFilterObject } from "../../utils/utils";

const IndeterminateCheckbox = ({ indeterminate, className = "", ...rest }) => {
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (typeof indeterminate === "boolean" && ref.current) {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate, rest.checked]);

  return (
    <input
      type="checkbox"
      ref={ref}
      className={className + " cursor-pointer"}
      {...rest}
    />
  );
};

const ActionsCell = ({ row, openDropdown, toggleDropdown, dropdownRefs }) => {

  return (
    <div
      ref={(el) => (dropdownRefs.current[row.original.employeeId] = el)}
      className="dropdown"
    >
      <button
        className="tdadd-drop"
        type="button"
        onClick={() => toggleDropdown(row.original.employeeId)}
      >
        <i className="fa fa-ellipsis-h"></i>
      </button>
      {openDropdown === row.original.employeeId && (
        <div className="dropdown-menu tddropOptions show">
          <Link
            to={`/admin/employee/view/${row.original.employeeId}`}
            className="dropdown-item"
          >
            View
          </Link>
          <Link
            to={`/admin/employee/edit/${row.original.employeeId}`}
            className="dropdown-item"
          >
            Edit
          </Link>
          <button className="dropdown-item">Delete</button>
        </div>
      )}
    </div>
  );
};

const AdminViewEmployee = () => {
  const userId = useSelector((store) => store.users.id);

  // State for sorting and row selection
  const [sorting, setSorting] = useState([]);
  const [rowSelection, setRowSelection] = useState({});
  const [pagination, setPagination] = useState({
    pageIndex: 0, // react-table uses 0-based index
    pageSize: 10,
  });

  //Active-Inactive view
  const options = [
    { value: "active-view", label: "Active Employee View" },
    { value: "inactive-view", label: "Inactive Employee View" },
  ];
  const [selectedView, setSelectedView] = useState("active-view");

  //Search
  const [search, setSearch] = useState("");
  const handleSearch = (e) => {
    return setSearch(e.target.vlaue);
  };

  //Filter employee

  const [filterValues, setFilterValues] = useState({
    id:userId,
    search: "",
    department: "",
    designation: "",
    fields: {
      employeeId: false,
      name: false,
      designation: false,
      email: false,
    },
  });

  const handleFilterChange = (name,e) => {
    console.log(e.target, "my target", e)
    const {  value } = e.target;
    setFilterValues((prev) => ({ ...prev, [name]: value }));
  };

  console.log(filterValues, "FilterValues")

  const handleFilterCheckboxChange = (name, e) => {
    const { checked } = e.target;
    setFilterValues((prev) => ({
      ...prev,
      fields: {
        ...prev.fields,
        [name]: checked,
      },
    }));
  };

  

  const {
    data: allUserData,
    isLoading: allUsersLoading,
    isError: isUsersError,
    error: usersError,
  } = useGetAllUsersQuery(createFilterObject(filterValues));

  const tableData = useMemo(() => {
    const data = allUserData?.data?.users || [];

    if (selectedView === "active-view") {
      return data.filter((user) => user.status === "Active");
    } else if (selectedView === "inactive-view") {
      return data.filter((user) => user.status === "Inactive");
    }

    return data;
  }, [allUserData, selectedView]);
  const pageCount = allUserData?.totalPages || 0;

  useApiErrorToast(isUsersError, usersError, "Failed to retrieve all users");

  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRefs = useRef({});

  const toggleDropdown = (eid) => {
    setOpenDropdown((prev) => (prev === eid ? null : eid));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      Object.values(dropdownRefs.current).forEach((ref) => {
        if (ref && !ref.contains(event.target)) {
          setOpenDropdown(null);
        }
      });
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const columnHelper = createColumnHelper();

  const columns = useMemo(
    () => [
      columnHelper.display({
        id: "select",
        header: ({ table }) => (
          <IndeterminateCheckbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler(),
            }}
          />
        ),
        cell: ({ row }) => (
          <IndeterminateCheckbox
            {...{
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler(),
            }}
          />
        ),
      }),
      columnHelper.display({
        id: "actions",
        cell: ({ row }) => (
          <ActionsCell
            row={row}
            openDropdown={openDropdown}
            toggleDropdown={toggleDropdown}
            dropdownRefs={dropdownRefs}
          />
        ),
      }),
      columnHelper.display({
        id: "photo",
        header: "Photo",
        cell: () => (
          <img
            className="img-fluid tableProfileImg"
            src={ProfileImg}
            alt="User"
          />
        ), // Placeholder for avatar
      }),
      columnHelper.accessor("employeeId", {
        header: "Employee ID",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("firstName", {
        header: "Name",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("lastName", {
        header: "Role",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("email", {
        header: "Email",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("department", {
        header: "Department",
        cell: (info) => info.getValue().name,
      }),
      columnHelper.accessor("designation", {
        header: "Designation",
        cell: (info) => info.getValue().name,
      }),
      columnHelper.accessor("dateOfJoining", {
        header: "Doj",
        cell: (info) => dayjs(info.getValue()).format("DD-MM-YYYY"),
      }),
      columnHelper.accessor("phoneNumber", {
        header: "Phone",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("reportingTo", {
        header: "ReportingTo",
        cell: (info) =>
          `${info.getValue().firstName} ${info.getValue().lastName}`,
      }),
    ],
    [columnHelper]
  );
  const table = useReactTable({
    data: tableData,
    columns,
    pageCount,
    state: {
      sorting,
      rowSelection,
      pagination,
    },
    manualPagination: true,
    onPaginationChange: setPagination,
    enableRowSelection: true, //enable row selection for all rows
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  // OLD

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef(null);

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

  const handleRowsPerPageChange = (e) => {
    setPagination((prev) => ({
      ...prev,
      pageSize: Number(e.target.value),
      pageIndex: 0, // reset to first page when limit changes
    }));
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
            <ActiveInactiveSelect
              options={options}
              setState={setSelectedView}
            />
          </div>
          <div className="ttb-right">
            <SearchInput onSearch={handleSearch} />
            <FilterContainer
              toggleFilterDropdown={toggleFilterDropdown}
              isFilterOpen={isFilterOpen}
              filterRef={filterRef}
              filterValues={filterValues}
              onFilterChange={handleFilterChange}
              onCheckboxChange={handleFilterCheckboxChange}
            />
          </div>
        </div>
        <div className="tables">
          <div className="table-wrapper">
            <table className="table large-table">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th key={header.id} colSpan={header.colSpan}>
                        {header.isPlaceholder ? null : (
                          <div
                            {...{
                              className: header.column.getCanSort()
                                ? "cursor-pointer select-none"
                                : "",
                              onClick: header.column.getToggleSortingHandler(),
                            }}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {{
                              asc: "▲",
                              desc: "▼",
                            }[header.column.getIsSorted()] ?? null}
                          </div>
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel()?.rows?.map((row) => (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="pagination-wrapper">
            <span className="table-datas">
              {/* Showing {indexOfFirstRow + 1} to{" "} */}
              {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getState().pagination.pageSize} entries
            </span>
            <nav>
              <ul className="pagination">
                {Array.from({ length: table.getPageCount() }, (_, i) => (
                  <li
                    key={i}
                    className={`page-item ${
                      i + 1 === currentPage ? "active" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => table.nextPage()}
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
                value={pagination.pageSize}
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

export default AdminViewEmployee;
