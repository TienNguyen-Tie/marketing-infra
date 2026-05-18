import { PORTFOLIO_ACCOUNTS } from './accounts';
import { CATEGORY_ORDER } from './types';
import type { AccountContact, ClientCategory, PortfolioAccount, Project, ServiceCode } from './types';

export function getAccountBySlug(slug: string): PortfolioAccount | undefined {
  return PORTFOLIO_ACCOUNTS.find(a => a.slug === slug);
}

export function getAccountsByCategory(): Record<ClientCategory, PortfolioAccount[]> {
  const map = {} as Record<ClientCategory, PortfolioAccount[]>;
  for (const cat of CATEGORY_ORDER) {
    map[cat] = PORTFOLIO_ACCOUNTS.filter(a => a.category === cat);
  }
  return map;
}

export function getProjectsByBrand(account: PortfolioAccount): Record<string, Project[]> {
  const map: Record<string, Project[]> = {};
  for (const brand of account.brands) {
    map[brand.id] = account.projects.filter(p => p.brandSlug === brand.id);
  }
  return map;
}

export function getProjectBySlug(account: PortfolioAccount, projectSlug: string): Project | undefined {
  return account.projects.find(p => p.slug === projectSlug);
}

export function getAccountSummaryStats(account: PortfolioAccount): {
  totalProjects: number;
  fullCases: number;
  adhocCount: number;
  brandCount: number;
  patternsTotal: number;
  servicesUsed: ServiceCode[];
} {
  const fullCaseProjects = account.projects.filter(p => p.type === 'full-case');
  const adhocCount = account.projects.filter(p => p.type === 'adhoc').length;
  const serviceSet = new Set<ServiceCode>();
  for (const p of account.projects) {
    for (const s of p.services) serviceSet.add(s);
  }
  const patternsTotal = fullCaseProjects.reduce(
    (sum, p) => sum + (p.type === 'full-case' ? p.patterns.length : 0),
    0,
  );

  return {
    totalProjects: account.projects.length,
    fullCases: fullCaseProjects.length,
    adhocCount,
    brandCount: account.brands.length,
    patternsTotal,
    servicesUsed: Array.from(serviceSet),
  };
}

export function getPortfoliosByParent(parentSlug: string): PortfolioAccount[] {
  return PORTFOLIO_ACCOUNTS.filter(a => a.parentSlug === parentSlug);
}

export function getPortfoliosByCategory(categorySlug: string): PortfolioAccount[] {
  return PORTFOLIO_ACCOUNTS.filter(a => a.categorySlug === categorySlug);
}

export function getDisplayName(account: PortfolioAccount): string {
  return account.isGeneralCategory ? account.parentCompany : account.categoryName;
}

export function getFullDisplayName(account: PortfolioAccount): string {
  return account.isGeneralCategory
    ? account.parentCompany
    : `${account.parentCompany} — ${account.categoryName}`;
}

export function getPrimaryContact(account: PortfolioAccount): AccountContact | undefined {
  return account.keyContacts.find(c => c.isPrimary) ?? account.keyContacts[0];
}

export function getSiblingPortfolios(account: PortfolioAccount): PortfolioAccount[] {
  return PORTFOLIO_ACCOUNTS.filter(
    a => a.parentSlug === account.parentSlug && a.slug !== account.slug,
  );
}

export function getPortfolioStats(): {
  totalAccounts: number;
  categoryCount: number;
  totalProjects: number;
  totalFullCases: number;
  totalPatterns: number;
} {
  const categorySet = new Set(PORTFOLIO_ACCOUNTS.map(a => a.category));
  let totalProjects = 0;
  let totalFullCases = 0;
  let totalPatterns = 0;

  for (const account of PORTFOLIO_ACCOUNTS) {
    totalProjects += account.projects.length;
    for (const p of account.projects) {
      if (p.type === 'full-case') {
        totalFullCases++;
        totalPatterns += p.patterns.length;
      }
    }
  }

  return {
    totalAccounts: PORTFOLIO_ACCOUNTS.length,
    categoryCount: categorySet.size,
    totalProjects,
    totalFullCases,
    totalPatterns,
  };
}
