import {
  Briefcase, FolderOpen, GraduationCap, Globe, Mail, MapPin, Phone, User, Users,
} from 'lucide-react';
import { colorPalettes } from '../../data/colorPalettes';
import { renderBullets, normalizeUrl, parseList } from '../../utils/helpers';
import { DEFAULT_SECTION_ORDER } from '../../data/defaults';

const MainHeading = ({ icon: Icon, title, palette }) => (
  <>
    <h2 className="text-[12pt] font-bold text-[#1e293b] flex items-center gap-2 mb-1"><Icon size={16} className={palette.iconMain} /> {title}</h2>
    <div className={`w-full h-[2px] ${palette.dividerBg} mb-3`}><div className={`w-12 h-full ${palette.dividerFill}`} /></div>
  </>
);

export default function CreativeTemplateV2({ data }) {
  const { photo, personalInfo: p, summary, experiences = [], projects = [], organizations = [], educations = [], certifications = [] } = data;
  const palette = colorPalettes[data.theme] || colorPalettes.blue;
  const skillsList = parseList(data.skills);
  const languagesList = parseList(data.languages);
  const order = Array.isArray(data.sectionOrder) && data.sectionOrder.length ? data.sectionOrder : DEFAULT_SECTION_ORDER;
  const hidden = new Set(data.hiddenSections || []);
  const mainOrder = order.filter((key) => !['skills', 'certifications'].includes(key) && !hidden.has(key));
  const sidebarOrder = order.filter((key) => ['skills', 'certifications'].includes(key) && !hidden.has(key));

  const mainRenderers = {
    summary: () => summary ? <section><MainHeading icon={User} title="Profil" palette={palette} /><p className="text-[9.5pt] text-gray-600 leading-relaxed">{summary}</p></section> : null,
    experiences: () => experiences.length ? <section><MainHeading icon={Briefcase} title="Pengalaman Kerja" palette={palette} /><div className="space-y-4">{experiences.map((exp) => <div key={exp.id} className={`relative pl-3 border-l-2 ${palette.timelineBorder}`}><div className={`absolute -left-[5px] top-1.5 w-2 h-2 rounded-full ${palette.timelineDot}`} /><h3 className="text-[10.5pt] font-bold text-[#1e293b] leading-tight">{exp.position}</h3><div className={`text-[8.5pt] ${palette.textAccent} font-semibold mb-1`}>{exp.company}{exp.location ? ` · ${exp.location}` : ''} · {exp.startDate}{exp.endDate ? ` – ${exp.endDate}` : ''}</div>{renderBullets(exp.description, true)}</div>)}</div></section> : null,
    projects: () => projects.length ? <section><MainHeading icon={FolderOpen} title="Proyek" palette={palette} /><div className="space-y-3">{projects.map((proj) => <div key={proj.id} className={`relative pl-3 border-l-2 ${palette.timelineBorder}`}><div className={`absolute -left-[5px] top-1.5 w-2 h-2 rounded-full ${palette.timelineDot}`} /><h3 className="text-[10.5pt] font-bold text-[#1e293b]">{proj.name}</h3>{proj.link && <div className={`text-[8.5pt] ${palette.textAccent} font-medium mb-1`}>{normalizeUrl(proj.link)}</div>}{renderBullets(proj.description, true)}</div>)}</div></section> : null,
    organizations: () => organizations.length ? <section><MainHeading icon={Users} title="Organisasi" palette={palette} /><div className="space-y-3">{organizations.map((org) => <div key={org.id} className={`relative pl-3 border-l-2 ${palette.timelineBorder}`}><div className={`absolute -left-[5px] top-1.5 w-2 h-2 rounded-full ${palette.timelineDot}`} /><h3 className="text-[10.5pt] font-bold text-[#1e293b]">{org.role}</h3><div className={`text-[8.5pt] ${palette.textAccent} font-medium mb-1`}>{org.organization} · {org.period}</div>{renderBullets(org.description, true)}</div>)}</div></section> : null,
    educations: () => educations.length ? <section><MainHeading icon={GraduationCap} title="Pendidikan" palette={palette} /><div className="space-y-3">{educations.map((edu) => <div key={edu.id} className={`relative pl-3 border-l-2 ${palette.timelineBorder}`}><div className={`absolute -left-[5px] top-1.5 w-2 h-2 rounded-full ${palette.timelineDot}`} /><h3 className="text-[10.5pt] font-bold text-[#1e293b]">{edu.degree}</h3><div className={`text-[8.5pt] ${palette.textAccent} font-medium`}>{edu.institution}{edu.location ? ` · ${edu.location}` : ''} · {edu.graduationYear}{edu.gpa ? ` · IPK ${edu.gpa}` : ''}</div></div>)}</div></section> : null,
  };

  const sidebarRenderers = {
    skills: () => (
      <>
        {skillsList.length > 0 && <SidebarGroup title="Keahlian" palette={palette}><div className="flex flex-wrap gap-1.5">{skillsList.map((skill) => <span key={skill} className={`text-[8.2pt] px-2 py-0.5 rounded-md border ${palette.skillBadge}`}>{skill}</span>)}</div></SidebarGroup>}
        {languagesList.length > 0 && <SidebarGroup title="Bahasa" palette={palette}><div className="space-y-1 text-[8.5pt] text-slate-200">{languagesList.map((lang) => <div key={lang}>{lang}</div>)}</div></SidebarGroup>}
      </>
    ),
    certifications: () => certifications.length ? <SidebarGroup title="Sertifikasi" palette={palette}><div className="space-y-2 text-[8.2pt] text-slate-200">{certifications.map((cert) => <div key={cert.id}><div className="font-bold text-white">{cert.name}</div><div>{cert.issuer}{cert.year ? ` · ${cert.year}` : ''}</div>{cert.link && <div className="opacity-70 break-all">{normalizeUrl(cert.link)}</div>}</div>)}</div></SidebarGroup> : null,
  };

  return (
    <article className="resume-page bg-white shadow-xl print:shadow-none mx-auto w-full max-w-[210mm] min-h-[297mm] text-gray-800 font-sans flex flex-row relative overflow-hidden">
      <aside className={`creative-sidebar w-[35%] ${palette.sidebarBg} text-white p-6 print:p-6 print:pt-10 flex flex-col gap-5 border-r-4 ${palette.sidebarBorderRight}`}>
        <div className="text-center">
          {photo ? <img src={photo} alt={`Foto profil ${p.fullName || ''}`} className="w-28 h-28 rounded-full mx-auto object-cover border-4 border-white/25 mb-3 shadow-lg" /> : <div className="w-28 h-28 rounded-full mx-auto bg-white/10 border-4 border-white/15 grid place-items-center mb-3"><User size={38} className="text-white/35" /></div>}
          <h1 className="text-xl font-bold uppercase tracking-wide leading-tight">{p.fullName || 'NAMA LENGKAP'}</h1>
          {p.headline && <div className={`text-[9pt] font-semibold mt-1 ${palette.sectionTitleLeft}`}>{p.headline}</div>}
        </div>

        <SidebarGroup title="Kontak" palette={palette}>
          <div className="space-y-2 text-[8.5pt] text-slate-200">
            {p.phone && <Contact icon={Phone} palette={palette}>{p.phone}</Contact>}
            {p.email && <Contact icon={Mail} palette={palette}>{p.email}</Contact>}
            {p.location && <Contact icon={MapPin} palette={palette}>{p.location}</Contact>}
            {p.linkedin && <Contact icon={Globe} palette={palette}>{normalizeUrl(p.linkedin)}</Contact>}
            {p.github && <Contact icon={Globe} palette={palette}>{normalizeUrl(p.github)}</Contact>}
            {p.website && <Contact icon={Globe} palette={palette}>{normalizeUrl(p.website)}</Contact>}
          </div>
        </SidebarGroup>

        {sidebarOrder.map((key) => <div key={key}>{sidebarRenderers[key]?.()}</div>)}
      </aside>

      <main className="w-[65%] p-6 print:p-6 print:pt-10 bg-slate-50 flex flex-col gap-5">
        {mainOrder.map((key) => <div key={key}>{mainRenderers[key]?.()}</div>)}
      </main>
    </article>
  );
}

const SidebarGroup = ({ title, palette, children }) => <section><h2 className={`text-[9.5pt] font-semibold uppercase tracking-wider border-b border-white/20 pb-1 mb-2 ${palette.sectionTitleLeft}`}>{title}</h2>{children}</section>;
const Contact = ({ icon: Icon, palette, children }) => <div className="flex items-start gap-2 break-all"><Icon size={12} className={`shrink-0 mt-0.5 ${palette.iconContact}`} /> <span>{children}</span></div>;
