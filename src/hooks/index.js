import { useEffect, useState } from "react";

/* Sets the document title for the page. Screen readers announce it on load
   and browsers list it in history and tabs (WCAG 2.4.2). */
export function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | Metabnb` : "Metabnb | Rent a place in the metaverse";
  }, [title]);
}

/* localStorage that never throws (private windows, blocked storage). */
export function useStoredState(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const raw = window.localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initial;
    } catch (e) {
      return initial;
    }
  });
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      /* keep working in memory */
    }
  }, [key, value]);
  return [value, setValue];
}

/* Returns a value that only changes after the input has settled. Used so a
   live region is not read out on every key press. */
export function useDebounced(value, delay = 350) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = window.setTimeout(() => setDebounced(value), delay);
    return () => window.clearTimeout(t);
  }, [value, delay]);
  return debounced;
}
