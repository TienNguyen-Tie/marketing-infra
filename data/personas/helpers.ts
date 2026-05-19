import { PERSONAS } from './personas';
import type { Persona } from './types';
import { PORTFOLIO_ACCOUNTS } from '@/data/portfolio/accounts';

export function getAllPersonas(): Persona[] {
  return PERSONAS;
}

export function getPersonaBySlug(slug: string): Persona | undefined {
  return PERSONAS.find(p => p.slug === slug);
}

export function getPersonasByIcp(icpSlug: string): Persona[] {
  return PERSONAS.filter(p =>
    p.icpVariations?.some(v => v.icpSlug === icpSlug)
  );
}

export function getIcpsForPersona(personaSlug: string): string[] {
  const persona = getPersonaBySlug(personaSlug);
  return persona?.icpVariations?.map(v => v.icpSlug) ?? [];
}

export function getAllPersonaStats() {
  return {
    totalPersonas: PERSONAS.length,
    primaryDeciders: PERSONAS.filter(
      p => p.roleInDeals?.typicalInfluenceLevel === 'decider'
    ).length,
    championCandidates: PERSONAS.filter(
      p => p.personaType === 'champion' || p.personaType === 'mixed'
    ).length,
    gatekeepers: PERSONAS.filter(
      p => p.personaType === 'gatekeeper' || p.personaType === 'blocker'
    ).length,
  };
}

export function getPortfoliosByPersona(personaSlug: string) {
  return PORTFOLIO_ACCOUNTS.filter(p =>
    p.keyContacts.some(c => c.personaSlug === personaSlug)
  );
}
