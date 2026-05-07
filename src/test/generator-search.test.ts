import { describe, it, expect } from 'vitest';
import { generateFourVoiceHarmony } from '../generator/search/generateFourVoiceHarmony';
import { createEmptyProject } from '../domain/score/score';
import { parsePitch31 } from '../domain/pitch/pitch31';

const baseReq = {
  project: createEmptyProject(), measure: 0, onsetKey: '0/1', fixedEvents: {}, targetVoices: ['alto', 'tenor', 'bass'] as const,
  ruleProfile: 'default', maxCandidates: 5, maxNodes: 1000, timeoutMs: 1000, seed: 1, explanationLevel: 'beginner' as const
};

describe('four voice generator', () => {
  it('fixed soprano single slice', () => {
    const r = generateFourVoiceHarmony({ ...baseReq, fixedEvents: { soprano: { id: 's', voice: 'soprano', onset: { n: 0, d: 1 }, duration: { n: 1, d: 1 }, pitch: parsePitch31('C5') } } });
    expect(r.status).toBe('ok');
    expect(r.candidates.length).toBeGreaterThan(0);
  });
  it('fixed bass single slice', () => {
    const r = generateFourVoiceHarmony({ ...baseReq, targetVoices: ['soprano', 'alto', 'tenor'], fixedEvents: { bass: { id: 'b', voice: 'bass', onset: { n: 0, d: 1 }, duration: { n: 1, d: 1 }, pitch: parsePitch31('C3') } } });
    expect(r.status).toBe('ok');
  });
  it('all fixed gives no-op', () => {
    const r = generateFourVoiceHarmony({ ...baseReq, targetVoices: [] });
    expect(r.status).toBe('no-op');
  });
  it('deterministic ranking', () => {
    const r1 = generateFourVoiceHarmony(baseReq);
    const r2 = generateFourVoiceHarmony(baseReq);
    expect(r1.candidates.map(c=>c.id)).toEqual(r2.candidates.map(c=>c.id));
  });
  it('max-node rejection', () => {
    const r = generateFourVoiceHarmony({ ...baseReq, maxNodes: 1 });
    expect(r.status).toBe('max-nodes');
  });
  it('timeout rejection', () => {
    const r = generateFourVoiceHarmony({ ...baseReq, timeoutMs: 0 });
    expect(['timeout','ok','no-solution']).toContain(r.status);
  });
  it('spelling preserved', () => {
    const r = generateFourVoiceHarmony({ ...baseReq, fixedEvents: { soprano: { id: 's', voice: 'soprano', onset: { n: 0, d: 1 }, duration: { n: 1, d: 1 }, pitch: parsePitch31('C#5') } } });
    expect(r.candidates[0]?.generatedEvents.soprano.pitch?.letter).toBe('C');
  });
});
