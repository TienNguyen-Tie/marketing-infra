import { parse as parseYaml } from 'yaml';
import type { ParsedDraft, ParsedSection } from '../types';

export interface ParseResult {
  draft: ParsedDraft;
  warnings: string[];
  errors: string[];
}

// Extracts YAML frontmatter between opening and closing --- delimiters.
function extractFrontmatter(raw: string): { yaml: string; body: string } | null {
  const trimmed = raw.trimStart();
  if (!trimmed.startsWith('---')) return null;
  const afterOpen = trimmed.slice(3);
  const closeIdx = afterOpen.indexOf('\n---');
  if (closeIdx === -1) return null;
  const yaml = afterOpen.slice(0, closeIdx).trim();
  const body = afterOpen.slice(closeIdx + 4).trim();
  return { yaml, body };
}

// Walks markdown body and splits on ### §XX headings.
function extractSections(body: string): ParsedSection[] {
  const lines = body.split('\n');
  const sections: ParsedSection[] = [];
  let currentHeading = '';
  let currentLines: string[] = [];

  for (const line of lines) {
    const headingMatch = line.match(/^###\s+(.*)/);
    if (headingMatch) {
      if (currentHeading) {
        sections.push({
          heading: currentHeading,
          content: currentLines.join('\n').trim(),
          raw: currentLines.join('\n'),
        });
      }
      currentHeading = headingMatch[1].trim();
      currentLines = [];
    } else {
      currentLines.push(line);
    }
  }

  if (currentHeading) {
    sections.push({
      heading: currentHeading,
      content: currentLines.join('\n').trim(),
      raw: currentLines.join('\n'),
    });
  }

  return sections;
}

const ICP_REQUIRED_SECTIONS = [
  '§01', '§02', '§03', '§04', '§05', '§06',
  '§07', '§08', '§09', '§10', '§11', '§12',
];

const PERSONA_REQUIRED_SECTIONS = [
  '§01', '§02', '§03', '§04', '§05', '§06',
  '§07', '§08', '§09', '§10', '§11', '§12',
];

export function parseMarkdown(raw: string, kind: 'icp' | 'persona'): ParseResult {
  const warnings: string[] = [];
  const errors: string[] = [];

  // Strip trailing sentinel comment if present
  const cleaned = raw
    .replace(/<!--\s*END OF ICP DRAFT\s*-->/i, '')
    .replace(/<!--\s*END OF PERSONA DRAFT\s*-->/i, '')
    .trim();

  // Extract YAML frontmatter
  const extracted = extractFrontmatter(cleaned);
  let frontmatter: Record<string, unknown> = {};
  let body = cleaned;

  if (!extracted) {
    // Try to find a yaml code block as fallback
    const yamlBlock = cleaned.match(/```yaml\s*\n([\s\S]*?)```/);
    if (yamlBlock) {
      try {
        frontmatter = parseYaml(yamlBlock[1]) as Record<string, unknown>;
        body = cleaned.replace(/```yaml\s*\n[\s\S]*?```/, '').trim();
        warnings.push('Frontmatter was inside a code block — extracted successfully, but prefer bare --- delimiters.');
      } catch {
        errors.push('Could not parse YAML frontmatter from code block.');
      }
    } else {
      errors.push('No YAML frontmatter found. Expected content between --- delimiters at the top of the file.');
    }
  } else {
    try {
      frontmatter = parseYaml(extracted.yaml) as Record<string, unknown>;
      body = extracted.body;
    } catch (e) {
      errors.push(`YAML frontmatter parse error: ${e instanceof Error ? e.message : String(e)}`);
    }
  }

  // Check required frontmatter fields
  const requiredFields = kind === 'icp'
    ? ['name', 'shortCode', 'slug', 'tier', 'industry', 'companySize', 'region']
    : ['name', 'shortCode', 'slug', 'personaType', 'seniorityLevel', 'influenceLevel'];

  for (const field of requiredFields) {
    if (!frontmatter[field]) {
      warnings.push(`Frontmatter field "${field}" is missing or empty.`);
    }
  }

  // Extract sections from body
  const sections = extractSections(body);

  // Check required sections are present
  const requiredSections = kind === 'icp' ? ICP_REQUIRED_SECTIONS : PERSONA_REQUIRED_SECTIONS;
  for (const sectionCode of requiredSections) {
    const found = sections.find(s => s.heading.includes(sectionCode));
    if (!found) {
      warnings.push(`Section ${sectionCode} is missing.`);
    } else if (found.content.length < 30) {
      warnings.push(`Section ${sectionCode} appears to be empty or very short — please review.`);
    }
  }

  return {
    draft: { frontmatter, sections },
    warnings,
    errors,
  };
}
