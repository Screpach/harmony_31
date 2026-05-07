import type { ScoreEvent, VoiceId } from '../domain/score/score';
export interface SearchNode { assigned: Partial<Record<VoiceId, ScoreEvent>>; depth: number; trace: string[] }
