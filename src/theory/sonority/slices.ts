import type { Score } from '../../domain/score/score';
export const extractVerticalSlices=(s:Score)=>Array.from(new Set(s.measures.flatMap(m=>m.events.map(e=>`${e.onset.n}/${e.onset.d}`)))).sort();
