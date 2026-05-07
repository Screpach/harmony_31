import type { ProjectDocument } from '../../domain/score/score';
export interface RuleViolation { ruleId:string; message:string; tag?:'awaiting-source-validation'|'awaiting-style-rule-pack' }
export interface RuleResult { violations: RuleViolation[] }
export interface RuleContext { project: ProjectDocument }
export interface Rule { id:string; run:(ctx:RuleContext)=>RuleResult }
export interface Diagnostic { severity:'error'|'warning'|'info'; violation:RuleViolation }
