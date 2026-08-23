import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { defaultData, LEGACY_STORAGE_KEYS, STORAGE_KEY } from './data/defaults';
import { generateId } from './utils/helpers';
import { analyzeATS, analyzeJobMatch } from './utils/atsAnalyzer';
import HeaderV2 from './components/HeaderV2';
import EditorV2 from './components/EditorV2';
import InsightsPanel from './components/InsightsPanel';
import ATSTemplateV2 from './components/templates/ATSTemplateV2';
import ATSModernTemplate from './components/templates/ATSModernTemplate';
import CreativeTemplateV2 from './components/templates/CreativeTemplateV2';

function mergeImportedData(incoming) {
  if (!incoming || typeof incoming !== 'object' || Array.isArray(incoming)) throw new Error('Format backup tidak valid.');
  const source = incoming.data && typeof incoming.data === 'object' ? incoming.data : incoming;
  return {
    ...defaultData,
    ...source,
    personalInfo: { ...defaultData.personalInfo, ...(source.personalInfo || {}) },
    experiences: Array.isArray(source.experiences) ? source.experiences : defaultData.experiences,
    organizations: Array.isArray(source.organizations) ? source.organizations : [],
    projects: Array.isArray(source.projects) ? source.projects : [],
    educations: Array.isArray(source.educations) ? source.educations : defaultData.educations,
    certifications: Array.isArray(source.certifications) ? source.certifications : [],
    sectionOrder: Array.isArray(source.sectionOrder) ? source.sectionOrder : defaultData.sectionOrder,
    hiddenSections: Array.isArray(source.hiddenSections) ? source.hiddenSections : [],
  };
}

export default function App() {
  const [data, setData] = useLocalStorage(STORAGE_KEY, defaultData, LEGACY_STORAGE_KEYS);
  const [toast, setToast] = useState('');
  const [pageCount, setPageCount] = useState(1);
  const previewRef = useRef(null);
  const toastTimer = useRef(null);

  const ats = useMemo(() => analyzeATS(data), [data]);
  const job = useMemo(() => analyzeJobMatch(data), [data]);

  const showToast = (message) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast(message);
    toastTimer.current = setTimeout(() => setToast(''), 2600);
  };

  useEffect(() => () => toastTimer.current && clearTimeout(toastTimer.current), []);

  useEffect(() => {
    const measure = () => {
      const page = previewRef.current?.querySelector('.resume-page');
      if (!page) return;
      const width = page.getBoundingClientRect().width;
      if (!width) return;
      const a4Height = width * (297 / 210);
      setPageCount(Math.max(1, Math.ceil(page.scrollHeight / a4Height)));
    };
    const timer = setTimeout(measure, 80);
    window.addEventListener('resize', measure);
    return () => { clearTimeout(timer); window.removeEventListener('resize', measure); };
  }, [data]);

  const update = (field, value) => setData((prev) => ({ ...prev, [field]: value }));
  const updatePersonalInfo = (field, value) => setData((prev) => ({ ...prev, personalInfo: { ...prev.personalInfo, [field]: value } }));
  const updateItem = (key, id, field, value) => setData((prev) => ({ ...prev, [key]: (prev[key] || []).map((item) => item.id === id ? { ...item, [field]: value } : item) }));
  const addItem = (key, defaultObj) => setData((prev) => ({ ...prev, [key]: [...(prev[key] || []), { id: generateId(), ...defaultObj }] }));
  const removeItem = (key, id) => setData((prev) => ({ ...prev, [key]: (prev[key] || []).filter((item) => item.id !== id) }));

  const handleReset = () => {
    if (window.confirm('Reset semua data CVForge ke contoh awal? Backup data terlebih dahulu jika diperlukan.')) {
      setData(defaultData);
      showToast('CV di-reset ke default v2.');
    }
  };

  const handlePrint = () => {
    const previous = document.title;
    const name = (data.personalInfo?.fullName || 'CV').trim().replace(/\s+/g, '-');
    const role = (data.personalInfo?.headline || '').split(/[·|,]/)[0].trim().replace(/\s+/g, '-');
    document.title = `${name}${role ? `-${role}` : ''}-CV`;
    const restore = () => { document.title = previous; window.removeEventListener('afterprint', restore); };
    window.addEventListener('afterprint', restore);
    window.print();
  };

  const handleExport = () => {
    const payload = { version: 2, app: 'CVForge', exportedAt: new Date().toISOString(), data };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    const safeName = (data.personalInfo?.fullName || 'cv').trim().replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '').toLowerCase();
    anchor.href = url;
    anchor.download = `${safeName || 'cv'}-cvforge-backup.json`;
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    showToast('Backup JSON dibuat.');
  };

  const handleImport = async (file) => {
    try {
      if (file.size > 5 * 1024 * 1024) throw new Error('File backup terlalu besar.');
      const parsed = JSON.parse(await file.text());
      const next = mergeImportedData(parsed);
      setData(next);
      showToast('Backup berhasil di-import.');
    } catch (error) {
      window.alert(`Import gagal: ${error.message}`);
    }
  };

  const templateLabel = data.template === 'ats-modern' ? 'ATS Modern' : data.template === 'creative' ? 'Creative' : 'ATS Classic';

  return (
    <div className="min-h-screen bg-[#f3f6fb] text-slate-900">
      <HeaderV2
        data={data}
        setTemplate={(value) => update('template', value)}
        setTheme={(value) => update('theme', value)}
        onPrint={handlePrint}
        onReset={handleReset}
        onExport={handleExport}
        onImport={handleImport}
        atsScore={ats.score}
        jobScore={job.ready ? job.score : null}
      />

      <main className="max-w-[1680px] mx-auto p-4 xl:p-6 grid grid-cols-1 xl:grid-cols-[minmax(420px,0.86fr)_minmax(620px,1.14fr)] gap-5 items-start">
        <div className="space-y-4 xl:max-h-[calc(100vh-92px)] xl:overflow-y-auto xl:pr-1 cvforge-scroll print:hidden">
          <InsightsPanel data={data} update={update} />
          <EditorV2 data={data} update={update} updatePersonalInfo={updatePersonalInfo} updateItem={updateItem} addItem={addItem} removeItem={removeItem} />
        </div>

        <section className="min-w-0 print:w-full print:absolute print:top-0 print:left-0 print:m-0 print:p-0">
          <div className="xl:sticky xl:top-[88px] print:static">
            <div className="preview-toolbar print:hidden">
              <div><span className="font-bold text-slate-800">Live Preview</span><span className="text-slate-400 ml-2">{templateLabel} · A4</span></div>
              <div className="flex items-center gap-3"><span className={pageCount > 2 ? 'text-amber-600 font-semibold' : 'text-slate-500'}>{pageCount} page{pageCount > 1 ? 's' : ''}</span><span className="text-emerald-600">● Auto-saved locally</span></div>
            </div>
            {pageCount > 2 && <div className="print:hidden mb-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800">CV terdeteksi sekitar {pageCount} halaman. Pertimbangkan merangkum pengalaman lama atau menyembunyikan section yang kurang relevan.</div>}
            <div ref={previewRef} className="preview-stage">
              {data.template === 'ats' && <ATSTemplateV2 data={data} />}
              {data.template === 'ats-modern' && <ATSModernTemplate data={data} />}
              {data.template === 'creative' && <CreativeTemplateV2 data={data} />}
            </div>
          </div>
        </section>
      </main>

      {toast && <div className="cvforge-toast print:hidden">{toast}</div>}
    </div>
  );
}
