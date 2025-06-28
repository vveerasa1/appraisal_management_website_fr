import { useState } from "react";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import { useAddDesignationMutation } from "../../../../services/features/designation/designationApi";
import { showSuccessToast, showErrorToast } from "../../../../utils/toast";
import { useSelector } from "react-redux";

const AddDesignation = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [addDesignation, { isLoading }] = useAddDesignationMutation();
  const navigate = useNavigate();
  const userId = useSelector((state) => state.users.id);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Designation Name is required");
      return;
    }
    setError("");
    try {
      await addDesignation({
        name,
        userId: userId,
      }).unwrap(); // Add userId here
      showSuccessToast("Designation added successfully!");
      navigate("/admin/organization/designation");
    } catch (err) {
      showErrorToast(
        err?.data?.message ||
          err?.error ||
          err?.message ||
          "Failed to add designation."
      );
    }
  };

  return (
    <>
      <div className="pageTanDiv">
        <ul className="pageTabPane">
          {/* <li>
            <Link to="/admin/employees">Employee</Link>
          </li> */}
          <li>
            <Link to="/admin/organization/department">Department</Link>
          </li>
          <li className="active">
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
                    <label className="form-label">Designation Name</label>
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
                <div className="col-12 col-md-12 col-lg-12">
                  <div className="submit-btn-block">
                    <button
                      className="theme-btn btn-border"
                      type="button"
                      onClick={() =>
                        navigate("/admin/organization/designation")
                      }
                      disabled={isLoading}
                    >
                      Cancel
                    </button>
                    <button
                      className="theme-btn btn-blue"
                      type="submit"
                      disabled={isLoading}
                    >
                      Save Designation
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

export default AddDesignation;
