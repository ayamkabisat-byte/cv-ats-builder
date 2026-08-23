import {
  ArrowDown, ArrowUp, Briefcase, Code, Eye, EyeOff, FileBadge, FolderOpen,
  GraduationCap, GripVertical, Layers3, Trash2, User, Users,
} from 'lucide-react';
import PhotoUpload from './PhotoUpload';
import { blankItems, DEFAULT_SECTION_ORDER, SECTION_LABELS } from '../data/defaults';

const inputClass = 'cvforge-input';
const smallInputClass = 'cvforge-input compact';

const FormSection = ({ icon: Icon, title, eyebrow, onAdd, children }) => (
  <section className="cvforge-card">
    <div className="px-5 py-4 border-b border-slate-200 flex justify-between items-center gap-3">
      <div>
        {eyebrow && <div className="text-[10px] uppercase tracking-[0.16em] font-semibold text-blue-600 mb-1">{eyebrow}</div>}
        <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2"><Icon size={17} className="text-slate-500" /> {title}</h2>
      </div>
      {onAdd && <button type="button" onClick={onAdd} className="text-xs font-semibold text-blue-700 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg">+ Tambah</button>}
    </div>
    <div className="p-5">{children}</div>
  </section>
);

const ItemCard = ({ onRemove, children }) => (
  <div className="relative p-4 bg-slate-50/80 border border-slate-200 rounded-xl pr-10 hover:border-slate-300 transition-colors">
    <button type="button" onClick={onRemove} className="absolute top-3 right-3 text-slate-400 hover:text-red-600" aria-label="Hapus item"><Trash2 size={15} /></button>
    {children}
  </div>
);

function StructureControls({ data, update }) {
  const order = Array.isArray(data.sectionOrder) && data.sectionOrder.length ? data.sectionOrder : DEFAULT_SECTION_ORDER;
  const hidden = Array.isArray(data.hiddenSections) ? data.hiddenSections : [];

  const move = (index, delta) => {
    const next = [...order];
    const target = index + delta;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    update('sectionOrder', next);
  };

  const toggle = (key) => update('hiddenSections', hidden.includes(key) ? hidden.filter((x) => x !== key) : [...hidden, key]);

  return (
    <FormSection icon={Layers3} title="CV Structure" eyebrow="Layout control">
      <p className="text-xs text-slate-500 mb-3">Atur prioritas section. Tombol mata menyembunyikan section dari CV tanpa menghapus datanya.</p>
      <div className="space-y-1.5">
        {order.map((key, index) => {
          const isHidden = hidden.includes(key);
          return (
            <div key={key} className={`flex items-center gap-2 rounded-lg border px-2.5 py-2 ${isHidden ? 'bg-slate-50 border-slate-200 opacity-60' : 'bg-white border-slate-200'}`}>
              <GripVertical size={14} className="text-slate-300" />
              <span className="flex-1 text-xs font-semibold text-slate-700">{SECTION_LABELS[key] || key}</span>
              <button type="button" className="mini-icon-btn" onClick={() => move(index, -1)} disabled={index === 0} aria-label="Naikkan section"><ArrowUp size={13} /></button>
              <button type="button" className="mini-icon-btn" onClick={() => move(index, 1)} disabled={index === order.length - 1} aria-label="Turunkan section"><ArrowDown size={13} /></button>
              <button type="button" className="mini-icon-btn" onClick={() => toggle(key)} aria-label={isHidden ? 'Tampilkan section' : 'Sembunyikan section'}>{isHidden ? <EyeOff size={13} /> : <Eye size={13} />}</button>
            </div>
          );
        })}
      </div>
    </FormSection>
  );
}

export default function EditorV2({ data, update, updatePersonalInfo, updateItem, addItem, removeItem }) {
  const summaryLength = String(data.summary || '').length;

  return (
    <div className="space-y-4 print:hidden pb-12">
      <FormSection icon={User} title="Profile & Target Role" eyebrow="Start here">
        <PhotoUpload photo={data.photo} onPhotoChange={(p) => update('photo', p)} />
        <div className="grid sm:grid-cols-2 gap-3 mt-4">
          <div className="sm:col-span-2">
            <label className="cvforge-label">Nama Lengkap</label>
            <input value={data.personalInfo.fullName || ''} onChange={(e) => updatePersonalInfo('fullName', e.target.value)} className={inputClass} placeholder="Nama Lengkap" />
          </div>
          <div className="sm:col-span-2">
            <label className="cvforge-label">Professional Headline / Target Role</label>
            <input value={data.personalInfo.headline || ''} onChange={(e) => updatePersonalInfo('headline', e.target.value)} className={inputClass} placeholder="Frontend Engineer · React · Design Systems" />
            <p className="cvforge-help">Gunakan jabatan target + 1–2 spesialisasi utama.</p>
          </div>
          <div><label className="cvforge-label">Email</label><input type="email" value={data.personalInfo.email || ''} onChange={(e) => updatePersonalInfo('email', e.target.value)} className={inputClass} placeholder="nama@email.com" /></div>
          <div><label className="cvforge-label">Telepon</label><input type="tel" value={data.personalInfo.phone || ''} onChange={(e) => updatePersonalInfo('phone', e.target.value)} className={inputClass} placeholder="+62 ..." /></div>
          <div><label className="cvforge-label">Lokasi</label><input value={data.personalInfo.location || ''} onChange={(e) => updatePersonalInfo('location', e.target.value)} className={inputClass} placeholder="Jakarta, Indonesia" /></div>
          <div><label className="cvforge-label">LinkedIn</label><input value={data.personalInfo.linkedin || ''} onChange={(e) => updatePersonalInfo('linkedin', e.target.value)} className={inputClass} placeholder="linkedin.com/in/..." /></div>
          <div><label className="cvforge-label">Portfolio / GitHub</label><input value={data.personalInfo.github || ''} onChange={(e) => updatePersonalInfo('github', e.target.value)} className={inputClass} placeholder="github.com/..." /></div>
          <div><label className="cvforge-label">Website</label><input value={data.personalInfo.website || ''} onChange={(e) => updatePersonalInfo('website', e.target.value)} className={inputClass} placeholder="yourportfolio.com" /></div>
        </div>
        <div className="mt-4">
          <div className="flex justify-between items-center gap-2 mb-1.5"><label className="cvforge-label mb-0">Professional Summary</label><span className={`text-[10px] ${summaryLength > 500 ? 'text-amber-600 font-semibold' : 'text-slate-400'}`}>{summaryLength}/600</span></div>
          <textarea value={data.summary || ''} onChange={(e) => update('summary', e.target.value)} rows="4" maxLength={600} className={inputClass} placeholder="3–4 kalimat: role, pengalaman, domain, dan dampak terukur utama..." />
        </div>
      </FormSection>

      <StructureControls data={data} update={update} />

      <FormSection icon={Briefcase} title="Pengalaman Kerja" eyebrow="Impact first" onAdd={() => addItem('experiences', blankItems.experiences)}>
        <div className="space-y-3">
          {!data.experiences?.length && <Empty text="Belum ada pengalaman kerja." />}
          {(data.experiences || []).map((item) => (
            <ItemCard key={item.id} onRemove={() => removeItem('experiences', item.id)}>
              <div className="grid sm:grid-cols-2 gap-2.5 mb-2.5">
                <input value={item.position || ''} onChange={(e) => updateItem('experiences', item.id, 'position', e.target.value)} className={smallInputClass} placeholder="Posisi / Jabatan" />
                <input value={item.company || ''} onChange={(e) => updateItem('experiences', item.id, 'company', e.target.value)} className={smallInputClass} placeholder="Perusahaan" />
                <input value={item.location || ''} onChange={(e) => updateItem('experiences', item.id, 'location', e.target.value)} className={smallInputClass} placeholder="Lokasi" />
                <div className="grid grid-cols-2 gap-2"><input value={item.startDate || ''} onChange={(e) => updateItem('experiences', item.id, 'startDate', e.target.value)} className={smallInputClass} placeholder="Jan 2022" /><input value={item.endDate || ''} onChange={(e) => updateItem('experiences', item.id, 'endDate', e.target.value)} className={smallInputClass} placeholder="Present" /></div>
              </div>
              <textarea value={item.description || ''} onChange={(e) => updateItem('experiences', item.id, 'description', e.target.value)} rows="4" className={smallInputClass} placeholder={'- Meningkatkan conversion rate sebesar 18% melalui...\n- Mengotomatisasi proses laporan dan menghemat 8 jam/minggu...'} />
              <p className="cvforge-help">Satu baris = satu bullet. Mulai dengan action verb dan tambahkan hasil terukur bila memungkinkan.</p>
            </ItemCard>
          ))}
        </div>
      </FormSection>

      <FormSection icon={FolderOpen} title="Proyek / Portfolio" onAdd={() => addItem('projects', blankItems.projects)}>
        <div className="space-y-3">
          {!data.projects?.length && <Empty text="Belum ada proyek." />}
          {(data.projects || []).map((item) => (
            <ItemCard key={item.id} onRemove={() => removeItem('projects', item.id)}>
              <div className="grid sm:grid-cols-2 gap-2.5 mb-2.5"><input value={item.name || ''} onChange={(e) => updateItem('projects', item.id, 'name', e.target.value)} className={smallInputClass} placeholder="Nama Proyek" /><input value={item.link || ''} onChange={(e) => updateItem('projects', item.id, 'link', e.target.value)} className={smallInputClass} placeholder="Link proyek" /></div>
              <textarea value={item.description || ''} onChange={(e) => updateItem('projects', item.id, 'description', e.target.value)} rows="3" className={smallInputClass} placeholder="Impact, teknologi, scope, atau hasil proyek..." />
            </ItemCard>
          ))}
        </div>
      </FormSection>

      <FormSection icon={GraduationCap} title="Pendidikan" onAdd={() => addItem('educations', blankItems.educations)}>
        <div className="space-y-3">
          {!data.educations?.length && <Empty text="Belum ada pendidikan." />}
          {(data.educations || []).map((item) => (
            <ItemCard key={item.id} onRemove={() => removeItem('educations', item.id)}>
              <div className="grid sm:grid-cols-2 gap-2.5">
                <input value={item.institution || ''} onChange={(e) => updateItem('educations', item.id, 'institution', e.target.value)} className={`sm:col-span-2 ${smallInputClass}`} placeholder="Institusi" />
                <input value={item.degree || ''} onChange={(e) => updateItem('educations', item.id, 'degree', e.target.value)} className={smallInputClass} placeholder="Gelar / Jurusan" />
                <input value={item.location || ''} onChange={(e) => updateItem('educations', item.id, 'location', e.target.value)} className={smallInputClass} placeholder="Lokasi" />
                <input value={item.graduationYear || ''} onChange={(e) => updateItem('educations', item.id, 'graduationYear', e.target.value)} className={smallInputClass} placeholder="Tahun Lulus" />
                <input value={item.gpa || ''} onChange={(e) => updateItem('educations', item.id, 'gpa', e.target.value)} className={smallInputClass} placeholder="IPK (opsional)" />
              </div>
            </ItemCard>
          ))}
        </div>
      </FormSection>

      <FormSection icon={FileBadge} title="Sertifikasi" onAdd={() => addItem('certifications', blankItems.certifications)}>
        <div className="space-y-3">
          {!data.certifications?.length && <Empty text="Belum ada sertifikasi." />}
          {(data.certifications || []).map((item) => (
            <ItemCard key={item.id} onRemove={() => removeItem('certifications', item.id)}>
              <div className="grid sm:grid-cols-2 gap-2.5">
                <input value={item.name || ''} onChange={(e) => updateItem('certifications', item.id, 'name', e.target.value)} className="sm:col-span-2 cvforge-input compact" placeholder="Nama Sertifikat" />
                <input value={item.issuer || ''} onChange={(e) => updateItem('certifications', item.id, 'issuer', e.target.value)} className={smallInputClass} placeholder="Penerbit" />
                <input value={item.year || ''} onChange={(e) => updateItem('certifications', item.id, 'year', e.target.value)} className={smallInputClass} placeholder="Tahun" />
                <input value={item.link || ''} onChange={(e) => updateItem('certifications', item.id, 'link', e.target.value)} className="sm:col-span-2 cvforge-input compact" placeholder="Credential URL / link sertifikat (opsional)" />
              </div>
            </ItemCard>
          ))}
        </div>
      </FormSection>

      <FormSection icon={Users} title="Organisasi / Magang" onAdd={() => addItem('organizations', blankItems.organizations)}>
        <div className="space-y-3">
          {!data.organizations?.length && <Empty text="Belum ada organisasi atau magang." />}
          {(data.organizations || []).map((item) => (
            <ItemCard key={item.id} onRemove={() => removeItem('organizations', item.id)}>
              <div className="grid sm:grid-cols-2 gap-2.5 mb-2.5"><input value={item.role || ''} onChange={(e) => updateItem('organizations', item.id, 'role', e.target.value)} className={smallInputClass} placeholder="Peran / Jabatan" /><input value={item.organization || ''} onChange={(e) => updateItem('organizations', item.id, 'organization', e.target.value)} className={smallInputClass} placeholder="Organisasi" /></div>
              <input value={item.period || ''} onChange={(e) => updateItem('organizations', item.id, 'period', e.target.value)} className={`${smallInputClass} mb-2.5`} placeholder="Periode" />
              <textarea value={item.description || ''} onChange={(e) => updateItem('organizations', item.id, 'description', e.target.value)} rows="3" className={smallInputClass} placeholder="Kontribusi dan hasil..." />
            </ItemCard>
          ))}
        </div>
      </FormSection>

      <FormSection icon={Code} title="Skills & Languages" eyebrow="Keyword bank">
        <div className="space-y-4">
          <div><label className="cvforge-label">Skills · pisahkan dengan koma</label><textarea value={data.skills || ''} onChange={(e) => update('skills', e.target.value)} rows="3" className={inputClass} placeholder="JavaScript, React, TypeScript, REST API, Git..." /></div>
          <div><label className="cvforge-label">Bahasa · pisahkan dengan koma</label><textarea value={data.languages || ''} onChange={(e) => update('languages', e.target.value)} rows="2" className={inputClass} placeholder="Bahasa Indonesia (Native), English (Professional Working)" /></div>
        </div>
      </FormSection>
    </div>
  );
}

const Empty = ({ text }) => <div className="text-xs text-slate-400 italic text-center py-5 border border-dashed border-slate-200 rounded-xl">{text} Klik “+ Tambah”.</div>;
