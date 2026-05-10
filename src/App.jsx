import { useLocalStorage } from './hooks/useLocalStorage';
import { defaultData, STORAGE_KEY } from './data/defaults';
import { generateId } from './utils/helpers';
import Header from './components/Header';
import Editor from './components/Editor';
import ATSTemplate from './components/templates/ATSTemplate';
import CreativeTemplate from './components/templates/CreativeTemplate';

/**
 * Root component. Bertanggung jawab untuk:
 * - State global (lewat useLocalStorage → autosave otomatis)
 * - Action helpers (update, addItem, removeItem, dll)
 * - Layout dua kolom (Editor kiri, Template Preview kanan)
 *
 * Semua rendering UI didelegasikan ke Header / Editor / Template.
 */
export default function App() {
  const [data, setData] = useLocalStorage(STORAGE_KEY, defaultData);

  // ----- Generic state updaters -----

  const update = (field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const updatePersonalInfo = (field, value) => {
    setData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value },
    }));
  };

  const updateItem = (key, id, field, value) => {
    setData((prev) => ({
      ...prev,
      [key]: prev[key].map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    }));
  };

  const addItem = (key, defaultObj) => {
    setData((prev) => ({
      ...prev,
      [key]: [...prev[key], { id: generateId(), ...defaultObj }],
    }));
  };

  const removeItem = (key, id) => {
    setData((prev) => ({
      ...prev,
      [key]: prev[key].filter((item) => item.id !== id),
    }));
  };

  // ----- Aksi UI -----

  const handleReset = () => {
    if (window.confirm('Yakin reset semua data CV ke nilai awal? Aksi ini tidak bisa dibatalkan.')) {
      setData(defaultData);
    }
  };

  const handlePrint = () => window.print();

  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-900">
      <Header
        template={data.template}
        setTemplate={(t) => update('template', t)}
        theme={data.theme}
        setTheme={(t) => update('theme', t)}
        onPrint={handlePrint}
        onReset={handleReset}
      />

      <main className="max-w-7xl mx-auto p-4 flex flex-col lg:flex-row gap-8 items-start">
        <Editor
          data={data}
          update={update}
          updatePersonalInfo={updatePersonalInfo}
          updateItem={updateItem}
          addItem={addItem}
          removeItem={removeItem}
        />

        <div className="w-full lg:w-1/2 print:w-full print:absolute print:top-0 print:left-0 print:bg-white print:m-0 print:p-0">
          <div className="lg:sticky lg:top-[100px] print:static">
            {data.template === 'ats' && <ATSTemplate data={data} />}
            {data.template === 'creative' && <CreativeTemplate data={data} />}
          </div>
        </div>
      </main>
    </div>
  );
}
