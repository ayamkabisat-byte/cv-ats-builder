import { BarChart3, CheckCircle2, Target, AlertTriangle, Sparkles } from 'lucide-react';
import { analyzeATS, analyzeJobMatch } from '../utils/atsAnalyzer';

const ScoreRing = ({ score, label, tone = 'blue' }) => {
  const toneMap = {
    blue: 'text-blue-700 bg-blue-50 border-blue-200',
    emerald: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    amber: 'text-amber-700 bg-amber-50 border-amber-200',
  };
  return (
    <div className={`rounded-2xl border p-4 ${toneMap[tone] || toneMap.blue}`}>
      <div className="text-[11px] uppercase tracking-[0.16em] font-semibold opacity-70">{label}</div>
      <div className="flex items-end gap-2 mt-1">
        <span className="text-3xl font-black leading-none">{score}</span>
        <span className="text-xs font-semibold mb-0.5">/ 100</span>
      </div>
    </div>
  );
};

const KeywordPills = ({ title, items, type }) => (
  <div>
    <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 mb-2">{title}</div>
    <div className="flex flex-wrap gap-1.5">
      {items.length ? items.map((item) => (
        <span key={item} className={`text-[11px] px-2 py-1 rounded-full border ${type === 'found' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-amber-50 border-amber-200 text-amber-800'}`}>
          {item}
        </span>
      )) : <span className="text-xs text-slate-400 italic">Belum ada.</span>}
    </div>
  </div>
);

export default function InsightsPanel({ data, update }) {
  const ats = analyzeATS(data);
  const job = analyzeJobMatch(data);
  const atsTone = ats.score >= 80 ? 'emerald' : ats.score >= 60 ? 'blue' : 'amber';

  return (
    <section className="cvforge-card overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-200 bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 text-white">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-sm font-bold"><Sparkles size={16} /> CV Health & Job Match</div>
            <p className="text-[11px] text-slate-300 mt-1">Analisis heuristic lokal. Data tidak dikirim ke server.</p>
          </div>
          <span className="text-[10px] uppercase tracking-[0.18em] px-2 py-1 rounded-full border border-white/20 text-blue-100">Private · Local</span>
        </div>
      </div>

      <div className="p-5 space-y-5">
        <div className="grid grid-cols-2 gap-3">
          <ScoreRing score={ats.score} label={`ATS Readiness · ${ats.label}`} tone={atsTone} />
          <ScoreRing score={job.ready ? job.score : 0} label={job.ready ? 'Job Match' : 'Job Match · paste JD'} tone={job.ready && job.score >= 70 ? 'emerald' : 'blue'} />
        </div>

        <div>
          <div className="flex justify-between text-[11px] text-slate-500 mb-1.5"><span>ATS breakdown</span><span>{ats.score}%</span></div>
          <div className="h-2 rounded-full bg-slate-100 overflow-hidden"><div className="h-full rounded-full bg-blue-600 transition-all" style={{ width: `${ats.score}%` }} /></div>
          <div className="grid grid-cols-4 gap-1 mt-2 text-center">
            {[
              ['Identity', ats.parts.identity, 25], ['Content', ats.parts.content, 45], ['Impact', ats.parts.impact, 15], ['Format', ats.parts.format, 10],
            ].map(([name, value, max]) => (
              <div key={name} className="rounded-lg bg-slate-50 border border-slate-100 py-2 px-1">
                <div className="text-xs font-bold text-slate-800">{value}/{max}</div>
                <div className="text-[9px] uppercase tracking-wide text-slate-400">{name}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800 mb-2"><BarChart3 size={14} className="text-blue-600" /> Content signals</div>
          <div className="grid grid-cols-4 gap-2 text-center">
            <div><div className="font-bold text-slate-900">{ats.stats.skillCount}</div><div className="text-[10px] text-slate-500">Skills</div></div>
            <div><div className="font-bold text-slate-900">{ats.stats.bulletCount}</div><div className="text-[10px] text-slate-500">Bullets</div></div>
            <div><div className="font-bold text-slate-900">{ats.stats.actionCount}</div><div className="text-[10px] text-slate-500">Action</div></div>
            <div><div className="font-bold text-slate-900">{ats.stats.metricCount}</div><div className="text-[10px] text-slate-500">Metrics</div></div>
          </div>
        </div>

        <div>
          <label htmlFor="job-description" className="flex items-center gap-2 text-xs font-bold text-slate-800 mb-2"><Target size={14} className="text-blue-600" /> Target Job Description</label>
          <textarea
            id="job-description"
            value={data.jobDescription || ''}
            onChange={(e) => update('jobDescription', e.target.value)}
            rows="5"
            className="cvforge-input resize-y"
            placeholder="Paste deskripsi lowongan di sini. CVForge akan membandingkan keyword secara lokal..."
          />
          <div className="text-[10px] text-slate-400 mt-1">Job Match aktif setelah minimal ±40 karakter.</div>
        </div>

        {job.ready && (
          <div className="grid md:grid-cols-2 gap-4">
            <KeywordPills title="Keywords found" items={job.found} type="found" />
            <KeywordPills title="Keywords missing" items={job.missing} type="missing" />
          </div>
        )}

        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800 mb-2"><AlertTriangle size={14} className="text-amber-500" /> Priority improvements</div>
          {ats.suggestions.length ? (
            <ul className="space-y-1.5">
              {ats.suggestions.map((item) => <li key={item} className="flex gap-2 text-xs text-slate-600"><span className="mt-0.5 text-amber-500">•</span><span>{item}</span></li>)}
            </ul>
          ) : (
            <div className="flex items-center gap-2 text-xs text-emerald-700"><CheckCircle2 size={14} /> Struktur CV sudah kuat.</div>
          )}
        </div>
      </div>
    </section>
  );
}
