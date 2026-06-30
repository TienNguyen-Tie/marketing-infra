import type { Persona } from './types';

export const PERSONAS: Persona[] = [
  /* ── PERSONA 1: Regional Commerce Director — FULL SHOWCASE ─── */
  {
    slug: 'regional-commerce-director',
    name: 'Regional Commerce Director',
    shortCode: 'RCD',
    personaType: 'champion',
    seniorityLevel: 'director',
    typicalJobTitles: [
      'Regional Commerce Director',
      'Regional Digital Commerce Lead',
      'APAC Head of Commerce',
      'SEA Commerce Director',
      'Regional Director, Digital & eCommerce',
    ],
    typicalReportingLine:
      "Reports to Regional CMO or Regional GM. Often has Brand Managers, country marketing leads, and a regional analytics/commerce ops team in dotted-line relationship.",
    firstDefined: '2024-01-15',
    lastReviewed: '2026-05-01',

    snapshot: {
      oneSentenceDefinition:
        "Senior commerce leader sitting between brand custody and country execution, owning regional GMV growth and the digital/social commerce vendor strategy — typically the VinaCapital sponsor and champion at MNC FMCG accounts.",
      coreRole:
        "Owns regional digital and social commerce P&L. Sets vendor strategy across SEA markets. Reports performance to regional CMO and global commerce leadership. Carries an explicit GMV growth target (typically 30-50% YoY) and is measured on incremental growth — proving that social commerce drives net new revenue, not channel substitution.",
      typicalBackground:
        "10-15 years of experience. Career path usually: brand management (4-6 years) → digital marketing manager → regional digital lead → regional commerce director. Many came up through Unilever, P&G, L'Oréal, or Reckitt management trainee programs. Increasingly, some come from agency/tech side (ex-GroupM, ex-Lazada/Shopee) for the data fluency.",
    },

    caresAbout: {
      personalIncentives:
        "Bonus structure heavily weighted to regional GMV target achievement (often 40-60% of total comp). Career-wise, the next step is Regional CMO or Global Commerce VP — which requires demonstrating commercial impact at scale and being seen as someone who 'figured out social commerce in SEA.' Visible wins matter as much as actual wins; quiet wins don't promote.",
      publicGoals: [
        "Achieve regional GMV growth target (typically 30-50% YoY)",
        "Reduce CAC across digital commerce channels",
        "Demonstrate incrementality (not cannibalization) of social commerce vs traditional",
        "Vendor consolidation: fewer, deeper relationships rather than fragmented stack",
        "Build internal capability — talent, tooling, measurement framework",
      ],
      privateGoals: [
        "Be the person who 'cracked social commerce in SEA' internally — career-defining narrative",
        "Avoid being the one blamed if a major bet doesn't work — needs defensible decisions",
        "Get a regional case study featured at global town hall or annual review",
        "Develop a reputation as a strategic operator, not just a vendor manager",
        "Build a network of regional peers (other MNC directors) — informal knowledge exchange that compounds career",
      ],
    },

    pressuresAndFears: {
      keepsThemUpAtNight:
        "The gap between board-promised GMV growth and what's actually trackable through current vendor stack. Watching competitors (regional or local) move faster on social commerce while internal vendor coordination eats their team's capacity. Knowing that if attribution doesn't improve, the next budget review gets brutal — finance teams have started asking sharper questions about incrementality.",
      commonFrustrations:
        "Vendor fragmentation. Having to coordinate KOL agency + media agency + e-commerce vendor + in-house team for every campaign. Hours of meetings that should have been emails. Finger-pointing between vendors when something underperforms. Different measurement frameworks across vendors that don't reconcile to one P&L view.",
      fearOfFailureModes:
        "(a) Picking a vendor that promises full-stack but executes thin in one critical area — gets exposed publicly after a high-visibility campaign. (b) Locking into a multi-year contract with a vendor whose model becomes obsolete due to platform algorithm changes. (c) Being unable to prove incrementality to finance, which forces a budget cut that visibly stalls the regional growth narrative. (d) Internal political fallout from picking a partner that the country teams resist using.",
      makesThemDefensive:
        "Pitches that imply they don't understand their current state — 'we noticed your current vendors are fragmented' lands as condescension even when true. Vendor pitches that lead with technology demos before establishing credibility on execution. Anything that implies their existing relationships are wrong — they need an off-ramp that doesn't make them look like they made bad decisions before.",
    },

    decisionMaking: {
      decisionStyle:
        "Data-driven with a strong relationship overlay. Will not commit without numbers, but the numbers alone don't decide — they need trust in the operator behind the numbers. Highly consensus-seeking at the regional level (will socialize with peers before deciding), then decisive once aligned. Comfortable saying no quickly to obvious misfits, but slow to say yes — the consideration phase tends to last weeks not days.",
      evidenceThatPersuades: [
        "Peer reference from another MNC at similar scale and structure (most powerful)",
        "Specific case study with full economics — not just GMV uplift but margin impact and attribution methodology",
        "Studio visit or live operations observation — credibility from seeing real execution at scale",
        "Detailed measurement framework that maps to their P&L view",
        "Honest discussion of where the vendor has and hasn't worked — sophistication signal",
      ],
      evidenceThatDoesnt: [
        "Creator network size as a top-line stat — they assume any major vendor has scale",
        "Generic 'we work with major brands' name-drops without specifics on what was actually delivered",
        "Aspirational decks heavy on platform trends — they read industry research; they want operator perspective, not analyst-style content",
        "Single-campaign blowout numbers without context on sustainability and replicability",
      ],
      influenceSourcesTrusted: [
        "Peer Regional Commerce Directors at non-competing MNCs (highest trust)",
        "Specific regional industry analysts (Forrester APAC commerce team, regional Gartner)",
        "Trade press: Campaign Asia, Marketing Interactive, AdAge APAC",
        "Their existing senior agency partners (when those partners speak honestly, not when they're pitching)",
        "TikTok Shop / Shopee regional account managers (depending on how trusted those relationships are)",
      ],
    },

    communication: {
      preferredChannels:
        "Email for substantive content (proposals, case studies, follow-ups). WhatsApp or Telegram for urgent or relationship-building moments. LinkedIn DM for first contact when no warm intro exists. Strong preference for scheduled meetings over impromptu calls. Async-first culture overall — values not having their day fragmented.",
      toneTheyRespondTo:
        "Professional but not stiff. Direct and respectful of their time. Executive-summary-first writing: lead with the conclusion, support with detail, end with the action. Avoids salesy enthusiasm. Specific over generic — names, numbers, dates carry more weight than adjectives. Honest about limitations gets more credibility than overselling.",
      cadenceExpectations:
        "Active engagement: bi-weekly to monthly touchpoints during evaluation. Once contracted: monthly business reviews are standard; weekly status emails during peak campaigns. Off-cycle communication is welcome if it's substantive (a relevant industry insight, a regional peer reference) and rejected if it's a check-in for the sake of being top-of-mind.",
      meetingStyle:
        "Prepared agenda strongly preferred (sent 24+ hours in advance). Comfortable with 30-minute meetings if the content is dense; impatient with 60-minute meetings that could have been 30. Studio visits, live operations observation, and dinner-format relationship building are all valuable — but the dinner happens later in the cycle, after credibility is established.",
    },

    pitchPatterns: {
      openingHooks: [
        "Lead with a regional peer reference within the first 90 seconds (specific account, specific result, ideally with proof you can verify)",
        "Acknowledge a specific pressure they're under (regional GMV target, incrementality challenge) before pitching anything",
        "Offer to share unprompted: 'Here's what we're seeing in beauty across SEA right now' — useful market intelligence builds the relationship",
        "Propose a focused proof window (1 brand, 90 days, measurable outcome) — gives them a low-risk way to evaluate",
        "Ask about their current vendor stack honestly, listen to the frustrations, and frame the solution as consolidation rather than addition",
      ],
      pitchStructure:
        "Meeting 1 (45-60 min): Discovery + market context + 1 high-signal case study. No 'about us' deck. End with: 'Here's what we'd want to know more about before proposing.' Meeting 2 (60 min): Tailored solution + economics + measurement framework. Meeting 3 (60 min, with regional alignment): Bring the regional director from your side; meet their team. Optional Meeting 4: Studio visit or operations observation. Then they need internal time — don't push for decision at meeting 4.",
      materialsTheyWantToSee: [
        "Case study with full economics (GMV, margin, attribution methodology — not just GMV uplift)",
        "Concrete measurement framework document — how we attribute, what we hold out, how we reconcile to their P&L",
        "Studio operations photo / video showing real execution scale (visual proof of operational depth)",
        "Vertical-specific runbook excerpt (proof that we have repeatable process, not project-based scramble)",
        "Honest 1-page on where we work and where we don't (sophistication signal)",
      ],
      antiPatterns: [
        "Don't lead with 'about VinaCapital' slide deck — they don't care about us yet",
        "Don't present full-spectrum services in meeting 1 — overwhelms; pick one to lead",
        "Don't promise multi-market parity if VN is genuinely the depth market — be specific",
        "Don't quote creator network size in millions as a hero stat — commodity framing",
        "Don't bring senior leadership to meeting 1 if they're not adding substance — looks like sales push",
      ],
    },

    commonObjections: [
      {
        objection: "We already have 4 vendors handling different parts of this — we don't need a 5th.",
        response:
          "Acknowledge directly. Reframe as consolidation: 'We're not the 5th — we replace 2-3 of these.' Map the specific overlap with their existing vendors. Quantify the coordination overhead. Offer to do this mapping exercise jointly in meeting 2.",
      },
      {
        objection: "How do I know the results from your existing clients are repeatable for us?",
        response:
          "Honest answer: 'You don't, until you run a proof window with us.' Offer the 1-brand 90-day pilot. Specify the conditions under which we'd consider the pilot a failure (defensive credibility move). Show our measurement framework so they can audit results, not take our word.",
      },
      {
        objection: "Can you actually support multi-market regionally, or are you mainly VN?",
        response:
          "Be honest. 'VN is our depth market. We have execution capability in [list other markets honestly]. For markets where our depth is shallower, we partner — we'll tell you which is which.' Pretending uniform regional depth is a credibility loss; honest market-by-market clarity is a credibility win.",
      },
      {
        objection: "Our country team has built relationships with their current vendors. How do we handle that internally?",
        response:
          "Recognize this is the actual hard part. Offer to design the transition with them — phased ramp-down of existing vendors, role-play conversations, even joint reviews with current vendors during the transition. The vendor switch is operational; the relationship management is political and harder.",
      },
      {
        objection: "How do we prove this is incremental, not cannibalization?",
        response:
          "Lead with your measurement methodology. Holdout cells where feasible, pre/post period analysis with controls, cross-channel reconciliation. Honest about what's measurable cleanly vs what requires inference. Acknowledge this is the hardest problem in social commerce and that anyone claiming clean attribution is overselling.",
      },
    ],

    roleInDeals: {
      typicalInfluenceLevel: 'decider',
      whenInCycleTheyEnter:
        "Often the first stakeholder we meet — they're typically the one initiating vendor evaluations. Stay primary throughout discovery and proposal. May hand off contract negotiation to procurement but remains the relationship owner.",
      whatTheyOwnVsHandOff:
        "Owns: vendor strategy, measurement framework, regional commerce P&L, championing internally. Hands off: detailed campaign execution (to local marketing teams), contract paperwork (to procurement), brand-specific creative decisions (to Brand Managers). The split matters: pitch to them on strategy and economics; pitch to Brand Managers on creative and brand fit.",
      alliesAndAdversaries:
        "Natural allies: Regional CMO (shares the regional growth narrative), Local Marketing Leads (if the vendor reduces their coordination burden), Country GMs (if the vendor delivers attributable GMV). Natural friction: Brand Managers (when vendor pitches feel brand-equity-dilutive), Regional Procurement (cost vs strategy tension), country teams attached to existing vendors. Navigate by aligning the RCD first, then enlisting them to navigate the rest.",
    },

    icpVariations: [
      {
        icpSlug: 'mnc-global-fmcg',
        behaviorAtThisIcp:
          "Primary champion role. Decision style fully in evidence here: data-driven, committee-aware, peer-reference-sensitive. Typical sponsor of the engagement, often initiating contact. Cycle 8-14 weeks with multiple meetings. Regional consistency angle (one partner across SEA markets) lands particularly hard here. Studio visit moves them more than any deck.",
      },
      {
        icpSlug: 'regional-d2c-beauty',
        behaviorAtThisIcp:
          "Sometimes present, sometimes not. When the brand is large enough to have a regional commerce function (typically D2Cs >$30M), the RCD persona appears but with founder-influenced compressed timelines. When the brand is smaller, the RCD function is collapsed into the founder or CMO. Don't assume the persona is always present at this ICP — read the org chart.",
      },
    ],

    referenceIndex: {
      tagClusters: [
        { name: 'Seniority', tags: ['Director-level', 'Regional scope', '10-15yr experience'] },
        { name: 'Decision style', tags: ['Data-driven', 'Consensus-aware', 'Peer-reference-sensitive'] },
        { name: 'Sales notes', tags: ['Primary champion', 'Initiates evaluations', 'Owns measurement framework'] },
      ],
      linkedEntities: [
        { name: 'MNC / Global FMCG', type: 'icp', slug: 'mnc-global-fmcg' },
        { name: "L'Oréal VN — Consumer Products", type: 'portfolio', slug: 'loreal-vn-consumer' },
      ],
      aiNote:
        "Regional Commerce Director (RCD): senior champion persona at MNC FMCG accounts. Owns regional GMV P&L, sets vendor strategy, typically VinaCapital's primary sponsor. Decision style: data-driven + relationship-overlay + consensus-aware. Cares about: incrementality proof, vendor consolidation, regional consistency, career-defining wins. Avoids: vendor fragmentation, public failure, picking commodity-positioned partners. Lead pitch with peer reference + market context + focused proof window. Anti-pattern: lead with technology demos or generic creator-network size.",
    },
  },

  /* ── PERSONA 2: Brand Manager — MEDIUM SEED ─────────────────── */
  {
    slug: 'brand-manager',
    name: 'Brand Manager',
    shortCode: 'BM',
    personaType: 'mixed',
    seniorityLevel: 'manager',
    typicalJobTitles: [
      'Brand Manager',
      'Senior Brand Manager',
      'Marketing Manager',
      'Brand Lead',
    ],
    typicalReportingLine:
      "Reports to Marketing Director or Country Marketing Head. Owns one brand or sub-brand. May have 1-2 direct reports (Assistant Brand Managers, executions specialists).",
    firstDefined: '2024-02-20',
    lastReviewed: '2026-04-15',

    snapshot: {
      oneSentenceDefinition:
        "Brand-side custodian who owns brand equity and marketing P&L for a specific brand, often the daily counterpart for content/creative decisions and a critical champion-or-blocker in vendor relationships.",
      coreRole:
        "Owns brand equity, marketing plan, and P&L for one brand. Approves creative, sets brand guidelines, manages agency relationships at the brand level. Measured on brand health metrics (awareness, consideration, equity scores) AND short-term sales metrics — the tension between these is constant.",
      typicalBackground:
        "3-8 years of experience. Often came through management trainee programs or moved from agency-side. Career path: ABM → BM → Senior BM → Marketing Manager → Marketing Director. Many are mid-career and personally invested in the brand they manage.",
    },

    caresAbout: {
      personalIncentives:
        "Bonus tied to brand metrics (typically 30-40% of comp) — usually a mix of brand health scores and topline sales. Career-wise, the brand they manage becoming a regional or global case study elevates them; brand mismanagement crashes their trajectory. Personal identification with the brand is high.",
      publicGoals: [
        "Hit annual brand revenue and market share targets",
        "Maintain brand health metrics (awareness, consideration, premium positioning)",
        "Launch the year's marketing plan on time and on budget",
        "Successfully execute key campaign moments (new product launches, seasonal pushes)",
      ],
      privateGoals: [
        "Get noticed as a brand-builder, not just an executor — that's what promotes",
        "Win an internal or industry award for a campaign",
        "Build creative work they're personally proud of",
        "Avoid the 'brand damage' story being attached to their name",
      ],
    },

    pressuresAndFears: {
      keepsThemUpAtNight:
        "Brand health metrics declining quietly while sales metrics still look fine. A creator or campaign moment that goes wrong publicly. Pressure from above to deliver short-term sales while protecting long-term brand equity. Vendor relationships their leadership chose that don't fit how they actually work brand-side.",
      commonFrustrations:
        "Vendors who don't understand the brand's voice. Asks to compromise brand guidelines for performance lift. Creators who go off-brand on live content. Being held accountable for outcomes from vendors they didn't pick.",
      fearOfFailureModes:
        "Public brand damage from creator misstep. Campaign that flops AND is visible to leadership. Being seen as the brand manager who 'let in' a low-quality partner. Losing credibility with their own internal creative team by championing the wrong vendor.",
      makesThemDefensive:
        "Vendor pitches that compromise brand voice for performance. Casual treatment of brand guidelines. Implication that the brand 'needs to evolve' from vendors who haven't earned that opinion. Tools or templates that produce generic content not specific to their brand.",
    },

    decisionMaking: {
      decisionStyle:
        "Brand-fit-first, performance-second. Will rule out a vendor on brand-fit concerns even if economics are strong. Comfortable saying no quickly when something feels wrong; slower to say yes because they're checking with creative leads, internal stakeholders, and sometimes consumer panels.",
      evidenceThatPersuades: [
        "Examples of brand-specific creative work — not generic case studies",
        "Creator partnerships that respected brand guidelines and produced beautiful work",
        "Reference from another Brand Manager at a comparable brand (not just a senior leader)",
        "Demonstrated understanding of their specific brand's voice and audience",
      ],
      evidenceThatDoesnt: [
        "Pure GMV or sales numbers without creative quality context",
        "Generic 'we work with major brands' references",
        "Tech-platform pitches that treat content as commodity",
      ],
      influenceSourcesTrusted: [
        "Internal creative directors and brand strategists",
        "Peer Brand Managers at non-competing brands",
        "Specific brand-side trade press (Campaign, AdWeek for creative work)",
        "Their internal consumer insights team",
      ],
    },

    communication: {
      preferredChannels:
        "Email for substantive work, Slack/Teams for daily back-and-forth on creative. Live calls preferred for creative review and concept approval. WhatsApp typically reserved for urgent or relationship moments.",
      toneTheyRespondTo:
        "Creative respect, brand-specific language, evidence of brand understanding. Less corporate than Regional Commerce Director — more comfortable with creative-industry tone, less hierarchical.",
    },

    pitchPatterns: {
      openingHooks: [
        "Lead with brand-specific insight ('we noticed your last 3 campaigns leaned into X — here's what we'd build on that')",
        "Show creative work that respects brand voice — even if for a different brand, the quality signals matter",
        "Acknowledge brand custody as the first priority before discussing performance lift",
      ],
      materialsTheyWantToSee: [
        "Brand-specific creative examples (not generic showreels)",
        "Brand-safety and creator vetting process documentation",
        "Sample content calendar tailored to their brand voice",
      ],
      antiPatterns: [
        "Don't lead with performance metrics — leads to 'this is a numbers vendor' framing",
        "Don't propose to 'modernize' the brand voice in opening pitches",
      ],
    },

    commonObjections: [
      {
        objection: "How do you ensure creators stay on-brand on live content?",
        response:
          "Walk them through the briefing process, creator vetting, live-stream rehearsals, escalation protocols. Be specific about what's preventable and what's residual risk. Offer to do a joint brief-development workshop.",
      },
      {
        objection: "We tried social commerce vendors before and the content felt off-brand. What's different here?",
        response:
          "Ask honestly to see what went wrong before. Diagnose, don't dismiss. Then show specific work where brand integrity was preserved at scale — and explain the process behind it, not just the result.",
      },
    ],

    roleInDeals: {
      typicalInfluenceLevel: 'influencer',
      whenInCycleTheyEnter:
        "Mid-cycle. After Regional Commerce Director has identified a candidate vendor, Brand Managers get pulled in to assess brand fit. Can stop a deal entirely on brand-fit grounds even if RCD wants to proceed.",
      whatTheyOwnVsHandOff:
        "Owns: brand voice, creative approval, content calendar for their brand. Hands off: vendor selection (to RCD), commercial terms (to procurement), regional strategy.",
      alliesAndAdversaries:
        "Allies: Internal creative team, consumer insights team, agencies they trust. Friction: RCDs when they push performance-vendor solutions, Procurement when cost pressure compromises creative quality.",
    },

    icpVariations: [
      {
        icpSlug: 'mnc-global-fmcg',
        behaviorAtThisIcp:
          "Brand-equity-protective and operates within a strong brand custody system. Slow to embrace new vendors, requires regional brand team validation before signing off. Will work with what RCD picks but can quietly block if it doesn't meet creative bar.",
      },
      {
        icpSlug: 'regional-d2c-beauty',
        behaviorAtThisIcp:
          "Often more empowered and faster — at smaller D2Cs the Brand Manager IS effectively the CMO. Can move fast if founder backs the play. Brand-equity-protective in a different way: protecting the founder's personal vision, not a global brand book.",
      },
    ],

    referenceIndex: {
      tagClusters: [
        { name: 'Seniority', tags: ['Manager-level', 'Brand-specific scope'] },
        { name: 'Decision style', tags: ['Brand-fit-first', 'Creative-quality-sensitive'] },
        { name: 'Sales notes', tags: ['Mid-cycle gatekeeper', 'Can champion or block', 'Daily creative counterpart'] },
      ],
      linkedEntities: [
        { name: 'MNC / Global FMCG', type: 'icp', slug: 'mnc-global-fmcg' },
        { name: 'Regional D2C Beauty', type: 'icp', slug: 'regional-d2c-beauty' },
      ],
      aiNote:
        "Brand Manager: mid-cycle persona, brand-equity-first, champion or blocker depending on creative fit. Pitch to them on creative quality, brand-specific work, voice-respect — not pure performance. Can stop a deal even if RCD wants it. Different behavior at MNCs (committee-bound) vs D2Cs (founder-empowered).",
    },
  },

  /* ── PERSONA 3: Country GM — MEDIUM SEED ────────────────────── */
  {
    slug: 'country-gm',
    name: 'Country GM (VN)',
    shortCode: 'CGM',
    personaType: 'gatekeeper',
    seniorityLevel: 'executive',
    typicalJobTitles: [
      'Country General Manager',
      'Country Manager',
      'Country Director',
      'Managing Director (VN)',
    ],
    typicalReportingLine:
      "Reports to Regional GM or Regional President. Owns the full country P&L. Has marketing, sales, supply chain, finance, and HR functions reporting up.",
    firstDefined: '2024-03-10',
    lastReviewed: '2026-04-20',

    snapshot: {
      oneSentenceDefinition:
        "Country-level executive owning total VN P&L, providing final budget sign-off on vendor relationships above a threshold and caring about market share and operating leverage more than channel mechanics.",
      coreRole:
        "Owns the VN country P&L end-to-end: revenue, margin, market share, headcount. Final approver on budget commitments above a certain threshold (varies by company, often $500K-$2M annual contracts). Operates at strategic altitude — rarely involved in channel-level decisions but holds veto power on vendor commitments.",
      typicalBackground:
        "15-25 years of experience. Often previously a Marketing Director or Sales Director who became GM. Career trajectory leads to Regional GM or executive roles back at global HQ.",
    },

    caresAbout: {
      personalIncentives:
        "Bonus heavily weighted to country P&L performance — revenue, margin, share. Career trajectory depends on hitting numbers while building leadership reputation. Personal pride in country team performance is real.",
      publicGoals: [
        "Hit annual revenue and margin targets",
        "Grow or defend market share",
        "Build country team capability and culture",
        "Manage regional/global relationships smoothly",
      ],
      privateGoals: [
        "Be seen as a strong operator at the next regional review",
        "Position for regional or global next-role",
        "Avoid surprises that embarrass them in front of regional leadership",
      ],
    },

    pressuresAndFears: {
      keepsThemUpAtNight:
        "Missing the annual number. A competitor making moves they didn't anticipate. Vendor failures that surface to regional leadership before they can manage the narrative. Headcount pressure when growth slows.",
      fearOfFailureModes:
        "Visible vendor failure that becomes a regional story. A big-ticket vendor commitment that doesn't deliver and burns budget. Being seen as having weak vendor management discipline.",
      makesThemDefensive:
        "Vendor pitches that bypass their team and try to go directly to them. Cost commitments that crowd out other strategic priorities they're protecting.",
    },

    decisionMaking: {
      decisionStyle:
        "Strategic and ROI-driven. Trusts their team's evaluation and gives their MO a strong default of yes — but reserves the right to veto on strategic grounds. Decisions made fast once their team brings them a recommendation; rarely revisits.",
      evidenceThatPersuades: [
        "Their own team's enthusiastic endorsement (the most important signal)",
        "Total commercial picture — investment, expected return, payback timeline",
        "Regional case studies showing scale and durability",
      ],
      evidenceThatDoesnt: [
        "Channel-level mechanics they don't engage with directly",
        "Granular creator metrics or content samples",
      ],
    },

    roleInDeals: {
      typicalInfluenceLevel: 'gate',
      whenInCycleTheyEnter:
        "Late. After RCD has aligned with country marketing leads and brought a recommendation forward. Usually appears in the final approval meeting and asks the strategic-altitude questions: total commitment, payback timeline, strategic fit with country priorities.",
      whatTheyOwnVsHandOff:
        "Owns: final approval on commitments above threshold, country-level strategic priorities. Hands off: vendor selection, channel mechanics, day-to-day relationship.",
      alliesAndAdversaries:
        "Allies: country marketing lead, country finance lead. Friction: regional leadership when country priorities conflict with regional initiatives.",
    },

    icpVariations: [
      {
        icpSlug: 'mnc-global-fmcg',
        behaviorAtThisIcp:
          "Standard pattern — appears late in cycle as final approval gate. Their team's recommendation usually carries; they're checking for strategic fit and total commitment scale.",
      },
    ],

    referenceIndex: {
      tagClusters: [
        { name: 'Seniority', tags: ['Executive-level', 'Country P&L owner', '15-25yr experience'] },
        { name: 'Decision style', tags: ['Strategic-altitude', 'Team-recommendation-trusting', 'Veto power'] },
      ],
      linkedEntities: [
        { name: 'MNC / Global FMCG', type: 'icp', slug: 'mnc-global-fmcg' },
      ],
      aiNote:
        "Country GM: executive-level gatekeeper persona. Late-cycle approver, not active evaluator. Their team's recommendation carries — but they hold veto on strategic-altitude grounds. Pitch to them on total commitment, payback, strategic fit. Don't bypass their team to reach them; their team's enthusiasm is the actual signal they listen to.",
    },
  },
];
