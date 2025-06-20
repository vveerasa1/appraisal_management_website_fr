import React from "react";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";

const FilterDetails = ({
  toggleFilterDropdown,
  isFilterOpen,
  filterRef,
  searchValue,
  departments = [],
  designations = [],
  filterValues,
  onFilterChange,
  onCheckboxChange,
}) => {
  return (
    <div className="filters">
      <button
        type="button"
        className="filterbtn"
        onClick={toggleFilterDropdown}
      >
        <FilterAltOutlinedIcon />
      </button>

      {isFilterOpen && (
        <div ref={filterRef} className="dropdown-menu filter-dropdown show">
          <h3 className="filterdrop-heading">Filter</h3>

          {/* Search Field as we alerady have i remove this search */}
          {/* <div className="filter-search">
            <input
              type="text"
              name="search"
              placeholder="Search..."
              value={searchValue}
              onChange={(event) => onFilterChange("search", event)}
            />
            <i className="fa fa-search"></i>
          </div> */}

          {/* Department */}
          <div className="filter-select">
            <label>Department</label>
            <select
              name="department"
              value={filterValues.department}
              onChange={(event) => onFilterChange("department", event)}
            >
              <option value="">All Departments</option>
              {departments.map((dept) => (
                <option key={dept._id} value={dept._id}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>

          {/* Designation */}
          <div className="filter-select">
            <label>Designation</label>
            <select
              name="designation"
              value={filterValues.designation}
              onChange={(event) => onFilterChange("designation", event)}
            >
              <option value="">All Designations</option>
              {designations.map((des) => (
                <option key={des._id} value={des._id}>
                  {des.name}
                </option>
              ))}
            </select>
          </div>

          {/* Fields  will use later*/}
          {/* <div className="filter-checkbox">
            <h3 className="filterdrop-heading">Fields</h3>
            <div className="filtercheck-wrapper">
              {Object.keys(filterValues.fields).map((key) => (
                <label key={key}>
                  <input
                    type="checkbox"
                    checked={filterValues.fields[key]}
                    onChange={(event) => onCheckboxChange(key, event)}
                  />
                  {key.charAt(0).toUpperCase() +
                    key.slice(1).replace(/([A-Z])/g, " $1")}
                </label>
              ))}
            </div>
          </div> */}
        </div>
      )}
    </div>
  );
};

export default FilterDetails;
