const ACTION_VERBS = [
  'achieved','accelerated','automated','built','created','delivered','designed','developed','drove','enabled','improved','increased','launched','led','managed','optimized','reduced','resolved','scaled','streamlined','implemented','integrated','migrated','mentored','owned','planned','produced','saved','secured','supported','trained','won',
  'mencapai','mengembangkan','membangun','meningkatkan','mengurangi','memimpin','mengelola','mengoptimalkan','mengimplementasikan','mengintegrasikan','merancang','meluncurkan','menyelesaikan','mengotomatisasi','menghemat','mendorong','menangani',
];

const STOP_WORDS = new Set([
  'and','the','for','with','from','that','this','will','you','your','our','are','was','were','have','has','had','into','using','use','who','their','they','but','not','all','any','can','may','more','than','work','working','role','job','position','team','teams','years','year','experience','experienced','skills','skill','required','preferred','responsibilities','responsibility','requirements','including','such','other','about','across','within','through','strong','excellent','good','ability','knowledge',
  'dan','yang','untuk','dengan','dari','pada','dalam','atau','sebagai','akan','kami','kamu','anda','mereka','ini','itu','lebih','kerja','bekerja','pekerjaan','posisi','pengalaman','tahun','kemampuan','keahlian','memiliki','dibutuhkan','diutamakan','tanggung','jawab','termasuk','serta','baik','mampu','tentang','antara','secara','terhadap',
]);

const normalize = (text = '') => String(text)
  .toLowerCase()
  .replace(/https?:\/\/\S+/g, ' ')
  .replace(/[^a-z0-9+#.\-\s]/gi, ' ')
  .replace(/\s+/g, ' ')
  .trim();

const allText = (data) => {
  const p = data.personalInfo || {};
  const chunks = [p.fullName, p.headline, p.location, data.summary, data.skills, data.languages];
  (data.experiences || []).forEach((item) => chunks.push(item.position, item.company, item.location, item.description));
  (data.projects || []).forEach((item) => chunks.push(item.name, item.description));
  (data.organizations || []).forEach((item) => chunks.push(item.role, item.organization, item.description));
  (data.educations || []).forEach((item) => chunks.push(item.institution, item.degree));
  (data.certifications || []).forEach((item) => chunks.push(item.name, item.issuer));
  return normalize(chunks.filter(Boolean).join(' '));
};

const bulletLines = (data) => [
  ...(data.experiences || []).flatMap((item) => String(item.description || '').split('\n')),
  ...(data.projects || []).flatMap((item) => String(item.description || '').split('\n')),
  ...(data.organizations || []).flatMap((item) => String(item.description || '').split('\n')),
].map((line) => normalize(line.replace(/^[-*•]\s*/, ''))).filter(Boolean);

const hasMetric = (line) => /(\b\d+(?:[.,]\d+)?\s?%\b|\b\d+[kmb+]?\b|rp\s?\d+|\$\s?\d+|\b\d+\s?(users?|clients?|projects?|days?|hours?|weeks?|months?|orang|pengguna|proyek|hari|jam|minggu|bulan)\b)/i.test(line);
const startsWithActionVerb = (line) => ACTION_VERBS.some((verb) => line === verb || line.startsWith(`${verb} `));

export function analyzeATS(data) {
  const p = data.personalInfo || {};
  const bullets = bulletLines(data);
  const skills = String(data.skills || '').split(',').map((x) => x.trim()).filter(Boolean);
  const summaryLength = String(data.summary || '').trim().length;
  const scoreParts = { identity: 0, content: 0, impact: 0, format: 0 };
  const suggestions = [];

  if (p.fullName?.trim()) scoreParts.identity += 5; else suggestions.push('Tambahkan nama lengkap.');
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.email || '')) scoreParts.identity += 5; else suggestions.push('Gunakan alamat email profesional yang valid.');
  if (String(p.phone || '').replace(/\D/g, '').length >= 8) scoreParts.identity += 4; else suggestions.push('Tambahkan nomor telepon yang dapat dihubungi.');
  if (p.location?.trim()) scoreParts.identity += 3;
  if (p.headline?.trim()) scoreParts.identity += 5; else suggestions.push('Tambahkan professional headline / target role.');
  if (p.linkedin?.trim() || p.github?.trim() || p.website?.trim()) scoreParts.identity += 3;

  if (summaryLength >= 120 && summaryLength <= 500) scoreParts.content += 10;
  else if (summaryLength > 0) { scoreParts.content += 5; suggestions.push('Ringkasan profesional idealnya sekitar 120–500 karakter dan fokus pada value/impact.'); }
  else suggestions.push('Tambahkan professional summary singkat.');

  if ((data.experiences || []).length >= 1) scoreParts.content += 15; else suggestions.push('Tambahkan pengalaman kerja atau pengalaman relevan.');
  if ((data.educations || []).length >= 1) scoreParts.content += 5;
  if (skills.length >= 5) scoreParts.content += 10; else if (skills.length) { scoreParts.content += 5; suggestions.push('Tambahkan minimal sekitar 5 skill yang relevan dengan target role.'); } else suggestions.push('Tambahkan skills yang relevan.');
  if ((data.projects || []).length || (data.certifications || []).length) scoreParts.content += 5;

  const actionCount = bullets.filter(startsWithActionVerb).length;
  const metricCount = bullets.filter(hasMetric).length;
  if (bullets.length) {
    scoreParts.impact += Math.round(Math.min(8, (actionCount / bullets.length) * 10));
    scoreParts.impact += Math.round(Math.min(7, (metricCount / bullets.length) * 12));
    if (actionCount / bullets.length < 0.5) suggestions.push('Mulai lebih banyak bullet dengan action verb yang kuat.');
    if (metricCount === 0) suggestions.push('Tambahkan hasil terukur: %, jumlah pengguna, waktu, biaya, volume, atau KPI.');
  } else suggestions.push('Tambahkan achievement bullets pada pengalaman/proyek.');

  const atsFriendly = data.template === 'ats' || data.template === 'ats-modern';
  scoreParts.format = atsFriendly ? 10 : 6;
  if (!atsFriendly) suggestions.push('Untuk lamaran yang sangat ATS-sensitive, gunakan template ATS Classic atau ATS Modern.');

  const score = Math.min(100, Object.values(scoreParts).reduce((a, b) => a + b, 0));
  return {
    score,
    label: score >= 85 ? 'Strong' : score >= 70 ? 'Good' : score >= 55 ? 'Needs work' : 'Incomplete',
    parts: scoreParts,
    suggestions: [...new Set(suggestions)].slice(0, 6),
    stats: { bulletCount: bullets.length, actionCount, metricCount, skillCount: skills.length },
  };
}

function extractKeywords(text) {
  const words = normalize(text).split(' ').filter((word) => word.length >= 3 && !STOP_WORDS.has(word));
  const freq = new Map();
  words.forEach((word) => freq.set(word, (freq.get(word) || 0) + 1));

  const bigrams = [];
  for (let i = 0; i < words.length - 1; i += 1) {
    const phrase = `${words[i]} ${words[i + 1]}`;
    if (phrase.length <= 36) bigrams.push(phrase);
  }
  bigrams.forEach((phrase) => freq.set(phrase, (freq.get(phrase) || 0) + 1.35));

  return [...freq.entries()]
    .sort((a, b) => b[1] - a[1] || b[0].length - a[0].length)
    .map(([keyword, weight]) => ({ keyword, weight }))
    .filter((item, index, arr) => !arr.slice(0, index).some((prev) => prev.keyword.includes(item.keyword) && prev.keyword !== item.keyword))
    .slice(0, 28);
}

export function analyzeJobMatch(data) {
  const jd = String(data.jobDescription || '').trim();
  if (jd.length < 40) return { score: 0, found: [], missing: [], keywords: [], ready: false };

  const resume = allText(data);
  const keywords = extractKeywords(jd);
  let matchedWeight = 0;
  let totalWeight = 0;
  const found = [];
  const missing = [];

  keywords.forEach(({ keyword, weight }) => {
    totalWeight += weight;
    if (resume.includes(keyword)) {
      matchedWeight += weight;
      found.push(keyword);
    } else missing.push(keyword);
  });

  const baseScore = totalWeight ? Math.round((matchedWeight / totalWeight) * 100) : 0;
  const headline = normalize(data.personalInfo?.headline || '');
  const titleBonus = keywords.some(({ keyword }) => keyword.includes('engineer') || keyword.includes('developer') || keyword.includes('manager') || keyword.includes('analyst') || keyword.includes('designer')) && headline
    ? 3
    : 0;

  return {
    score: Math.min(100, baseScore + titleBonus),
    found: found.slice(0, 12),
    missing: missing.slice(0, 12),
    keywords: keywords.map((item) => item.keyword),
    ready: true,
  };
}
