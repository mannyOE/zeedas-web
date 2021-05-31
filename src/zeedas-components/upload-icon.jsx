import React from "react";
import PropTypes from "prop-types";
import { Label, Input, Row, Col } from "reactstrap";
import FileUpload from "../zeedas-assets/icons/icon-file-upload";
const UploadIcon = ({ onUploadImage, uploadUrl }) => {
  return (
    <div className="upload-icons">
      <div className="upload-text">
        <h5>Upload Icon</h5>
        {uploadUrl == "" ? (
          <span>must be in jpeg or png format</span>
        ) : (
          <img
            src={uploadUrl}
            style={{
              width: "35px",

              height: "36px",
            }}
          />
        )}
      </div>
      <div className="upload-input">
        <div>
          <FileUpload /> <span>Upload</span>
        </div>

        <Input
          type="file"
          name="file"
          onChange={onUploadImage}
          id="exampleFile"
        />
      </div>
    </div>
  );
};

export default UploadIcon;

UploadIcon.defaultProps = {
  onUploadImage: () => {},
  uploadedImage: "",
};

// UploadIcon.propTypes = {
//   onUploadImage: PropTypes.func,
//   uploadedImage: PropTypes.string,
// };
