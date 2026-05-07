import { z } from 'zod';
import type { SpelledPitch31, PitchClassStep31, AbsoluteStep31 } from './types';
import { LETTER_BASE_STEPS, OCTAVE_STEPS_31 } from '../tuning/tuning31';
const rgx = /^([A-G])([#bx]*|bb|##|)?(-?\d+)$/;
export function parsePitch31(token: string): SpelledPitch31 {
  const m = token.trim().match(rgx); if (!m) throw new Error('Invalid pitch spelling');
  const [, letter, accRaw = '', octRaw] = m;
  const accidentalSteps = [...accRaw].reduce((a,c)=>a + (c === '#' ? 2 : c === 'b' ? -2 : 0),0);
  const accidental = { steps: accidentalSteps, symbol: accRaw };
  const p = { letter: letter as SpelledPitch31['letter'], accidental, octave: Number(octRaw) };
  z.number().int().parse(p.octave); return p;
}
export function formatPitch31(p: SpelledPitch31): string { return `${p.letter}${p.accidental.symbol}${p.octave}`; }
export function pitchClassStep31(p: SpelledPitch31): PitchClassStep31 { return (LETTER_BASE_STEPS[p.letter] + p.accidental.steps + OCTAVE_STEPS_31*1000) % OCTAVE_STEPS_31; }
export function absoluteStep31(p: SpelledPitch31): AbsoluteStep31 { return p.octave * OCTAVE_STEPS_31 + LETTER_BASE_STEPS[p.letter] + p.accidental.steps; }
export function frequencyOfPitch31(p: SpelledPitch31, refStep = 0, refHz = 261.625565): number { return refHz * 2 ** ((absoluteStep31(p)-refStep)/OCTAVE_STEPS_31); }
