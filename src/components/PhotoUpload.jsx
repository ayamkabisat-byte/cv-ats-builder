import { User } from 'lucide-react';

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

/**
 * Foto profil uploader dengan:
 * - Validasi tipe file (hanya gambar JPG/PNG/WebP)
 * - Validasi ukuran maksimal (2MB) untuk mencegah base64 string raksasa di localStorage
 * - Auto-reset input value supaya re-upload file yang sama tetap trigger onChange
 * - Tombol hapus terpisah
 */
export default function PhotoUpload({ photo, onPhotoChange }) {
  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset value dulu supaya kalau user upload file yang sama lagi, onChange tetap trigger.
    const inputEl = e.target;

    if (!ACCEPTED_TYPES.includes(file.type)) {
      window.alert('File harus berupa gambar JPG, PNG, atau WebP.');
      inputEl.value = '';
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      window.alert('Ukuran file terlalu besar. Maksimal 2MB.');
      inputEl.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      onPhotoChange(reader.result);
      inputEl.value = '';
    };
    reader.onerror = () => {
      window.alert('Gagal membaca file. Coba lagi atau pilih file lain.');
      inputEl.value = '';
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex items-center gap-4 mb-4">
      <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center shrink-0">
        {photo ? (
          <img
            src={photo}
            alt="Foto profil"
            className="w-full h-full object-cover"
          />
        ) : (
          <User size={32} className="text-gray-400" aria-hidden="true" />
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label className="cursor-pointer bg-blue-50 text-blue-600 text-xs px-3 py-1.5 rounded border border-blue-200 hover:bg-blue-100 transition-colors w-fit">
          {photo ? 'Ganti Foto' : 'Upload Foto'}
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleChange}
            className="hidden"
            aria-label="Upload foto profil"
          />
        </label>
        <span className="text-[10px] text-gray-500">JPG/PNG/WebP, maks 2MB</span>
        {photo && (
          <button
            type="button"
            onClick={() => onPhotoChange(null)}
            className="text-red-500 text-xs hover:underline w-fit"
          >
            Hapus foto
          </button>
        )}
      </div>
    </div>
  );
}
