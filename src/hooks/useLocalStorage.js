import { useState, useEffect, useRef } from 'react';

function isPlainObject(value) {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function deepMerge(base, incoming) {
  if (!isPlainObject(base) || !isPlainObject(incoming)) return incoming ?? base;
  const out = { ...base };
  Object.keys(incoming).forEach((key) => {
    if (isPlainObject(base[key]) && isPlainObject(incoming[key])) out[key] = deepMerge(base[key], incoming[key]);
    else out[key] = incoming[key];
  });
  return out;
}

/**
 * Persistent local state with:
 * - debounced writes
 * - deep merge against defaults, so nested new fields survive migration
 * - optional legacy storage keys (first valid match wins)
 */
export function useLocalStorage(key, initialValue, legacyKeys = []) {
  const [value, setValue] = useState(() => {
    if (typeof window === 'undefined') return initialValue;
    try {
      const candidates = [key, ...legacyKeys];
      for (const candidate of candidates) {
        const stored = window.localStorage.getItem(candidate);
        if (stored === null) continue;
        const parsed = JSON.parse(stored);
        return isPlainObject(initialValue) && isPlainObject(parsed)
          ? deepMerge(initialValue, parsed)
          : parsed;
      }
      return initialValue;
    } catch (err) {
      console.warn(`useLocalStorage: gagal membaca "${key}", pakai default.`, err);
      return initialValue;
    }
  });

  const timeoutRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      try {
        window.localStorage.setItem(key, JSON.stringify(value));
      } catch (err) {
        console.warn(`useLocalStorage: gagal menulis "${key}".`, err);
      }
    }, 300);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [key, value]);

  return [value, setValue];
}
