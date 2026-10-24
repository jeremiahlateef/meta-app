import React from "react";

const base = { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false" };

export const HeartIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M12 20.5s-7.5-4.6-9.2-9.4C1.7 7.9 3.6 4.5 7 4.5c2 0 3.5 1.1 5 3 1.5-1.9 3-3 5-3 3.4 0 5.3 3.4 4.2 6.6-1.7 4.8-9.2 9.4-9.2 9.4z" />
  </svg>
);
export const MenuIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);
export const CloseIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);
export const StarIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z" />
  </svg>
);
export const ArrowIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M9 5l7 7-7 7" />
  </svg>
);
