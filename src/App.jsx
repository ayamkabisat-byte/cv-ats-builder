import React, { useState } from 'react';
import { 
  Printer, Plus, Trash2, Briefcase, GraduationCap, 
  User, Code, Mail, Phone, MapPin, Globe, LayoutTemplate, 
  FileText, Palette, Award, FolderOpen, Users, Languages, FileBadge
} from 'lucide-react';

// Konfigurasi Palet Warna 
const colorPalettes = {
  blue: {
    name: 'Classic Blue', preview: 'bg-blue-600', sidebarBg: 'bg-[#1e293b]', sidebarBorderRight: 'border-blue-500', iconContact: 'text-blue-400', sectionTitleLeft: 'text-blue-300', skillBadge: 'bg-slate-700 border-slate-600 text-slate-200', iconMain: 'text-blue-600', dividerBg: 'bg-blue-100', dividerFill: 'bg-blue-600', timelineBorder: 'border-blue-200', timelineDot: 'bg-blue-600', textAccent: 'text-blue-600',
  },
  monochrome: {
    name: 'Monochrome', preview: 'bg-zinc-700', sidebarBg: 'bg-[#18181b]', sidebarBorderRight: 'border-zinc-500', iconContact: 'text-zinc-400', sectionTitleLeft: 'text-zinc-300', skillBadge: 'bg-zinc-800 border-zinc-700 text-zinc-200', iconMain: 'text-zinc-700', dividerBg: 'bg-zinc-200', dividerFill: 'bg-zinc-700', timelineBorder: 'border-zinc-300', timelineDot: 'bg-zinc-700', textAccent: 'text-zinc-700',
  },
  nature: {
    name: 'Nature Green', preview: 'bg-emerald-600', sidebarBg: 'bg-[#064e3b]', sidebarBorderRight: 'border-emerald-500', iconContact: 'text-emerald-400', sectionTitleLeft: 'text-emerald-300', skillBadge: 'bg-emerald-800 border-emerald-700 text-emerald-100', iconMain: 'text-emerald-600', dividerBg: 'bg-emerald-100', dividerFill: 'bg-emerald-600', timelineBorder: 'border-emerald-200', timelineDot: 'bg-emerald-600', textAccent: 'text-emerald-600',
  },
  autumn: {
    name: 'Autumn Warm', preview: 'bg-orange-600', sidebarBg: 'bg-[#451a03]', sidebarBorderRight: 'border-orange-500', iconContact: 'text-orange-400', sectionTitleLeft: 'text-orange-300', skillBadge: 'bg-orange-900 border-orange-800 text-orange-100', iconMain: 'text-orange-600', dividerBg: 'bg-orange-100', dividerFill: 'bg-orange-600', timelineBorder: 'border-orange-200', timelineDot: 'bg-orange-600', textAccent: 'text-orange-600',
  },
  lavender: {
    name: 'Soft Lavender', preview: 'bg-indigo-400', sidebarBg: 'bg-[#312e81]', sidebarBorderRight: 'border-indigo-400', iconContact: 'text-indigo-300', sectionTitleLeft: 'text-indigo-200', skillBadge: 'bg-indigo-800 border-indigo-700 text-indigo-100', iconMain: 'text-indigo-500', dividerBg: 'bg-indigo-100', dividerFill: 'bg-indigo-500', timelineBorder: 'border-indigo-200', timelineDot: 'bg-indigo-500', textAccent: 'text-indigo-600',
  },
  rose: {
    name: 'Rose Gold', preview: 'bg-rose-400', sidebarBg: 'bg-[#4c1d95]', sidebarBorderRight: 'border-rose-400', iconContact: 'text-rose-300', sectionTitleLeft: 'text-rose-200', skillBadge: 'bg-violet-800 border-violet-700 text-rose-100', iconMain: 'text-rose-600', dividerBg: 'bg-rose-100', dividerFill: 'bg-rose-500', timelineBorder: 'border-rose-200', timelineDot: 'bg-rose-500', textAccent: 'text-rose-600',
  },
  cyber: {
    name: 'Cyber Neon', preview: 'bg-cyan-400', sidebarBg: 'bg-[#0f172a]', sidebarBorderRight: 'border-cyan-400', iconContact: 'text-cyan-300', sectionTitleLeft: 'text-cyan-200', skillBadge: 'bg-slate-800 border-slate-700 text-cyan-300', iconMain: 'text-cyan-600', dividerBg: 'bg-slate-200', dividerFill: 'bg-cyan-500', timelineBorder: 'border-slate-300', timelineDot: 'bg-cyan-500', textAccent: 'text-cyan-700',
  }
};

const App = () => {
  const [template, setTemplate] = useState('ats');
  const [theme, setTheme] = useState('blue');
  const [photo, setPhoto] = useState(null);

  const [personalInfo, setPersonalInfo] = useState({
    fullName: 'Budi Santoso', phone: '0812-3456-7890', email: 'budi.santoso@email.com', location: 'Jakarta, Indonesia', linkedin: 'linkedin.com/in/budisantoso', github: 'github.com/budisantoso'
  });

  const [summary, setSummary] = useState(
    'Software Engineer dengan pengalaman lebih dari 3 tahun dalam mengembangkan aplikasi web yang scalable. Berpengalaman memimpin tim kecil dan meningkatkan performa aplikasi sebesar 30%.'
  );

  const [experiences, setExperiences] = useState([
    { id: 1, company: 'PT Maju Mundur Teknologi', position: 'Frontend Developer', location: 'Jakarta', startDate: 'Jan 2021', endDate: 'Present', description: '- Mengembangkan UI responsif menggunakan React\n- Mengintegrasikan RESTful API untuk dashboard' }
  ]);

  const [internships, setInternships] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [projects, setProjects] = useState([]);
  
  const [educations, setEducations] = useState([
    { id: 1, institution: 'Universitas Teknologi Indonesia', degree: 'S1 Teknik Informatika', location: 'Bandung', graduationYear: '2020', gpa: '3.85' }
  ]);

  const [certifications, setCertifications] = useState([
    { id: 1, name: 'AWS Certified Solutions Architect', issuer: 'Amazon Web Services', year: '2023', link: '' }
  ]);

  const [skills, setSkills] = useState('JavaScript, React, Node.js, Tailwind CSS, PostgreSQL, Git, Agile');
  const [languages, setLanguages] = useState('Bahasa Indonesia (Native), English (Professional Working)');

  // --- HANDLERS ---
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) { 
      const reader = new FileReader(); 
      reader.onloadend = () => setPhoto(reader.result); 
      reader.readAsDataURL(file); 
    }
  };

  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleGenericChange = (setter, id, field, value) => {
    setter(prev => prev.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const addGenericItem = (setter, defaultObj) => {
    setter(prev => [...prev, { id: Date.now(), ...defaultObj }]);
  };

  const removeGenericItem = (setter, id) => {
    setter(prev => prev.filter(item => item.id !== id));
  };

  const printCV = () => window.print();

  const renderBullets = (text, isCreative = false) => {
    if (!text) return null;
    const lines = text.split('\n').filter(line => line.trim() !== '');
    return (
      <ul className={`list-disc list-outside ml-4 mt-1 space-y-0.5 ${isCreative ? 'text-gray-600' : 'text-gray-800'}`}>
        {lines.map((line, idx) => <li key={idx} className="text-[10pt] leading-tight">{line.replace(/^[-*•]\s*/, '')}</li>)}
      </ul>
    );
  };

  const activePalette = colorPalettes[theme];

  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-900">
      <style>{`
        @media print {
          @page { size: A4; margin: 0mm; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        }
      `}</style>

      {/* NAVBAR */}
      <header className="bg-white shadow-sm p-4 sticky top-0 z-10 print:hidden flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-xl font-bold text-blue-600 flex items-center gap-2"><Printer size={24} /> Ultimate CV Builder</h1>
        </div>
        <div className="flex items-center gap-3 bg-gray-100 p-1 rounded-lg">
          <button onClick={() => setTemplate('ats')} className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${template === 'ats' ? 'bg-white shadow text-blue-600' : 'text-gray-600'}`}><FileText size={16} /> ATS</button>
          <button onClick={() => setTemplate('creative')} className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${template === 'creative' ? 'bg-white shadow text-blue-600' : 'text-gray-600'}`}><LayoutTemplate size={16} /> Creative</button>
        </div>
        {template === 'creative' && (
          <div className="flex items-center gap-2 bg-gray-100 p-1.5 rounded-lg">
            <Palette size={16} className="text-gray-500 ml-1" />
            <div className="flex gap-1.5 px-1">
              {Object.keys(colorPalettes).map((key) => (
                <button key={key} onClick={() => setTheme(key)} title={colorPalettes[key].name} className={`w-6 h-6 rounded-full ${colorPalettes[key].preview} border-2 ${theme === key ? 'border-white ring-2 ring-blue-400 scale-110' : 'border-transparent'}`} />
              ))}
            </div>
          </div>
        )}
        <button onClick={printCV} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2"><Printer size={18} /> Cetak PDF</button>
      </header>

      <main className="max-w-7xl mx-auto p-4 flex flex-col lg:flex-row gap-8 items-start">
        
        {/* PANEL KIRI: FORM INPUT */}
        <div className="w-full lg:w-1/2 space-y-6 print:hidden h-[calc(100vh-120px)] overflow-y-auto pr-2 pb-10">
          
          <section className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-md font-bold mb-3 flex items-center gap-2 border-b pb-2"><User size={18}/> Info Pribadi & Foto</h2>
            <div className="flex items-center gap-4 mb-4">
               <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden">{photo ? <img src={photo} className="w-full h-full object-cover" /> : <User size={32} className="m-auto mt-4 text-gray-400" />}</div>
               <div>
                 <label className="cursor-pointer bg-blue-50 text-blue-600 text-xs px-3 py-1.5 rounded border border-blue-200">Upload Foto <input type="file" onChange={handlePhotoUpload} className="hidden" /></label>
                 {photo && <button onClick={() => setPhoto(null)} className="text-red-500 text-xs ml-2">Hapus</button>}
               </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <input type="text" name="fullName" value={personalInfo.fullName} onChange={handlePersonalInfoChange} placeholder="Nama Lengkap" className="w-full p-2 border rounded-md text-sm outline-none" />
              <input type="text" name="phone" value={personalInfo.phone} onChange={handlePersonalInfoChange} placeholder="Nomor Telepon" className="w-full p-2 border rounded-md text-sm outline-none" />
              <input type="email" name="email" value={personalInfo.email} onChange={handlePersonalInfoChange} placeholder="Email" className="w-full p-2 border rounded-md text-sm outline-none" />
              <input type="text" name="location" value={personalInfo.location} onChange={handlePersonalInfoChange} placeholder="Kota, Negara" className="w-full p-2 border rounded-md text-sm outline-none" />
              <input type="text" name="linkedin" value={personalInfo.linkedin} onChange={handlePersonalInfoChange} placeholder="URL LinkedIn" className="w-full p-2 border rounded-md text-sm outline-none" />
              <input type="text" name="github" value={personalInfo.github} onChange={handlePersonalInfoChange} placeholder="URL Porto/Web" className="w-full p-2 border rounded-md text-sm outline-none" />
            </div>
            <textarea value={summary} onChange={(e) => setSummary(e.target.value)} rows="3" placeholder="Ringkasan Profesional (3-4 kalimat)" className="w-full p-2 border rounded-md text-sm mt-3 outline-none"></textarea>
          </section>

          <section className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
            <div className="flex justify-between mb-3 border-b pb-2"><h2 className="text-md font-bold flex items-center gap-2"><Briefcase size={18}/> Pengalaman Kerja</h2><button onClick={() => addGenericItem(setExperiences, {company: '', position: '', location: '', startDate: '', endDate: '', description: ''})} className="text-xs text-blue-600">+ Tambah</button></div>
            <div className="space-y-4">
              {experiences.map((item) => (
                <div key={item.id} className="relative p-3 bg-gray-50 border rounded-lg">
                  <button onClick={() => removeGenericItem(setExperiences, item.id)} className="absolute top-2 right-2 text-red-500"><Trash2 size={14}/></button>
                  <div className="grid grid-cols-2 gap-2 mb-2 pr-6">
                    <input type="text" value={item.position} onChange={(e) => handleGenericChange(setExperiences, item.id, 'position', e.target.value)} placeholder="Posisi" className="p-1.5 border rounded text-sm" />
                    <input type="text" value={item.company} onChange={(e) => handleGenericChange(setExperiences, item.id, 'company', e.target.value)} placeholder="Perusahaan" className="p-1.5 border rounded text-sm" />
                    <input type="text" value={item.startDate} onChange={(e) => handleGenericChange(setExperiences, item.id, 'startDate', e.target.value)} placeholder="Mulai" className="p-1.5 border rounded text-sm" />
                    <input type="text" value={item.endDate} onChange={(e) => handleGenericChange(setExperiences, item.id, 'endDate', e.target.value)} placeholder="Selesai" className="p-1.5 border rounded text-sm" />
                  </div>
                  <textarea value={item.description} onChange={(e) => handleGenericChange(setExperiences, item.id, 'description', e.target.value)} rows="2" placeholder="Deskripsi (- bullet)" className="w-full p-1.5 border rounded text-sm"></textarea>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
            <div className="flex justify-between mb-3 border-b pb-2"><h2 className="text-md font-bold flex items-center gap-2"><GraduationCap size={18}/> Pendidikan</h2><button onClick={() => addGenericItem(setEducations, {institution: '', degree: '', location: '', graduationYear: '', gpa: ''})} className="text-xs text-blue-600">+ Tambah</button></div>
            <div className="space-y-4">
              {educations.map((item) => (
                <div key={item.id} className="relative p-3 bg-gray-50 border rounded-lg grid grid-cols-2 gap-2 pr-6">
                  <button onClick={() => removeGenericItem(setEducations, item.id)} className="absolute top-2 right-2 text-red-500"><Trash2 size={14}/></button>
                  <input type="text" value={item.institution} onChange={(e) => handleGenericChange(setEducations, item.id, 'institution', e.target.value)} placeholder="Institusi" className="col-span-2 p-1.5 border rounded text-sm" />
                  <input type="text" value={item.degree} onChange={(e) => handleGenericChange(setEducations, item.id, 'degree', e.target.value)} placeholder="Gelar" className="p-1.5 border rounded text-sm" />
                  <input type="text" value={item.graduationYear} onChange={(e) => handleGenericChange(setEducations, item.id, 'graduationYear', e.target.value)} placeholder="Tahun Lulus" className="p-1.5 border rounded text-sm" />
                </div>
              ))}
            </div>
          </section>

          {/* NEW: Sertifikasi */}
          <section className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
            <div className="flex justify-between mb-3 border-b pb-2"><h2 className="text-md font-bold flex items-center gap-2"><FileBadge size={18}/> Sertifikasi</h2><button onClick={() => addGenericItem(setCertifications, {name: '', issuer: '', year: '', link: ''})} className="text-xs text-blue-600">+ Tambah</button></div>
            <div className="space-y-4">
              {certifications.map((item) => (
                <div key={item.id} className="relative p-3 bg-gray-50 border rounded-lg grid grid-cols-2 gap-2 pr-6">
                  <button onClick={() => removeGenericItem(setCertifications, item.id)} className="absolute top-2 right-2 text-red-500"><Trash2 size={14}/></button>
                  <input type="text" value={item.name} onChange={(e) => handleGenericChange(setCertifications, item.id, 'name', e.target.value)} placeholder="Nama Sertifikat" className="col-span-2 p-1.5 border rounded text-sm" />
                  <input type="text" value={item.issuer} onChange={(e) => handleGenericChange(setCertifications, item.id, 'issuer', e.target.value)} placeholder="Institusi Penerbit" className="p-1.5 border rounded text-sm" />
                  <input type="text" value={item.year} onChange={(e) => handleGenericChange(setCertifications, item.id, 'year', e.target.value)} placeholder="Tahun" className="p-1.5 border rounded text-sm" />
                </div>
              ))}
            </div>
          </section>

          {/* NEW: Proyek */}
          <section className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
            <div className="flex justify-between mb-3 border-b pb-2"><h2 className="text-md font-bold flex items-center gap-2"><FolderOpen size={18}/> Proyek (Portofolio)</h2><button onClick={() => addGenericItem(setProjects, {name: '', link: '', description: ''})} className="text-xs text-blue-600">+ Tambah</button></div>
            <div className="space-y-4">
              {projects.map((item) => (
                <div key={item.id} className="relative p-3 bg-gray-50 border rounded-lg pr-6">
                  <button onClick={() => removeGenericItem(setProjects, item.id)} className="absolute top-2 right-2 text-red-500"><Trash2 size={14}/></button>
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <input type="text" value={item.name} onChange={(e) => handleGenericChange(setProjects, item.id, 'name', e.target.value)} placeholder="Nama Proyek" className="p-1.5 border rounded text-sm" />
                    <input type="text" value={item.link} onChange={(e) => handleGenericChange(setProjects, item.id, 'link', e.target.value)} placeholder="Link Proyek (Opsional)" className="p-1.5 border rounded text-sm" />
                  </div>
                  <textarea value={item.description} onChange={(e) => handleGenericChange(setProjects, item.id, 'description', e.target.value)} rows="2" placeholder="Deskripsi (- bullet)" className="w-full p-1.5 border rounded text-sm"></textarea>
                </div>
              ))}
            </div>
          </section>

          {/* NEW: Organisasi & Magang */}
          <section className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
            <div className="flex justify-between mb-3 border-b pb-2"><h2 className="text-md font-bold flex items-center gap-2"><Users size={18}/> Organisasi / Magang</h2><button onClick={() => addGenericItem(setOrganizations, {organization: '', role: '', period: '', description: ''})} className="text-xs text-blue-600">+ Tambah</button></div>
            <div className="space-y-4">
              {organizations.map((item) => (
                <div key={item.id} className="relative p-3 bg-gray-50 border rounded-lg pr-6">
                  <button onClick={() => removeGenericItem(setOrganizations, item.id)} className="absolute top-2 right-2 text-red-500"><Trash2 size={14}/></button>
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <input type="text" value={item.role} onChange={(e) => handleGenericChange(setOrganizations, item.id, 'role', e.target.value)} placeholder="Peran / Jabatan" className="p-1.5 border rounded text-sm" />
                    <input type="text" value={item.organization} onChange={(e) => handleGenericChange(setOrganizations, item.id, 'organization', e.target.value)} placeholder="Nama Organisasi" className="p-1.5 border rounded text-sm" />
                  </div>
                  <input type="text" value={item.period} onChange={(e) => handleGenericChange(setOrganizations, item.id, 'period', e.target.value)} placeholder="Periode (Misal: 2021 - 2022)" className="w-full mb-2 p-1.5 border rounded text-sm" />
                  <textarea value={item.description} onChange={(e) => handleGenericChange(setOrganizations, item.id, 'description', e.target.value)} rows="2" placeholder="Deskripsi (- bullet)" className="w-full p-1.5 border rounded text-sm"></textarea>
                </div>
              ))}
            </div>
          </section>

          {/* Skills & Languages */}
          <section className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-md font-bold mb-3 flex items-center gap-2 border-b pb-2"><Code size={18}/> Keahlian & Bahasa</h2>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-gray-500">Skills (Pisahkan dgn koma)</label>
                <textarea value={skills} onChange={(e) => setSkills(e.target.value)} rows="2" className="w-full p-2 border rounded-md text-sm mt-1"></textarea>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500">Bahasa (Pisahkan dgn koma)</label>
                <textarea value={languages} onChange={(e) => setLanguages(e.target.value)} rows="2" className="w-full p-2 border rounded-md text-sm mt-1"></textarea>
              </div>
            </div>
          </section>

        </div>

        {/* PANEL KANAN: CV PREVIEW */}
        <div className="w-full lg:w-1/2 print:w-full print:absolute print:top-0 print:left-0 print:bg-white print:m-0 print:p-0">
          <div className="sticky top-[100px] print:static">
            
            {/* ==============================================
                TEMPLATE 1: ATS STANDARD 
                ============================================== */}
            {template === 'ats' && (
              <div className="bg-white shadow-xl print:shadow-none mx-auto p-8 print:pt-16 print:pb-12 print:px-12 w-full max-w-[210mm] min-h-[297mm] text-gray-900 leading-normal font-serif relative">
                <div className="text-center mb-6 border-b border-gray-300 pb-4">
                  <h1 className="text-3xl font-bold uppercase tracking-wide mb-2 text-black">{personalInfo.fullName || 'NAMA LENGKAP'}</h1>
                  <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-[10pt] text-gray-700">
                    {personalInfo.location && <span>{personalInfo.location}</span>}
                    {personalInfo.phone && <><span className="text-gray-400">•</span><span>{personalInfo.phone}</span></>}
                    {personalInfo.email && <><span className="text-gray-400">•</span><span>{personalInfo.email}</span></>}
                  </div>
                  <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-[10pt] text-gray-700 mt-1">
                    {personalInfo.linkedin && <span>{personalInfo.linkedin.replace('https://', '').replace('www.', '')}</span>}
                    {(personalInfo.linkedin && personalInfo.github) && <span className="text-gray-400">•</span>}
                    {personalInfo.github && <span>{personalInfo.github.replace('https://', '').replace('www.', '')}</span>}
                  </div>
                </div>

                {summary && (
                  <div className="mb-4">
                    <h2 className="text-[11pt] font-bold uppercase border-b border-gray-800 mb-2 text-black">Professional Summary</h2>
                    <p className="text-[10pt] text-justify text-gray-800 leading-tight">{summary}</p>
                  </div>
                )}

                {experiences.length > 0 && (
                  <div className="mb-4">
                    <h2 className="text-[11pt] font-bold uppercase border-b border-gray-800 mb-2 text-black">Work Experience</h2>
                    <div className="space-y-3">
                      {experiences.map((exp) => (
                        <div key={exp.id}>
                          <div className="flex justify-between items-baseline">
                            <h3 className="text-[10.5pt] font-bold text-black">{exp.position}</h3>
                            <span className="text-[10pt] text-gray-800 font-semibold">{exp.startDate} {exp.endDate ? `- ${exp.endDate}` : ''}</span>
                          </div>
                          <div className="text-[10pt] italic text-gray-800 mb-1">{exp.company} {exp.location ? `- ${exp.location}` : ''}</div>
                          {renderBullets(exp.description)}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {projects.length > 0 && (
                  <div className="mb-4">
                    <h2 className="text-[11pt] font-bold uppercase border-b border-gray-800 mb-2 text-black">Projects</h2>
                    <div className="space-y-3">
                      {projects.map((proj) => (
                        <div key={proj.id}>
                          <div className="flex justify-between items-baseline mb-1">
                            <h3 className="text-[10.5pt] font-bold text-black">{proj.name} {proj.link && <span className="font-normal text-gray-600 text-[9pt]">| {proj.link}</span>}</h3>
                          </div>
                          {renderBullets(proj.description)}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {organizations.length > 0 && (
                  <div className="mb-4">
                    <h2 className="text-[11pt] font-bold uppercase border-b border-gray-800 mb-2 text-black">Organizations & Volunteering</h2>
                    <div className="space-y-3">
                      {organizations.map((org) => (
                        <div key={org.id}>
                          <div className="flex justify-between items-baseline">
                            <h3 className="text-[10.5pt] font-bold text-black">{org.role}</h3>
                            <span className="text-[10pt] text-gray-800 font-semibold">{org.period}</span>
                          </div>
                          <div className="text-[10pt] italic text-gray-800 mb-1">{org.organization}</div>
                          {renderBullets(org.description)}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {educations.length > 0 && (
                  <div className="mb-4">
                    <h2 className="text-[11pt] font-bold uppercase border-b border-gray-800 mb-2 text-black">Education</h2>
                    <div className="space-y-2">
                      {educations.map((edu) => (
                        <div key={edu.id}>
                          <div className="flex justify-between items-baseline">
                            <h3 className="text-[10.5pt] font-bold text-black">{edu.institution}</h3>
                            <span className="text-[10pt] text-gray-800 font-semibold">{edu.graduationYear}</span>
                          </div>
                          <div className="text-[10pt] text-gray-800 italic">{edu.degree} {edu.gpa ? ` (GPA: ${edu.gpa})` : ''}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {certifications.length > 0 && (
                  <div className="mb-4">
                    <h2 className="text-[11pt] font-bold uppercase border-b border-gray-800 mb-2 text-black">Certifications</h2>
                    <ul className="list-disc list-outside ml-4 mt-1 space-y-0.5 text-gray-800">
                      {certifications.map((cert) => (
                        <li key={cert.id} className="text-[10pt] leading-tight">
                          <strong>{cert.name}</strong> - {cert.issuer} ({cert.year})
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {(skills || languages) && (
                  <div className="mb-4">
                    <h2 className="text-[11pt] font-bold uppercase border-b border-gray-800 mb-2 text-black">Skills & Languages</h2>
                    {skills && <p className="text-[10pt] text-gray-800 leading-tight mb-1"><strong>Skills:</strong> {skills}</p>}
                    {languages && <p className="text-[10pt] text-gray-800 leading-tight"><strong>Languages:</strong> {languages}</p>}
                  </div>
                )}
              </div>
            )}

            {/* ==============================================
                TEMPLATE 2: CREATIVE VISUAL
                ============================================== */}
            {template === 'creative' && (
              <div className="bg-white shadow-xl print:shadow-none mx-auto w-full max-w-[210mm] min-h-[297mm] text-gray-800 leading-normal font-sans flex flex-row relative overflow-hidden">
                
                {/* SIDEBAR (KIRI) */}
                <div className={`w-[35%] ${activePalette.sidebarBg} text-white p-6 print:p-6 print:pt-10 flex flex-col gap-6 border-r-4 ${activePalette.sidebarBorderRight}`}>
                  
                  <div className="text-center">
                    {photo ? (
                      <img src={photo} alt="Profile" className="w-28 h-28 rounded-full mx-auto object-cover border-4 border-slate-500 mb-3 shadow-lg" />
                    ) : (
                      <div className="w-28 h-28 rounded-full mx-auto bg-slate-600 border-4 border-slate-500 flex items-center justify-center mb-3 shadow-lg"><User size={40} className="text-slate-400" /></div>
                    )}
                    <h1 className="text-xl font-bold uppercase tracking-wide leading-tight">{personalInfo.fullName}</h1>
                  </div>

                  <div>
                    <h2 className={`text-[10pt] font-semibold uppercase tracking-wider border-b border-slate-600 pb-1 mb-2 ${activePalette.sectionTitleLeft}`}>Kontak</h2>
                    <div className="space-y-2 text-[9pt] text-slate-300">
                      {personalInfo.phone && <div className="flex items-center gap-2 break-all"><Phone size={12} className={`shrink-0 ${activePalette.iconContact}`}/> {personalInfo.phone}</div>}
                      {personalInfo.email && <div className="flex items-center gap-2 break-all"><Mail size={12} className={`shrink-0 ${activePalette.iconContact}`}/> {personalInfo.email}</div>}
                      {personalInfo.location && <div className="flex items-center gap-2 break-all"><MapPin size={12} className={`shrink-0 ${activePalette.iconContact}`}/> {personalInfo.location}</div>}
                      {personalInfo.linkedin && <div className="flex items-center gap-2 break-all"><Globe size={12} className={`shrink-0 ${activePalette.iconContact}`}/> {personalInfo.linkedin.replace('https://', '')}</div>}
                      {personalInfo.github && <div className="flex items-center gap-2 break-all"><Globe size={12} className={`shrink-0 ${activePalette.iconContact}`}/> {personalInfo.github.replace('https://', '')}</div>}
                    </div>
                  </div>

                  {skills && (
                    <div>
                      <h2 className={`text-[10pt] font-semibold uppercase tracking-wider border-b border-slate-600 pb-1 mb-2 ${activePalette.sectionTitleLeft}`}>Keahlian</h2>
                      <div className="flex flex-wrap gap-1.5">
                        {skills.split(',').map((skill, index) => <span key={index} className={`text-[8.5pt] px-2 py-0.5 rounded-md border ${activePalette.skillBadge}`}>{skill.trim()}</span>)}
                      </div>
                    </div>
                  )}

                  {languages && (
                    <div>
                      <h2 className={`text-[10pt] font-semibold uppercase tracking-wider border-b border-slate-600 pb-1 mb-2 ${activePalette.sectionTitleLeft}`}>Bahasa</h2>
                      <div className="flex flex-wrap gap-1.5">
                        {languages.split(',').map((lang, index) => <span key={index} className={`text-[8.5pt] px-2 py-0.5 rounded-md border ${activePalette.skillBadge}`}>{lang.trim()}</span>)}
                      </div>
                    </div>
                  )}

                  {certifications.length > 0 && (
                    <div>
                      <h2 className={`text-[10pt] font-semibold uppercase tracking-wider border-b border-slate-600 pb-1 mb-2 ${activePalette.sectionTitleLeft}`}>Sertifikasi</h2>
                      <div className="space-y-2 text-[8.5pt] text-slate-300">
                        {certifications.map(cert => (
                          <div key={cert.id}>
                            <div className="font-bold text-white">{cert.name}</div>
                            <div>{cert.issuer} ({cert.year})</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* MAIN CONTENT (KANAN) */}
                <div className="w-[65%] p-6 print:p-6 print:pt-10 bg-slate-50 flex flex-col gap-5">
                  
                  {summary && (
                    <section>
                      <h2 className="text-[12pt] font-bold text-[#1e293b] flex items-center gap-2 mb-1"><User size={16} className={activePalette.iconMain}/> Profil</h2>
                      <div className={`w-full h-[2px] ${activePalette.dividerBg} mb-2`}><div className={`w-12 h-full ${activePalette.dividerFill}`}></div></div>
                      <p className="text-[9.5pt] text-gray-600 leading-relaxed text-justify">{summary}</p>
                    </section>
                  )}

                  {experiences.length > 0 && (
                    <section>
                      <h2 className="text-[12pt] font-bold text-[#1e293b] flex items-center gap-2 mb-1"><Briefcase size={16} className={activePalette.iconMain}/> Pengalaman Kerja</h2>
                      <div className={`w-full h-[2px] ${activePalette.dividerBg} mb-3`}><div className={`w-12 h-full ${activePalette.dividerFill}`}></div></div>
                      <div className="space-y-4">
                        {experiences.map((exp) => (
                          <div key={exp.id} className={`relative pl-3 border-l-2 ${activePalette.timelineBorder}`}>
                            <div className={`absolute -left-[5px] top-1.5 w-2 h-2 rounded-full ${activePalette.timelineDot}`}></div>
                            <h3 className="text-[10.5pt] font-bold text-[#1e293b] leading-tight">{exp.position}</h3>
                            <div className={`text-[8.5pt] ${activePalette.textAccent} font-medium mb-1`}>{exp.company} • {exp.startDate} - {exp.endDate}</div>
                            {renderBullets(exp.description, true)}
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {projects.length > 0 && (
                    <section>
                      <h2 className="text-[12pt] font-bold text-[#1e293b] flex items-center gap-2 mb-1"><FolderOpen size={16} className={activePalette.iconMain}/> Proyek</h2>
                      <div className={`w-full h-[2px] ${activePalette.dividerBg} mb-3`}><div className={`w-12 h-full ${activePalette.dividerFill}`}></div></div>
                      <div className="space-y-3">
                        {projects.map((proj) => (
                          <div key={proj.id} className={`relative pl-3 border-l-2 ${activePalette.timelineBorder}`}>
                            <div className={`absolute -left-[5px] top-1.5 w-2 h-2 rounded-full ${activePalette.timelineDot}`}></div>
                            <h3 className="text-[10.5pt] font-bold text-[#1e293b] leading-tight">{proj.name}</h3>
                            {proj.link && <div className={`text-[8.5pt] ${activePalette.textAccent} font-medium mb-1`}>{proj.link}</div>}
                            {renderBullets(proj.description, true)}
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {organizations.length > 0 && (
                    <section>
                      <h2 className="text-[12pt] font-bold text-[#1e293b] flex items-center gap-2 mb-1"><Users size={16} className={activePalette.iconMain}/> Organisasi</h2>
                      <div className={`w-full h-[2px] ${activePalette.dividerBg} mb-3`}><div className={`w-12 h-full ${activePalette.dividerFill}`}></div></div>
                      <div className="space-y-3">
                        {organizations.map((org) => (
                          <div key={org.id} className={`relative pl-3 border-l-2 ${activePalette.timelineBorder}`}>
                            <div className={`absolute -left-[5px] top-1.5 w-2 h-2 rounded-full ${activePalette.timelineDot}`}></div>
                            <h3 className="text-[10.5pt] font-bold text-[#1e293b] leading-tight">{org.role}</h3>
                            <div className={`text-[8.5pt] ${activePalette.textAccent} font-medium mb-1`}>{org.organization} • {org.period}</div>
                            {renderBullets(org.description, true)}
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {educations.length > 0 && (
                    <section>
                      <h2 className="text-[12pt] font-bold text-[#1e293b] flex items-center gap-2 mb-1"><GraduationCap size={16} className={activePalette.iconMain}/> Pendidikan</h2>
                      <div className={`w-full h-[2px] ${activePalette.dividerBg} mb-3`}><div className={`w-12 h-full ${activePalette.dividerFill}`}></div></div>
                      <div className="space-y-3">
                        {educations.map((edu) => (
                          <div key={edu.id} className={`relative pl-3 border-l-2 ${activePalette.timelineBorder}`}>
                            <div className={`absolute -left-[5px] top-1.5 w-2 h-2 rounded-full ${activePalette.timelineDot}`}></div>
                            <h3 className="text-[10.5pt] font-bold text-[#1e293b] leading-tight">{edu.degree}</h3>
                            <div className={`text-[8.5pt] ${activePalette.textAccent} font-medium`}>{edu.institution} • {edu.graduationYear}</div>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                </div>
              </div>
            )}
          </div>
        </div>

      </main>
    </div>
  );
};

export default App;
