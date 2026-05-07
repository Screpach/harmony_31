import type { ScoreEvent, VoiceId } from '../domain/score/score';
import type { CandidateScore } from './CandidateScore';

export interface GenerationCandidate {
  id: string;
  generatedEvents: Record<VoiceId, ScoreEvent>;
  replacements: ScoreEvent[];
  preservedEvents: ScoreEvent[];
  scoreBreakdown: CandidateScore;
  violations: string[];
  explanations: { beginner: string; technical: string };
  trace: string[];
  rank: number;
}
