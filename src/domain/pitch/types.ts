export type PitchLetter = 'C'|'D'|'E'|'F'|'G'|'A'|'B';
export interface Accidental { steps: number; symbol: string }
export interface SpelledPitch31 { letter: PitchLetter; accidental: Accidental; octave: number }
export type PitchClassStep31 = number;
export type AbsoluteStep31 = number;
