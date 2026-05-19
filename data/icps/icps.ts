import type { ICP } from './types';

export const ICPS: ICP[] = [
  /* ── ICP 1: MNC / Global FMCG — SHOWCASE ──────────────────── */
  {
    slug: 'mnc-global-fmcg',
    name: 'MNC / Global FMCG with VN Market Presence',
    shortCode: 'MNC-FMCG',
    status: 'validated',
    tier: 1,
    verticalTags: ['Beauty', 'Personal Care', 'Home Care', 'FMCG'],
    geography: ['VN', 'SEA-wide'],
    firstDefined: '2023-09-01',
    lastReviewed: '2026-05-01',

    oneSentenceDefinition:
      "Multinational FMCG companies with established Vietnam operations, regional or global commerce/digital functions, and active interest in scaling social commerce as a growth lever in SEA.",

    inclusionCriteria: [
      "Established VN legal entity with local team (not pure export model)",
      "Annual VN revenue >$50M, or regional SEA revenue >$200M",
      "Centralized regional marketing function in SG/HK with VN execution arm",
      "Active TikTok Shop or Shopee presence (or actively evaluating)",
      "Decision-making structure that includes regional commerce/digital director role",
    ],
    exclusionCriteria: [
      "Pure D2C brands without retail distribution",
      "Companies without an existing VN entity (pure export plays)",
      "Sub-scale brands (<$10M VN revenue) — wrong economics for full-stack model",
    ],
    edgeCases:
      "Local FMCG champions (e.g., Vinamilk, Masan) that operate at MNC scale within VN are evaluated case-by-case — they have the budget and structure but a different decision-making rhythm. Default to placing them under 'Vietnamese Domestic CPG' unless evidence shows MNC-style buying behavior.",

    companyProfile: {
      typicalSize:
        "Global revenue $5B+, regional SEA revenue $200M–$1B+, local VN team 50–500 people",
      orgStructure:
        "Global brand custody → regional marketing hub (typically SG) → local VN team executes. Commerce decisions sit between brand managers, regional digital/commerce directors, and country GMs. Procurement often gates final contracting.",
      operatingMarkets: "Global, with strong SEA presence",
      socialCommerceMaturity: 'scaling',
      existingVendorFootprint:
        "Typical stack: 1-2 KOL agencies, 1 media agency (e.g., GroupM/Publicis units), e-commerce enablement vendor (often separate from KOL), in-house content team. Fragmentation across vendors is a chronic complaint.",
      techStackHints:
        "Salesforce / SAP for CRM and finance. Brand-specific commerce platforms (Salesforce Commerce Cloud, Adobe). Regional measurement tools (Nielsen, Kantar). Increasingly building in-house data lakes for first-party data.",
    },

    businessPressures: {
      strategic:
        "Regional GMV targets growing 30-50% YoY across SEA. Boards expect digital commerce to drive incremental growth, not cannibalize. Pressure to demonstrate ROI on social commerce investment specifically (not just digital).",
      operational:
        "Vendor coordination consumes 30%+ of local team's time. Attribution gaps between KOL content and actual sales lift. Inability to scale livestream operations from pilot to repeatable rhythm. Difficulty hiring/retaining VN talent with both creator and commerce experience.",
      market:
        "TikTok Shop algorithm changes that disrupt established creator strategies. Regional competitors (e.g., Korean beauty MNCs) executing faster on social commerce. Consumer trust shifting toward creator endorsements vs traditional brand advertising.",
      distinctive:
        "Unlike domestic CPG, MNCs face the unique pressure of regional consistency — what works in VN must be defensible to regional/global leadership. They cannot operate purely locally; every initiative must read clean in a regional dashboard.",
    },

    decisionProcess: {
      primaryPersonaSlug: 'regional-commerce-director',
      primaryPersonaLabel: "Regional Commerce / Digital Director",
      influencerPersonas: [
        { name: "Brand Manager", role: "Brand-side advocate; protects brand equity", slug: 'brand-manager' },
        { name: "Country GM (VN)", role: "Final country-level sign-off; budget owner", slug: 'country-gm' },
        { name: "Regional Procurement", role: "Contract terms, vendor consolidation pressure" },
        { name: "Local Marketing Lead (VN)", role: "Day-to-day operator; key champion or blocker" },
      ],
      decisionTimeline: "8-14 weeks from first meeting to signed contract; longer if RFP-driven.",
      decisionStyle:
        "Committee-based with multiple gates. Regional sign-off required for commitments >$X. Procurement adds 2-4 weeks at the end. Pilots often precede full contracts.",
      approvalGates: [
        "Regional marketing approval (champion sponsor)",
        "Legal review (data, IP, exclusivity)",
        "Regional procurement (commercial terms)",
        "Country GM (final budget sign-off)",
      ],
      budgetCycle:
        "Annual planning Aug-Oct. Mid-year reforecast Jan-Feb. Best windows for new vendor introduction: Sep (planning), early Q1 (reforecast).",
    },

    whyFits: {
      strengthsAligned:
        "Full-stack capability directly addresses their #1 pain (vendor coordination overhead). Livestream operational depth at L'Oréal/Unilever scale is something they cannot get from a KOL agency. Regional consistency through one partner (vs multi-market vendor sprawl) lands hard with their structure.",
      whyBeatAlternatives:
        "Against KOL agencies: we own the commerce conversion, not just content. Against media agencies: we have the creator network they're trying to rent. Against e-commerce enablers: we bring the audience, not just the storefront. We are the only partner where one contract reduces their vendor count rather than adding to it.",
      marginEconomics:
        "Typical deal size $300K–$2M annually per brand. Margin profile improves over time as setup costs amortize. Multi-brand portfolio deals can compound to $5M+ accounts within 18 months.",
      lifetimeValue:
        "Land-and-expand is real. First brand wins typically lead to 2-3 additional brand additions within 12 months. Average client tenure projected at 3-5 years based on L'Oréal trajectory. Referrals to other MNCs in the same regional network are common.",
    },

    pitchSolution: {
      pitchPhaseSolution:
        "Lead with a focused 1-brand activation at full-stack depth. Reduce surface area to manageable scope while demonstrating end-to-end capability. Common opener: 1 hero brand × 90-day proof window with measurable GMV lift.",
      pitchFormat:
        "Multi-meeting flow. Meeting 1: discovery + show market data + L'Oréal case study. Meeting 2: tailored solution + economics. Meeting 3: regional alignment session (bring regional director). Optional Meeting 4: studio visit / livestream observation.",
      requiredStakeholders: [
        "Ecomobi Account Lead",
        "Ecomobi Solutions / Creative Director (for content discussion)",
        "Ecomobi Operations Lead (for credibility on execution scale)",
        "Optional: Senior leader for regional alignment session",
      ],
      commonObjections: [
        {
          objection: "We already have 4 vendors; we don't need a 5th.",
          response: "We're not the 5th — we're the consolidation. Map your current vendor outputs to our integrated stack; the conversation becomes 'replace 2-3 of these' not 'add another.'",
        },
        {
          objection: "How do we know your creator network is real, not a list?",
          response: "Offer studio visit. Show real-time livestream operations. Reference L'Oréal Tet 2024 ops at scale (2,000+ sessions). Network depth is the differentiator we lead with for this ICP.",
        },
        {
          objection: "We can't tell if this is incremental or cannibalization of existing channels.",
          response: "Lead with attribution methodology — pre-period vs activation period, holdout cells where feasible. Acknowledge attribution is genuinely hard; show our measurement rigor.",
        },
        {
          objection: "Regional procurement requires multi-market support — can you scale beyond VN?",
          response: "Honest answer: VN is our depth market, SEA expansion is in progress. If multi-market is the dealbreaker, propose VN as proof point with explicit expansion roadmap.",
        },
      ],
      differentiatorsToLeadWith: [
        "Operational depth (studios, trained hosts, proven ops) — not just creator quantity",
        "Full-stack ownership — one contract, one accountability, end-to-end measurement",
        "Regional case studies (L'Oréal CPD VN) — proof of MNC-fit at scale",
      ],
      antiPatterns: [
        "Don't lead with technology — they assume any vendor has it; tech as the headline reads small",
        "Don't lead with creator network size as a number — leads to commodity comparison",
        "Don't oversell multi-market presence — honesty about VN-depth + SEA-expansion is stronger than puffery",
      ],
    },

    serviceMix: {
      heroServices: ['P1', 'P3'],
      commonAddOns: ['P2', 'P4'],
      rarelySold: [
        { pCode: 'P7', whyNot: "Standalone tech licensing rarely fits — they already have ad platforms. Bundled in, yes; standalone, rarely." },
      ],
      typicalSequencing:
        "Phase 1 (months 0-3): Land with P1 livestream commerce on hero brand. Phase 2 (months 3-9): Expand to P2 KOC content + P3 affiliate. Phase 3 (months 9-18): Add P4 performance media + expand to 2nd-3rd brands in portfolio.",
    },

    outcomes: {
      metrics: [
        { value: '$10M+', label: 'GMV committed for one MNC division', source: "L'Oréal CPD VN 2024" },
        { value: '220%', label: 'Best campaign vs target', source: "L'Oréal Tet 2024" },
        { value: '#1', label: 'Anti-aging on TikTok Shop VN', source: "Q4 2024 leadership" },
        { value: '3-5 yr', label: 'Projected average tenure', source: "Based on L'Oréal trajectory" },
      ],
      citableOutcomes: [
        {
          headline: "L'Oréal CPD VN — Won APAC regional case study after Tet 2024 results",
          portfolioSlug: 'loreal-vn-consumer',
          description: "First L'Oréal CPD brand activation in VN exceeded GMV target by 220% during Tet 2024. Result became regional reference case across L'Oréal APAC.",
        },
        {
          headline: "Multi-brand expansion within L'Oréal — from 1 brand to 4 brands in 14 months",
          portfolioSlug: 'loreal-vn-consumer',
          description: "Started with L'Oréal Paris hero brand; expanded to Maybelline, Garnier, Lancôme within 14 months of initial contract. Validates land-and-expand thesis for this ICP.",
        },
      ],
      narrative:
        "MNC / Global FMCG is our validated ICP. The L'Oréal trajectory demonstrates the full thesis: land focused, expand within portfolio, compound through regional referenceability. Economics, operational fit, and lifetime value all check out. This is the ICP to defend, deepen, and replicate — not the ICP that needs validation.",
    },

    storyCapital: {
      definingWins: [
        {
          date: 'Feb 2024',
          label: "L'Oréal Paris Tet 2024 — 220% over GMV target",
          description: "Defined the format for premium beauty livestream in VN. Became the case study that justified expansion to other L'Oréal brands.",
        },
        {
          date: 'Sep 2024',
          label: "L'Oréal expansion to 4 brands",
          description: "Proved land-and-expand thesis: one win opens the portfolio. Replicable pattern for this ICP.",
        },
        {
          date: 'Mar 2025',
          label: "Featured in L'Oréal APAC regional review",
          description: "Cross-market case study elevated Ecomobi from VN-vendor to regional reference. Drives inbound from other MNCs in similar position.",
        },
      ],
      learningCases: [
        {
          date: 'Aug 2024',
          label: "MNC Beauty B — lost to regional KOL agency consolidation deal",
          description: "Lost a major MNC opportunity to a regional KOL agency that bundled VN with TH/ID/PH coverage. Single-vendor regional play beat our VN-depth pitch.",
          takeaway:
            "For MNCs with active regional consolidation pressure, VN-depth alone is not enough — must lead with SEA expansion roadmap and credible partner network in other markets. Drove our 2025 SEA expansion priority.",
        },
      ],
      quotableMaterial: [
        {
          quote:
            "Ecomobi is the only partner where signing one contract reduces my vendor list rather than adding to it.",
          attribution: "Regional Commerce Director, L'Oréal CPD APAC (paraphrased, internal)",
        },
      ],
      uniqueAngles:
        "For MNC FMCG, 'regional consistency at local execution depth' lands harder than 'creator scale.' Pitches that lead with operational specificity (studio counts, trained-host pipelines, vertical-specific runbooks) outperform pitches that lead with creator network size 2-3x in conversion.",
    },

    sourcing: {
      whereTheyCluster: [
        "Cannes Lions (regional commerce side events)",
        "TikTok World / TikTok For Business APAC summits",
        "Regional CPG/FMCG industry councils (often invitation-only)",
        "Vietnam Beauty & Personal Care Forum",
        "MMA SMARTIES APAC awards circuit",
      ],
      sourcingChannels: [
        "Warm intros from existing MNC clients (highest conversion)",
        "Regional industry events (good for top-of-funnel, slow to convert)",
        "Anthropic-style content marketing on social commerce KPIs (drives inbound)",
        "Direct outreach to named Regional Commerce Directors (low success rate without warm intro)",
      ],
      triggerEvents: [
        "New CMO or Regional Digital Director hire",
        "Regional commerce restructure announcement",
        "Competitor success story in trade press (drives FOMO response)",
        "Annual planning cycle approaching (Aug-Oct VN, slightly earlier regionally)",
        "Public commitment to social commerce GMV targets in earnings calls",
      ],
      watchList: [
        {
          companyName: "MNC Beauty C VN",
          fitConfidence: 'high',
          lastTouchpoint: '2026-04-15',
          nextAction: "Follow-up after Cannes 2026, target meeting in May",
          owner: "Account Director — Sarah",
        },
        {
          companyName: "Global Personal Care D",
          fitConfidence: 'medium',
          lastTouchpoint: '2026-03-02',
          nextAction: "Wait for new Regional Commerce Director announcement, then warm intro",
          owner: "Business Development — Minh",
        },
      ],
      antiTargets: [
        {
          companyName: "MNC FMCG E",
          whyNot: "Pure manufacturing-export model in VN; no local commerce team; decisions made at global HQ without regional commerce function. Looks like an MNC but doesn't have the org structure that fits our offering.",
        },
      ],
    },

    outreach: {
      effectiveAngles: [
        "Cite L'Oréal case study within first 90 seconds of any conversation",
        "Lead with their specific pain (vendor coordination) before pitching our solution",
        "Reference regional consistency theme — speaks to their structural pressure",
        "Offer studio visit early — credibility from observation beats credibility from pitch decks",
      ],
      channelPreferences:
        "Warm intro via existing client > LinkedIn from senior Ecomobi leader > Industry event meeting > Cold email (rarely works without trigger event).",
      timing:
        "Best months for first contact: September (annual planning open), February (mid-year reforecast). Worst: December (holiday slowdown), July (regional travel/conferences).",
      failedPatterns: [
        "Generic cold email with no warm context — <1% response rate",
        "Pitching to local marketing lead without regional alignment — local gets enthusiastic but can't sign",
        "Leading with creator network size — triggers commodity comparison",
        "Over-promising multi-market support — undermines credibility when probed",
      ],
    },

    notes: {
      workingHypotheses: [
        {
          statement:
            "MNC FMCG clients who experience our livestream studio in person are 3x more likely to sign than those who only see decks. (Hypothesis from L'Oréal + 2 other accounts.)",
          date: '2025-11-15',
          status: 'testing',
        },
        {
          statement:
            "Brands that fail to expand from 1 brand to 2nd brand within 12 months tend to churn within 24. Single-brand contracts may be a leading churn indicator.",
          date: '2026-02-01',
          status: 'testing',
        },
      ],
      openQuestions: [
        "Does our VN-depth advantage hold once regional expansion is real, or do we become commodity once SEA-wide?",
        "What's the right margin floor for multi-brand deals — when does 'land and expand' become 'land and dilute'?",
        "How do we systematically convert L'Oréal-style references into inbound from peer MNCs?",
      ],
    },

    referenceIndex: {
      tagClusters: [
        { name: 'Verticals', tags: ['Beauty', 'Personal Care', 'Home Care', 'FMCG'] },
        { name: 'Region', tags: ['Vietnam', 'SEA', 'APAC-context'] },
        { name: 'Sales notes', tags: ['Validated ICP', 'Tier 1', 'Land-and-expand pattern', 'Regional consistency angle'] },
      ],
      linkedEntities: [
        { name: "L'Oréal VN — Consumer Products", type: 'portfolio', slug: 'loreal-vn-consumer' },
        { name: "L'Oréal VN — Active Cosmetics", type: 'portfolio', slug: 'loreal-vn-active' },
        { name: "Unilever VN — Beauty & Wellbeing", type: 'portfolio', slug: 'unilever-vn-beauty' },
        { name: "L'Oréal Paris", type: 'brand', slug: 'loreal-paris' },
      ],
      aiNote:
        "MNC / Global FMCG is the validated Tier-1 ICP. Pattern: large multinational with VN entity and regional commerce function; pain centered on vendor fragmentation; decision committee-based across regional + local + procurement; sales cycle 8-14 weeks. Win pattern: focused brand pilot, scale via portfolio expansion. Win example: L'Oréal (220% Tet target, 4 brands in 14 months). Lead pitch with operational depth, not creator quantity. Anti-pattern: don't oversell multi-market when VN is the proof market.",
    },
  },

  /* ── ICP 2: Regional D2C Beauty — MEDIUM SEED ─────────────── */
  {
    slug: 'regional-d2c-beauty',
    name: 'Regional D2C Beauty Brand Expanding into VN',
    shortCode: 'RDB-VN',
    status: 'active',
    tier: 2,
    verticalTags: ['Beauty', 'D2C', 'Skincare'],
    geography: ['VN', 'SEA-emerging'],
    firstDefined: '2024-06-15',
    lastReviewed: '2026-04-10',

    oneSentenceDefinition:
      "Regional D2C beauty brands (often founded in Korea, Japan, Singapore, or VN itself) with strong digital-native DNA, scaling from 1-2 markets into broader SEA, where VN is a strategic next market.",

    inclusionCriteria: [
      "Founded 2015-2023, digital-native heritage",
      "Annual revenue $5M-$50M, growth >40% YoY",
      "Existing presence in 1-3 SEA markets, expanding",
      "Founder-led or recent founder-departure (still operates with startup speed)",
      "TikTok and Instagram are their primary growth channels",
    ],
    exclusionCriteria: [
      "Pure local-market brands without regional ambition",
      "Brands that compete primarily on price (race-to-bottom dynamics)",
      "Brands without dedicated marketing leadership (single-person founder operations)",
    ],

    companyProfile: {
      typicalSize: "Annual revenue $5-50M, team size 30-150",
      orgStructure:
        "Founder + small marketing leadership team (3-6 people). Decision-making fast and flat. Often no regional layer — country-level marketing reports directly to founder or CMO.",
      socialCommerceMaturity: 'mature',
    },

    businessPressures: {
      strategic:
        "Growth-stage pressure to prove SEA expansion thesis; investors expect VN to become 20-30% of revenue within 2 years of entry.",
      operational:
        "No local team in VN initially; depend entirely on partners for execution. Acute creator selection risk — wrong creators damage brand.",
      distinctive:
        "Unlike MNCs, regional D2Cs have brand-equity panic — they cannot afford the brand damage of a poorly-executed launch. Speed matters, but brand-fit matters more.",
    },

    serviceMix: {
      heroServices: ['P3', 'P1'],
      commonAddOns: ['P2'],
      typicalSequencing:
        "Land with P3 affiliate-native model (their preferred economics) + P1 livestream for launch credibility. Slower service additions than MNC pattern — they grow conservatively.",
    },

    outcomes: {
      metrics: [
        { value: 'Cocoon', label: 'Anchor account in this ICP', source: 'Sole VN engagement to date' },
      ],
      narrative:
        "This ICP is still being validated. Cocoon is the anchor case but we lack the multi-account pattern that confirms repeatability. 2026 priority: 2-3 more regional D2C wins to establish the ICP as 'validated' rather than 'active.'",
    },

    notes: {
      workingHypotheses: [
        {
          statement:
            "Regional D2Cs convert faster than MNCs but to smaller initial contracts. Land economics may be worse, but expansion is faster.",
          date: '2026-01-10',
          status: 'testing',
        },
      ],
      openQuestions: [
        "Is the smaller deal size worth the faster cycle, or should we deprioritize until margin improves?",
        "Should we develop a lighter-touch D2C product offering, or push them toward standard full-stack?",
      ],
    },

    referenceIndex: {
      linkedEntities: [
        { name: "Cocoon", type: 'portfolio', slug: 'cocoon' },
      ],
      aiNote:
        "Regional D2C Beauty is an active Tier-2 ICP. Pattern: digital-native brand expanding into VN, fast decision-making, founder-led, brand-fit concerns dominate. Smaller deals than MNC FMCG but faster cycles. Validation pending more wins beyond Cocoon.",
    },
  },

  /* ── ICP 3: Vietnamese Domestic CPG — MINIMAL SEED ────────── */
  {
    slug: 'vietnamese-domestic-cpg',
    name: 'Vietnamese Domestic CPG',
    shortCode: 'VN-CPG',
    status: 'evaluating',
    tier: 3,
    verticalTags: ['CPG', 'Home Goods', 'Local FMCG'],
    geography: ['VN'],
    firstDefined: '2025-01-15',

    oneSentenceDefinition:
      "Vietnamese-headquartered CPG companies (Sunhouse, Masan, Cholimex tier) with national distribution and increasing digital commerce ambition.",

    notes: {
      openQuestions: [
        "Is the budget profile of VN domestic CPG compatible with our full-stack pricing?",
        "Do local decision-makers prefer local vendors over regional players? Cultural fit question.",
        "Should this be its own ICP or merged into a broader 'mid-market' bucket?",
      ],
    },

    referenceIndex: {
      linkedEntities: [
        { name: "Sunhouse", type: 'portfolio', slug: 'sunhouse' },
      ],
    },
  },

  /* ── ICP 4: MNC Pharma OTC — EMPTY (empty-state testing) ─── */
  {
    slug: 'mnc-pharma-otc',
    name: 'MNC Pharma OTC Division',
    shortCode: 'MNC-PHARMA-OTC',
    status: 'evaluating',
    tier: 3,
    verticalTags: ['Pharma', 'OTC', 'Wellness'],
    geography: ['VN'],
    firstDefined: '2025-09-01',
  },
];
