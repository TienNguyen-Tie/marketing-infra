import type { ParsedDraft } from '../types';

// Turns a section heading like "§01 DEFINITION" into a camelCase key like "definition"
function headingToKey(heading: string): string {
  return heading
    .replace(/^§\d+\s+/, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .trim()
    .replace(/\s+(.)/g, (_, c: string) => c.toUpperCase());
}

function indent(str: string, spaces: number): string {
  const pad = ' '.repeat(spaces);
  return str
    .split('\n')
    .map(l => (l.trim() ? pad + l : ''))
    .join('\n');
}

function serializeValue(v: unknown, depth = 0): string {
  if (v === null || v === undefined) return 'undefined';
  if (typeof v === 'boolean') return String(v);
  if (typeof v === 'number') return String(v);
  if (typeof v === 'string') {
    const escaped = v.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
    if (v.includes('\n')) return `\`${escaped}\``;
    return `"${v.replace(/"/g, '\\"')}"`;
  }
  if (Array.isArray(v)) {
    if (v.length === 0) return '[]';
    const items = v.map(item => indent(serializeValue(item, depth + 1), 2));
    return `[\n${items.join(',\n')},\n]`;
  }
  if (typeof v === 'object') {
    const entries = Object.entries(v as Record<string, unknown>);
    if (entries.length === 0) return '{}';
    const lines = entries.map(([k, val]) => `  ${k}: ${serializeValue(val, depth + 1)}`);
    return `{\n${lines.join(',\n')},\n}`;
  }
  return String(v);
}

export function generateTypescriptSnippet(
  kind: 'icp' | 'persona',
  draft: ParsedDraft,
): string {
  const fm = draft.frontmatter;
  const lines: string[] = [];

  if (kind === 'icp') {
    lines.push(`/* ── ICP: ${fm.name ?? 'UNNAMED'} ──────────────────── */`);
    lines.push(`{`);
    lines.push(`  slug: ${serializeValue(fm.slug)},`);
    lines.push(`  name: ${serializeValue(fm.name)},`);
    lines.push(`  shortCode: ${serializeValue(fm.shortCode)},`);
    lines.push(`  status: 'draft',`);
    lines.push(`  tier: ${typeof fm.tier === 'string' ? serializeValue(parseInt(fm.tier.replace('tier-', ''), 10)) : '1'},`);
    lines.push(`  verticalTags: [],`);
    lines.push(`  geography: [${serializeValue(fm.region)}],`);
    lines.push(`  firstDefined: '${new Date().toISOString().split('T')[0]}',`);
    lines.push(`  lastReviewed: '${new Date().toISOString().split('T')[0]}',`);
    lines.push(``);

    for (const section of draft.sections) {
      const key = headingToKey(section.heading);
      lines.push(`  // ${section.heading}`);
      lines.push(`  ${key}: \`\n${section.content}\n\`,`);
      lines.push(``);
    }
    lines.push(`},`);
  } else {
    lines.push(`/* ── PERSONA: ${fm.name ?? 'UNNAMED'} ──────────────────── */`);
    lines.push(`{`);
    lines.push(`  slug: ${serializeValue(fm.slug)},`);
    lines.push(`  name: ${serializeValue(fm.name)},`);
    lines.push(`  shortCode: ${serializeValue(fm.shortCode)},`);
    lines.push(`  personaType: ${serializeValue(fm.personaType ?? 'champion')},`);
    lines.push(`  seniorityLevel: ${serializeValue(fm.seniorityLevel ?? 'director')},`);
    lines.push(`  influenceLevel: ${serializeValue(fm.influenceLevel ?? 'high')},`);
    const icpSlugs = Array.isArray(fm.icpSlugs) ? fm.icpSlugs : [];
    lines.push(`  icpSlugs: ${serializeValue(icpSlugs)},`);
    lines.push(`  firstDefined: '${new Date().toISOString().split('T')[0]}',`);
    lines.push(`  lastReviewed: '${new Date().toISOString().split('T')[0]}',`);
    lines.push(``);

    for (const section of draft.sections) {
      const key = headingToKey(section.heading);
      lines.push(`  // ${section.heading}`);
      lines.push(`  ${key}: \`\n${section.content}\n\`,`);
      lines.push(``);
    }
    lines.push(`},`);
  }

  const disclaimer = [
    `// ─────────────────────────────────────────────────────────────────`,
    `// AI-GENERATED DRAFT — review carefully before adding to data files`,
    `// Paste into data/${kind === 'icp' ? 'icps/icps.ts' : 'personas/personas.ts'} and reshape`,
    `// to match the full typed interface. This snippet is prose-first;`,
    `// you will need to split sections into structured fields manually.`,
    `// ─────────────────────────────────────────────────────────────────`,
  ].join('\n');

  return `${disclaimer}\n\n${lines.join('\n')}`;
}
