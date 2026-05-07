import { absoluteStep31 } from '../../domain/pitch/pitch31';
import type { ScoreEvent, VoiceId } from '../../domain/score/score';
import { VOICE_RANGES } from '../GeneratorConfig';

export function pruneHardConstraints(events: Record<VoiceId, ScoreEvent>): string[] {
  const reasons: string[] = [];
  for (const [voice, event] of Object.entries(events) as [VoiceId, ScoreEvent][]) {
    if (!event.pitch) continue;
    const step = absoluteStep31(event.pitch);
    const rng = VOICE_RANGES[voice]; if(!rng) continue; const [min, max] = rng;
    if (step < min || step > max) reasons.push(`${voice}-range`);
  }
  const s = events.soprano.pitch && absoluteStep31(events.soprano.pitch);
  const a = events.alto.pitch && absoluteStep31(events.alto.pitch);
  const t = events.tenor.pitch && absoluteStep31(events.tenor.pitch);
  const b = events.bass.pitch && absoluteStep31(events.bass.pitch);
  if (s && a && a > s) reasons.push('crossing-SA');
  if (a && t && t > a) reasons.push('crossing-AT');
  if (t && b && b > t) reasons.push('crossing-TB');
  if (s && a && Math.abs(s - a) > 12) reasons.push('spacing-SA');
  if (a && t && Math.abs(a - t) > 12) reasons.push('spacing-AT');
  return reasons;
}
