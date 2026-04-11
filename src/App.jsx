import React, { useState } from 'react';
import { 
  Printer, Plus, Trash2, Briefcase, GraduationCap, 
  User, Code, Mail, Phone, MapPin, Globe, LayoutTemplate, FileText, Palette, Award
} from 'lucide-react';

// Konfigurasi Palet Warna (Diperbarui dengan opsi lebih kreatif)
const colorPalettes = {
  blue: {
    name: 'Classic Blue',
    preview: 'bg-blue-600',
    sidebarBg: 'bg-[#1e293b]', // Slate gelap
    sidebarBorderRight: 'border-blue-500',
    iconContact: 'text-blue-400',
    sectionTitleLeft: 'text-blue-300',
    skillBadge: 'bg-slate-700 border-slate-600 text-slate-200',
    iconMain: 'text-blue-600',
    dividerBg: 'bg-blue-100',
    dividerFill: 'bg-blue-600',
    timelineBorder: 'border-blue-200',
    timelineDot: 'bg-blue-600',
    textAccent: 'text-blue-600',
  },
  monochrome: {
    name: 'Monochrome',
    preview: 'bg-zinc-700',
    sidebarBg: 'bg-[#18181b]', // Zinc gelap
    sidebarBorderRight: 'border-zinc-500',
    iconContact: 'text-zinc-400',
    sectionTitleLeft: 'text-zinc-300',
    skillBadge: 'bg-zinc-800 border-zinc-700 text-zinc-200',
    iconMain: 'text-zinc-700',
    dividerBg: 'bg-zinc-200',
    dividerFill: 'bg-zinc-700',
    timelineBorder: 'border-zinc-300',
    timelineDot: 'bg-zinc-700',
    textAccent: 'text-zinc-700',
  },
  nature: {
    name: 'Nature Green',
    preview: 'bg-emerald-600',
    sidebarBg: 'bg-[#064e3b]', // Emerald gelap
    sidebarBorderRight: 'border-emerald-500',
    iconContact: 'text-emerald-400',
    sectionTitleLeft: 'text-emerald-300',
    skillBadge: 'bg-emerald-800 border-emerald-700 text-emerald-100',
    iconMain: 'text-emerald-600',
    dividerBg: 'bg-emerald-100',
    dividerFill: 'bg-emerald-600',
    timelineBorder: 'border-emerald-200',
    timelineDot: 'bg-emerald-600',
    textAccent: 'text-emerald-600',
  },
  autumn: {
    name: 'Autumn Warm',
    preview: 'bg-orange-600',
    sidebarBg: 'bg-[#451a03]', // Coklat gelap
    sidebarBorderRight: 'border-orange-500',
    iconContact: 'text-orange-400',
    sectionTitleLeft: 'text-orange-300',
    skillBadge: 'bg-orange-900 border-orange-800 text-orange-100',
    iconMain: 'text-orange-600',
    dividerBg: 'bg-orange-100',
    dividerFill: 'bg-orange-600',
    timelineBorder: 'border-orange-200',
    timelineDot: 'bg-orange-600',
    textAccent: 'text-orange-600',
  },
  lavender: {
    name: 'Soft Lavender',
    preview: 'bg-indigo-400',
    sidebarBg: 'bg-[#312e81]', // Indigo sangat gelap
    sidebarBorderRight: 'border-indigo-400',
    iconContact: 'text-indigo-300',
    sectionTitleLeft: 'text-indigo-200',
    skillBadge: 'bg-indigo-800 border-indigo-700 text-indigo-100',
    iconMain: 'text-indigo-500',
    dividerBg: 'bg-indigo-100',
    dividerFill: 'bg-indigo-500',
    timelineBorder: 'border-indigo-200',
    timelineDot: 'bg-indigo-500',
    textAccent: 'text-indigo-600',
  },
  rose: {
    name: 'Rose Gold',
    preview: 'bg-rose-400',
    sidebarBg: 'bg-[#4c1d95]', // Violet gelap (kontras cantik dengan rose)
    sidebarBorderRight: 'border-rose-400',
    iconContact: 'text-rose-300',
    sectionTitleLeft: 'text-rose-200',
    skillBadge: 'bg-violet-800 border-violet-700 text-rose-100',
    iconMain: 'text-rose-600',
    dividerBg: 'bg-rose-100',
    dividerFill: 'bg-rose-500',
    timelineBorder: 'border-rose-200',
    timelineDot: 'bg-rose-500',
    textAccent: 'text-rose-600',
  },
  cyber: {
    name: 'Cyber Neon',
    preview: 'bg-cyan-400',
    sidebarBg: 'bg-[#0f172a]', // Slate 900
    sidebarBorderRight: 'border-cyan-400',
    iconContact: 'text-cyan-300',
    sectionTitleLeft: 'text-cyan-200',
    skillBadge: 'bg-slate-800 border-slate-700 text-cyan-300',
    iconMain: 'text-cyan-600',
    dividerBg: 'bg-slate-200', 
    dividerFill: 'bg-cyan-500',
    timelineBorder: 'border-slate-300',
    timelineDot: 'bg-cyan-500',
    textAccent: 'text-cyan-700',
  }
};

const App = () => {
  // --- STATE MANAGEMENT ---
  const [template, setTemplate] = useState('ats'); // 'ats' atau 'creative'
  const [theme, setTheme] = useState('blue'); // State untuk pilihan warna template creative
  const [photo, setPhoto] = useState(null);

  const [personalInfo, setPersonalInfo] = useState({
    fullName: 'Budi Santoso',
    phone: '0812-3456-7890',
    email: 'budi.santoso@email.com',
    location: 'Jakarta, Indonesia',
    linkedin: 'linkedin.com/in/budisantoso',
    github: 'github.com/budisantoso'
  });

  const [summary, setSummary] = useState(
    'Software Engineer dengan pengalaman lebih dari 3 tahun dalam mengembangkan aplikasi web yang scalable menggunakan React dan Node.js. Berpengalaman dalam memimpin tim kecil dan meningkatkan performa aplikasi sebesar 30%.'
  );

  const [experiences, setExperiences] = useState([
    {
      id: 1,
      company: 'PT Maju Mundur Teknologi',
      position: 'Frontend Developer',
      location: 'Jakarta',
      startDate: 'Jan 2021',
      endDate: 'Present',
      description: '- Mengembangkan antarmuka pengguna responsif menggunakan React dan Tailwind CSS\n- Mengintegrasikan RESTful API untuk fitur dashboard realtime\n- Meningkatkan skor Lighthouse dari 65 menjadi 95 dengan optimasi lazy loading'
    }
  ]);

  // Tambahan State untuk Pengalaman Magang
  const [internships, setInternships] = useState([
    {
      id: 1,
      company: 'Startup Digital Nusantara',
      position: 'Web Developer Intern',
      location: 'Bandung',
      startDate: 'Jun 2019',
      endDate: 'Sep 2019',
      description: '- Membantu merancang komponen UI dengan React.js\n- Melakukan pengujian A/B testing untuk fitur keranjang belanja'
    }
  ]);

  const [educations, setEducations] = useState([
    {
      id: 1,
      institution: 'Universitas Teknologi Indonesia',
      degree: 'S1 Teknik Informatika',
      location: 'Bandung',
      graduationYear: '2020',
      gpa: '3.85'
    }
  ]);

  const [skills, setSkills] = useState('JavaScript, React, Node.js, Express, Tailwind CSS, PostgreSQL, Git, Agile Methodology');

  // --- HANDLERS ---
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setPhoto(null);
  };

  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleExperienceChange = (id, field, value) => {
    setExperiences(prev => prev.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
  };

  const addExperience = () => {
    setExperiences([...experiences, { 
      id: Date.now(), company: '', position: '', location: '', startDate: '', endDate: '', description: '' 
    }]);
  };

  const removeExperience = (id) => {
    setExperiences(experiences.filter(exp => exp.id !== id));
  };

  // Handler Magang (Internship)
  const handleInternshipChange = (id, field, value) => {
    setInternships(prev => prev.map(int => 
      int.id === id ? { ...int, [field]: value } : int
    ));
  };

  const addInternship = () => {
    setInternships([...internships, { 
      id: Date.now(), company: '', position: '', location: '', startDate: '', endDate: '', description: '' 
    }]);
  };

  const removeInternship = (id) => {
    setInternships(internships.filter(int => int.id !== id));
  };

  const handleEducationChange = (id, field, value) => {
    setEducations(prev => prev.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    ));
  };

  const addEducation = () => {
    setEducations([...educations, { 
      id: Date.now(), institution: '', degree: '', location: '', graduationYear: '', gpa: '' 
    }]);
  };

  const removeEducation = (id) => {
    setEducations(educations.filter(edu => edu.id !== id));
  };

  const printCV = () => {
    window.print();
  };

  const renderBullets = (text, isCreative = false) => {
    if (!text) return null;
    const lines = text.split('\n').filter(line => line.trim() !== '');
    return (
      <ul className={`list-disc list-outside ml-4 mt-1 space-y-0.5 ${isCreative ? 'text-gray-600' : 'text-gray-800'}`}>
        {lines.map((line, idx) => {
          const cleanLine = line.replace(/^[-*•]\s*/, '');
          return <li key={idx} className="text-[10pt] leading-tight">{cleanLine}</li>;
        })}
      </ul>
    );
  };

  const activePalette = colorPalettes[theme];

  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-900">
      <style>{`
        @media print {
          @page { 
            size: A4;
            margin: 0mm; 
          }
          body { 
            -webkit-print-color-adjust: exact; 
            print-color-adjust: exact;
          }
        }
      `}</style>

      {/* NAVBAR */}
      <header className="bg-white shadow-sm p-4 sticky top-0 z-10 print:hidden flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-xl font-bold text-blue-600 flex items-center gap-2">
            <Printer size={24} /> Multi-Format CV Builder
          </h1>
          <p className="text-sm text-gray-500">Pilih format sesuai kebutuhan lamaran Anda.</p>
        </div>
        
        <div className="flex items-center gap-3 bg-gray-100 p-1 rounded-lg">
          <button 
            onClick={() => setTemplate('ats')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${template === 'ats' ? 'bg-white shadow text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
          >
            <FileText size={16} /> ATS Standard
          </button>
          <button 
            onClick={() => setTemplate('creative')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${template === 'creative' ? 'bg-white shadow text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
          >
            <LayoutTemplate size={16} /> Creative Visual
          </button>
        </div>

        {/* Pilihan Palet Warna (Hanya Muncul di Template Creative) */}
        {template === 'creative' && (
          <div className="flex items-center gap-2 bg-gray-100 p-1.5 rounded-lg transition-all duration-300">
            <Palette size={16} className="text-gray-500 ml-1" />
            <div className="flex gap-1.5 px-1">
              {Object.keys(colorPalettes).map((key) => (
                <button
                  key={key}
                  onClick={() => setTheme(key)}
                  title={colorPalettes[key].name}
                  className={`w-6 h-6 rounded-full ${colorPalettes[key].preview} border-2 transition-transform ${theme === key ? 'border-white ring-2 ring-blue-400 scale-110 shadow-sm' : 'border-transparent hover:scale-110'}`}
                />
              ))}
            </div>
          </div>
        )}

        <button 
          onClick={printCV}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors shadow-sm"
        >
          <Printer size={18} /> Cetak PDF
        </button>
      </header>

      <main className="max-w-7xl mx-auto p-4 flex flex-col lg:flex-row gap-8 items-start">
        
        {/* PANEL KIRI: FORM INPUT */}
        <div className="w-full lg:w-1/2 space-y-6 print:hidden h-[calc(100vh-120px)] overflow-y-auto pr-2 pb-10">
          
          {/* Personal Info & Photo */}
          <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2 border-b pb-2"><User size={20}/> Informasi Pribadi</h2>
            
            <div className="mb-6 p-4 bg-gray-50 border border-gray-100 rounded-lg flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-gray-200 border-2 border-dashed border-gray-400 flex items-center justify-center overflow-hidden shrink-0">
                {photo ? (
                  <img src={photo} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <User size={32} className="text-gray-400" />
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Foto Profil (Opsional)</label>
                <p className="text-xs text-gray-500 mb-2">Hanya ditampilkan di template Creative.</p>
                <div className="flex gap-2">
                  <label className="cursor-pointer bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs px-3 py-1.5 rounded shadow-sm">
                    Upload Foto
                    <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                  </label>
                  {photo && (
                    <button onClick={removePhoto} className="text-red-500 hover:text-red-700 text-xs px-2">Hapus</button>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" name="fullName" value={personalInfo.fullName} onChange={handlePersonalInfoChange} placeholder="Nama Lengkap" className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none" />
              <input type="text" name="phone" value={personalInfo.phone} onChange={handlePersonalInfoChange} placeholder="Nomor Telepon" className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none" />
              <input type="email" name="email" value={personalInfo.email} onChange={handlePersonalInfoChange} placeholder="Email" className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none" />
              <input type="text" name="location" value={personalInfo.location} onChange={handlePersonalInfoChange} placeholder="Kota, Negara" className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none" />
              <input type="text" name="linkedin" value={personalInfo.linkedin} onChange={handlePersonalInfoChange} placeholder="URL LinkedIn (Opsional)" className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none" />
              <input type="text" name="github" value={personalInfo.github} onChange={handlePersonalInfoChange} placeholder="URL Web/Porto (Opsional)" className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
          </section>

          {/* Professional Summary */}
          <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2 border-b pb-2"><Briefcase size={20}/> Ringkasan Profesional</h2>
            <textarea 
              value={summary} 
              onChange={(e) => setSummary(e.target.value)} 
              rows="4" 
              placeholder="Tuliskan 3-4 kalimat tentang keahlian utama dan pencapaian Anda..."
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none resize-y"
            ></textarea>
          </section>

          {/* Work Experience */}
          <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex justify-between items-center mb-4 border-b pb-2">
              <h2 className="text-lg font-bold flex items-center gap-2"><Briefcase size={20}/> Pengalaman Kerja</h2>
              <button onClick={addExperience} className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"><Plus size={16}/> Tambah</button>
            </div>
            
            <div className="space-y-6">
              {experiences.map((exp) => (
                <div key={exp.id} className="relative p-4 border border-gray-100 bg-gray-50 rounded-lg">
                  <button onClick={() => removeExperience(exp.id)} className="absolute top-2 right-2 text-red-500 hover:text-red-700"><Trash2 size={18}/></button>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3 pr-8">
                    <input type="text" value={exp.position} onChange={(e) => handleExperienceChange(exp.id, 'position', e.target.value)} placeholder="Posisi / Jabatan" className="w-full p-2 border rounded-md text-sm" />
                    <input type="text" value={exp.company} onChange={(e) => handleExperienceChange(exp.id, 'company', e.target.value)} placeholder="Nama Perusahaan" className="w-full p-2 border rounded-md text-sm" />
                    <input type="text" value={exp.location} onChange={(e) => handleExperienceChange(exp.id, 'location', e.target.value)} placeholder="Lokasi (Kota)" className="w-full p-2 border rounded-md text-sm" />
                    <div className="flex gap-2">
                      <input type="text" value={exp.startDate} onChange={(e) => handleExperienceChange(exp.id, 'startDate', e.target.value)} placeholder="Bulan Tahun (Mulai)" className="w-full p-2 border rounded-md text-sm" />
                      <input type="text" value={exp.endDate} onChange={(e) => handleExperienceChange(exp.id, 'endDate', e.target.value)} placeholder="Akhir / Present" className="w-full p-2 border rounded-md text-sm" />
                    </div>
                  </div>
                  <textarea 
                    value={exp.description} 
                    onChange={(e) => handleExperienceChange(exp.id, 'description', e.target.value)} 
                    rows="4" 
                    placeholder="Deskripsi pekerjaan (Gunakan tanda - untuk membuat bullet points)"
                    className="w-full p-2 border rounded-md text-sm outline-none"
                  ></textarea>
                </div>
              ))}
            </div>
          </section>

          {/* Internship Experience */}
          <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex justify-between items-center mb-4 border-b pb-2">
              <h2 className="text-lg font-bold flex items-center gap-2"><Award size={20}/> Pengalaman Magang</h2>
              <button onClick={addInternship} className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"><Plus size={16}/> Tambah</button>
            </div>
            
            <div className="space-y-6">
              {internships.map((int) => (
                <div key={int.id} className="relative p-4 border border-gray-100 bg-gray-50 rounded-lg">
                  <button onClick={() => removeInternship(int.id)} className="absolute top-2 right-2 text-red-500 hover:text-red-700"><Trash2 size={18}/></button>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3 pr-8">
                    <input type="text" value={int.position} onChange={(e) => handleInternshipChange(int.id, 'position', e.target.value)} placeholder="Posisi Magang" className="w-full p-2 border rounded-md text-sm" />
                    <input type="text" value={int.company} onChange={(e) => handleInternshipChange(int.id, 'company', e.target.value)} placeholder="Nama Perusahaan/Institusi" className="w-full p-2 border rounded-md text-sm" />
                    <input type="text" value={int.location} onChange={(e) => handleInternshipChange(int.id, 'location', e.target.value)} placeholder="Lokasi (Kota)" className="w-full p-2 border rounded-md text-sm" />
                    <div className="flex gap-2">
                      <input type="text" value={int.startDate} onChange={(e) => handleInternshipChange(int.id, 'startDate', e.target.value)} placeholder="Bulan Tahun (Mulai)" className="w-full p-2 border rounded-md text-sm" />
                      <input type="text" value={int.endDate} onChange={(e) => handleInternshipChange(int.id, 'endDate', e.target.value)} placeholder="Bulan Tahun (Selesai)" className="w-full p-2 border rounded-md text-sm" />
                    </div>
                  </div>
                  <textarea 
                    value={int.description} 
                    onChange={(e) => handleInternshipChange(int.id, 'description', e.target.value)} 
                    rows="3" 
                    placeholder="Deskripsi tugas magang (Gunakan tanda - untuk bullet points)"
                    className="w-full p-2 border rounded-md text-sm outline-none"
                  ></textarea>
                </div>
              ))}
            </div>
          </section>

          {/* Education */}
          <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex justify-between items-center mb-4 border-b pb-2">
              <h2 className="text-lg font-bold flex items-center gap-2"><GraduationCap size={20}/> Pendidikan</h2>
              <button onClick={addEducation} className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"><Plus size={16}/> Tambah</button>
            </div>
            
            <div className="space-y-4">
              {educations.map((edu) => (
                <div key={edu.id} className="relative p-4 border border-gray-100 bg-gray-50 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-3 pr-8">
                  <button onClick={() => removeEducation(edu.id)} className="absolute top-2 right-2 text-red-500 hover:text-red-700"><Trash2 size={18}/></button>
                  <input type="text" value={edu.institution} onChange={(e) => handleEducationChange(edu.id, 'institution', e.target.value)} placeholder="Nama Institusi" className="w-full p-2 border rounded-md text-sm" />
                  <input type="text" value={edu.degree} onChange={(e) => handleEducationChange(edu.id, 'degree', e.target.value)} placeholder="Gelar & Jurusan" className="w-full p-2 border rounded-md text-sm" />
                  <input type="text" value={edu.location} onChange={(e) => handleEducationChange(edu.id, 'location', e.target.value)} placeholder="Lokasi" className="w-full p-2 border rounded-md text-sm" />
                  <div className="flex gap-2">
                    <input type="text" value={edu.graduationYear} onChange={(e) => handleEducationChange(edu.id, 'graduationYear', e.target.value)} placeholder="Tahun Lulus" className="w-full p-2 border rounded-md text-sm" />
                    <input type="text" value={edu.gpa} onChange={(e) => handleEducationChange(edu.id, 'gpa', e.target.value)} placeholder="IPK (Opsional)" className="w-full p-2 border rounded-md text-sm" />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Skills */}
          <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2 border-b pb-2"><Code size={20}/> Keahlian (Skills)</h2>
            <textarea 
              value={skills} 
              onChange={(e) => setSkills(e.target.value)} 
              rows="2" 
              placeholder="Pisahkan dengan koma. Contoh: React, Node.js, Project Management"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            ></textarea>
          </section>

        </div>

        {/* PANEL KANAN: CV PREVIEW */}
        <div className="w-full lg:w-1/2 print:w-full print:absolute print:top-0 print:left-0 print:bg-white print:m-0 print:p-0">
          
          <div className="sticky top-[100px] print:static">
            
            {/* ==============================================
                TEMPLATE 1: ATS STANDARD (1 Kolom, Bersih)
                ============================================== */}
            {template === 'ats' && (
              <div className="bg-white shadow-xl print:shadow-none mx-auto p-8 print:pt-16 print:pb-12 print:px-12 w-full max-w-[210mm] min-h-[297mm] text-gray-900 leading-normal font-serif relative">
                {/* HEADER */}
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

                {/* SUMMARY */}
                {summary && (
                  <div className="mb-5">
                    <h2 className="text-[11pt] font-bold uppercase border-b border-gray-800 mb-2 text-black">Professional Summary</h2>
                    <p className="text-[10pt] text-justify text-gray-800 leading-tight">{summary}</p>
                  </div>
                )}

                {/* EXPERIENCE */}
                {experiences.length > 0 && (
                  <div className="mb-5">
                    <h2 className="text-[11pt] font-bold uppercase border-b border-gray-800 mb-2 text-black">Work Experience</h2>
                    <div className="space-y-4">
                      {experiences.map((exp) => (
                        <div key={exp.id}>
                          <div className="flex justify-between items-baseline">
                            <h3 className="text-[10.5pt] font-bold text-black">{exp.position || 'Posisi'}</h3>
                            <span className="text-[10pt] text-gray-800 font-semibold">{exp.startDate} {exp.endDate ? `- ${exp.endDate}` : ''}</span>
                          </div>
                          <div className="flex justify-between items-baseline mb-1">
                            <span className="text-[10pt] italic text-gray-800">{exp.company || 'Nama Perusahaan'}</span>
                            <span className="text-[10pt] text-gray-800">{exp.location}</span>
                          </div>
                          {renderBullets(exp.description)}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* INTERNSHIP */}
                {internships.length > 0 && (
                  <div className="mb-5">
                    <h2 className="text-[11pt] font-bold uppercase border-b border-gray-800 mb-2 text-black">Internship Experience</h2>
                    <div className="space-y-4">
                      {internships.map((int) => (
                        <div key={int.id}>
                          <div className="flex justify-between items-baseline">
                            <h3 className="text-[10.5pt] font-bold text-black">{int.position || 'Posisi'}</h3>
                            <span className="text-[10pt] text-gray-800 font-semibold">{int.startDate} {int.endDate ? `- ${int.endDate}` : ''}</span>
                          </div>
                          <div className="flex justify-between items-baseline mb-1">
                            <span className="text-[10pt] italic text-gray-800">{int.company || 'Nama Perusahaan'}</span>
                            <span className="text-[10pt] text-gray-800">{int.location}</span>
                          </div>
                          {renderBullets(int.description)}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* EDUCATION */}
                {educations.length > 0 && (
                  <div className="mb-5">
                    <h2 className="text-[11pt] font-bold uppercase border-b border-gray-800 mb-2 text-black">Education</h2>
                    <div className="space-y-3">
                      {educations.map((edu) => (
                        <div key={edu.id}>
                          <div className="flex justify-between items-baseline">
                            <h3 className="text-[10.5pt] font-bold text-black">{edu.institution || 'Nama Institusi'}</h3>
                            <span className="text-[10pt] text-gray-800 font-semibold">{edu.graduationYear}</span>
                          </div>
                          <div className="flex justify-between items-baseline">
                            <span className="text-[10pt] text-gray-800 italic">
                              {edu.degree || 'Gelar'} {edu.gpa ? ` (GPA: ${edu.gpa})` : ''}
                            </span>
                            <span className="text-[10pt] text-gray-800">{edu.location}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* SKILLS */}
                {skills && (
                  <div className="mb-5">
                    <h2 className="text-[11pt] font-bold uppercase border-b border-gray-800 mb-2 text-black">Skills & Competencies</h2>
                    <p className="text-[10pt] text-gray-800 leading-tight">{skills}</p>
                  </div>
                )}
              </div>
            )}

            {/* ==============================================
                TEMPLATE 2: CREATIVE VISUAL (2 Kolom, Warna, Icon)
                ============================================== */}
            {template === 'creative' && (
              <div className="bg-white shadow-xl print:shadow-none mx-auto w-full max-w-[210mm] min-h-[297mm] text-gray-800 leading-normal font-sans flex flex-row relative overflow-hidden">
                
                {/* SIDEBAR (KIRI) */}
                <div className={`w-[35%] ${activePalette.sidebarBg} text-white p-8 print:p-6 print:pt-10 flex flex-col gap-8 border-r-4 ${activePalette.sidebarBorderRight}`}>
                  
                  {/* Photo & Name */}
                  <div className="text-center">
                    {photo ? (
                      <img src={photo} alt="Profile" className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-slate-500 mb-4 shadow-lg" />
                    ) : (
                      <div className="w-32 h-32 rounded-full mx-auto bg-slate-600 border-4 border-slate-500 flex items-center justify-center mb-4 shadow-lg">
                        <User size={48} className="text-slate-400" />
                      </div>
                    )}
                    <h1 className="text-2xl font-bold uppercase tracking-wide leading-tight">{personalInfo.fullName || 'Nama Lengkap'}</h1>
                  </div>

                  {/* Contact Info */}
                  <div>
                    <h2 className={`text-[11pt] font-semibold uppercase tracking-wider border-b border-slate-600 pb-1 mb-3 ${activePalette.sectionTitleLeft}`}>Kontak</h2>
                    <div className="space-y-3 text-[9.5pt] text-slate-300">
                      {personalInfo.phone && (
                        <div className="flex items-center gap-3 break-all"><Phone size={14} className={`shrink-0 ${activePalette.iconContact}`}/> {personalInfo.phone}</div>
                      )}
                      {personalInfo.email && (
                        <div className="flex items-center gap-3 break-all"><Mail size={14} className={`shrink-0 ${activePalette.iconContact}`}/> {personalInfo.email}</div>
                      )}
                      {personalInfo.location && (
                        <div className="flex items-center gap-3 break-all"><MapPin size={14} className={`shrink-0 ${activePalette.iconContact}`}/> {personalInfo.location}</div>
                      )}
                      {personalInfo.linkedin && (
                        <div className="flex items-center gap-3 break-all"><Globe size={14} className={`shrink-0 ${activePalette.iconContact}`}/> {personalInfo.linkedin.replace('https://', '')}</div>
                      )}
                      {personalInfo.github && (
                        <div className="flex items-center gap-3 break-all"><Globe size={14} className={`shrink-0 ${activePalette.iconContact}`}/> {personalInfo.github.replace('https://', '')}</div>
                      )}
                    </div>
                  </div>

                  {/* Skills */}
                  {skills && (
                    <div>
                      <h2 className={`text-[11pt] font-semibold uppercase tracking-wider border-b border-slate-600 pb-1 mb-3 ${activePalette.sectionTitleLeft}`}>Keahlian</h2>
                      <div className="flex flex-wrap gap-2">
                        {skills.split(',').map((skill, index) => (
                          <span key={index} className={`text-[9pt] px-2 py-1 rounded-md border ${activePalette.skillBadge}`}>
                            {skill.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* MAIN CONTENT (KANAN) */}
                <div className="w-[65%] p-8 print:p-6 print:pt-10 bg-slate-50 flex flex-col gap-6">
                  
                  {/* Summary */}
                  {summary && (
                    <section>
                      <h2 className="text-[13pt] font-bold text-[#1e293b] flex items-center gap-2 mb-2">
                        <User size={18} className={activePalette.iconMain}/> Profil
                      </h2>
                      <div className={`w-full h-[2px] ${activePalette.dividerBg} mb-3`}><div className={`w-16 h-full ${activePalette.dividerFill}`}></div></div>
                      <p className="text-[10pt] text-gray-600 leading-relaxed text-justify">
                        {summary}
                      </p>
                    </section>
                  )}

                  {/* Experience */}
                  {experiences.length > 0 && (
                    <section>
                      <h2 className="text-[13pt] font-bold text-[#1e293b] flex items-center gap-2 mb-2">
                        <Briefcase size={18} className={activePalette.iconMain}/> Pengalaman Kerja
                      </h2>
                      <div className={`w-full h-[2px] ${activePalette.dividerBg} mb-4`}><div className={`w-16 h-full ${activePalette.dividerFill}`}></div></div>
                      <div className="space-y-5">
                        {experiences.map((exp) => (
                          <div key={exp.id} className={`relative pl-4 border-l-2 ${activePalette.timelineBorder}`}>
                            <div className={`absolute -left-[5px] top-1.5 w-2 h-2 rounded-full ${activePalette.timelineDot}`}></div>
                            <h3 className="text-[11pt] font-bold text-[#1e293b] leading-tight">{exp.position || 'Posisi'}</h3>
                            <div className={`flex flex-wrap gap-x-2 text-[9pt] ${activePalette.textAccent} font-medium mb-1 mt-0.5`}>
                              <span>{exp.company || 'Perusahaan'}</span>
                              <span className="text-gray-400">•</span>
                              <span className="text-gray-500">{exp.startDate} - {exp.endDate || 'Present'}</span>
                            </div>
                            {renderBullets(exp.description, true)}
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Internship */}
                  {internships.length > 0 && (
                    <section>
                      <h2 className="text-[13pt] font-bold text-[#1e293b] flex items-center gap-2 mb-2">
                        <Award size={18} className={activePalette.iconMain}/> Pengalaman Magang
                      </h2>
                      <div className={`w-full h-[2px] ${activePalette.dividerBg} mb-4`}><div className={`w-16 h-full ${activePalette.dividerFill}`}></div></div>
                      <div className="space-y-5">
                        {internships.map((int) => (
                          <div key={int.id} className={`relative pl-4 border-l-2 ${activePalette.timelineBorder}`}>
                            <div className={`absolute -left-[5px] top-1.5 w-2 h-2 rounded-full ${activePalette.timelineDot}`}></div>
                            <h3 className="text-[11pt] font-bold text-[#1e293b] leading-tight">{int.position || 'Posisi'}</h3>
                            <div className={`flex flex-wrap gap-x-2 text-[9pt] ${activePalette.textAccent} font-medium mb-1 mt-0.5`}>
                              <span>{int.company || 'Perusahaan'}</span>
                              <span className="text-gray-400">•</span>
                              <span className="text-gray-500">{int.startDate} - {int.endDate || 'Selesai'}</span>
                            </div>
                            {renderBullets(int.description, true)}
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Education */}
                  {educations.length > 0 && (
                    <section>
                      <h2 className="text-[13pt] font-bold text-[#1e293b] flex items-center gap-2 mb-2">
                        <GraduationCap size={18} className={activePalette.iconMain}/> Pendidikan
                      </h2>
                      <div className={`w-full h-[2px] ${activePalette.dividerBg} mb-4`}><div className={`w-16 h-full ${activePalette.dividerFill}`}></div></div>
                      <div className="space-y-4">
                        {educations.map((edu) => (
                          <div key={edu.id} className={`relative pl-4 border-l-2 ${activePalette.timelineBorder}`}>
                            <div className={`absolute -left-[5px] top-1.5 w-2 h-2 rounded-full ${activePalette.timelineDot}`}></div>
                            <h3 className="text-[11pt] font-bold text-[#1e293b] leading-tight">{edu.degree || 'Gelar'}</h3>
                            <div className="flex flex-wrap gap-x-2 text-[9pt] font-medium mb-0.5 mt-0.5">
                              <span className={activePalette.textAccent}>{edu.institution || 'Institusi'}</span>
                              <span className="text-gray-400">•</span>
                              <span className="text-gray-500">{edu.graduationYear}</span>
                            </div>
                            {(edu.location || edu.gpa) && (
                              <div className="text-[9pt] text-gray-500">
                                {edu.location} {edu.gpa ? ` | GPA: ${edu.gpa}` : ''}
                              </div>
                            )}
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

      {/* FOOTER */}
      <footer className="text-center p-6 text-gray-500 text-sm print:hidden mt-8 bg-white border-t">
        <p className="font-semibold text-gray-700 mb-1">💡 Tips Cetak PDF Bersih:</p>
        <p>1. Di menu cetak, hilangkan centang <strong>"Headers and footers"</strong>.</p>
        {template === 'creative' && (
          <p className="text-blue-600 mt-1">2. Khusus template Creative, <strong>centang opsi "Background graphics"</strong> agar warna dan foto muncul.</p>
        )}
      </footer>
    </div>
  );
};

export default App;