"use client";

import React from "react";
import Link from "next/link";

const ThemeBtn = ({
  to,
  href,
  onClick,
  children,
  className = "",
  type = "button",
  ...props
}) => {
  const combinedClasses = `theme-btn ${className}`.trim();
  const dest = href ?? to;

  if (dest) {
    return (
      <Link href={dest} className={combinedClasses} {...props}>
        <span>{children}</span>
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={combinedClasses} {...props}>
      <span>{children}</span>
    </button>
  );
};

export default ThemeBtn;
