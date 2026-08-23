import { renderBullets, normalizeUrl, parseList } from '../../utils/helpers';
import { DEFAULT_SECTION_ORDER } from '../../data/defaults';

const Heading = ({ children }) => <h2 className="text-[11pt] font-bold uppercase tracking-[0.04em] border-b border-gray-800 mb-2 text-black">{children}</h2>;

export default function ATSTemplateV2({ data }) {
  const { personalInfo: p, summary, experiences = [], projects = [], organizations = [], educations = [], certifications = [] } = data;
  const skillsList = parseList(data.skills);
  const languagesList = parseList(data.languages);
  const order = Array.isArray(data.sectionOrder) && data.sectionOrder.length ? data.sectionOrder : DEFAULT_SECTION_ORDER;
  const hidden = new Set(data.hiddenSections || []);

  const renderers = {
    summary: () => summary ? <section className="mb-4"><Heading>Professional Summary</Heading><p className="text-[10pt] text-gray-800 leading-snug">{summary}</p></section> : null,
    experiences: () => experiences.length ? <section className="mb-4"><Heading>Work Experience</Heading><div className="space-y-3">{experiences.map((exp) => <div key={exp.id}><div className="flex justify-between gap-4 items-baseline"><h3 className="text-[10.5pt] font-bold text-black">{exp.position}</h3><span className="text-[9.5pt] font-semibold whitespace-nowrap">{exp.startDate}{exp.endDate ? ` - ${exp.endDate}` : ''}</span></div><div className="text-[10pt] italic text-gray-800 mb-1">{exp.company}{exp.location ? ` — ${exp.location}` : ''}</div>{renderBullets(exp.description)}</div>)}</div></section> : null,
    projects: () => projects.length ? <section className="mb-4"><Heading>Projects</Heading><div className="space-y-3">{projects.map((proj) => <div key={proj.id}><div className="text-[10.5pt] font-bold text-black">{proj.name}{proj.link && <span className="font-normal text-gray-600 text-[9pt]"> · {normalizeUrl(proj.link)}</span>}</div>{renderBullets(proj.description)}</div>)}</div></section> : null,
    organizations: () => organizations.length ? <section className="mb-4"><Heading>Organizations & Volunteering</Heading><div className="space-y-3">{organizations.map((org) => <div key={org.id}><div className="flex justify-between gap-4"><h3 className="text-[10.5pt] font-bold">{org.role}</h3><span className="text-[9.5pt] font-semibold whitespace-nowrap">{org.period}</span></div><div className="text-[10pt] italic text-gray-800 mb-1">{org.organization}</div>{renderBullets(org.description)}</div>)}</div></section> : null,
    educations: () => educations.length ? <section className="mb-4"><Heading>Education</Heading><div className="space-y-2">{educations.map((edu) => <div key={edu.id}><div className="flex justify-between gap-4"><h3 className="text-[10.5pt] font-bold">{edu.institution}</h3><span className="text-[9.5pt] font-semibold whitespace-nowrap">{edu.graduationYear}</span></div><div className="text-[10pt] italic text-gray-800">{edu.degree}{edu.location ? ` — ${edu.location}` : ''}{edu.gpa ? ` (GPA: ${edu.gpa})` : ''}</div></div>)}</div></section> : null,
    certifications: () => certifications.length ? <section className="mb-4"><Heading>Certifications</Heading><ul className="list-disc ml-4 space-y-0.5">{certifications.map((cert) => <li key={cert.id} className="text-[10pt] leading-tight"><strong>{cert.name}</strong> — {cert.issuer}{cert.year ? ` (${cert.year})` : ''}{cert.link ? ` · ${normalizeUrl(cert.link)}` : ''}</li>)}</ul></section> : null,
    skills: () => (skillsList.length || languagesList.length) ? <section className="mb-4"><Heading>Skills & Languages</Heading>{skillsList.length > 0 && <p className="text-[10pt] leading-snug mb-1"><strong>Skills:</strong> {skillsList.join(', ')}</p>}{languagesList.length > 0 && <p className="text-[10pt] leading-snug"><strong>Languages:</strong> {languagesList.join(', ')}</p>}</section> : null,
  };

  return (
    <article className="resume-page bg-white shadow-xl print:shadow-none mx-auto p-8 print:pt-12 print:pb-10 print:px-12 w-full max-w-[210mm] min-h-[297mm] text-gray-900 font-serif">
      <header className="text-center mb-5 border-b border-gray-300 pb-4">
        <h1 className="text-3xl font-bold uppercase tracking-wide text-black">{p.fullName || 'NAMA LENGKAP'}</h1>
        {p.headline && <div className="text-[11pt] font-semibold text-gray-700 mt-1">{p.headline}</div>}
        <div className="flex flex-wrap justify-center gap-x-2 gap-y-0.5 text-[9.5pt] text-gray-700 mt-2">
          {[p.location, p.phone, p.email].filter(Boolean).map((item, index) => <span key={item}>{index > 0 && <span className="text-gray-400 mr-2">•</span>}{item}</span>)}
        </div>
        <div className="flex flex-wrap justify-center gap-x-2 gap-y-0.5 text-[9pt] text-gray-600 mt-1">
          {[p.linkedin, p.github, p.website].filter(Boolean).map((item, index) => <span key={item}>{index > 0 && <span className="text-gray-400 mr-2">•</span>}{normalizeUrl(item)}</span>)}
        </div>
      </header>
      {order.filter((key) => !hidden.has(key)).map((key) => <div key={key}>{renderers[key]?.()}</div>)}
    </article>
  );
}
