import React from "react";
import { Form } from "react-bootstrap";
import "./Field.css";

const Field = ({ label, children, className = "" }) => {
    return (
        <Form.Group className={`form-group-new ${className}`}>
            {label && <Form.Label>{label}</Form.Label>}
            {children}
        </Form.Group>
    );
};

export default Field;
