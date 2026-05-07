import { it, expect } from 'vitest';
import { RuleRegistry, analyzeProject } from '../rules/core/engine';
import { builtinRules } from '../rules/builtin/basic';
import { createEmptyProject } from '../domain/score/score';
import { generateFourVoiceFromFixedInput } from '../generator/core';
it('deterministic diagnostics',()=>{
  const reg = new RuleRegistry(builtinRules);
  const d1 = analyzeProject(createEmptyProject(), reg);
  const d2 = analyzeProject(createEmptyProject(), reg);
  expect(d1).toEqual(d2);
});
it('deterministic generator ranking',()=>{
  const r = { fixedVoices: { soprano:['C5'], alto:['G4'], tenor:['E4'], bass:['C3'] } };
  expect(generateFourVoiceFromFixedInput(r)).toEqual(generateFourVoiceFromFixedInput(r));
});
