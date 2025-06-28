import { useGetDesignationsQuery } from "../../services/features/designation/designationApi";
import { useGetDepartmentsQuery } from "../../services/features/departments/departmentApi";
import { useApiErrorToast } from "../../hooks/useApiErrorToast";
import FilterDetails from "../common/FilterDetails";

const FilterContainer = (props) => {
  const {
    data: departmentsData,
    isError: isDepartmentdataError,
    error: departmentDataError,
  } = useGetDepartmentsQuery({ search: "" });
  const {
    data: designationsData,
    isError: isDesignationError,
    error: designationError,
  } = useGetDesignationsQuery({ search: "" });

  useApiErrorToast(
    isDepartmentdataError,
    departmentDataError,
    "Failed to load departments"
  );
  useApiErrorToast(
    isDesignationError,
    designationError,
    "Failed to load designations"
  );
  return (
    <FilterDetails
      departments={departmentsData?.data || []}
      designations={designationsData?.data || []}
      {...props}
    />
  );
};

export default FilterContainer;
