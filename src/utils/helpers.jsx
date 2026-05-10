// Utility helpers — pure functions plus satu kecil JSX helper untuk render bullets.

/**
 * Hapus protocol & www dari URL untuk display di template CV.
 * Handle baik http:// maupun https://, dengan atau tanpa www.
 */
export const normalizeUrl = (url) => {
  if (!url) return '';
  return url.replace(/^https?:\/\/(www\.)?/i, '').replace(/\/$/, '');
};

/**
 * Generate ID unik. crypto.randomUUID kalau ada (modern browser),
 * fallback ke timestamp + random string untuk lingkungan lama.
 */
export const generateId = () => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `id-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
};

/**
 * Parse comma-separated string menjadi array of trimmed non-empty strings.
 * Mencegah trailing comma menghasilkan badge kosong.
 */
export const parseList = (str) => {
  if (!str || typeof str !== 'string') return [];
  return str
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
};

/**
 * Render multi-line text sebagai unordered list.
 * Setiap baris jadi satu <li>. Marker bullet (-, *, •) di awal otomatis dihapus.
 *
 * @param {string} text - raw text dengan newline separator
 * @param {boolean} isCreative - true untuk warna teks Creative template (lebih lembut)
 */
export const renderBullets = (text, isCreative = false) => {
  if (!text) return null;
  const lines = text
    .split('\n')
    .map((line) => line.replace(/^[-*•]\s*/, '').trim())
    .filter((line) => line.length > 0);

  if (lines.length === 0) return null;

  const colorClass = isCreative ? 'text-gray-600' : 'text-gray-800';

  return (
    <ul className={`list-disc list-outside ml-4 mt-1 space-y-0.5 ${colorClass}`}>
      {lines.map((line, idx) => (
        <li key={idx} className="text-[10pt] leading-tight">
          {line}
        </li>
      ))}
    </ul>
  );
};
