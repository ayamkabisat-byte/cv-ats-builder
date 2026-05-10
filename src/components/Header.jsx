import { Printer, FileText, LayoutTemplate, Palette, RotateCcw } from 'lucide-react';
import { colorPalettes } from '../data/colorPalettes';

/**
 * Top navbar — sticky di atas halaman, hilang saat print.
 * Berisi:
 * - Logo / nama app
 * - Toggle template (ATS / Creative)
 * - Color palette picker (hanya muncul saat template = creative)
 * - Tombol Reset Data
 * - Tombol Cetak PDF
 */
export default function Header({ template, setTemplate, theme, setTheme, onPrint, onReset }) {
  return (
    <header className="bg-white shadow-sm p-4 sticky top-0 z-10 print:hidden flex flex-col sm:flex-row justify-between items-center gap-4">
      <h1 className="text-xl font-bold text-blue-600 flex items-center gap-2">
        <Printer size={24} aria-hidden="true" /> Ultimate CV Builder
      </h1>

      <div
        className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg"
        role="tablist"
        aria-label="Pilih template CV"
      >
        <button
          role="tab"
          aria-selected={template === 'ats'}
          onClick={() => setTemplate('ats')}
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            template === 'ats' ? 'bg-white shadow text-blue-600' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <FileText size={16} aria-hidden="true" /> ATS
        </button>
        <button
          role="tab"
          aria-selected={template === 'creative'}
          onClick={() => setTemplate('creative')}
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            template === 'creative' ? 'bg-white shadow text-blue-600' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <LayoutTemplate size={16} aria-hidden="true" /> Creative
        </button>
      </div>

      {template === 'creative' && (
        <div
          className="flex items-center gap-2 bg-gray-100 p-1.5 rounded-lg"
          role="radiogroup"
          aria-label="Pilih palet warna"
        >
          <Palette size={16} className="text-gray-500 ml-1" aria-hidden="true" />
          <div className="flex gap-1.5 px-1">
            {Object.keys(colorPalettes).map((key) => (
              <button
                key={key}
                role="radio"
                aria-checked={theme === key}
                aria-label={colorPalettes[key].name}
                onClick={() => setTheme(key)}
                title={colorPalettes[key].name}
                className={`w-6 h-6 rounded-full ${colorPalettes[key].preview} border-2 transition-transform ${
                  theme === key ? 'border-white ring-2 ring-blue-400 scale-110' : 'border-transparent hover:scale-105'
                }`}
              />
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center gap-2">
        <button
          onClick={onReset}
          className="flex items-center gap-1.5 text-gray-600 hover:text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
          title="Reset semua data ke nilai awal"
        >
          <RotateCcw size={16} aria-hidden="true" /> Reset
        </button>
        <button
          onClick={onPrint}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
        >
          <Printer size={18} aria-hidden="true" /> Cetak PDF
        </button>
      </div>
    </header>
  );
}
