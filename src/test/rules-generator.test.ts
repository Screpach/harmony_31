import { it, expect } from 'vitest';
import { RuleRegistry, analyzeProject } from '../rules/core/engine';
import { builtinRules } from '../rules/builtin/basic';
import { createEmptyProject } from '../domain/score/score';
import { generateFourVoiceHarmony } from '../generator/search/generateFourVoiceHarmony';
it('deterministic diagnostics',()=>{
  const reg = new RuleRegistry(builtinRules);
  const d1 = analyzeProject(createEmptyProject(), reg);
  const d2 = analyzeProject(createEmptyProject(), reg);
  expect(d1).toEqual(d2);
});
it('deterministic generator ranking',()=>{
  const req = { project:createEmptyProject(), measure:0, onsetKey:'0/1', fixedEvents:{}, targetVoices:['soprano','alto','tenor','bass'] as const, ruleProfile:'default', maxCandidates:3, maxNodes:100, timeoutMs:1000, seed:1, explanationLevel:'beginner' as const };
  const a=generateFourVoiceHarmony(req); const b=generateFourVoiceHarmony(req);
  expect(a.candidates).toEqual(b.candidates);
  expect(a.status).toEqual(b.status);
});
