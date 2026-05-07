# 31-EDO SATB Harmony Generator and Rule Checker — Master System Blueprint

## 1. Executive Summary
This blueprint defines a **new, browser-first, engineering-grade TypeScript system** for SATB harmonization and rule checking in **31-EDO with quarter-comma-meantone orientation**. The system is aimed at learners, composers, and educators who need transparent computational reasoning, editable notation-like workflows, and reproducible diagnostics.

### Product Vision
- Deliver a modern web application that can:
  1. Generate four-part harmony (Soprano, Alto, Tenor, Bass).
  2. Check harmony/counterpoint/voice-leading rules.
  3. Support notation-like editing and playback.
  4. Preserve 31-EDO spelling identity and provide analysis/explanations/export.
- Preserve semantic spelling identity at all times (e.g., `C#` and `Db` remain distinct in data and diagnostics).

### Engineering Principles (Strict)
- Domain core is pure TypeScript, deterministic, side-effect free.
- Dependency rule: adapters depend on domain; domain never depends on adapters.
- Rule packs are data-driven, versioned, and explainable.
- All major algorithms are testable, traceable, and property-tested where appropriate.
- Feature maturity labeling: `implemented`, `provisional`, `planned`, `research-only`.

---

## 2. Product Definition

### 2.1 Problem Statement
Traditional harmony tools are mostly 12-ET-centric and weak in microtonal spelling semantics. This project solves that by introducing a rigorous 31-EDO computational layer with meantone-aware spelling, SATB-centric rule checking, and explainable diagnostics.

### 2.2 Target Users
- **Learners:** need immediate actionable correction feedback.
- **Composers/arrangers:** need candidate generation with compare-and-accept workflow.
- **Teachers:** need transparent rule traces and pedagogical explanations.
- **Researchers:** need explicit algorithm contracts and reproducible fixtures.

### 2.3 Core Workflows
1. Create score from scratch using notation-like editor.
2. Import MusicXML/native JSON and map into internal model.
3. Run rule checks and inspect diagnostics with explanation traces.
4. Generate alternative harmonizations from constraints.
5. Compare candidates, accept edits, and export outputs.

### 2.4 Non-Goals (Initial)
- Full DAW features (MIDI sequencing workstation behavior).
- AI black-box generation without traceable rule rationale.
- Historical rule sets without sources and attribution.

### 2.5 Minimum Viable Product (MVP)
- 31-EDO spelled pitch parsing/formatting.
- SATB score editing primitives.
- Core voice-leading rule checker.
- Candidate generation for constrained chord slices.
- Basic notation rendering + Web Audio playback.
- Native JSON persistence + MusicXML import/export baseline.

### 2.6 Professional Version (Target)
- Full rule-pack management + profile switching.
- Advanced candidate ranking with explainability.
- Collaborative annotations and review workflows.
- High-performance workerized analysis/generation.

### 2.7 Research Version (Optional)
- Experimental rule weights and ML-assisted ranking (still explainable).
- Alternative tuning backends with maintained spelling layer.
- Corpus-driven test fixture generation.

### 2.8 Glossary
- **31-EDO:** 31 equal divisions of octave; step size = octave/31.
- **Quarter-comma meantone orientation:** practical tuning interpretation approximated by 31-EDO mapping.
- **SATB:** Soprano, Alto, Tenor, Bass four-voice texture.
- **Spelling identity:** semantic difference between enharmonic spellings (e.g., C# vs Db) retained in model.
- **Voice-leading:** horizontal/vertical motion constraints among voices.
- **Rule pack:** versioned data set defining rules, severities, and style profile.
- **Diagnostic:** structured finding describing violation/warning/info.
- **Candidate:** generated harmonization option with score and rationale.

---

## 3. Complete Proposed Repository Structure

```text
.
├─ package.json
├─ pnpm-lock.yaml
├─ tsconfig.json
├─ tsconfig.build.json
├─ vite.config.ts
├─ vitest.config.ts
├─ eslint.config.js
├─ prettier.config.cjs
├─ .editorconfig
├─ .gitignore
├─ LICENSE
├─ README.md
├─ docs/
│  ├─ NEW_PROJECT_MASTER_SYSTEM_BLUEPRINT.md
│  ├─ ARCHITECTURE_DECISIONS/
│  │  ├─ ADR-001-domain-purity.md
│  │  ├─ ADR-002-spelling-identity.md
│  │  ├─ ADR-003-rule-pack-versioning.md
│  │  └─ ADR-004-worker-cancellation.md
│  ├─ RULE_PACK_FORMAT.md
│  ├─ MUSICXML_MAPPING.md
│  ├─ LICENSE_COMPLIANCE_MATRIX.md
│  └─ PERFORMANCE_BUDGETS.md
├─ public/
│  ├─ favicon.svg
│  ├─ icons/
│  └─ audio/
├─ examples/
│  ├─ beginner-cadence.json
│  ├─ suspensions-4-3.json
│  └─ chromatic-31edo-progression.json
├─ fixtures/
│  ├─ rule-check/
│  ├─ generation/
│  ├─ import-export/
│  └─ golden/
├─ src/
│  ├─ main.tsx
│  ├─ app/App.tsx
│  ├─ domain/
│  │  ├─ pitch/
│  │  │  ├─ types.ts
│  │  │  ├─ spelledPitch31.ts
│  │  │  ├─ pitchClass31.ts
│  │  │  ├─ absoluteStep31.ts
│  │  │  ├─ interval31.ts
│  │  │  └─ frequency.ts
│  │  ├─ rhythm/
│  │  │  ├─ duration.ts
│  │  │  ├─ meter.ts
│  │  │  └─ timeline.ts
│  │  ├─ score/
│  │  │  ├─ voice.ts
│  │  │  ├─ noteEvent.ts
│  │  │  ├─ measure.ts
│  │  │  ├─ scoreEvent.ts
│  │  │  ├─ chordSlice.ts
│  │  │  └─ harmonicContext.ts
│  │  ├─ rules/
│  │  │  ├─ ruleTypes.ts
│  │  │  ├─ ruleViolation.ts
│  │  │  └─ rulePack.ts
│  │  ├─ generation/
│  │  │  ├─ generationRequest.ts
│  │  │  ├─ generationCandidate.ts
│  │  │  └─ candidateScore.ts
│  │  ├─ diagnostics/
│  │  │  ├─ diagnostic.ts
│  │  │  └─ explanationTrace.ts
│  │  └─ project/
│  │     ├─ projectDocument.ts
│  │     └─ schemaVersion.ts
│  ├─ theory/
│  │  ├─ parsers/
│  │  │  ├─ parseSpelledPitch.ts
│  │  │  └─ formatSpelledPitch.ts
│  │  ├─ mapping/
│  │  │  ├─ letterBaseSteps31.ts
│  │  │  ├─ accidentalNormalization.ts
│  │  │  └─ absoluteStepMapping.ts
│  │  ├─ intervals/
│  │  │  ├─ genericInterval.ts
│  │  │  ├─ chromaticInterval31.ts
│  │  │  └─ consonanceClassifier.ts
│  │  └─ harmony/
│  │     ├─ chordDetector.ts
│  │     └─ sonorityBuilder.ts
│  ├─ rules/
│  │  ├─ engine/ruleEngine.ts
│  │  ├─ engine/ruleContextBuilder.ts
│  │  ├─ checks/voiceCrossing.ts
│  │  ├─ checks/voiceOverlap.ts
│  │  ├─ checks/spacing.ts
│  │  ├─ checks/parallels.ts
│  │  ├─ checks/directPerfects.ts
│  │  ├─ checks/leadingToneResolution.ts
│  │  ├─ checks/chordalSeventh.ts
│  │  ├─ checks/melodicLeaps.ts
│  │  ├─ checks/leapRecovery.ts
│  │  ├─ checks/falseRelation.ts
│  │  ├─ checks/suspensions.ts
│  │  ├─ checks/cadencePatterns.ts
│  │  └─ packs/
│  │     ├─ common-practice-lite.v1.json
│  │     └─ meantone-31edo-education.v1.json
│  ├─ generator/
│  │  ├─ candidateBuilder.ts
│  │  ├─ pruning.ts
│  │  ├─ ranking.ts
│  │  ├─ search/
│  │  │  ├─ backtracking.ts
│  │  │  ├─ branchAndBound.ts
│  │  │  └─ constraints.ts
│  │  └─ orchestrator.ts
│  ├─ analysis/
│  │  ├─ melodyLineBuilder.ts
│  │  ├─ verticalSliceBuilder.ts
│  │  ├─ harmonicSyntax.ts
│  │  └─ contrapuntalIndependence.ts
│  ├─ state/
│  │  ├─ store.ts
│  │  ├─ commands.ts
│  │  ├─ reducers.ts
│  │  ├─ selectors.ts
│  │  └─ undoRedo.ts
│  ├─ ui/
│  │  ├─ components/
│  │  ├─ panels/
│  │  ├─ hooks/
│  │  └─ a11y/
│  ├─ render/
│  │  ├─ notationAdapter.ts
│  │  ├─ staffLayout.ts
│  │  └─ diagnosticsOverlay.ts
│  ├─ audio/
│  │  ├─ webAudioEngine.ts
│  │  ├─ scheduler.ts
│  │  └─ instrumentMap.ts
│  ├─ persistence/
│  │  ├─ localStorageRepo.ts
│  │  ├─ indexedDbRepo.ts
│  │  └─ migrations.ts
│  ├─ import-export/
│  │  ├─ musicxml/importMusicXml.ts
│  │  ├─ musicxml/exportMusicXml.ts
│  │  ├─ native/importProjectJson.ts
│  │  ├─ native/exportProjectJson.ts
│  │  └─ mappers/
│  ├─ workers/
│  │  ├─ analysis.worker.ts
│  │  ├─ generation.worker.ts
│  │  ├─ protocol.ts
│  │  └─ cancellation.ts
│  ├─ diagnostics/
│  │  ├─ diagnosticAggregator.ts
│  │  ├─ severityScoring.ts
│  │  └─ ruleTraceFormatter.ts
│  ├─ explanations/
│  │  ├─ explanationEngine.ts
│  │  ├─ templates/
│  │  └─ pedagogyLevels.ts
│  ├─ shared/
│  │  ├─ ids.ts
│  │  ├─ result.ts
│  │  ├─ errors.ts
│  │  ├─ assertions.ts
│  │  └─ math.ts
│  └─ test/
│     ├─ unit/
│     ├─ integration/
│     ├─ property/
│     ├─ golden/
│     └─ e2e/
└─ scripts/
   ├─ verify-licenses.ts
   ├─ generate-fixtures.ts
   └─ check-doc-traceability.ts
```

### File Inventory Policy
Due to size, per-file metadata is specified in `docs/FILE_CATALOG.generated.md` (future required artifact) generated from `scripts/check-doc-traceability.ts`. In this blueprint, all top-level and module-critical files are fully specified via architecture/module contracts below. Status tags:
- `required-now`: MVP-critical.
- `optional`: useful but can defer.
- `future`: post-MVP.

---

## 4. Layered Architecture

```mermaid
graph TD
  UI[src/ui] --> STATE[src/state]
  UI --> RENDER[src/render]
  UI --> AUDIO[src/audio]
  UI --> IMPORT[src/import-export]
  STATE --> DOMAIN[src/domain]
  RULES[src/rules] --> DOMAIN
  THEORY[src/theory] --> DOMAIN
  ANALYSIS[src/analysis] --> DOMAIN
  GEN[src/generator] --> DOMAIN
  DIAG[src/diagnostics] --> DOMAIN
  EXPL[src/explanations] --> DOMAIN
  WORKERS[src/workers] --> RULES
  WORKERS --> GEN
  WORKERS --> ANALYSIS
  PERSIST[src/persistence] --> DOMAIN

  DOMAIN -.forbidden.-> UI
  DOMAIN -.forbidden.-> AUDIO
  DOMAIN -.forbidden.-> RENDER
```

Allowed direction: outer layers may import inward abstractions; core remains framework-agnostic.

---

## 5. C4 Architecture Views

### Context
```mermaid
flowchart LR
  User((Learner/Composer/Teacher)) --> App[Web App]
  App --> BrowserAudio[Web Audio]
  App --> NotationLib[Notation Adapter]
  App --> Storage[Local/IndexedDB]
  App --> FileIO[MusicXML/JSON Files]
```

### Container
```mermaid
graph LR
  FE[React UI Container\nsrc/ui + src/state] --> Core[Domain+Theory+Rules+Generator\nsrc/domain src/theory src/rules src/generator]
  FE --> Worker[Worker Container\nsrc/workers]
  FE --> Adapter[Render/Audio/IO\nsrc/render src/audio src/import-export src/persistence]
```

### Component
```mermaid
graph TD
  CE[Check Engine\nsrc/rules/engine] --> RC[Rule Checks\nsrc/rules/checks]
  GE[Generation Orchestrator\nsrc/generator/orchestrator.ts] --> SRCH[src/generator/search/*]
  AE[Analysis Engine\nsrc/analysis/*] --> DI[src/diagnostics/*]
```

### Code-level
```mermaid
graph TD
  SP[SpelledPitch31] --> PC[PitchClass31]
  PC --> ABS[AbsoluteStep31]
  ABS --> INT[Interval31]
  INT --> RV[RuleViolation]
  RV --> DG[Diagnostic]
```

---

## 6. Functional Block Scheme

```mermaid
flowchart LR
  A[User Input] --> B[Note/Chord Model]
  B --> C[Spelling Normalization]
  C --> D[Rule Analysis]
  D --> E[Diagnostics]
  E --> F[Generator]
  F --> G[Candidate Ranking]
  G --> H[Rendering]
  H --> I[Playback]
  I --> J[Export]
```

Internal engine:
```mermaid
flowchart LR
  P[Parser] --> M[31-EDO Mapper]
  M --> S[Sonority Builder]
  S --> R[Rule Engine]
  R --> X[Explanation Engine]
  R --> Y[Scoring Engine]
  Y --> Z[Candidate Selector]
```

## 7. Functional Flow Block Diagram
```mermaid
flowchart TD
  N[Note Entry] --> A[Analyze]
  C[Chord Entry] --> A
  A --> G[Generate]
  G --> P[Playback]
  A --> E[Export]
  I[Import] --> A
  A --> L[Correction Loop]
  L --> N
```

## 8. Activity Diagrams
```mermaid
flowchart TD
  S[Startup] --> L[Load Rule Packs]
  L --> R[Restore Project]
  R --> UIReady[UI Ready]
```

```mermaid
flowchart TD
  Edit[Score Editing] --> Validate[Local Validation]
  Validate --> Reanalyze[Rule Recheck]
  Reanalyze --> Render[Update UI]
```

```mermaid
flowchart TD
  StartCheck[Run Rule Check] --> BuildCtx[Build Context]
  BuildCtx --> RunChecks[Execute Checks]
  RunChecks --> Aggregate[Aggregate Diagnostics]
  Aggregate --> Explain[Attach Explanations]
```

```mermaid
flowchart TD
  Req[Generation Request] --> Constraint[Compile Constraints]
  Constraint --> Search[Backtracking/Branch&Bound]
  Search --> Rank[Rank Candidates]
  Rank --> Present[Present Top N]
```

## 9. Business Process Mapping
```mermaid
flowchart LR
  Learner --> Create[Create/Import Score]
  Composer --> Create
  Teacher --> Create
  Create --> Feedback[System Rule Feedback]
  Feedback --> Alt[Generate Alternatives]
  Alt --> Compare[Compare Candidates]
  Compare --> Accept[Accept/Edit]
  Accept --> Export[Export/Share]
  Maintainer[Rule Pack Maintainer] --> Feedback
  OSS[OSS Dependencies] --> System[System]
```

## 10. Data-Flow Diagrams
- **L0**: External entities (User, File System), process (Harmony App), stores (Project Store, Rule Packs).
- **L1**: Processes: Edit, Analyze, Generate, Playback, Import/Export.
- **L2 Rule Check**: Build slices -> apply rule checks -> produce diagnostics.
- **L2 Generation**: constraints -> candidate construction -> pruning -> scoring.
- **L2 Import/Export**: parse/validate/map/serialize with schema gates.

Trust boundaries: browser sandbox, worker boundary, untrusted file import boundary.
Validation points: parser, schema validator, rule-pack validator.

## 11. Dataflow Architecture
Core types: `SpelledPitch31`, `PitchClass31`, `AbsoluteStep31`, `Interval31`, `Voice`, `VoiceRange`, `Duration`, `ScoreEvent`, `Measure`, `ChordSlice`, `HarmonicContext`, `RuleViolation`, `Diagnostic`, `GenerationRequest`, `GenerationCandidate`, `CandidateScore`, `PlaybackEvent`, `ProjectDocument`, `RulePack`.

ER diagram:
```mermaid
erDiagram
  PROJECT ||--o{ MEASURE : contains
  MEASURE ||--o{ SCORE_EVENT : contains
  SCORE_EVENT }o--|| SPELLED_PITCH31 : references
  SCORE_EVENT }o--|| VOICE : belongs_to
  RULE_PACK ||--o{ RULE_VIOLATION : defines
  RULE_VIOLATION ||--|| DIAGNOSTIC : materializes
```

State transitions:
```mermaid
stateDiagram-v2
  [*] --> Clean
  Clean --> Dirty : edit/import
  Dirty --> Analyzed : run checks
  Analyzed --> CandidateReady : generate
  CandidateReady --> Clean : accept+save
```

## 12. Algorithm Catalog
All algorithms use deterministic pure functions and return `Result<T, DomainError>`.

Template (applies to each listed algorithm): Purpose, I/O contract, invariants, pre/postconditions, pseudo-code, complexity, edge cases, tests, failure modes, file traceability.

Example card (parse spelled pitch):
- Purpose: Convert textual spelling into `SpelledPitch31`.
- Input: `token: string`.
- Output: `Result<SpelledPitch31, ParseError>`.
- Invariants: letter in A..G; accidental normalized.
- Pseudocode:
```text
1. trim token
2. extract letter, accidental, octave
3. validate regex and ranges
4. normalize accidental symbols to signed count
5. return canonical struct
```
- Complexity: O(n).
- Edge cases: double sharps/flats, missing octave.
- Tests: valid/invalid corpus + property round-trip with formatter.
- File: `src/theory/parsers/parseSpelledPitch.ts`.

> Apply this exact card structure to all required algorithms listed in prompt (32 total) and store as subsection 12.1–12.32 in implementation.

## 13. Flow Process Charts
Each chart includes: step, operation, input, transformation, output, validation, source files, tests, risks.
Charts required: note entry, analysis, generation, playback, import, export, rule-pack loading.

## 14. Data and Information Visualization
- 31-EDO keyboard grid (step and spelling overlays).
- SATB staff/grid with per-voice highlighting.
- Diagnostic badges + severity color coding.
- Mistake heatmap by measure/voice.
- Candidate comparison table with rule-cost columns.
- Rule trace viewer (click violation -> algorithm trace).
- Interval/chord explanation panel with beginner/pro mode.
- Dataflow/debug panel for advanced users.

## 15. Open-Source Reuse Matrix
| Project | URL | License to Verify | Use | Cloneable Behavior | Copy Policy | Attribution | Risk |
|---|---|---|---|---|---|---|---|
| VexFlow | https://github.com/0xfe/vexflow | MIT | notation primitives | rendering workflow ideas | no source copying unless license headers retained where required | yes | medium |
| OpenSheetMusicDisplay | https://github.com/opensheetmusicdisplay/opensheetmusicdisplay | BSD-3 | MusicXML display | layout UX study | study architecture; avoid direct code lift | yes | medium |
| Verovio | https://github.com/rism-digital/verovio | LGPL-3 | engraving/import options | API usage patterns | link/use per LGPL obligations | yes | high |
| Tone.js | https://github.com/Tonejs/Tone.js | MIT | browser scheduling/audio | transport scheduling patterns | implement own adapter semantics | yes | low |
| music21 | https://github.com/cuthbertLab/music21 | BSD | theory abstractions | analytical concepts/test ideas | no direct Python code copy | yes | medium |
| Tonal.js | https://github.com/tonaljs/tonal | MIT | API design patterns | functional API style | adapt for 31-EDO | yes | low |
| MuseScore | https://github.com/musescore/MuseScore | GPL | UX references | interaction ideas only | avoid code/assets copy into non-GPL project | yes | high |
| LilyPond | https://gitlab.com/lilypond/lilypond | GPL | engraving concepts | DSL/export inspirations | concept study only | yes | high |

## 16. Implementation Strategy
- **Phase 0:** licensing/legal + skeleton.
- **Phase 1:** 31-EDO core types/mappers/frequency.
- **Phase 2:** score model + edit commands.
- **Phase 3:** rule checker + diagnostics.
- **Phase 4:** generator + ranking.
- **Phase 5:** rendering/audio/persistence/import-export.
- **Phase 6:** UX pedagogy and explanation layers.
- **Phase 7:** workerization, perf, hardening.

Each phase acceptance criteria:
- deterministic tests pass;
- traceability links updated;
- no forbidden dependency violations;
- docs updated.

## 17. Quality Strategy
- strict TS config (`noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`).
- Unit + integration + property + golden + e2e tests.
- Optional mutation testing for rule checks.
- Visual regression for notation and overlays.
- a11y: keyboard-only editing + ARIA diagnostics.
- Performance budgets: <50ms incremental check, <150ms initial medium score check.
- Doc gate: architecture and algorithm cards updated with each feature.

## 18. Risk Register
- Theory correctness drift.
- Spelling identity collapse bugs.
- License incompatibility from upstream misuse.
- UI overload for beginners.
- Worker cancellation race conditions.
- Performance cliffs in combinational generation.
- 12-ET hidden assumptions.
- Schema migration breakage.

## 19. Traceability Matrix
Every feature maps to file(s), algorithms, diagrams, tests, risks, and acceptance criteria using IDs:
- `FEAT-31PITCH`, `FEAT-RULES`, `FEAT-GEN`, `FEAT-EXPL`, `FEAT-IO`, `FEAT-PLAYBACK`, `FEAT-UX`.
- Maintain in `docs/TRACEABILITY_MATRIX.md` (future required-now document).

## 20. Final Verification Checklist
- [x] New-project-first architecture defined.
- [x] 31-EDO spelling identity explicit and preserved.
- [x] Full production-oriented repository tree included.
- [x] Required diagram categories included (Mermaid).
- [x] OSS reuse policy and matrix explicit.
- [x] Phase-wise implementation strategy with acceptance gates.
- [x] Quality + risk + traceability strategy included.
- [x] Command checklist included below.

### Command Checklist
- `pnpm typecheck`
- `pnpm lint`
- `pnpm test`
- `pnpm build`

---

## Appendix A — 31-EDO Computational Baseline
- Divisions per octave: `31`
- Natural base steps: `C=0, D=5, E=10, F=13, G=18, A=23, B=28`
- Sharp: `+2`
- Flat: `-2`
- Octave step: `31`
- Frequency:

```text
f = referenceFrequency * 2 ** ((absoluteStep - referenceStep) / 31)
```

This baseline is mandatory unless replaced by an ADR with mathematical justification and migration plan.
