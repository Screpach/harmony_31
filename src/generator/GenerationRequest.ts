import type { ProjectDocument, ScoreEvent, VoiceId } from '../domain/score/score';

export interface GenerationRequest {
  project: ProjectDocument;
  measure: number;
  onsetKey: string;
  fixedEvents: Partial<Record<VoiceId, ScoreEvent>>;
  targetVoices: readonly VoiceId[];
  harmonicTarget?: string;
  ruleProfile: string;
  maxCandidates: number;
  maxNodes: number;
  timeoutMs: number;
  seed: number;
  explanationLevel: 'beginner' | 'technical';
}
