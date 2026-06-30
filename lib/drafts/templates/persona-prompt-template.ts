export const PERSONA_PROMPT_TEMPLATE = `You are a marketing intelligence analyst for VinaCapital, Southeast Asia's leading social commerce and creator marketing platform, headquartered in Vietnam. Your job is to produce a detailed, structured Decision-Maker Persona dossier for our internal marketing intelligence tool.

## Context

**Persona Name**: {{name}}
**Short Code**: {{shortCode}}
**Typical Job Title(s)**: {{jobTitle}}
**Seniority Level**: {{seniorityLevel}}
**Associated ICP**: {{icpSlug}}
**Primary Professional Goal**: {{primaryGoal}}
{{#additionalContext}}
**Additional Context**: {{additionalContext}}
{{/additionalContext}}

VinaCapital's core offerings are:
- Livestream commerce (KOL/KOC-led live selling on TikTok, Shopee Live, Lazada Live)
- Creator/KOL management and matching
- Social commerce campaign management
- Performance-based affiliate & shop-in-shop models
- Insights & analytics for creator commerce

This persona is encountered when selling VinaCapital's services to enterprise and mid-market brands in Vietnam and Southeast Asia.

---

## Output Instructions

Return ONLY valid markdown following the exact structure below. Do not add any commentary outside the markdown. Use the YAML frontmatter block for typed fields and the markdown sections for prose.

Every section must be populated — do not leave any section empty or use placeholder text.

---

## Template

\`\`\`yaml
---
name: "{{name}}"
shortCode: "{{shortCode}}"
slug: "{{slugHint}}"
personaType: "champion"      # champion | influencer | blocker | gatekeeper | mixed
seniorityLevel: "{{seniorityLevel}}"
influenceLevel: "high"       # high | medium | low
icpSlugs:
  - "{{icpSlug}}"
---
\`\`\`

### §01 PROFILE

Write 2–3 paragraphs describing this persona. Who are they? What does their typical day look like? How did they end up in this role? What is their career trajectory?

### §02 SNAPSHOT

Provide a structured snapshot:

**Public goals** (what they say they want to achieve):
- [List 3–5 stated professional goals]

**Private goals** (what they actually care about, career/political):
- [List 2–4 unstated motivations]

**Typical pressures**:
- [List 4–6 pressures from above, below, or externally]

**Decision-making style**: [Analytical / Intuitive / Consensus-driven / Risk-averse / etc. — 1–2 sentences]

### §03 CARES ABOUT

What does this persona genuinely care about? List 5–8 things — ordered from most to least important — that drive their decisions. Be specific to the social commerce and creator marketing context.

### §04 PRESSURES

Describe the pressures this persona faces:
- From above (from their manager, board, or regional HQ)
- From below (from their team, agency partners, vendors)
- From the market (competitive dynamics, platform changes, consumer shifts)

### §05 DECISION MAKING

Describe how this persona makes purchasing decisions for services like VinaCapital's:
- What evidence do they need to feel confident?
- Who else do they consult?
- What is their typical approval threshold?
- How risk-averse are they, and why?
- What accelerates their decision? What slows it down?

### §06 COMMUNICATION PREFERENCES

How does this persona prefer to be communicated with?
- **Format**: (deck vs data vs narrative vs demo)
- **Cadence**: (how often, when in the day/week)
- **Tone**: (formal vs casual, technical vs strategic)
- **Meeting style**: (1:1, small group, large reviews)
- **What earns their time**:

### §07 PITCH PATTERNS

Describe the most effective approaches to pitching this persona:
- What hook gets their attention?
- What proof points land best? (case studies, data, peer references)
- What framing resonates? (ROI, brand safety, speed, exclusivity, etc.)
- What should you NEVER say to this persona?

### §08 COMMON OBJECTIONS

List 5–8 objections this persona commonly raises and how to handle each.

Format each as:
**Objection**: [the objection]
**Response**: [how to handle it]

### §09 ROLE IN DEALS

Describe this persona's typical role in the sales process:
- Are they a champion, economic buyer, technical evaluator, or blocker?
- When do they enter the process?
- What do they need to feel good about before moving forward?
- How do you lose them?

### §10 ICP VARIATIONS

If this persona appears in multiple ICPs, describe how their behavior and priorities shift across contexts (e.g., MNC vs D2C vs domestic brand). If they appear in only one ICP, describe how their behavior might shift at different company maturity stages.

### §11 RELEVANT RESEARCH

List 3–5 types of research, reports, or data sources that would be credible and valuable to this persona. Be specific — not "industry reports" but the actual sources they reference.

### §12 REFERENCE INDEX

List 3–5 real-world reference points for this persona type:
- LinkedIn profile archetypes (job titles + career paths common to this persona)
- Industry associations or communities they participate in
- Events or conferences they typically attend
- Publications or newsletters they read

---

After completing the full markdown, end your response with exactly this line:
<!-- END OF PERSONA DRAFT -->
`;

export function buildPersonaPrompt(inputs: {
  name: string;
  shortCode: string;
  jobTitle: string;
  seniorityLevel: string;
  icpSlug: string;
  primaryGoal: string;
  additionalContext?: string;
}): string {
  const slugHint = inputs.name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');

  let prompt = PERSONA_PROMPT_TEMPLATE
    .replace(/{{name}}/g, inputs.name)
    .replace(/{{shortCode}}/g, inputs.shortCode)
    .replace(/{{slugHint}}/g, slugHint)
    .replace(/{{jobTitle}}/g, inputs.jobTitle)
    .replace(/{{seniorityLevel}}/g, inputs.seniorityLevel)
    .replace(/{{icpSlug}}/g, inputs.icpSlug)
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
