import React, { useState, useRef, useEffect } from "react";
import Field from "../Field/Field";
import "./Dropdown.css";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";

const Dropdown = ({
    label,
    options = [],
    required = false,
    value,
    onChange,
    name,
    className = "",
    placeholder
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const selectedOption = options.find(opt => {
        const optValue = typeof opt === 'object' ? opt.value : opt;
        return optValue === value;
    });

    const displayValue = selectedOption 
        ? (typeof selectedOption === 'object' ? selectedOption.label : selectedOption) 
        : placeholder;

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);

    const handleSelect = (option) => {
        const val = typeof option === 'object' ? option.value : option;
        // Mocking an event object for compatibility
        if (onChange) {
            onChange({ target: { name, value: val } });
        }
        setIsOpen(false);
    };

    return (
        <Field label={label} className={`${className} custom-dropdown-field`}>
            <div className={`custom-dropdown-container ${isOpen ? 'is-open' : ''}`} ref={dropdownRef}>
                <div 
                    className="glass-input-wrapper dropdown-trigger"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <div className={`trigger-text ${!selectedOption ? 'placeholder-text' : ''}`}>
                        {displayValue}
                    </div>
                    <Icon 
                        icon="lucide:chevron-down" 
                        className={`dropdown-arrow ${isOpen ? 'rotated' : ''}`} 
                    />
                </div>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div 
                            className="dropdown-menu-list-common"
                            initial={{ opacity: 0, y: -12, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -12, scale: 0.98 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                        >
                            <div className="menu-scroll-container">
                                {options.map((option, index) => {
                                    const optValue = typeof option === 'object' ? option.value : option;
                                    const optLabel = typeof option === 'object' ? option.label : option;
                                    const isSelected = optValue === value;
                                    
                                    return (
                                        <div 
                                            key={index}
                                            className={`dropdown-item-common ${isSelected ? 'selected' : ''}`}
                                            onClick={() => handleSelect(option)}
                                        >
                                            <span className="item-label">{optLabel}</span>
                                            {isSelected && <Icon icon="lucide:check" className="check-icon" />}
                                        </div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            {/* Hidden field for form submission if used in traditional ways */}
            <input type="hidden" name={name} value={value || ""} required={required} />
        </Field>
    );
};

export default Dropdown;
