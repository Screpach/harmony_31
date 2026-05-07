import type { GenerationCandidate } from './GenerationCandidate';

export interface GenerationResult {
  status: 'ok' | 'no-solution' | 'timeout' | 'max-nodes' | 'no-op';
  candidates: GenerationCandidate[];
  rejectionReasons: string[];
  telemetry: { nodesVisited: number; elapsedMs: number };
  diagnostics: string[];
  reproducibility: { seed: number };
}
