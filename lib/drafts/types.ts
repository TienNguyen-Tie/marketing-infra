export type EntityKind = 'icp' | 'persona';

export type DraftStatus =
  | 'awaiting_upload'
  | 'in_review'
  | 'approved'
  | 'rejected';

// ---- Seed inputs ----

export interface SeedInputsBase {
  name: string;
  shortCode: string;
}

export interface IcpSeedInputs extends SeedInputsBase {
  industry: string;
  companySize: string;
  region: string;
  primaryGoal: string;
  additionalContext?: string;
}

export interface PersonaSeedInputs extends SeedInputsBase {
  jobTitle: string;
  seniorityLevel: string;
  icpSlug: string;
  primaryGoal: string;
  additionalContext?: string;
}

export type SeedInputs = IcpSeedInputs | PersonaSeedInputs;

// ---- Form config ----

export type FormFieldType =
  | 'text'
  | 'textarea'
  | 'select';

export interface SelectOption {
  value: string;
  label: string;
}

export interface FormFieldConfig {
  key: string;
  label: string;
  type: FormFieldType;
  placeholder?: string;
  required?: boolean;
  options?: SelectOption[];   // only for select
  hint?: string;
}

export interface EntityFormConfig {
  kind: EntityKind;
  title: string;
  description: string;
  fields: FormFieldConfig[];
}

// ---- Parsed draft ----

export interface ParsedSection {
  heading: string;
  content: string;
  raw: string;
}

export interface ParsedDraft {
  frontmatter: Record<string, unknown>;
  sections: ParsedSection[];
}

// ---- Draft row (mirrors Prisma EntityDraft) ----

export interface DraftRow {
  id: string;
  kind: EntityKind;
  status: DraftStatus;
  seedInputs: SeedInputs;
  generatedPrompt: string;
  uploadedMarkdown: string | null;
  parsedDraft: ParsedDraft | null;
  parseWarnings: string[];
  parseErrors: string[];
  edits: Record<string, unknown> | null;
  finalSnippet: string | null;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string | null;
  publishedAt: Date | null;
}
