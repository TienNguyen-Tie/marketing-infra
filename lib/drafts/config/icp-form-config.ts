import { EntityFormConfig } from '../types';

export const ICP_FORM_CONFIG: EntityFormConfig = {
  kind: 'icp',
  title: 'New ICP Draft',
  description: 'Answer a few questions and Claude will generate a research prompt. Download it, run it in Claude.ai, then paste the markdown back here.',
  fields: [
    {
      key: 'name',
      label: 'ICP Name',
      type: 'text',
      placeholder: 'e.g. MNC / Global FMCG with VN Market Presence',
      required: true,
      hint: 'Descriptive title for this ideal customer profile.',
    },
    {
      key: 'shortCode',
      label: 'Short Code',
      type: 'text',
      placeholder: 'e.g. MNC-FMCG',
      required: true,
      hint: 'Short uppercase label used in pills and tags (2–10 chars).',
    },
    {
      key: 'industry',
      label: 'Industry / Vertical',
      type: 'text',
      placeholder: 'e.g. FMCG, Beauty, Pharma OTC',
      required: true,
    },
    {
      key: 'companySize',
      label: 'Company Size',
      type: 'select',
      required: true,
      options: [
        { value: 'enterprise', label: 'Enterprise (1,000+ employees, global HQ)' },
        { value: 'large', label: 'Large (200–999 employees)' },
        { value: 'mid-market', label: 'Mid-market (50–199 employees)' },
        { value: 'sme', label: 'SME (< 50 employees)' },
      ],
    },
    {
      key: 'region',
      label: 'Primary Region / Market',
      type: 'text',
      placeholder: 'e.g. Vietnam, Southeast Asia, APAC',
      required: true,
    },
    {
      key: 'primaryGoal',
      label: 'Primary Business Goal',
      type: 'text',
      placeholder: 'e.g. Drive online GMV in VN via KOL/livestream commerce',
      required: true,
      hint: 'What is this ICP primarily trying to achieve through VinaCapital?',
    },
    {
      key: 'additionalContext',
      label: 'Additional Context',
      type: 'textarea',
      placeholder: 'Any extra details about buying signals, known pain points, or what makes this segment distinct…',
      required: false,
    },
  ],
};
