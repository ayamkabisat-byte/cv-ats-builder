import {
  User, Briefcase, GraduationCap, FolderOpen, Users, Mail, Phone, MapPin, Globe,
} from 'lucide-react';
import { colorPalettes } from '../../data/colorPalettes';
import { renderBullets, normalizeUrl, parseList } from '../../utils/helpers';

/**
 * Template Creative — two column layout:
 *  - Sidebar kiri (35%): foto, kontak, skills, languages, certifications
 *  - Main content kanan (65%): summary, experience, projects, organizations, education
 *
 * Pakai timeline dot + connecting line untuk visual hierarchy.
 * Warna sepenuhnya didikte oleh `data.theme` lewat colorPalettes.
 */
export default function CreativeTemplate({ data }) {
  const {
    photo, personalInfo, summary, experiences, projects, organizations,
    educations, certifications, skills, languages, theme,
  } = data;

  // Fallback ke palet 'blue' kalau theme tidak valid (mis. saat migrasi data lama).
  const palette = colorPalettes[theme] || colorPalettes.blue;

  const skillsList = parseList(skills);
  const languagesList = parseList(languages);

  return (
    <div className="bg-white shadow-xl print:shadow-none mx-auto w-full max-w-[210mm] min-h-[297mm] text-gray-800 leading-normal font-sans flex flex-row relative overflow-hidden">

      {/* ==================== SIDEBAR (KIRI) ==================== */}
      <aside className={`creative-sidebar w-[35%] ${palette.sidebarBg} text-white p-6 print:p-6 print:pt-10 flex flex-col gap-6 border-r-4 ${palette.sidebarBorderRight}`}>

        {/* Photo & Name */}
        <div className="text-center">
          {photo ? (
            <img
              src={photo}
              alt={`Foto profil ${personalInfo.fullName}`}
              className="w-28 h-28 rounded-full mx-auto object-cover border-4 border-slate-500 mb-3 shadow-lg"
            />
          ) : (
            <div className="w-28 h-28 rounded-full mx-auto bg-slate-600 border-4 border-slate-500 flex items-center justify-center mb-3 shadow-lg">
              <User size={40} className="text-slate-400" aria-hidden="true" />
            </div>
          )}
          <h1 className="text-xl font-bold uppercase tracking-wide leading-tight">
            {personalInfo.fullName || 'NAMA LENGKAP'}
          </h1>
        </div>

        {/* Kontak */}
        <div>
          <h2 className={`text-[10pt] font-semibold uppercase tracking-wider border-b border-slate-600 pb-1 mb-2 ${palette.sectionTitleLeft}`}>
            Kontak
          </h2>
          <div className="space-y-2 text-[9pt] text-slate-300">
            {personalInfo.phone && (
              <div className="flex items-center gap-2 break-all">
                <Phone size={12} className={`shrink-0 ${palette.iconContact}`} aria-hidden="true" />
                {personalInfo.phone}
              </div>
            )}
            {personalInfo.email && (
              <div className="flex items-center gap-2 break-all">
                <Mail size={12} className={`shrink-0 ${palette.iconContact}`} aria-hidden="true" />
                {personalInfo.email}
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-center gap-2 break-all">
                <MapPin size={12} className={`shrink-0 ${palette.iconContact}`} aria-hidden="true" />
                {personalInfo.location}
              </div>
            )}
            {personalInfo.linkedin && (
              <div className="flex items-center gap-2 break-all">
                <Globe size={12} className={`shrink-0 ${palette.iconContact}`} aria-hidden="true" />
                {normalizeUrl(personalInfo.linkedin)}
              </div>
            )}
            {personalInfo.github && (
              <div className="flex items-center gap-2 break-all">
                <Globe size={12} className={`shrink-0 ${palette.iconContact}`} aria-hidden="true" />
                {normalizeUrl(personalInfo.github)}
              </div>
            )}
          </div>
        </div>

        {/* Keahlian */}
        {skillsList.length > 0 && (
          <div>
            <h2 className={`text-[10pt] font-semibold uppercase tracking-wider border-b border-slate-600 pb-1 mb-2 ${palette.sectionTitleLeft}`}>
              Keahlian
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {skillsList.map((skill, index) => (
                <span key={index} className={`text-[8.5pt] px-2 py-0.5 rounded-md border ${palette.skillBadge}`}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Bahasa */}
        {languagesList.length > 0 && (
          <div>
            <h2 className={`text-[10pt] font-semibold uppercase tracking-wider border-b border-slate-600 pb-1 mb-2 ${palette.sectionTitleLeft}`}>
              Bahasa
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {languagesList.map((lang, index) => (
                <span key={index} className={`text-[8.5pt] px-2 py-0.5 rounded-md border ${palette.skillBadge}`}>
                  {lang}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Sertifikasi */}
        {certifications.length > 0 && (
          <div>
            <h2 className={`text-[10pt] font-semibold uppercase tracking-wider border-b border-slate-600 pb-1 mb-2 ${palette.sectionTitleLeft}`}>
              Sertifikasi
            </h2>
            <div className="space-y-2 text-[8.5pt] text-slate-300">
              {certifications.map((cert) => (
                <div key={cert.id}>
                  <div className="font-bold text-white">{cert.name}</div>
                  <div>
                    {cert.issuer} ({cert.year})
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </aside>

      {/* ==================== MAIN CONTENT (KANAN) ==================== */}
      <main className="w-[65%] p-6 print:p-6 print:pt-10 bg-slate-50 flex flex-col gap-5">

        {/* Profil */}
        {summary && (
          <section>
            <h2 className="text-[12pt] font-bold text-[#1e293b] flex items-center gap-2 mb-1">
              <User size={16} className={palette.iconMain} aria-hidden="true" /> Profil
            </h2>
            <div className={`w-full h-[2px] ${palette.dividerBg} mb-2`}>
              <div className={`w-12 h-full ${palette.dividerFill}`} />
            </div>
            <p className="text-[9.5pt] text-gray-600 leading-relaxed text-justify">{summary}</p>
          </section>
        )}

        {/* Pengalaman Kerja */}
        {experiences.length > 0 && (
          <section>
            <h2 className="text-[12pt] font-bold text-[#1e293b] flex items-center gap-2 mb-1">
              <Briefcase size={16} className={palette.iconMain} aria-hidden="true" /> Pengalaman Kerja
            </h2>
            <div className={`w-full h-[2px] ${palette.dividerBg} mb-3`}>
              <div className={`w-12 h-full ${palette.dividerFill}`} />
            </div>
            <div className="space-y-4">
              {experiences.map((exp) => (
                <div key={exp.id} className={`relative pl-3 border-l-2 ${palette.timelineBorder}`}>
                  <div className={`absolute -left-[5px] top-1.5 w-2 h-2 rounded-full ${palette.timelineDot}`} />
                  <h3 className="text-[10.5pt] font-bold text-[#1e293b] leading-tight">{exp.position}</h3>
                  <div className={`text-[8.5pt] ${palette.textAccent} font-medium mb-1`}>
                    {exp.company} • {exp.startDate}
                    {exp.endDate ? ` - ${exp.endDate}` : ''}
                  </div>
                  {renderBullets(exp.description, true)}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Proyek */}
        {projects.length > 0 && (
          <section>
            <h2 className="text-[12pt] font-bold text-[#1e293b] flex items-center gap-2 mb-1">
              <FolderOpen size={16} className={palette.iconMain} aria-hidden="true" /> Proyek
            </h2>
            <div className={`w-full h-[2px] ${palette.dividerBg} mb-3`}>
              <div className={`w-12 h-full ${palette.dividerFill}`} />
            </div>
            <div className="space-y-3">
              {projects.map((proj) => (
                <div key={proj.id} className={`relative pl-3 border-l-2 ${palette.timelineBorder}`}>
                  <div className={`absolute -left-[5px] top-1.5 w-2 h-2 rounded-full ${palette.timelineDot}`} />
                  <h3 className="text-[10.5pt] font-bold text-[#1e293b] leading-tight">{proj.name}</h3>
                  {proj.link && (
                    <div className={`text-[8.5pt] ${palette.textAccent} font-medium mb-1`}>
                      {normalizeUrl(proj.link)}
                    </div>
                  )}
                  {renderBullets(proj.description, true)}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Organisasi */}
        {organizations.length > 0 && (
          <section>
            <h2 className="text-[12pt] font-bold text-[#1e293b] flex items-center gap-2 mb-1">
              <Users size={16} className={palette.iconMain} aria-hidden="true" /> Organisasi
            </h2>
            <div className={`w-full h-[2px] ${palette.dividerBg} mb-3`}>
              <div className={`w-12 h-full ${palette.dividerFill}`} />
            </div>
            <div className="space-y-3">
              {organizations.map((org) => (
                <div key={org.id} className={`relative pl-3 border-l-2 ${palette.timelineBorder}`}>
                  <div className={`absolute -left-[5px] top-1.5 w-2 h-2 rounded-full ${palette.timelineDot}`} />
                  <h3 className="text-[10.5pt] font-bold text-[#1e293b] leading-tight">{org.role}</h3>
                  <div className={`text-[8.5pt] ${palette.textAccent} font-medium mb-1`}>
                    {org.organization} • {org.period}
                  </div>
                  {renderBullets(org.description, true)}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Pendidikan */}
        {educations.length > 0 && (
          <section>
            <h2 className="text-[12pt] font-bold text-[#1e293b] flex items-center gap-2 mb-1">
              <GraduationCap size={16} className={palette.iconMain} aria-hidden="true" /> Pendidikan
            </h2>
            <div className={`w-full h-[2px] ${palette.dividerBg} mb-3`}>
              <div className={`w-12 h-full ${palette.dividerFill}`} />
            </div>
            <div className="space-y-3">
              {educations.map((edu) => (
                <div key={edu.id} className={`relative pl-3 border-l-2 ${palette.timelineBorder}`}>
                  <div className={`absolute -left-[5px] top-1.5 w-2 h-2 rounded-full ${palette.timelineDot}`} />
                  <h3 className="text-[10.5pt] font-bold text-[#1e293b] leading-tight">{edu.degree}</h3>
                  <div className={`text-[8.5pt] ${palette.textAccent} font-medium`}>
                    {edu.institution} • {edu.graduationYear}
                    {edu.gpa ? ` • IPK ${edu.gpa}` : ''}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
