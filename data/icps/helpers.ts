import { ICPS } from './icps';
import type { ICP } from './types';
import { PORTFOLIO_ACCOUNTS } from '@/data/portfolio/accounts';
import type { PortfolioAccount } from '@/data/portfolio/types';

export function getAllIcps(): ICP[] {
  return ICPS;
}

export function getIcpBySlug(slug: string): ICP | undefined {
  return ICPS.find(i => i.slug === slug);
}

export function getPortfoliosByIcp(icpSlug: string): PortfolioAccount[] {
  return PORTFOLIO_ACCOUNTS.filter(p => p.icpSlug === icpSlug);
}

export function getAllIcpStats() {
  return {
    totalIcps: ICPS.length,
    tier1Count: ICPS.filter(i => i.tier === 1).length,
    mappedPortfolios: PORTFOLIO_ACCOUNTS.filter(p => !!p.icpSlug).length,
    unmappedPortfolios: PORTFOLIO_ACCOUNTS.filter(p => !p.icpSlug).length,
  };
}
