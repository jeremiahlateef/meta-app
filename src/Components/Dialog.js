import React, { useEffect, useRef } from "react";

/* A modal dialog built on the native <dialog> element.
   showModal() gives us, with no extra code: a focus trap, an inert page
   behind it, Escape to close, and focus returning to whatever opened it. */
export default function Dialog({ open, onClose, labelledBy, className = "", children }) {
  const ref = useRef(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return undefined;
    // Escape closes the native dialog; keep React state in step with it.
    dialog.addEventListener("close", onClose);
    return () => dialog.removeEventListener("close", onClose);
  }, [onClose]);

  return (
    <dialog
      ref={ref}
      className={`dialog ${className}`}
      aria-labelledby={labelledBy}
      onClick={(e) => {
        if (e.target === ref.current) onClose(); // click on the backdrop
      }}
    >
      {open ? children : null}
    </dialog>
  );
}
