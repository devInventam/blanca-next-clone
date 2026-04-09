import React from "react";
import Field from "../Field/Field";
import "./RadioGroup.css";

const RadioGroup = ({
    label,
    name,
    options = [],
    selectedValue,
    onChange,
    className = ""
}) => {
    return (
        <Field label={label} className={className}>
            <div className="radio-group">
                {options.map((option, index) => (
                    <label key={index} className="radio-container">
                        <input
                            type="radio"
                            name={name}
                            value={option.value || option}
                            checked={selectedValue === (option.value || option)}
                            onChange={onChange}
                        />
                        <span className="checkmark"></span>
                        {option.label || option}
                    </label>
                ))}
            </div>
        </Field>
    );
};

export default RadioGroup;
