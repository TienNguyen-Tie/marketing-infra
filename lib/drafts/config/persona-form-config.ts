import { EntityFormConfig } from '../types';

export const PERSONA_FORM_CONFIG: EntityFormConfig = {
  kind: 'persona',
  title: 'New Persona Draft',
  description: 'Answer a few questions and Claude will generate a research prompt. Download it, run it in Claude.ai, then paste the markdown back here.',
  fields: [
    {
      key: 'name',
      label: 'Persona Name',
      type: 'text',
      placeholder: 'e.g. Regional Commerce Director',
      required: true,
      hint: 'Job title or role archetype — not a person\'s name.',
    },
    {
      key: 'shortCode',
      label: 'Short Code',
      type: 'text',
      placeholder: 'e.g. RCD',
      required: true,
      hint: 'Short uppercase label (2–5 chars) used in pills.',
    },
    {
      key: 'jobTitle',
      label: 'Typical Job Title(s)',
      type: 'text',
      placeholder: 'e.g. Director of E-commerce, Head of Digital Commerce',
      required: true,
      hint: 'Comma-separate multiple variants.',
    },
    {
      key: 'seniorityLevel',
      label: 'Seniority Level',
      type: 'select',
      required: true,
      options: [
        { value: 'executive', label: 'Executive (C-suite, VP, GM)' },
        { value: 'director', label: 'Director' },
        { value: 'manager', label: 'Manager' },
        { value: 'operator', label: 'Operator / Specialist' },
      ],
    },
    {
      key: 'icpSlug',
      label: 'Associated ICP',
      type: 'select',
      required: true,
      hint: 'Which ICP does this persona most commonly appear in?',
      options: [
        { value: 'mnc-global-fmcg', label: 'MNC / Global FMCG' },
        { value: 'regional-d2c-beauty', label: 'Regional D2C Beauty' },
        { value: 'vietnamese-domestic-cpg', label: 'Vietnamese Domestic CPG' },
        { value: 'mnc-pharma-otc', label: 'MNC Pharma OTC' },
        { value: 'multiple', label: 'Multiple / Cross-ICP' },
      ],
    },
    {
      key: 'primaryGoal',
      label: 'Primary Professional Goal',
      type: 'text',
      placeholder: 'e.g. Drive measurable GMV growth through creator commerce while managing brand safety',
      required: true,
    },
    {
      key: 'additionalContext',
      label: 'Additional Context',
      type: 'textarea',
      placeholder: 'Any extra details — typical org structure above/below, known blockers, geographic nuance…',
      required: false,
    },
  ],
};
