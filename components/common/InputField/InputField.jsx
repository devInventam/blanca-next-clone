import React from "react";
import { Form } from "react-bootstrap";
import Field from "../Field/Field";
import "./Input.css";

const InputField = ({
    label,
    type = "text",
    placeholder,
    required = false,
    value,
    onChange,
    name,
    className = "",
    as,
    rows,
    extra
}) => {
    return (
        <Field label={label} className={className}>
            <div className="glass-input-wrapper d-flex">
                <Form.Control
                    type={type}
                    placeholder={placeholder}
                    className="form-control-new"
                    required={required}
                    value={value}
                    onChange={onChange}
                    name={name}
                    as={as}
                    rows={rows}
                />
                {extra && extra}
            </div>
        </Field>
    );
};

export default InputField;
