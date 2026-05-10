// Default state untuk CV Builder.
// Versi storage key di-bump setiap kali shape data berubah (untuk migrasi sederhana).

export const STORAGE_KEY = 'cv-builder-data-v1';

export const defaultData = {
  // UI state
  template: 'ats',
  theme: 'blue',

  // CV content
  photo: null,

  personalInfo: {
    fullName: 'Budi Santoso',
    phone: '0812-3456-7890',
    email: 'budi.santoso@email.com',
    location: 'Jakarta, Indonesia',
    linkedin: 'linkedin.com/in/budisantoso',
    github: 'github.com/budisantoso',
  },

  summary:
    'Software Engineer dengan pengalaman lebih dari 3 tahun dalam mengembangkan aplikasi web yang scalable. Berpengalaman memimpin tim kecil dan meningkatkan performa aplikasi sebesar 30%.',

  experiences: [
    {
      id: 'exp-default-1',
      company: 'PT Maju Mundur Teknologi',
      position: 'Frontend Developer',
      location: 'Jakarta',
      startDate: 'Jan 2021',
      endDate: 'Present',
      description:
        '- Mengembangkan UI responsif menggunakan React\n- Mengintegrasikan RESTful API untuk dashboard',
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
      link: '',
    },
  ],

  skills: 'JavaScript, React, Node.js, Tailwind CSS, PostgreSQL, Git, Agile',

  languages: 'Bahasa Indonesia (Native), English (Professional Working)',
};

// Default object factories untuk "+ Tambah" — keep terpisah agar bisa di-reuse di Editor.
export const blankItems = {
  experiences: { company: '', position: '', location: '', startDate: '', endDate: '', description: '' },
  organizations: { organization: '', role: '', period: '', description: '' },
  projects: { name: '', link: '', description: '' },
  educations: { institution: '', degree: '', location: '', graduationYear: '', gpa: '' },
  certifications: { name: '', issuer: '', year: '', link: '' },
};
