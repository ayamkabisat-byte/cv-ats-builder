// Default state untuk CVForge.
// v2 mempertahankan migrasi dari storage lama melalui useLocalStorage.

export const STORAGE_KEY = 'cvforge-data-v2';
export const LEGACY_STORAGE_KEYS = ['cv-builder-data-v1'];

export const DEFAULT_SECTION_ORDER = [
  'summary',
  'experiences',
  'projects',
  'organizations',
  'educations',
  'certifications',
  'skills',
];

export const SECTION_LABELS = {
  summary: 'Professional Summary',
  experiences: 'Work Experience',
  projects: 'Projects',
  organizations: 'Organizations',
  educations: 'Education',
  certifications: 'Certifications',
  skills: 'Skills & Languages',
};

export const defaultData = {
  // UI state
  template: 'ats',
  theme: 'blue',
  sectionOrder: DEFAULT_SECTION_ORDER,
  hiddenSections: [],

  // Local ATS / job matcher input
  jobDescription: '',

  // CV content
  photo: null,

  personalInfo: {
    fullName: 'Budi Santoso',
    headline: 'Frontend Engineer · React · Design Systems',
    phone: '0812-3456-7890',
    email: 'budi.santoso@email.com',
    location: 'Jakarta, Indonesia',
    linkedin: 'linkedin.com/in/budisantoso',
    github: 'github.com/budisantoso',
    website: '',
  },

  summary:
    'Frontend Engineer dengan pengalaman lebih dari 3 tahun membangun aplikasi web yang scalable. Berpengalaman memimpin tim kecil, mengembangkan design system, dan meningkatkan performa aplikasi sebesar 30%.',

  experiences: [
    {
      id: 'exp-default-1',
      company: 'PT Maju Mundur Teknologi',
      position: 'Frontend Developer',
      location: 'Jakarta',
      startDate: 'Jan 2021',
      endDate: 'Present',
      description:
        '- Mengembangkan dashboard React yang digunakan 120+ pengguna internal\n- Mengoptimalkan rendering dan mengurangi waktu muat halaman sebesar 30%\n- Mengintegrasikan REST API untuk workflow pelaporan',
    },
  ],

  organizations: [],
  projects: [],

  educations: [
    {
      id: 'edu-default-1',
      institution: 'Universitas Teknologi Indonesia',
      degree: 'S1 Teknik Informatika',
      location: 'Bandung',
      graduationYear: '2020',
      gpa: '3.85',
    },
  ],

  certifications: [
    {
      id: 'cert-default-1',
      name: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      year: '2023',
      link: 'https://www.credly.com/',
    },
  ],

  skills: 'JavaScript, React, Node.js, Tailwind CSS, PostgreSQL, Git, Agile',
  languages: 'Bahasa Indonesia (Native), English (Professional Working)',
};

export const blankItems = {
  experiences: { company: '', position: '', location: '', startDate: '', endDate: '', description: '' },
  organizations: { organization: '', role: '', period: '', description: '' },
  projects: { name: '', link: '', description: '' },
  educations: { institution: '', degree: '', location: '', graduationYear: '', gpa: '' },
  certifications: { name: '', issuer: '', year: '', link: '' },
};
