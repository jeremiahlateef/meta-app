import React, { useEffect, useRef } from "react";

/* Lists every error with a link to its field, and takes focus when it
   appears so the problems are read out first (WCAG 3.3.1, 3.3.3). */
export default function ErrorSummary({ errors, id = "error-summary" }) {
  const ref = useRef(null);
  useEffect(() => {
    if (errors.length && ref.current) ref.current.focus();
  }, [errors]);
  if (!errors.length) return null;
  return (
    <div className="error-summary" id={id} ref={ref} tabIndex={-1} role="group" aria-labelledby={`${id}-title`}>
      <h2 id={`${id}-title`}>There {errors.length === 1 ? "is a problem" : `are ${errors.length} problems`}</h2>
      <ul>
        {errors.map((err) => (
          <li key={err.id}>
            <a
              href={`#${err.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(err.id)?.focus();
              }}
            >
              {err.message}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
