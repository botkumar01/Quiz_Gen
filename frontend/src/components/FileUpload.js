import { useState } from "react";
import { uploadFile } from "../services/api";
import "./FileUpload.css";

function FileUpload({ setExtractedText }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setError("");
    const response = await uploadFile(file);
    if (response.error) {
      setError(response.error);
      setExtractedText("");
    } else {
      setExtractedText(response.text);
    }
    setLoading(false);
  };

  return (
    <div className="upload-container">
      <label className="file-input-label">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="file-input"
        />
        {file ? file.name : "Choose a file"}
      </label>

      <button
        onClick={handleUpload}
        disabled={loading}
        className={`upload-btn ${loading ? "disabled" : ""}`}
      >
        {loading ? "Uploading..." : "Upload File"}
      </button>

      {error && <p className="error-text">{error}</p>}
    </div>
  );
}

export default FileUpload;
