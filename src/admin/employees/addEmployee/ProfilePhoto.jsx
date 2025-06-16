
const ProfilePhoto = ({ fileName, handleFileChange }) => (
    <>
     <div className='col-12 col-md-12 col-lg-12'>
                                    <h3 className='small-heading'>Profile Photo</h3>
                                </div>
                                <div className='col-12 col-md-6 col-lg-3'>
                                    <div className='forn-group'>
                                        {/* <label className='form-label'>Upload Logo</label> */}
                                        <div className="upload-container">
                                            {!fileName ? (
                                                <label htmlFor="upload" className="upload-button">
                                                    <span>Upload</span>
                                                    <i className='fa fa-upload'></i>
                                                </label>
                                            ) : (
                                                <div className="file-name">{fileName}</div>
                                            )}
                                            <input
                                                type="file"
                                                id="upload"
                                                className="upload-input"
                                                onChange={handleFileChange}
                                            />
                                        </div>
                                    </div>
                                </div>
    </>
);

export default ProfilePhoto;
