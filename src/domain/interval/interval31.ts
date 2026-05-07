import type { SpelledPitch31 } from '../pitch/types';
import { absoluteStep31 } from '../pitch/pitch31';
const letters = ['C','D','E','F','G','A','B'];
export function intervalBetweenPitches31(a: SpelledPitch31,b: SpelledPitch31){ return absoluteStep31(b)-absoluteStep31(a); }
export function genericInterval(a: SpelledPitch31,b: SpelledPitch31){
  const ai=letters.indexOf(a.letter), bi=letters.indexOf(b.letter);
  return (bi-ai+7)%7+1 + (b.octave-a.octave)*7;
}
export function spellingAwareIntervalName(a: SpelledPitch31,b: SpelledPitch31): string { return `${genericInterval(a,b)}:${intervalBetweenPitches31(a,b)}`; }
