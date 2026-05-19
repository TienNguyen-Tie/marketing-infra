/**
 * Anthropic model identifiers used across the application.
 *
 * Centralized here so model upgrades are a one-line change and so
 * intentional model choices remain discoverable.
 *
 * Selection rationale:
 *
 * - EXTRACTION_MODEL (Opus): PDF extraction processes whole documents
 *   and produces structured JSON that downstream features depend on.
 *   Quality of structured output strongly affects usefulness. The
 *   cost increase vs Sonnet is acceptable for the synthesis quality.
 *
 * - COMPANION_MODEL (Opus): The Research Companion sends the entire
 *   insights library as JSON context per query. Opus handles large
 *   context windows and citation accuracy more reliably than Sonnet
 *   for this workload. When the library grows past ~200-300 insights
 *   and we move to pgvector-based retrieval, this can revert to
 *   Sonnet — but only after that migration lands.
 *
 * - SUGGESTION_MODEL (Sonnet): The Vision Companion and lightweight
 *   AI generation routes handle short, latency-sensitive interactions.
 *   Sonnet's speed and lower cost are the right tradeoff here.
 *
 * - TEST_MODEL (Haiku): Used only for API key ping tests. Haiku
 *   minimizes cost for a 1-token connectivity check.
 *
 * Do not "optimize" extraction or companion to Sonnet without
 * re-reading this rationale and confirming the workload has changed.
 */

export const EXTRACTION_MODEL = 'claude-opus-4-7' as const;
export const COMPANION_MODEL = 'claude-opus-4-7' as const;
export const SUGGESTION_MODEL = 'claude-sonnet-4-6' as const;
export const TEST_MODEL = 'claude-haiku-4-5-20251001' as const;

export type AnthropicModel =
  | typeof EXTRACTION_MODEL
  | typeof COMPANION_MODEL
  | typeof SUGGESTION_MODEL
  | typeof TEST_MODEL;
