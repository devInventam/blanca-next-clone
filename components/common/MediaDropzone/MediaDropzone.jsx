import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Icon } from "@iconify/react";
import { UPLOAD_BASE_URL } from "../../../utils/constant";
import { useDocumentUploader } from "../../../utils/useDocumentUploader";
import Field from "../Field/Field";
import "./MediaDropzone.css";

const getBytes = (size, type) => {
  if (type === "MB") return size * 1024 * 1024;
  if (type === "KB") return size * 1024;
  return 0;
};

export default function MediaDropzone({
  value,
  onChange,
  acceptExtensions = {
    "application/pdf": [".pdf"],
    "application/msword": [".doc"],
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
      ".docx",
    ],
  },
  label,
  errorMsg,
  maxSize,
  fileType = "Document",
  uploadType,
  noteMsg = "",
}) {
  const { uploadFile, removeUploadedFile, isLoading } = useDocumentUploader();
  const [fileName, setFileName] = useState(null);
  const [localError, setLocalError] = useState("");

  const handleRemove = useCallback(
    async (keyToRemove) => {
      if (keyToRemove) {
        try {
          await removeUploadedFile(keyToRemove);
        } catch (err) {
          console.error("Failed to delete uploaded file:", err);
        }
      }
      setFileName(null);
      onChange("");
      setLocalError("");
    },
    [onChange, removeUploadedFile]
  );

  const onDrop = useCallback(
    async (acceptedFiles) => {
      if (!acceptedFiles.length) return;

      const file = acceptedFiles[0];
      const maxBytes = maxSize ? getBytes(maxSize.size, maxSize.type) : 0;

      const acceptedTypes = Object.keys(acceptExtensions || {});
      const isAccepted = acceptedTypes.some((type) => {
        if (type.endsWith("/*")) {
          return file.type.startsWith(type.replace("/*", "/"));
        }
        return file.type === type;
      });

      if (!isAccepted) {
        setLocalError(
          `Only the following file types are accepted: ${Object.values(acceptExtensions).flat().join(", ")}`
        );
        return;
      }

      if (maxBytes && file.size > maxBytes) {
        setLocalError(
          `${fileType} must be less than ${maxSize.size}${maxSize.type}`
        );
        return;
      }

      if (value) {
        await removeUploadedFile(value);
      }

      try {
        const uploadedKey = await uploadFile(file);
        if (uploadedKey) {
          const fullUrl = UPLOAD_BASE_URL
            ? `${UPLOAD_BASE_URL}/${uploadedKey}`.replace(/([^:]\/)\/+/g, "$1")
            : uploadedKey;
          setFileName({ key: uploadedKey, url: fullUrl, name: file.name });
          onChange(uploadedKey);
          setLocalError("");
        }
      } catch (error) {
        console.error("Failed to upload:", error);
        setLocalError("Upload failed. Please try again.");
      }
    },
    [
      value,
      onChange,
      maxSize,
      acceptExtensions,
      fileType,
      uploadType,
      uploadFile,
      removeUploadedFile,
    ]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptExtensions,
    multiple: false,
    disabled: isLoading,
  });

  useEffect(() => {
    if (!value) {
      setFileName(null);
      return;
    }

    setFileName((prev) => {
      // If we just uploaded and already know the original filename,
      // don't overwrite it with the backend key/UUID.
      if (prev?.key === value && prev?.name) return prev;

      const name = value.split("/").pop() || "";
      const fullUrl = UPLOAD_BASE_URL
        ? `${UPLOAD_BASE_URL}/${value}`.replace(/([^:]\/)\/+/g, "$1")
        : value;
      return { key: value, url: fullUrl, name, type: "application/pdf" };
    });
  }, [value]);

  const combinedError = localError || errorMsg;

  return (
    <Field label={label} className="media-dropzone-field">
      <div className="media-dropzone-wrapper">
        <div
          {...getRootProps()}
          className={`media-dropzone-root ${combinedError ? "has-error" : ""}`}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p className="media-dropzone-text">Drop the file here ...</p>
          ) : (
            <p className="media-dropzone-text">
              {isLoading ? (
                "Uploading..."
              ) : (
                <>
                  <Icon icon="lucide:upload-cloud" className="media-dropzone-icon" />
                  Upload a File{" "}
                  <span className="media-dropzone-hint">or drag & drop here</span>
                </>
              )}
            </p>
          )}
        </div>

        {noteMsg && <p className="media-dropzone-note">{noteMsg}</p>}

        {/* {combinedError && (
          <p className="media-dropzone-error">{combinedError}</p>
        )} */}

        {fileName?.key && (
          <div className="media-dropzone-file-preview">
            <Icon icon="mdi:file-document-outline" className="file-preview-icon" />
            <span className="file-preview-name">{fileName.name}</span>
            <button
              type="button"
              className="file-preview-remove"
              onClick={() => handleRemove(fileName.key)}
              aria-label="Remove file"
            >
              <Icon icon="mdi:close-circle" />
            </button>
          </div>
        )}
      </div>
    </Field>
  );
}
