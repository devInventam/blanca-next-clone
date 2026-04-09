import React from "react";
import "./Checkbox.css";

const Checkbox = ({
    label,
    checked,
    onChange,
    required = false,
    className = "",
    name
}) => {
    return (
        <div className={`checkbox-group ${className}`}>
            <label className="checkbox-container">
                <input
                    type="checkbox"
                    name={name}
                    checked={checked}
                    onChange={onChange}
                    required={required}
                />
                <span className="checkmark"></span>
                {label}
            </label>
        </div>
    );
};

export default Checkbox;
