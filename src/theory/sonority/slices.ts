import type { Score, ScoreEvent, VoiceId } from '../../domain/score/score';

export interface VerticalSlice { measure: number; onsetKey: string; events: Partial<Record<VoiceId, ScoreEvent>> }

export function getEventsAtOnset(score: Score, measure: number, onsetKey: string): ScoreEvent[] {
  return (score.measures.find((m) => m.index === measure)?.events ?? []).filter((e) => `${e.onset.n}/${e.onset.d}` === onsetKey);
}

export function buildVerticalSlices(score: Score): VerticalSlice[] {
  const slices: VerticalSlice[] = [];
  for (const m of score.measures) {
    const onsets = [...new Set(m.events.map((e) => `${e.onset.n}/${e.onset.d}`))].sort();
    for (const onsetKey of onsets) {
      const events = getEventsAtOnset(score, m.index, onsetKey).reduce((acc, e) => ({ ...acc, [e.voice]: e }), {});
      slices.push({ measure: m.index, onsetKey, events });
    }
  }
  return slices;
}

export function buildVoiceLines(score: Score): Record<VoiceId, ScoreEvent[]> {
  const voices: VoiceId[] = ['soprano', 'alto', 'tenor', 'bass'];
  return Object.fromEntries(voices.map((v) => [v, score.measures.flatMap((m) => m.events.filter((e) => e.voice === v))])) as Record<VoiceId, ScoreEvent[]>;
}

export const identifyOuterVoices = (s: VerticalSlice): [ScoreEvent | undefined, ScoreEvent | undefined] => [s.events.soprano, s.events.bass];
export const identifyAdjacentVoicePairs = (s: VerticalSlice): Array<[ScoreEvent | undefined, ScoreEvent | undefined]> => [[s.events.soprano, s.events.alto], [s.events.alto, s.events.tenor], [s.events.tenor, s.events.bass]];
