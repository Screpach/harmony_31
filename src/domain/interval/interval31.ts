import type { SpelledPitch31 } from '../pitch/types';
import { absoluteStep31 } from '../pitch/pitch31';

export interface GenericInterval { number: number }
export interface DirectedInterval31 { steps: number }
const PERFECT_STEPS = new Set([0, 18, 31]);

export function intervalBetweenPitches31(a: SpelledPitch31, b: SpelledPitch31): DirectedInterval31 {
  return { steps: absoluteStep31(b) - absoluteStep31(a) };
}

export function genericInterval(a: SpelledPitch31, b: SpelledPitch31): GenericInterval {
  const letters = ['C', 'D', 'E', 'F', 'G', 'A', 'B'] as const;
  const ai = letters.indexOf(a.letter);
  const bi = letters.indexOf(b.letter);
  return { number: (bi - ai + 7) % 7 + 1 + (b.octave - a.octave) * 7 };
}

export function classifyPerfectConsonance31(interval: DirectedInterval31): boolean {
  const mod = ((interval.steps % 31) + 31) % 31;
  return PERFECT_STEPS.has(mod);
}

export function classifyDissonance31(interval: DirectedInterval31): boolean {
  return !classifyPerfectConsonance31(interval);
}
