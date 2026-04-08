import React from "react";
import { Icon } from "@iconify/react";
import Field from "../Field/Field";
import "./FileUpload.css";

const FileUpload = ({
    label,
    name,
    onChange,
    value,
    required = false,
    accept = ".pdf,.doc,.docx",
    placeholder = "Choose file (PDF, DOC, DOCX)",
    className = ""
}) => {
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (onChange) {
            onChange({ target: { name, value: file } });
        }
    };

    return (
        <Field label={label} className={`file-upload-field ${className}`}>
            <div className="file-upload-wrapper">
                <input
                    type="file"
                    name={name}
                    onChange={handleFileChange}
                    required={required}
                    className="hidden-file-input"
                    id={`file-upload-${name}`}
                    accept={accept}
                />
                <label htmlFor={`file-upload-${name}`} className="file-upload-label">
                    <Icon icon="lucide:upload-cloud" className="upload-icon" />
                    <span className="file-name">
                        {value ? value.name : placeholder}
                    </span>
                </label>
            </div>
        </Field>
    );
};

export default FileUpload;
