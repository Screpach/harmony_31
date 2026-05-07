import { absoluteStep31 } from '../../domain/pitch/pitch31';
import type { VoiceId, ScoreEvent } from '../../domain/score/score';
import type { CandidateScore } from '../CandidateScore';

export function scoreCandidate(events: Record<VoiceId, ScoreEvent>): CandidateScore {
  const s = events.soprano.pitch ? absoluteStep31(events.soprano.pitch) : 0;
  const a = events.alto.pitch ? absoluteStep31(events.alto.pitch) : 0;
  const t = events.tenor.pitch ? absoluteStep31(events.tenor.pitch) : 0;
  const spacing = Math.abs(s - a) + Math.abs(a - t);
  const smoothness = 0;
  const completeness = [events.soprano, events.alto, events.tenor, events.bass].filter((e) => e.pitch).length === 4 ? 0 : 10;
  return { spacing, smoothness, completeness, diagnosticsPenalty: 0, total: spacing + smoothness + completeness };
}
