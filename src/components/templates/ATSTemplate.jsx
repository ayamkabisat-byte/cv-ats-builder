import { renderBullets, normalizeUrl, parseList } from '../../utils/helpers';

/**
 * Template ATS — single column, font serif, no graphics.
 * Dirancang agar bisa di-parse oleh Applicant Tracking System (ATS).
 * Hindari icon, sidebar, atau elemen grafis yang biasanya merusak parsing ATS.
 */
export default function ATSTemplate({ data }) {
  const {
    personalInfo, summary, experiences, projects, organizations,
    educations, certifications, skills, languages,
  } = data;

  const skillsList = parseList(skills);
  const languagesList = parseList(languages);

  return (
    <div className="bg-white shadow-xl print:shadow-none mx-auto p-8 print:pt-16 print:pb-12 print:px-12 w-full max-w-[210mm] min-h-[297mm] text-gray-900 leading-normal font-serif relative">

      {/* Header */}
      <div className="text-center mb-6 border-b border-gray-300 pb-4">
        <h1 className="text-3xl font-bold uppercase tracking-wide mb-2 text-black">
          {personalInfo.fullName || 'NAMA LENGKAP'}
        </h1>
        <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-[10pt] text-gray-700">
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.phone && (
            <>
              <span className="text-gray-400" aria-hidden="true">•</span>
              <span>{personalInfo.phone}</span>
            </>
          )}
          {personalInfo.email && (
            <>
              <span className="text-gray-400" aria-hidden="true">•</span>
              <span>{personalInfo.email}</span>
            </>
          )}
        </div>
        <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-[10pt] text-gray-700 mt-1">
          {personalInfo.linkedin && <span>{normalizeUrl(personalInfo.linkedin)}</span>}
          {personalInfo.linkedin && personalInfo.github && (
            <span className="text-gray-400" aria-hidden="true">•</span>
          )}
          {personalInfo.github && <span>{normalizeUrl(personalInfo.github)}</span>}
        </div>
      </div>

      {/* Professional Summary */}
      {summary && (
        <div className="mb-4">
          <h2 className="text-[11pt] font-bold uppercase border-b border-gray-800 mb-2 text-black">
            Professional Summary
          </h2>
          <p className="text-[10pt] text-justify text-gray-800 leading-tight">{summary}</p>
        </div>
      )}

      {/* Work Experience */}
      {experiences.length > 0 && (
        <div className="mb-4">
          <h2 className="text-[11pt] font-bold uppercase border-b border-gray-800 mb-2 text-black">
            Work Experience
          </h2>
          <div className="space-y-3">
            {experiences.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-[10.5pt] font-bold text-black">{exp.position}</h3>
                  <span className="text-[10pt] text-gray-800 font-semibold">
                    {exp.startDate}
                    {exp.endDate ? ` - ${exp.endDate}` : ''}
                  </span>
                </div>
                <div className="text-[10pt] italic text-gray-800 mb-1">
                  {exp.company}
                  {exp.location ? ` - ${exp.location}` : ''}
                </div>
                {renderBullets(exp.description)}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div className="mb-4">
          <h2 className="text-[11pt] font-bold uppercase border-b border-gray-800 mb-2 text-black">
            Projects
          </h2>
          <div className="space-y-3">
            {projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-[10.5pt] font-bold text-black">
                    {proj.name}
                    {proj.link && (
                      <span className="font-normal text-gray-600 text-[9pt]">
                        {' '}
                        | {normalizeUrl(proj.link)}
                      </span>
                    )}
                  </h3>
                </div>
                {renderBullets(proj.description)}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Organizations */}
      {organizations.length > 0 && (
        <div className="mb-4">
          <h2 className="text-[11pt] font-bold uppercase border-b border-gray-800 mb-2 text-black">
            Organizations &amp; Volunteering
          </h2>
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

      {/* Education */}
      {educations.length > 0 && (
        <div className="mb-4">
          <h2 className="text-[11pt] font-bold uppercase border-b border-gray-800 mb-2 text-black">
            Education
          </h2>
          <div className="space-y-2">
            {educations.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-[10.5pt] font-bold text-black">{edu.institution}</h3>
                  <span className="text-[10pt] text-gray-800 font-semibold">{edu.graduationYear}</span>
                </div>
                <div className="text-[10pt] text-gray-800 italic">
                  {edu.degree}
                  {edu.location ? ` — ${edu.location}` : ''}
                  {edu.gpa ? ` (GPA: ${edu.gpa})` : ''}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <div className="mb-4">
          <h2 className="text-[11pt] font-bold uppercase border-b border-gray-800 mb-2 text-black">
            Certifications
          </h2>
          <ul className="list-disc list-outside ml-4 mt-1 space-y-0.5 text-gray-800">
            {certifications.map((cert) => (
              <li key={cert.id} className="text-[10pt] leading-tight">
                <strong>{cert.name}</strong> - {cert.issuer} ({cert.year})
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Skills & Languages */}
      {(skillsList.length > 0 || languagesList.length > 0) && (
        <div className="mb-4">
          <h2 className="text-[11pt] font-bold uppercase border-b border-gray-800 mb-2 text-black">
            Skills &amp; Languages
          </h2>
          {skillsList.length > 0 && (
            <p className="text-[10pt] text-gray-800 leading-tight mb-1">
              <strong>Skills:</strong> {skillsList.join(', ')}
            </p>
          )}
          {languagesList.length > 0 && (
            <p className="text-[10pt] text-gray-800 leading-tight">
              <strong>Languages:</strong> {languagesList.join(', ')}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
