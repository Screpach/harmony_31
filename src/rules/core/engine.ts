import { buildVerticalSlices } from '../../theory/sonority/slices';
import type { Rule, RuleContext, Diagnostic } from './types';

export class RuleRegistry {
  constructor(public rules: Rule[] = []) {}
  register(rule: Rule): void { this.rules.push(rule); }
}

export function analyzeProject(project: RuleContext['project'], registry: RuleRegistry): Diagnostic[] {
  const ctx: RuleContext = { project, slices: buildVerticalSlices(project.score) };
  return registry.rules.flatMap((r) => r.run(ctx).diagnostics).sort((a, b) => a.ruleId.localeCompare(b.ruleId));
}
