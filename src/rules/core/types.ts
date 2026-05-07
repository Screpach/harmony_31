import type { ProjectDocument, LocationRef } from '../../domain/score/score';
import type { VerticalSlice } from '../../theory/sonority/slices';

export type Severity = 'error' | 'warning' | 'info';
export type RuleCategory = 'voice-leading' | 'counterpoint' | 'harmony' | 'tendency' | 'spacing';
export type SourceStatus = 'implemented' | 'provisional' | 'awaiting-style-rule-pack';

export interface RuleViolation {
  id: string; ruleId: string; title: string; beginnerExplanation: string; technicalExplanation: string;
  locations: LocationRef[]; evidence: Record<string, unknown>; suggestedFixes: string[];
  confidence: number; sourceStatus: SourceStatus;
}
export interface Diagnostic extends RuleViolation { severity: Severity; category: RuleCategory }
export interface RuleContext { project: ProjectDocument; slices: VerticalSlice[] }
export interface RuleResult { diagnostics: Diagnostic[] }
export interface Rule {
  id: string; version: string; severity: Severity; category: RuleCategory; hard: boolean; implementationStatus: SourceStatus;
  run: (ctx: RuleContext) => RuleResult;
}
