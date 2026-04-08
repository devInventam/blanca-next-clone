import React, { useState, useEffect, useRef, useMemo } from "react";
import { Form } from "react-bootstrap";
import Field from "../Field/Field";
import "../InputField/Input.css";
import "./PhoneInput.css";
import { Country } from "country-state-city";

const PhoneInput = ({
    label,
    placeholder = "XXXXXXXXX",
    required = false,
    value,
    onChange,
    name,
    className = "",
    selectedCountryCode,
    onCountryChange,
}) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const countries = useMemo(
        () =>
            Country.getAllCountries().map((c) => ({
                name: c.name,
                isoCode: c.isoCode.toLowerCase(),
                flag: `https://flagcdn.com/w20/${c.isoCode.toLowerCase()}.png`,
                code: `+${c.phonecode}`,
            })),
        []
    );

    const [selectedCountry, setSelectedCountry] = useState(() => {
        const india = countries.find((c) => c.isoCode === "in");
        return (
            india || {
                name: "India",
                isoCode: "in",
                flag: "https://flagcdn.com/w20/in.png",
                code: "+91",
            }
        );
    });

    const wrapperRef = useRef(null);

    useEffect(() => {
        if (!selectedCountryCode) return;
        const match = countries.find(
            (c) => c.isoCode === selectedCountryCode.toLowerCase()
        );
        if (match) {
            setSelectedCountry(match);
        }
    }, [selectedCountryCode, countries]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleCountrySelect = (country) => {
        setSelectedCountry(country);
        if (onCountryChange) {
            onCountryChange(country.isoCode);
        }
        setShowDropdown(false);
    };

    return (
        <Field label={label} className={className}>
            <div
                ref={wrapperRef}
                className={`phone-input-wrapper glass-input-wrapper ${showDropdown ? "z-index-high overflow-visible" : ""}`}
            >
                <div className="country-code" onClick={() => setShowDropdown(!showDropdown)}>
                    <img
                        src={selectedCountry.flag}
                        alt={`${selectedCountry.name} Flag`}
                        className="selected-flag"
                    />
                    <i className="fa-solid fa-angle-down"></i>

                    <ul className={`country-dropdown ${showDropdown ? "show" : ""}`}>
                        {countries.map((country) => (
                            <li
                                key={country.name}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleCountrySelect(country);
                                }}
                            >
                                <img src={country.flag} alt={country.name} /> {country.name}
                            </li>
                        ))}
                    </ul>
                </div>

                <Form.Control
                    type="text"
                    placeholder={placeholder}
                    className="form-control-new"
                    required={required}
                    value={value}
                    onChange={onChange}
                    name={name}
                />
            </div>
        </Field>
    );
};

export default PhoneInput;
