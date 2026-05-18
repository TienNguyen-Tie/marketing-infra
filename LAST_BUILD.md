# Last Build — Marketing Dossier (13-section, Groups A–G)
_2026-05-19_

## Summary

Replaced the portfolio detail page with a full 14-section marketing dossier in 7 groups (A–G). Added 6 new marketing-focused data sections to `PortfolioAccount`: `categoryMarketIntelligence`, `audienceInsights`, `storyCapital`, `creatorStrategy`, `contentAngles`, `coPromotionOpportunities`. Removed all sales/CSM-oriented sections (`accountPatterns`, `businessIntelligence`, `workingStyleNorms`, `approvalWorkflow` etc.). `loreal-vn-consumer` is the showcase portfolio with full seed data across all dossier sections. All other portfolios render with "Not yet captured" empty states. Listing page updated with status filter. `npx tsc --noEmit` clean. `npm run build` succeeds (94 pages, 0 errors).

---

## Files modified

```
data/portfolio/types.ts          — BrandStatus expanded to 5 values (active/prospect/pitched/lapsed/paused);
                                   AccountContact.personaSlug + personaLabel made optional;
                                   accountPatterns REMOVED from PortfolioAccount;
                                   6 new interfaces: CategoryMarketIntelligence, AudienceInsights,
                                   StoryCapital (+ StoryWorthyMoment), CreatorStrategy (+ TopPerformer),
                                   ContentAngle, CoPromotionOpportunity;
                                   2 new types: MarketPosition, CoPromoType;
                                   2 new lookup tables: MARKET_POSITION_LABELS, COPROMO_TYPE_LABELS;
                                   6 new optional fields on PortfolioAccount

data/portfolio/accounts.ts       — REPLACED entirely:
                                   loreal-vn-consumer: full 13-section dossier seed data;
                                   loreal-vn-active: minimal seed (marketPosition: 'niche' only);
                                   unilever-vn-beauty: minimal seed;
                                   cocoon/pampers/friso/bobby/sunhouse/comet: categoryName/categorySlug
                                   changed to 'General'/'general'; accountPatterns removed everywhere;
                                   parentSlug corrected (loreal-vn → loreal-vietnam, 
                                   unilever-vn → unilever-vietnam);
                                   categorySlug corrected (consumer-products → consumer,
                                   active-cosmetics → active);
                                   Garnier status: active → pitched;
                                   Sunsilk, Pond's status: active → prospect

data/portfolio/helpers.ts        — accountPatterns removed from patternsTotal + totalPatterns
                                   calculations in getAccountSummaryStats + getPortfolioStats

app/knowledge-base/client-insight/portfolio/page.tsx
                                 — Status filter added (engaged/pitched/inactive derived from
                                   brand statuses); sorted A→Z by parent then category;
                                   status dot + "Since" in card footer; removed accountPatterns ref

app/knowledge-base/client-insight/portfolio/[accountSlug]/page.tsx
                                 — REPLACED entirely: 14-section marketing dossier in Groups A–G;
                                   GroupDivider + SectionHeader + FieldEmpty + SectionEmpty 
                                   helper components; all 9 existing sections reorganised;
                                   accountPatterns section removed

app/knowledge-base/client-insight/portfolio.module.css
                                 — ~450 new CSS lines appended:
                                   Status dot + pfCardSince (listing);
                                   dossPage, dossHero, dossHeroEyebrow/H1/Meta/Right;
                                   dossCatBadge, dossLockBadge; dossStats strip;
                                   groupDivider + groupEyebrow + groupDividerLine;
                                   dossSection, dossSectionHeader/Num/Title/Subtitle;
                                   fieldEmpty, sectionEmpty, sectionEmptyIcon/Text;
                                   profileGrid, profileRow, profileLabel/Value, profileRationale;
                                   bpcRows, bpcRow, bpcRowLabel/Val, bpcServicesMuted;
                                   icpContactList; cmiCard, cmiGrid, cmiRow, cmiLabel/Val,
                                   mktPosPill + leader/challenger/niche/emerging variants,
                                   competitorPill(s), cmiNotes; audienceCard, audienceBlock;
                                   storyCard, storyBlock, storyTimeline + items;
                                   creatorCard, creatorProfileTop/Block, topPerformerGrid/Card,
                                   tpAvatar/Info/Name/Handle/Notes; anglesList/Card/Title/Why/Ref;
                                   coPromoList/Row, coPromoTypePill + event/platform/co-content/
                                   industry-presence variants; brandDividerGmv, brandNoProjects
```

---

## Dossier structure (Groups A–G)

| Group | Sections | Status for loreal-vn-consumer |
|---|---|---|
| A · Portfolio Identity | 01 Profile · 02 Brands · 03 ICP & Persona | Full |
| B · Market & Audience | 04 CMI · 05 Audience | Full |
| C · Engagement | 06 Brief · 07 Solution · 08 Outcomes | Full |
| D · Story Capital | 09 Story Capital | Full (4 milestones) |
| E · Creator Strategy | 10 Creator Match | Full (3 performers) |
| F · Marketing Playbook | 11 Content Angles · 12 Co-promo | Full (4 each) |
| G · Archive & Reference | 13 Projects · 14 Reference Index | Full |

---

## Data changes

- `parentSlug` for L'Oréal portfolios: 'loreal-vn' → 'loreal-vietnam'
- `parentSlug` for Unilever: 'unilever-vn' → 'unilever-vietnam'
- `categorySlug` for loreal-vn-consumer: 'consumer-products' → 'consumer'
- `categorySlug` for loreal-vn-active: 'active-cosmetics' → 'active'
- All 6 general accounts: `categoryName` → 'General', `categorySlug` → 'general'
- Garnier: status 'active' → 'pitched'
- Sunsilk, Pond's: status 'active' → 'prospect'

---

## TypeScript

`npx tsc --noEmit` — clean, 0 errors.
`npm run build` — 94 pages, 0 errors.
