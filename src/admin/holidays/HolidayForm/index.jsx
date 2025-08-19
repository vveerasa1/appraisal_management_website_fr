import React, { useState, useEffect } from "react";
import "./style.css";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import {
  useAddHolidayMutation,
  useGetHolidayByIdQuery,
  useUpdateHolidayMutation,
  useDeleteHolidayMutation,
} from "../../../services/features/holidays/holidayApi";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { showSuccessToast, showErrorToast } from "../../../utils/toast";

const HolidayForm = () => {
  const userId = useSelector((state) => state.users.id);
  const navigate = useNavigate();
  console.log(userId, "USER ID");
  const { id, type } = useParams(); // Assuming id param for edit mode
  const location = useLocation();
  const pathName = location.pathname.split("/");
  const viewMode = pathName[3];
  console.log(viewMode);
  const [formData, setFormData] = useState({
    holidayName: "",
    date: "",
    description: "",
  });
  const [createPoint, { isLoading: isSaving }] = useAddHolidayMutation();
  const [deleteHoliday] = useDeleteHolidayMutation();
  const [updateHoliday, { isLoading: isSavingUpdate }] =
    useUpdateHolidayMutation();
  const { data: getSingleHoliday, iseLoading: getSingleHolidayIsLoading } =
    useGetHolidayByIdQuery(id, {
      skip: !id,
    });
  const [errors, setErrors] = useState({});
  const singleHoliday = getSingleHoliday?.data || [];
  console.log(singleHoliday, "single");
  useEffect(() => {
    console.log("show holidays");
    if (id && singleHoliday) {
      setFormData({
        holidayName: singleHoliday?.name,
        date: dayjs(singleHoliday?.date).format("YYYY-MM-DD"),
        description: singleHoliday?.description,
      });
    }
  }, [id, singleHoliday]);
  const addedByName = singleHoliday.addedBy
    ? `${singleHoliday.addedBy.firstName} ${singleHoliday.addedBy.lastName}`
    : "Unknown User";

  const modifiedByName = singleHoliday.modifiedBy
    ? `${singleHoliday.modifiedBy.firstName} ${singleHoliday.modifiedBy.lastName}`
    : null;

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    const nameRegex = /^[A-Za-z\s]+$/;
    if (
      !formData.holidayName.trim() ||
      typeof formData.holidayName !== "string" ||
      !nameRegex.test(formData.holidayName)
    ) {
      newErrors.holidayName =
        "Holiday name is required and must contain only letters and spaces.";
    } else {
      newErrors.holidayName = "";
    }
    if (!formData.date) {
      newErrors.date = "Date is required.";
    } else {
      newErrors.date = "";
    }
    setErrors(newErrors);
    const isError = newErrors.date || newErrors.holidayName;
    return !isError;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      id,
      userId,
      name: formData.holidayName,
      date: formData.date,
      description: formData.description,
    };

    try {
      if (id) {
        await updateHoliday(payload).unwrap();
        showSuccessToast("Holiday updated successfully!");
      } else {
        await createPoint(payload).unwrap();
        showSuccessToast("Holiday added successfully!");
      }

      setFormData({
        holidayName: "",
        date: "",
        description: "",
      });
      setErrors({});
      setTimeout(() => {
        navigate("/admin/holidays");
      }, 500); // 500ms delay
    } catch (error) {
      console.error("Error submitting holiday:", error);
      showErrorToast("Failed to submit holiday. Please try again.");
    }
  };
  const handleDelete = async (id) => {
    try {
      await deleteHoliday(id);
      showSuccessToast("Holiday Deleted");
      navigate("/admin/holidays");
    } catch {
      console.error("Error deleting holiday");
    }
  };
  return (
    <>
      <div className="pageTanDiv">
        {/* ToastContainer removed here */}

        <ul className="pageTabPane">
          <li className="active">
            <Link to="/admin/holidays">Holidays</Link>
          </li>
        </ul>
        {viewMode === "view" ? (
          <div className="">
            <Link
              className="btn"
              title="Edit"
              to={`/admin/holiday/edit/${id}`}
              style={{ marginRight: "8px" }}
            >
              <i className="fa fa-pencil" style={{ color: "blue" }} />
            </Link>
            <button
              onClick={() => {
                handleDelete(id);
              }}
              className="btn"
              title="Delete"
            >
              <i className="fa fa-trash" style={{ color: "red" }} />
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
      <form className="form-list-container" onSubmit={handleSubmit} noValidate>
        <div className="row">
          <div className="col-12 col-md-12 col-lg-12">
            <div className="form-list-wrapper">
              <div className="row">
                <div
                  className={
                    type === "edit" || type === "view"
                      ? "col-12 col-md-6 col-lg-4"
                      : "col-12 col-md-6 col-lg-6"
                  }
                >
                  <div
                    className={
                      type === "edit" || type === "view"
                        ? "editform-group"
                        : "forn-group"
                    }
                  >
                    <label
                      className={
                        type === "edit" || type === "view"
                          ? "editform-label"
                          : "form-label"
                      }
                    >
                      Holiday Name
                    </label>
                    <input
                      type="text"
                      className={
                        type === "edit" || type === "view"
                          ? "editform-input"
                          : "form-input"
                      }
                      value={formData.holidayName}
                      onChange={(e) =>
                        handleChange("holidayName", e.target.value)
                      }
                      placeholder=""
                      disabled={type === "view"}
                    />
                    {errors.holidayName && (
                      <div className="error-text" style={{ color: "red" }}>
                        {errors.holidayName}
                      </div>
                    )}
                  </div>
                </div>
                <div
                  className={
                    type === "edit" || type === "view"
                      ? "col-12 col-md-6 col-lg-4"
                      : "col-12 col-md-6 col-lg-6"
                  }
                >
                  <div
                    className={
                      type === "edit" || type === "view"
                        ? "editform-group"
                        : "forn-group"
                    }
                  >
                    <label
                      className={
                        type === "edit" || type === "view"
                          ? "editform-label"
                          : "form-label"
                      }
                    >
                      Date
                    </label>
                    <input
                      type="date"
                      className={
                        type === "edit" || type === "view"
                          ? "editform-input"
                          : "form-input"
                      }
                      value={formData.date}
                      onChange={(e) => handleChange("date", e.target.value)}
                      placeholder=""
                      disabled={type === "view"}
                    />
                    {errors.date && (
                      <div className="error-text" style={{ color: "red" }}>
                        {errors.date}
                      </div>
                    )}
                  </div>
                </div>
                <div
                  className={
                    type === "edit" || type === "view"
                      ? "col-12 col-md-6 col-lg-4"
                      : "col-12 col-md-6 col-lg-12"
                  }
                >
                  <div
                    className={
                      type === "edit" || type === "view"
                        ? "editform-group"
                        : "forn-group"
                    }
                  >
                    <label
                      className={
                        type === "edit" || type === "view"
                          ? "editform-label"
                          : "form-label"
                      }
                    >
                      Description
                    </label>
                    <textarea
                      cols={30}
                      rows={3}
                      className={
                        type === "edit" || type === "view"
                          ? "editform-input"
                          : "form-input"
                      }
                      value={formData.description}
                      onChange={(e) =>
                        handleChange("description", e.target.value)
                      }
                      placeholder=""
                      disabled={type === "view"}
                    ></textarea>
                  </div>
                </div>
                {type != "add" && (
                  <>
                    <div className="col-12 col-md-6 col-lg-4">
                      <div className="editform-group">
                        <label className="editform-label">Added By</label>
                        <input
                          type="text"
                          className="editform-input"
                          value={addedByName}
                          placeholder=""
                          disabled
                        />
                      </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
                      <div className="editform-group">
                        <label className="editform-label">Added Time</label>
                        <input
                          type="text"
                          className="editform-input"
                          value={dayjs(singleHoliday.createdAt).format(
                            "MM/DD/YYYY, h:mm:ss A"
                          )}
                          placeholder=""
                          disabled
                        />
                      </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
                      <div className="editform-group">
                        <label className="editform-label">Modified By</label>
                        <input
                          type="text"
                          className="editform-input"
                          value={modifiedByName}
                          placeholder=""
                          disabled
                        />
                      </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
                      <div className="editform-group">
                        <label className="editform-label">Modified Time</label>
                        <input
                          type="text"
                          className="editform-input"
                          value={
                            singleHoliday.modifiedTime
                              ? dayjs(singleHoliday.modifiedTime).format(
                                  "MM/DD/YYYY, h:mm:ss A"
                                )
                              : ""
                          }
                          placeholder=""
                          disabled
                        />
                      </div>
                    </div>
                  </>
                )}

                <div className="col-12 col-md-12 col-lg-12">
                  <div className="submit-btn-block">
                    <button
                      className="theme-btn btn-border"
                      type="button"
                      onClick={() => navigate("/admin/holidays")}
                    >
                      Cancel
                    </button>

                    {viewMode === "view" ? (
                      ""
                    ) : (
                      <button className="theme-btn btn-blue" type="submit">
                        {id ? "Save" : "Create"}
                      </button>
                    )}
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

export default HolidayForm;
