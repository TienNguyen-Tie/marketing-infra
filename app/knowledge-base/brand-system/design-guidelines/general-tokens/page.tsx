import { extractMultipleSections, readDesignSystemStyle } from '@/lib/extractSection';

const SECTION_IDS = [
  'typography', 'color', 'iconography', 'spacing', 'grid',
  'shell', 'badges', 'eyebrow', 'buttons', 'inputs', 'pills', 'cards',
];

const OVERRIDE_CSS = `
  .ds-section { max-width: 100% !important; width: 100% !important; }
  .ds-layout { display: block !important; }
  .ds-nav { display: none !important; }
  .ds-main {
    margin: 0 !important; max-width: 100% !important;
    height: auto !important; overflow: visible !important; padding: 0 !important;
  }
  [class*="grid"]:not(.kb-grid):not(.icon-grid-mi) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)) !important;
  }
  .ds-swatch-row { grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)) !important; }
`;

export default function GeneralTokensPage() {
  const sectionsHtml = extractMultipleSections(SECTION_IDS);
  const designSystemStyle = readDesignSystemStyle();

  return (
    <>
      <div className="kb-header gt-header">
        <p className="kb-label">GENERAL TOKENS</p>
        <h1 className="kb-title">Design Tokens & Components</h1>
        <p className="kb-subtitle">
          The foundational visual vocabulary for all VinaCapital surfaces.
        </p>
        <nav className="gt-anchor-nav">
          <a href="#typography">Typography</a>
          <span aria-hidden>·</span>
          <a href="#color">Color</a>
          <span aria-hidden>·</span>
          <a href="#iconography">Iconography</a>
          <span aria-hidden>·</span>
          <a href="#spacing">Spacing</a>
          <span aria-hidden>·</span>
          <a href="#grid">Grid</a>
          <span aria-hidden>·</span>
          <a href="#shell">Components</a>
        </nav>
      </div>

      <style dangerouslySetInnerHTML={{ __html: designSystemStyle + OVERRIDE_CSS }} />

      <div
        className="gt-content"
        dangerouslySetInnerHTML={{ __html: sectionsHtml }}
      />
    </>
  );
}
