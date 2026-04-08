import React from "react";
import { Form } from "react-bootstrap";
import Field from "../Field/Field";
import "./TextArea.css";

const TextArea = ({
    label,
    placeholder,
    required = false,
    value,
    onChange,
    name,
    className = "",
    rows = 3
}) => {
    return (
        <Field label={label} className={className}>
            <div className="glass-textarea-wrapper">
                <Form.Control
                    as="textarea"
                    rows={rows}
                    placeholder={placeholder}
                    className="form-control-textarea"
                    required={required}
                    value={value}
                    onChange={onChange}
                    name={name}
                />
            </div>
        </Field>
    );
};

export default TextArea;
