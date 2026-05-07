export interface GenerationRequest { fixedVoices: Record<string,string[]> }
export interface GenerationCandidate { id:string; voices:Record<string,string[]>; score:number; reasons:string[] }
export interface GenerationResult { candidates:GenerationCandidate[] }
export const generateFourVoiceFromFixedInput=(r:GenerationRequest):GenerationResult=>({candidates:[{id:'cand-1',voices:r.fixedVoices,score:0,reasons:['deterministic-placeholder']} ]});
