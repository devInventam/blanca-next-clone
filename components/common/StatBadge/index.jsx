import React from 'react';
import './statbadge.css';

const StatBadge = ({ count, text, className = "" }) => {
    return (
        <div className={`hero-stat-box ${className}`}>
            <div className="stat-number" data-count={count}>0</div>
            <div className="stat-text">{text}</div>
        </div>
    );
};

export default StatBadge;
