import type { SpelledPitch31 } from '../pitch/types';
import type { Rational } from '../duration/rational';

export type VoiceId = 'soprano' | 'alto' | 'tenor' | 'bass';
export interface LocationRef { measure: number; onset: Rational; voice?: VoiceId; eventId?: string }
export interface ScoreEvent { id: string; voice: VoiceId; onset: Rational; duration: Rational; pitch?: SpelledPitch31; isRest?: boolean }
export interface Measure { index: number; events: ScoreEvent[] }
export interface Score { measures: Measure[] }
export interface ProjectDocument { schemaVersion: 1; score: Score }
export const createEmptyProject = (): ProjectDocument => ({ schemaVersion: 1, score: { measures: [{ index: 0, events: [] }] } });
