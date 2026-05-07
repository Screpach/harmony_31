import type { Rule, RuleContext, Diagnostic } from './types';
export class RuleRegistry { constructor(public rules:Rule[]=[]){ } register(r:Rule){ this.rules.push(r);} }
export function analyzeProject(ctx:RuleContext, reg:RuleRegistry): Diagnostic[] { return reg.rules.flatMap(r=>r.run(ctx).violations.map(v=>({severity:'warning' as const, violation:v}))); }
