import { describe, it, expect } from 'vitest';
import { parsePitch31 } from '../domain/pitch/pitch31';
import { compareRational, normalizeRational } from '../domain/duration/rational';
import { createEmptyProject, type ProjectDocument } from '../domain/score/score';
import { RuleRegistry, analyzeProject } from '../rules/core/engine';
import { builtinRules } from '../rules/builtin/basic';
import { intervalBetweenPitches31 } from '../domain/interval/interval31';

const q = { n: 0, d: 1 };
const makeProject = (): ProjectDocument => ({ schemaVersion: 1, score: { measures: [{ index: 0, events: [
  { id: 's1', voice: 'soprano', onset: q, duration: { n: 1, d: 1 }, pitch: parsePitch31('C5') },
  { id: 'a1', voice: 'alto', onset: q, duration: { n: 1, d: 1 }, pitch: parsePitch31('E4') },
  { id: 't1', voice: 'tenor', onset: q, duration: { n: 1, d: 1 }, pitch: parsePitch31('G3') },
  { id: 'b1', voice: 'bass', onset: q, duration: { n: 1, d: 1 }, pitch: parsePitch31('C3') }
] }] } });

describe('rule engine', () => {
  it('every builtin rule is present', () => expect(builtinRules.length).toBe(21));
  it('every rule executes with diagnostics containing explanations', () => {
    const diags = analyzeProject(makeProject(), new RuleRegistry(builtinRules));
    for (const d of diags) {
      expect(d.beginnerExplanation.length).toBeGreaterThan(0);
      expect(d.technicalExplanation.length).toBeGreaterThan(0);
    }
  });
  it('deterministic analysis', () => {
    const r = new RuleRegistry(builtinRules);
    expect(analyzeProject(makeProject(), r)).toEqual(analyzeProject(makeProject(), r));
  });
  it('handles empty score and single voice', () => {
    expect(() => analyzeProject(createEmptyProject(), new RuleRegistry(builtinRules))).not.toThrow();
    const p = makeProject(); const m=p.score.measures[0]; if(m){m.events=m.events.slice(0,1);}
    expect(() => analyzeProject(p, new RuleRegistry(builtinRules))).not.toThrow();
  });
  it('pitch spelling distinct and octave invariants', () => {
    expect(parsePitch31('C#4').letter).toBe('C');
    expect(parsePitch31('Db4').letter).toBe('D');
    expect(intervalBetweenPitches31(parsePitch31('C4'), parsePitch31('C5')).steps).toBe(31);
  });
  it('invalid duration edge case', () => {
    expect(() => normalizeRational({ n: 1, d: 0 })).toThrow();
    expect(compareRational({ n: 1, d: 2 }, { n: 2, d: 4 })).toBe(0);
  });
  it('golden fixtures placeholders', () => {
    const p = makeProject();
    const m2=p.score.measures[0]; if(m2&&m2.events[1]) m2.events[1].pitch=parsePitch31('C6'); // spacing/crossing prone
    const ids = analyzeProject(p, new RuleRegistry(builtinRules)).map((d) => d.ruleId);
    expect(ids).toContain('leading-tone-resolution');
  });
});
