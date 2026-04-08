/* eslint-disable no-useless-escape */
export const REGEX = {
    name: /^[A-Za-z]+$/,
    fullName: /^[A-Za-z]+(?:\s[A-Za-z]+)*$/,  
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone: /^\+?\s*(\d{1,4})?\s*(\(\d{2,5}\)|\d{2,5})[\s-]?\d{3}[\s-]?\d{4}$/,
    startingSpaceNotAllowed: /^(?!\s)/,
    gstin: /^(?!\s)(|[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}Z[A-Z0-9]{1})$/,
    pancard: /^(?!\s)(|[A-Z]{5}[0-9]{4}[A-Z]{1})$/,
  };
  