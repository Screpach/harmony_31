import { parsePitch31 } from '../../domain/pitch/pitch31';
import type { ScoreEvent, VoiceId } from '../../domain/score/score';
import type { GenerationRequest } from '../GenerationRequest';
import type { GenerationResult } from '../GenerationResult';
import { pruneHardConstraints } from '../constraints/hardConstraints';
import { scoreCandidate } from '../scoring/scoreCandidate';
import { explainCandidate, explainRejection } from '../explain/explainCandidate';
import type { GenerationCandidate } from '../GenerationCandidate';

const VOICES: VoiceId[] = ['soprano', 'alto', 'tenor', 'bass'];

const defaults: Record<VoiceId, string[]> = {
  soprano: ['C5', 'D5'], alto: ['G4', 'A4'], tenor: ['E4', 'F4'], bass: ['C3', 'G3']
};

function baseEvent(v: VoiceId, req: GenerationRequest, p: string): ScoreEvent {
  return { id: `${v}-${p}`, voice: v, onset: { n: Number(req.onsetKey.split('/')[0]), d: Number(req.onsetKey.split('/')[1]) }, duration: { n: 1, d: 1 }, pitch: parsePitch31(p) };
}

export function generateFourVoiceHarmony(req: GenerationRequest): GenerationResult {
  const start = Date.now();
  if (req.targetVoices.length === 0) return { status: 'no-op', candidates: [], rejectionReasons: ['all voices fixed'], telemetry: { nodesVisited: 0, elapsedMs: 0 }, diagnostics: [], reproducibility: { seed: req.seed } };
  let nodes = 0;
  const candidates: GenerationCandidate[] = [];
  const voicesToFill = VOICES.filter((v) => req.targetVoices.includes(v));
  const combos: Record<VoiceId, ScoreEvent[]> = { soprano: [], alto: [], tenor: [], bass: [] };
  for (const v of VOICES) combos[v] = req.fixedEvents[v] ? [req.fixedEvents[v] as ScoreEvent] : defaults[v].map((p) => baseEvent(v, req, p));
  for (const s of combos.soprano) for (const a of combos.alto) for (const t of combos.tenor) for (const b of combos.bass) {
    nodes++; if (nodes > req.maxNodes) return { status: 'max-nodes', candidates, rejectionReasons: ['max nodes exceeded'], telemetry: { nodesVisited: nodes, elapsedMs: Date.now() - start }, diagnostics: [], reproducibility: { seed: req.seed } };
    if (Date.now() - start > req.timeoutMs) return { status: 'timeout', candidates, rejectionReasons: ['timeout exceeded'], telemetry: { nodesVisited: nodes, elapsedMs: Date.now() - start }, diagnostics: [], reproducibility: { seed: req.seed } };
    const ev = { soprano: s, alto: a, tenor: t, bass: b };
    const reasons = pruneHardConstraints(ev);
    if (reasons.length) continue;
    const scoreBreakdown = scoreCandidate(ev);
    const candidate: GenerationCandidate = { id: `cand-${nodes}`, generatedEvents: ev, replacements: voicesToFill.map((v) => ev[v]), preservedEvents: VOICES.filter((v) => !voicesToFill.includes(v)).map((v) => ev[v]), scoreBreakdown, violations: [], explanations: { beginner: '', technical: '' }, trace: [`node:${nodes}`], rank: 0 };
    candidate.explanations = explainCandidate(candidate);
    candidates.push(candidate);
  }
  candidates.sort((x, y) => x.scoreBreakdown.total - y.scoreBreakdown.total || x.id.localeCompare(y.id));
  candidates.forEach((c, i) => (c.rank = i + 1));
  return { status: candidates.length ? 'ok' : 'no-solution', candidates: candidates.slice(0, req.maxCandidates), rejectionReasons: candidates.length ? [] : [explainRejection(['hard constraints'])], telemetry: { nodesVisited: nodes, elapsedMs: Date.now() - start }, diagnostics: [], reproducibility: { seed: req.seed } };
}
