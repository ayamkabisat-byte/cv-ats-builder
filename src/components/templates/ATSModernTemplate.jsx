import { renderBullets, normalizeUrl, parseList } from '../../utils/helpers';
import { DEFAULT_SECTION_ORDER } from '../../data/defaults';

const Heading = ({ children }) => (
  <div className="mb-2">
    <h2 className="text-[10.5pt] font-extrabold uppercase tracking-[0.12em] text-slate-900">{children}</h2>
    <div className="h-[2px] bg-slate-200 mt-1"><div className="h-full w-14 bg-blue-700" /></div>
  </div>
);

export default function ATSModernTemplate({ data }) {
  const { personalInfo: p, summary, experiences = [], projects = [], organizations = [], educations = [], certifications = [] } = data;
  const skillsList = parseList(data.skills);
  const languagesList = parseList(data.languages);
  const order = Array.isArray(data.sectionOrder) && data.sectionOrder.length ? data.sectionOrder : DEFAULT_SECTION_ORDER;
  const hidden = new Set(data.hiddenSections || []);

  const renderers = {
    summary: () => summary ? <section className="mb-4"><Heading>Professional Summary</Heading><p className="text-[9.8pt] text-slate-700 leading-snug">{summary}</p></section> : null,
    experiences: () => experiences.length ? <section className="mb-4"><Heading>Experience</Heading><div className="space-y-3">{experiences.map((exp) => <div key={exp.id}><div className="flex justify-between gap-4 items-baseline"><div><h3 className="text-[10.4pt] font-bold text-slate-950">{exp.position}</h3><div className="text-[9.5pt] font-semibold text-blue-800">{exp.company}{exp.location ? ` · ${exp.location}` : ''}</div></div><span className="text-[9pt] font-semibold text-slate-600 whitespace-nowrap">{exp.startDate}{exp.endDate ? ` – ${exp.endDate}` : ''}</span></div>{renderBullets(exp.description)}</div>)}</div></section> : null,
    projects: () => projects.length ? <section className="mb-4"><Heading>Selected Projects</Heading><div className="space-y-3">{projects.map((proj) => <div key={proj.id}><div className="text-[10.3pt] font-bold text-slate-950">{proj.name}{proj.link && <span className="font-normal text-blue-800 text-[9pt]"> · {normalizeUrl(proj.link)}</span>}</div>{renderBullets(proj.description)}</div>)}</div></section> : null,
    organizations: () => organizations.length ? <section className="mb-4"><Heading>Leadership & Organizations</Heading><div className="space-y-3">{organizations.map((org) => <div key={org.id}><div className="flex justify-between gap-4"><div><h3 className="text-[10.3pt] font-bold">{org.role}</h3><div className="text-[9.4pt] font-semibold text-blue-800">{org.organization}</div></div><span className="text-[9pt] font-semibold text-slate-600 whitespace-nowrap">{org.period}</span></div>{renderBullets(org.description)}</div>)}</div></section> : null,
    educations: () => educations.length ? <section className="mb-4"><Heading>Education</Heading><div className="space-y-2">{educations.map((edu) => <div key={edu.id}><div className="flex justify-between gap-4"><div><h3 className="text-[10.3pt] font-bold">{edu.degree}</h3><div className="text-[9.4pt] text-blue-800 font-semibold">{edu.institution}{edu.location ? ` · ${edu.location}` : ''}</div></div><span className="text-[9pt] font-semibold text-slate-600 whitespace-nowrap">{edu.graduationYear}</span></div>{edu.gpa && <div className="text-[9pt] text-slate-600">GPA: {edu.gpa}</div>}</div>)}</div></section> : null,
    certifications: () => certifications.length ? <section className="mb-4"><Heading>Certifications</Heading><div className="space-y-1">{certifications.map((cert) => <div key={cert.id} className="text-[9.6pt] text-slate-700"><strong className="text-slate-900">{cert.name}</strong> · {cert.issuer}{cert.year ? ` · ${cert.year}` : ''}{cert.link ? ` · ${normalizeUrl(cert.link)}` : ''}</div>)}</div></section> : null,
    skills: () => (skillsList.length || languagesList.length) ? <section className="mb-4"><Heading>Core Skills</Heading>{skillsList.length > 0 && <p className="text-[9.6pt] text-slate-700 mb-1"><strong>Skills:</strong> {skillsList.join(' · ')}</p>}{languagesList.length > 0 && <p className="text-[9.6pt] text-slate-700"><strong>Languages:</strong> {languagesList.join(' · ')}</p>}</section> : null,
  };

  return (
    <article className="resume-page bg-white shadow-xl print:shadow-none mx-auto p-8 print:pt-12 print:pb-10 print:px-12 w-full max-w-[210mm] min-h-[297mm] text-slate-900 font-sans">
      <header className="mb-5 pb-4 border-b-2 border-slate-900">
        <h1 className="text-[27pt] leading-none font-black tracking-[-0.035em] text-slate-950">{p.fullName || 'Nama Lengkap'}</h1>
        {p.headline && <div className="text-[11pt] font-bold text-blue-800 mt-2">{p.headline}</div>}
        <div className="flex flex-wrap gap-x-3 gap-y-1 text-[9.2pt] text-slate-600 mt-2">
          {[p.location, p.phone, p.email, p.linkedin && normalizeUrl(p.linkedin), p.github && normalizeUrl(p.github), p.website && normalizeUrl(p.website)].filter(Boolean).map((item) => <span key={item}>{item}</span>)}
        </div>
      </header>
      {order.filter((key) => !hidden.has(key)).map((key) => <div key={key}>{renderers[key]?.()}</div>)}
    </article>
  );
}
