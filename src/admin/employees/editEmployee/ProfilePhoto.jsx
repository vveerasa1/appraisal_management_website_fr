import { useEffect } from "react";

const ProfilePhoto = ({
  fileName,
  setFieldValue,
  selectedFile,
  previewUrl,
  setPreviewUrl,
  setSelectedFile,
  handleRemove,
}) => {
  console.log(fileName, "my filename", previewUrl);
  // Set preview when file is selected

  const onFileChange = (e) => {
    console.log(fileName, "fileName");
    const file = e.target.files[0];
    console.log(file, "fileName files");
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setFieldValue("profilePhoto", file);
    }
  };

  return (
    <>
      <div className="col-12 col-md-12 col-lg-12">
        <h3 className="small-heading">Profile Photo</h3>
      </div>
      <div className="col-12 col-md-6 col-lg-3">
        <div className="forn-group">
          {/* <label className='form-label'>Upload Logo</label> */}
          <div className="upload-container">
            {!selectedFile ? (
              <label htmlFor="upload" className="upload-button">
                <span>Upload</span>
                <i className="fa fa-upload"></i>
              </label>
            ) : (
              <div className="card" style={{ width: "260px" }}>
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="card-img-top"
                  style={{ width: "100%", height: "150px", objectFit: "cover" }}
                />
                <div className="card-body p-2 d-flex justify-content-between align-items-center">
                  <span className="text-truncate" style={{ maxWidth: "90px" }}>
                    {selectedFile?.name}
                  </span>
                  <button
                    type="button"
                    className="btn btn-sm btn-danger"
                    onClick={handleRemove}
                  >
                    <i className="fa fa-trash me-1"></i>Remove
                  </button>
                </div>
              </div>
            )}
            <input
              type="file"
              id="upload"
              className="upload-input"
              onChange={onFileChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePhoto;
