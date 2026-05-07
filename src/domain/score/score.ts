import type { SpelledPitch31 } from '../pitch/types';
import type { Rational } from '../duration/rational';
import type { VoiceId } from '../voice/voice';
export interface ScoreEvent { id:string; voice:VoiceId; onset:Rational; duration:Rational; pitch:SpelledPitch31 }
export interface Measure { index:number; events:ScoreEvent[] }
export interface Score { measures:Measure[] }
export interface ProjectDocument { schemaVersion:1; score:Score }
export const createEmptyProject=():ProjectDocument=>({schemaVersion:1,score:{measures:[{index:0,events:[]}]}});
export const createDemoProject=():ProjectDocument=>createEmptyProject();
