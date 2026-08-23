import { useRef } from 'react';
import {
  BriefcaseBusiness, Download, FileText, Gauge, LayoutTemplate, Palette, Printer,
  RotateCcw, Upload, WandSparkles,
} from 'lucide-react';
import { colorPalettes } from '../data/colorPalettes';

const TemplateButton = ({ active, onClick, icon: Icon, children }) => (
  <button
    type="button"
    role="tab"
    aria-selected={active}
    onClick={onClick}
    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
      active ? 'bg-white text-blue-700 shadow-sm ring-1 ring-slate-200' : 'text-slate-500 hover:text-slate-900 hover:bg-white/60'
    }`}
  >
    <Icon size={14} aria-hidden="true" /> {children}
  </button>
);

export default function HeaderV2({
  data, setTemplate, setTheme, onPrint, onReset, onExport, onImport, atsScore, jobScore,
}) {
  const fileRef = useRef(null);
  const creative = data.template === 'creative';

  const handleFile = (event) => {
    const file = event.target.files?.[0];
    if (file) onImport(file);
    event.target.value = '';
  };

  return (
    <header className="cvforge-header print:hidden">
      <div className="max-w-[1680px] mx-auto px-4 xl:px-6 py-3 flex flex-col xl:flex-row xl:items-center gap-3 xl:gap-5">
        <div className="flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white grid place-items-center shadow-lg shadow-blue-900/20">
              <BriefcaseBusiness size={21} />
            </div>
            <div>
              <div className="text-[15px] font-black tracking-tight text-white leading-tight">CVFORGE</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-blue-200/70">Build · Optimize · Match</div>
            </div>
          </div>
          <div className="xl:hidden flex items-center gap-2">
            <span className="score-chip"><Gauge size={12} /> ATS {atsScore}</span>
            {jobScore !== null && <span className="score-chip emerald">Match {jobScore}%</span>}
          </div>
        </div>

        <div className="flex-1 flex flex-col lg:flex-row lg:items-center gap-3 min-w-0">
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl overflow-x-auto" role="tablist" aria-label="Pilih template CV">
            <TemplateButton active={data.template === 'ats'} onClick={() => setTemplate('ats')} icon={FileText}>ATS Classic</TemplateButton>
            <TemplateButton active={data.template === 'ats-modern'} onClick={() => setTemplate('ats-modern')} icon={WandSparkles}>ATS Modern</TemplateButton>
            <TemplateButton active={creative} onClick={() => setTemplate('creative')} icon={LayoutTemplate}>Creative</TemplateButton>
          </div>

          {creative && (
            <div className="flex items-center gap-2 bg-white/10 border border-white/10 p-1.5 rounded-xl overflow-x-auto" role="radiogroup" aria-label="Pilih palet warna">
              <Palette size={14} className="text-blue-100 shrink-0 ml-1" />
              {Object.keys(colorPalettes).map((key) => (
                <button
                  key={key}
                  type="button"
                  role="radio"
                  aria-checked={data.theme === key}
                  aria-label={colorPalettes[key].name}
                  title={colorPalettes[key].name}
                  onClick={() => setTheme(key)}
                  className={`w-6 h-6 rounded-full shrink-0 ${colorPalettes[key].preview} border-2 transition-transform ${
                    data.theme === key ? 'border-white ring-2 ring-blue-300 scale-110' : 'border-white/20 hover:scale-105'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between xl:justify-end gap-2 flex-wrap shrink-0">
          <div className="hidden xl:flex items-center gap-2 mr-1">
            <span className="score-chip"><Gauge size={12} /> ATS {atsScore}</span>
            {jobScore !== null && <span className="score-chip emerald">Match {jobScore}%</span>}
          </div>

          <input ref={fileRef} type="file" accept="application/json,.json" className="hidden" onChange={handleFile} />
          <button type="button" onClick={() => fileRef.current?.click()} className="header-tool" title="Import backup JSON"><Upload size={15} /><span className="hidden sm:inline">Import</span></button>
          <button type="button" onClick={onExport} className="header-tool" title="Export backup JSON"><Download size={15} /><span className="hidden sm:inline">Backup</span></button>
          <button type="button" onClick={onReset} className="header-tool danger" title="Reset semua data"><RotateCcw size={15} /><span className="hidden sm:inline">Reset</span></button>
          <button type="button" onClick={onPrint} className="header-primary"><Printer size={16} /> Export PDF</button>
        </div>
      </div>
    </header>
  );
}
