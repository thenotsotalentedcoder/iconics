const nameKey = (s) => (s.name || '').trim().toLowerCase().replace(/\s+/g, ' ');

// A person added as both keynote and workshop speaker exists as two records.
// Collapse them into one (first record wins) and merge their workshop titles.
export function dedupeSpeakers(speakers) {
  const byKey = new Map();
  const out = [];
  speakers.forEach((s) => {
    const key = nameKey(s);
    if (!key) { out.push(s); return; }
    const seen = byKey.get(key);
    if (!seen) {
      const copy = { ...s, workshops: [...(s.workshops || [])] };
      byKey.set(key, copy);
      out.push(copy);
    } else {
      (s.workshops || []).forEach((w) => { if (!seen.workshops.includes(w)) seen.workshops.push(w); });
    }
  });
  return out;
}
