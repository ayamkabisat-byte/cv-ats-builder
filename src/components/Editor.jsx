import {
  User, Briefcase, GraduationCap, Code, FolderOpen, Users, FileBadge, Trash2,
} from 'lucide-react';
import PhotoUpload from './PhotoUpload';
import { blankItems } from '../data/defaults';

/**
 * Reusable wrapper untuk satu section form.
 * Kalau onAdd tersedia, render tombol "+ Tambah" di header.
 */
const FormSection = ({ icon: Icon, title, onAdd, children }) => (
  <section className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
    <div className="flex justify-between items-center mb-3 border-b pb-2">
      <h2 className="text-md font-bold flex items-center gap-2">
        <Icon size={18} aria-hidden="true" /> {title}
      </h2>
      {onAdd && (
        <button
          type="button"
          onClick={onAdd}
          className="text-xs text-blue-600 hover:text-blue-800 font-medium"
        >
          + Tambah
        </button>
      )}
    </div>
    {children}
  </section>
);

/**
 * Wrapper satu item dalam list (experience, project, dst.)
 * Otomatis menyediakan tombol hapus di pojok kanan atas.
 */
const ItemCard = ({ onRemove, children }) => (
  <div className="relative p-3 bg-gray-50 border rounded-lg pr-8">
    <button
      type="button"
      onClick={onRemove}
      className="absolute top-2 right-2 text-red-500 hover:text-red-700 transition-colors"
      aria-label="Hapus item"
    >
      <Trash2 size={14} />
    </button>
    {children}
  </div>
);

const inputClass = 'w-full p-2 border rounded-md text-sm outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-colors';
const smallInputClass = 'w-full p-1.5 border rounded text-sm outline-none focus:ring-1 focus:ring-blue-200 focus:border-blue-400 transition-colors';

export default function Editor({
  data, update, updatePersonalInfo, updateItem, addItem, removeItem,
}) {
  const summaryLength = (data.summary || '').length;

  return (
    <div className="w-full lg:w-1/2 space-y-6 print:hidden lg:h-[calc(100vh-120px)] lg:overflow-y-auto pr-2 pb-10">

      {/* ---------- Info Pribadi & Foto ---------- */}
      <FormSection icon={User} title="Info Pribadi & Foto">
        <PhotoUpload photo={data.photo} onPhotoChange={(p) => update('photo', p)} />

        <div className="grid grid-cols-2 gap-3">
          <input
            type="text"
            value={data.personalInfo.fullName}
            onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
            placeholder="Nama Lengkap"
            aria-label="Nama Lengkap"
            className={inputClass}
          />
          <input
            type="tel"
            value={data.personalInfo.phone}
            onChange={(e) => updatePersonalInfo('phone', e.target.value)}
            placeholder="Nomor Telepon"
            aria-label="Nomor Telepon"
            className={inputClass}
          />
          <input
            type="email"
            value={data.personalInfo.email}
            onChange={(e) => updatePersonalInfo('email', e.target.value)}
            placeholder="Email"
            aria-label="Email"
            className={inputClass}
          />
          <input
            type="text"
            value={data.personalInfo.location}
            onChange={(e) => updatePersonalInfo('location', e.target.value)}
            placeholder="Kota, Negara"
            aria-label="Lokasi (Kota, Negara)"
            className={inputClass}
          />
          <input
            type="text"
            value={data.personalInfo.linkedin}
            onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
            placeholder="URL LinkedIn"
            aria-label="URL LinkedIn"
            className={inputClass}
          />
          <input
            type="text"
            value={data.personalInfo.github}
            onChange={(e) => updatePersonalInfo('github', e.target.value)}
            placeholder="URL Portfolio / GitHub"
            aria-label="URL Portfolio atau GitHub"
            className={inputClass}
          />
        </div>

        <div className="mt-3">
          <textarea
            value={data.summary}
            onChange={(e) => update('summary', e.target.value)}
            rows="3"
            placeholder="Ringkasan Profesional (3-4 kalimat)"
            aria-label="Ringkasan Profesional"
            maxLength={600}
            className={inputClass}
          />
          <div className="flex justify-end mt-1">
            <span className={`text-[10px] ${summaryLength > 500 ? 'text-orange-600 font-medium' : 'text-gray-500'}`}>
              {summaryLength}/600 karakter
            </span>
          </div>
        </div>
      </FormSection>

      {/* ---------- Pengalaman Kerja ---------- */}
      <FormSection
        icon={Briefcase}
        title="Pengalaman Kerja"
        onAdd={() => addItem('experiences', blankItems.experiences)}
      >
        <div className="space-y-4">
          {data.experiences.length === 0 && (
            <p className="text-xs text-gray-400 italic text-center py-4">Belum ada pengalaman kerja. Klik &quot;+ Tambah&quot;.</p>
          )}
          {data.experiences.map((item) => (
            <ItemCard key={item.id} onRemove={() => removeItem('experiences', item.id)}>
              <div className="grid grid-cols-2 gap-2 mb-2">
                <input type="text" value={item.position} onChange={(e) => updateItem('experiences', item.id, 'position', e.target.value)} placeholder="Posisi" aria-label="Posisi" className={smallInputClass} />
                <input type="text" value={item.company} onChange={(e) => updateItem('experiences', item.id, 'company', e.target.value)} placeholder="Perusahaan" aria-label="Perusahaan" className={smallInputClass} />
                <input type="text" value={item.location} onChange={(e) => updateItem('experiences', item.id, 'location', e.target.value)} placeholder="Lokasi" aria-label="Lokasi pekerjaan" className={smallInputClass} />
                <div className="grid grid-cols-2 gap-1">
                  <input type="text" value={item.startDate} onChange={(e) => updateItem('experiences', item.id, 'startDate', e.target.value)} placeholder="Mulai" aria-label="Tanggal mulai" className={smallInputClass} />
                  <input type="text" value={item.endDate} onChange={(e) => updateItem('experiences', item.id, 'endDate', e.target.value)} placeholder="Selesai" aria-label="Tanggal selesai" className={smallInputClass} />
                </div>
              </div>
              <textarea
                value={item.description}
                onChange={(e) => updateItem('experiences', item.id, 'description', e.target.value)}
                rows="3"
                placeholder="Deskripsi (gunakan - di awal baris untuk bullet)"
                aria-label="Deskripsi pengalaman kerja"
                className={smallInputClass}
              />
            </ItemCard>
          ))}
        </div>
      </FormSection>

      {/* ---------- Pendidikan ---------- */}
      <FormSection
        icon={GraduationCap}
        title="Pendidikan"
        onAdd={() => addItem('educations', blankItems.educations)}
      >
        <div className="space-y-4">
          {data.educations.length === 0 && (
            <p className="text-xs text-gray-400 italic text-center py-4">Belum ada riwayat pendidikan.</p>
          )}
          {data.educations.map((item) => (
            <ItemCard key={item.id} onRemove={() => removeItem('educations', item.id)}>
              <div className="grid grid-cols-2 gap-2">
                <input type="text" value={item.institution} onChange={(e) => updateItem('educations', item.id, 'institution', e.target.value)} placeholder="Nama Institusi" aria-label="Nama institusi" className={`col-span-2 ${smallInputClass}`} />
                <input type="text" value={item.degree} onChange={(e) => updateItem('educations', item.id, 'degree', e.target.value)} placeholder="Gelar / Jurusan" aria-label="Gelar atau jurusan" className={smallInputClass} />
                <input type="text" value={item.location} onChange={(e) => updateItem('educations', item.id, 'location', e.target.value)} placeholder="Lokasi" aria-label="Lokasi institusi" className={smallInputClass} />
                <input type="text" value={item.graduationYear} onChange={(e) => updateItem('educations', item.id, 'graduationYear', e.target.value)} placeholder="Tahun Lulus" aria-label="Tahun lulus" className={smallInputClass} />
                {/* FIX: Input GPA sebelumnya hilang meski state & template membutuhkannya */}
                <input type="text" value={item.gpa} onChange={(e) => updateItem('educations', item.id, 'gpa', e.target.value)} placeholder="IPK (opsional, mis: 3.85)" aria-label="IPK" className={smallInputClass} />
              </div>
            </ItemCard>
          ))}
        </div>
      </FormSection>

      {/* ---------- Sertifikasi ---------- */}
      <FormSection
        icon={FileBadge}
        title="Sertifikasi"
        onAdd={() => addItem('certifications', blankItems.certifications)}
      >
        <div className="space-y-4">
          {data.certifications.length === 0 && (
            <p className="text-xs text-gray-400 italic text-center py-4">Belum ada sertifikasi.</p>
          )}
          {data.certifications.map((item) => (
            <ItemCard key={item.id} onRemove={() => removeItem('certifications', item.id)}>
              <div className="grid grid-cols-2 gap-2">
                <input type="text" value={item.name} onChange={(e) => updateItem('certifications', item.id, 'name', e.target.value)} placeholder="Nama Sertifikat" aria-label="Nama sertifikat" className={`col-span-2 ${smallInputClass}`} />
                <input type="text" value={item.issuer} onChange={(e) => updateItem('certifications', item.id, 'issuer', e.target.value)} placeholder="Institusi Penerbit" aria-label="Institusi penerbit sertifikat" className={smallInputClass} />
                <input type="text" value={item.year} onChange={(e) => updateItem('certifications', item.id, 'year', e.target.value)} placeholder="Tahun" aria-label="Tahun sertifikasi" className={smallInputClass} />
              </div>
            </ItemCard>
          ))}
        </div>
      </FormSection>

      {/* ---------- Proyek (Portofolio) ---------- */}
      <FormSection
        icon={FolderOpen}
        title="Proyek (Portofolio)"
        onAdd={() => addItem('projects', blankItems.projects)}
      >
        <div className="space-y-4">
          {data.projects.length === 0 && (
            <p className="text-xs text-gray-400 italic text-center py-4">Belum ada proyek.</p>
          )}
          {data.projects.map((item) => (
            <ItemCard key={item.id} onRemove={() => removeItem('projects', item.id)}>
              <div className="grid grid-cols-2 gap-2 mb-2">
                <input type="text" value={item.name} onChange={(e) => updateItem('projects', item.id, 'name', e.target.value)} placeholder="Nama Proyek" aria-label="Nama proyek" className={smallInputClass} />
                <input type="text" value={item.link} onChange={(e) => updateItem('projects', item.id, 'link', e.target.value)} placeholder="Link Proyek (opsional)" aria-label="Link proyek" className={smallInputClass} />
              </div>
              <textarea
                value={item.description}
                onChange={(e) => updateItem('projects', item.id, 'description', e.target.value)}
                rows="3"
                placeholder="Deskripsi (gunakan - di awal baris untuk bullet)"
                aria-label="Deskripsi proyek"
                className={smallInputClass}
              />
            </ItemCard>
          ))}
        </div>
      </FormSection>

      {/* ---------- Organisasi / Magang ---------- */}
      <FormSection
        icon={Users}
        title="Organisasi / Magang"
        onAdd={() => addItem('organizations', blankItems.organizations)}
      >
        <div className="space-y-4">
          {data.organizations.length === 0 && (
            <p className="text-xs text-gray-400 italic text-center py-4">Belum ada riwayat organisasi/magang.</p>
          )}
          {data.organizations.map((item) => (
            <ItemCard key={item.id} onRemove={() => removeItem('organizations', item.id)}>
              <div className="grid grid-cols-2 gap-2 mb-2">
                <input type="text" value={item.role} onChange={(e) => updateItem('organizations', item.id, 'role', e.target.value)} placeholder="Peran / Jabatan" aria-label="Peran" className={smallInputClass} />
                <input type="text" value={item.organization} onChange={(e) => updateItem('organizations', item.id, 'organization', e.target.value)} placeholder="Nama Organisasi" aria-label="Nama organisasi" className={smallInputClass} />
              </div>
              <input
                type="text"
                value={item.period}
                onChange={(e) => updateItem('organizations', item.id, 'period', e.target.value)}
                placeholder="Periode (Misal: 2021 - 2022)"
                aria-label="Periode kegiatan"
                className={`mb-2 ${smallInputClass}`}
              />
              <textarea
                value={item.description}
                onChange={(e) => updateItem('organizations', item.id, 'description', e.target.value)}
                rows="2"
                placeholder="Deskripsi (gunakan - di awal baris untuk bullet)"
                aria-label="Deskripsi peran organisasi"
                className={smallInputClass}
              />
            </ItemCard>
          ))}
        </div>
      </FormSection>

      {/* ---------- Keahlian & Bahasa ---------- */}
      <FormSection icon={Code} title="Keahlian & Bahasa">
        <div className="space-y-3">
          <div>
            <label className="text-xs font-semibold text-gray-500" htmlFor="skills-input">
              Skills (Pisahkan dengan koma)
            </label>
            <textarea
              id="skills-input"
              value={data.skills}
              onChange={(e) => update('skills', e.target.value)}
              rows="2"
              className={`mt-1 ${inputClass}`}
              placeholder="JavaScript, React, Node.js, ..."
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500" htmlFor="languages-input">
              Bahasa (Pisahkan dengan koma)
            </label>
            <textarea
              id="languages-input"
              value={data.languages}
              onChange={(e) => update('languages', e.target.value)}
              rows="2"
              className={`mt-1 ${inputClass}`}
              placeholder="Bahasa Indonesia (Native), English (Professional Working), ..."
            />
          </div>
        </div>
      </FormSection>

    </div>
  );
}
