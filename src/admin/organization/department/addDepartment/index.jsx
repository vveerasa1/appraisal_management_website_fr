import { useState, useEffect ,useMemo} from "react";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import {
  useAddDepartmentMutation,
  useGetDepartmentsQuery,
} from "../../../../services/features/departments/departmentApi";
import { useGetReportersQuery } from "../../../../services/features/users/userApi"; // Adjust path as needed
import { showSuccessToast, showErrorToast } from "../../../../utils/toast";
import { useSelector } from "react-redux";

const AddDepartment = () => {
  const [name, setName] = useState("");
  const [departmentLead, setDepartmentLead] = useState("");
  const [parentDepartment, setParentDepartment] = useState("");
  const [error, setError] = useState("");
  const [addDepartment, { isLoading }] = useAddDepartmentMutation();
  const navigate = useNavigate();
  const userId = useSelector((state) => state.users.id);

  // Fetch department leads (reporters)
  const { data: reportersData, isLoading: isLoadingReporters } =
    useGetReportersQuery();
  // Fetch parent departments
  const { data: departmentsData, isLoading: isLoadingDepartments } =
    useGetDepartmentsQuery();
  console.log(departmentsData,"departmentsData")
  const handleSave = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Department Name is required");
      return;
    }
    setError("");
    try {
      await addDepartment({
        name,
        userId: userId, 
        departmentLead,
        parentDepartment
      }).unwrap();
      showSuccessToast("Department added successfully!");
      navigate("/admin/organization/department");
    } catch (err) {
      showErrorToast(
        err?.data?.message ||
          err?.error ||
          err?.message ||
          "Failed to add department."
      );
    }
  };
  const departments = useMemo(() => {
    if (!departmentsData || !departmentsData.data) return [];
    // Filter departments to only include 'Active' ones
    const activeDepartments = departmentsData.data.filter(
      (item) => item.status === "Active"
    );
    return mapToSelectOptions(activeDepartments, {
      label: "name",
      value: "_id",
    });
  }, [departmentsData]);
  return (
    <>
      <div className="pageTanDiv">
        <ul className="pageTabPane">
          <li>
            <Link to="/admin/employees">Employee</Link>
          </li>
          <li className="active">
            <Link to="/admin/organization/department">Department</Link>
          </li>
          <li>
            <Link to="/admin/organization/designation">Designation</Link>
          </li>
          <li>
            <Link to="/admin/organization/tree">Organization Tree</Link>
          </li>
        </ul>
      </div>
      <form className="form-list-container" onSubmit={handleSave}>
        <div className="row">
          <div className="col-12 col-md-12 col-lg-12">
            <div className="form-list-wrapper">
              <div className="row">
                <div className="col-12 col-md-6 col-lg-4">
                  <div className="forn-group">
                    <label className="form-label">Department Name</label>
                    <input
                      type="text"
                      className="form-input"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        setError("");
                      }}
                      placeholder=""
                    />
                    {error && <span className="form-error">{error}</span>}
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                  <div className="forn-group">
                    <label className="form-label">Department Lead</label>
                    <select
                      className="form-input"
                      value={departmentLead}
                      onChange={(e) => setDepartmentLead(e.target.value)}
                      disabled={isLoadingReporters}
                    >
                      <option value="">---Select Lead---</option>
                      {reportersData?.data?.map((user) => (
                        <option key={user._id} value={user._id}>
                          {user.firstName} {user.lastName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                  <div className="forn-group">
                    <label className="form-label">Parent Department</label>
                    <select
                      className="form-input"
                      value={parentDepartment}
                      onChange={(e) => setParentDepartment(e.target.value)}
                      disabled={isLoadingDepartments}
                    >
                      <option value="">---Select Department---</option>
                      {departmentsData?.data?.map((dept) => (
                        <option key={dept._id} value={dept._id}>
                          {dept.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-12 col-md-12 col-lg-12">
                  <div className="submit-btn-block">
                    <button
                      className="theme-btn btn-border"
                      type="button"
                      onClick={() => navigate("/admin/organization/department")}
                      disabled={isLoading}
                    >
                      Cancel
                    </button>
                    <button
                      className="theme-btn btn-blue"
                      type="submit"
                      disabled={isLoading}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddDepartment;
