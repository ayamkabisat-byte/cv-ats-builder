import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook untuk mempersist state ke localStorage.
 *
 * - Saat mount: baca dari localStorage, fallback ke initialValue jika belum ada / corrupt.
 * - Saat value berubah: tulis ke localStorage (debounced 300ms agar tidak thrashing
 *   saat user mengetik di textarea).
 * - Aman dari quota exceeded & access errors (mis. private mode Safari).
 *
 * Catatan: hanya gunakan untuk data yang serializable (JSON-safe).
 */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    if (typeof window === 'undefined') return initialValue;
    try {
      const stored = window.localStorage.getItem(key);
      if (stored === null) return initialValue;
      const parsed = JSON.parse(stored);
      // Merge dengan initialValue agar field baru di defaults tidak hilang
      // saat user punya cache versi lama dengan shape lebih kecil.
      if (
        parsed &&
        typeof parsed === 'object' &&
        !Array.isArray(parsed) &&
        initialValue &&
        typeof initialValue === 'object'
      ) {
        return { ...initialValue, ...parsed };
      }
      return parsed;
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
        // Quota exceeded, private mode, dsb. Tidak fatal — state masih hidup di memory.
        console.warn(`useLocalStorage: gagal menulis "${key}".`, err);
      }
    }, 300);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [key, value]);

  return [value, setValue];
}
