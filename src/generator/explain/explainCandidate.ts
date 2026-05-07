import type { GenerationCandidate } from '../GenerationCandidate';

export function explainCandidate(c: GenerationCandidate): { beginner: string; technical: string } {
  return {
    beginner: c.violations.length ? 'This option has issues but may be useful.' : 'This option follows current hard constraints.',
    technical: `Score=${c.scoreBreakdown.total}; violations=${c.violations.join(',') || 'none'}`
  };
}

export const explainRejection = (reasons: string[]) => reasons.length ? `Rejected: ${reasons.join(', ')}` : 'No rejection';
