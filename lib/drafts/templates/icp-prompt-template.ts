export const ICP_PROMPT_TEMPLATE = `You are a marketing intelligence analyst for VinaCapital, Southeast Asia's leading social commerce and creator marketing platform, headquartered in Vietnam. Your job is to produce a detailed, structured Ideal Customer Profile (ICP) dossier for our internal marketing intelligence tool.

## Context

**ICP Name**: {{name}}
**Short Code**: {{shortCode}}
**Industry / Vertical**: {{industry}}
**Company Size**: {{companySize}}
**Primary Region / Market**: {{region}}
**Primary Goal with VinaCapital**: {{primaryGoal}}
{{#additionalContext}}
**Additional Context**: {{additionalContext}}
{{/additionalContext}}

VinaCapital's core offerings are:
- Livestream commerce (KOL/KOC-led live selling on TikTok, Shopee Live, Lazada Live)
- Creator/KOL management and matching
- Social commerce campaign management
- Performance-based affiliate & shop-in-shop models
- Insights & analytics for creator commerce

---

## Output Instructions

Return ONLY valid markdown following the exact structure below. Do not add any commentary outside the markdown. Use the YAML frontmatter block for typed fields and the markdown sections for prose.

Download the template file from the tool to see the exact expected format, then fill it in completely. Every section must be populated — do not leave any section empty or use placeholder text.

---

## Template

\`\`\`yaml
---
name: "{{name}}"
shortCode: "{{shortCode}}"
slug: "{{slugHint}}"
tier: "tier-1"           # tier-1 | tier-2 | tier-3
maturityScore: 0         # 0–100 integer
industry: "{{industry}}"
companySize: "{{companySize}}"
region: "{{region}}"
---
\`\`\`

### §01 DEFINITION

Write 2–3 paragraphs defining this ICP. Who are they? What makes them a distinct segment? What is their strategic context in the Vietnamese / SEA market?

### §02 BUYING SIGNALS

List 6–10 specific, observable signals that indicate a company in this ICP is likely to be receptive to VinaCapital's offering. Be specific — not generic marketing truisms.

Format as a bullet list.

### §03 PAIN POINTS

List 5–8 genuine pain points this ICP experiences that VinaCapital's services directly address. Be specific to the social commerce and creator marketing context.

Format as a bullet list.

### §04 DECISION PROCESS

Describe the typical buying process for this ICP:
- Who initiates (role/title)?
- Who evaluates proposals (role/title)?
- Who approves budget (role/title)?
- What is the typical timeline from first contact to contract?
- What procurement or compliance steps are common?

### §05 PRIMARY DECISION-MAKER

Describe the primary decision-maker persona for this ICP:
- Typical title(s)
- What they care about most
- How they measure success
- Common objections they raise

### §06 VALUE PROPOSITIONS

List 5–8 specific value propositions that resonate with this ICP, ordered by impact. Frame each as a concrete outcome, not a feature.

Format as a bullet list.

### §07 QUALIFICATION CRITERIA

List the criteria VinaCapital should use to qualify or disqualify a prospect in this ICP:
- **Must-haves** (deal-breakers if absent)
- **Strong fits** (accelerate pursuit)
- **Disqualifiers** (walk away signals)

### §08 COMPETITIVE LANDSCAPE

Who else is competing for this ICP's budget? List 3–5 competitors or alternatives (including "doing it in-house") and explain how VinaCapital differentiates against each.

### §09 ENGAGEMENT APPROACH

Describe the ideal outreach and engagement approach for this ICP:
- Preferred channels (LinkedIn, email, events, warm intro, etc.)
- Tone and messaging angle
- What NOT to do
- Recommended first-touch content or hook

### §10 SAMPLE COMPANIES

List 5–8 real companies in Vietnam or SEA that fit this ICP. For each, note: company name, why they fit, current estimated maturity with creator commerce, and any known VinaCapital connection.

### §11 HYPOTHESES

List 3–5 testable hypotheses about this ICP that VinaCapital's team should validate through sales conversations and deal data. Frame each as "We believe [X] because [Y]. We'll know we're right when [Z]."

### §12 WATCH LIST

List any emerging trends, regulatory changes, or market shifts that could significantly change the dynamics of this ICP within the next 12–24 months.

---

After completing the full markdown, end your response with exactly this line:
<!-- END OF ICP DRAFT -->
`;

export function buildIcpPrompt(inputs: {
  name: string;
  shortCode: string;
  industry: string;
  companySize: string;
  region: string;
  primaryGoal: string;
  additionalContext?: string;
}): string {
  const slugHint = inputs.name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');

  let prompt = ICP_PROMPT_TEMPLATE
    .replace(/{{name}}/g, inputs.name)
    .replace(/{{shortCode}}/g, inputs.shortCode)
    .replace(/{{slugHint}}/g, slugHint)
    .replace(/{{industry}}/g, inputs.industry)
    .replace(/{{companySize}}/g, inputs.companySize)
    .replace(/{{region}}/g, inputs.region)
    .replace(/{{primaryGoal}}/g, inputs.primaryGoal);

  if (inputs.additionalContext) {
    prompt = prompt.replace(
      /{{#additionalContext}}\n\*\*Additional Context\*\*: {{additionalContext}}\n{{\/additionalContext}}/,
      `**Additional Context**: ${inputs.additionalContext}`,
    );
  } else {
    prompt = prompt.replace(
      /{{#additionalContext}}[\s\S]*?{{\/additionalContext}}/,
      '',
    );
  }

  return prompt.trim();
}
