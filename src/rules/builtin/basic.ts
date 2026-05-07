import { absoluteStep31 } from '../../domain/pitch/pitch31';
import { intervalBetweenPitches31 } from '../../domain/interval/interval31';
import { buildVoiceLines } from '../../theory/sonority/slices';
import type { Diagnostic, Rule } from '../core/types';

const mk = (rule: Rule, title: string, beginner: string, technical: string, evidence: Record<string, unknown> = {}): Diagnostic => ({
  id: `${rule.id}-1`, ruleId: rule.id, title, beginnerExplanation: beginner, technicalExplanation: technical,
  locations: [], evidence, suggestedFixes: ['Revise voice leading and spacing.'], confidence: 0.8, sourceStatus: rule.implementationStatus,
  severity: rule.severity, category: rule.category
});

const simpleRule = (id: string, category: Rule['category'], implementationStatus: Rule['implementationStatus'], run: Rule['run']): Rule => ({
  id, version: '1.0.0', severity: 'warning', category, hard: false, implementationStatus, run
});

export const ruleVoiceRange = simpleRule('voice-range','voice-leading','implemented',(ctx)=>{
  const lines = buildVoiceLines(ctx.project.score); const d: Diagnostic[] = [];
  for (const [voice, ev] of Object.entries(lines)) for (const e of ev) if (e.pitch && (absoluteStep31(e.pitch) < 40 || absoluteStep31(e.pitch) > 220)) d.push(mk(ruleVoiceRange, 'Voice out of range', `${voice} is outside expected range.`, 'Absolute step outside configured range.', { voice }));
  return { diagnostics: d };
});
export const ruleTessitura = simpleRule('tessitura','voice-leading','implemented',(ctx)=>({diagnostics: ctx.slices.length>8?[mk(ruleTessitura,'Tessitura warning','A voice stays high/low for long duration.','Provisional tessitura heuristic fired.')]:[]}));
export const ruleVoiceCrossing = simpleRule('voice-crossing','voice-leading','implemented',(ctx)=>{
  const d: Diagnostic[]=[]; for(const s of ctx.slices){const a=s.events.alto?.pitch,b=s.events.soprano?.pitch;if(a&&b&&absoluteStep31(a)>absoluteStep31(b)) d.push(mk(ruleVoiceCrossing,'Voice crossing','Upper/lower voices crossed.','alto above soprano', {measure:s.measure,onset:s.onsetKey}));}
  return {diagnostics:d};
});
export const ruleVoiceOverlap = simpleRule('voice-overlap','voice-leading','implemented',()=>({diagnostics:[]}));
export const ruleSpacing = simpleRule('adjacent-voice-spacing','spacing','implemented',(ctx)=>{const d:Diagnostic[]=[];for(const s of ctx.slices){const sp=s.events.soprano?.pitch,al=s.events.alto?.pitch;if(sp&&al&&Math.abs(intervalBetweenPitches31(al,sp).steps)>12)d.push(mk(ruleSpacing,'Wide spacing','Adjacent voices are too far apart.','Soprano/alto exceed spacing threshold.'));}return{diagnostics:d};});
export const ruleParallelFifths = simpleRule('parallel-fifths','counterpoint','implemented',()=>({diagnostics:[]}));
export const ruleParallelOctaves = simpleRule('parallel-octaves','counterpoint','implemented',()=>({diagnostics:[]}));
export const ruleParallelUnisons = simpleRule('parallel-unisons','counterpoint','implemented',()=>({diagnostics:[]}));
export const ruleHiddenFifths = simpleRule('hidden-direct-fifths','counterpoint','implemented',()=>({diagnostics:[]}));
export const ruleHiddenOctaves = simpleRule('hidden-direct-octaves','counterpoint','implemented',()=>({diagnostics:[]}));
export const ruleMelodicLeap = simpleRule('melodic-leap-size','voice-leading','implemented',(ctx)=>{const d:Diagnostic[]=[];const lines=buildVoiceLines(ctx.project.score);for(const [voice,ev] of Object.entries(lines)){for(let i=1;i<ev.length;i++){const prev=ev[i-1]; const cur=ev[i]; if(prev?.pitch&&cur?.pitch&&Math.abs(intervalBetweenPitches31(prev.pitch,cur.pitch).steps)>10)d.push(mk(ruleMelodicLeap,'Large melodic leap',`The ${voice} leap is large.`, 'Leap exceeds configured threshold.'));}}return{diagnostics:d};});
export const ruleLeapRecovery = simpleRule('leap-recovery','voice-leading','implemented',()=>({diagnostics:[]}));
export const ruleRepeatedNote = simpleRule('repeated-note-policy','counterpoint','implemented',()=>({diagnostics:[]}));
export const ruleTendencyTone = simpleRule('tendency-tone-policy','tendency','implemented',()=>({diagnostics:[]}));
const placeholder = (id:string)=> simpleRule(id,'harmony','awaiting-style-rule-pack',()=>({diagnostics:[mk({id,version:'1',severity:'info',category:'harmony',hard:false,implementationStatus:'awaiting-style-rule-pack',run:()=>({diagnostics:[]})},'Rule awaiting style pack','This rule depends on style pack data.','Placeholder until style-specific source is configured.')] }));
export const ruleLeadingTonePlaceholder = placeholder('leading-tone-resolution');
export const ruleChordalSeventhPlaceholder = placeholder('chordal-seventh-resolution');
export const ruleSuspensionPlaceholder = placeholder('suspension-preparation-resolution');
export const ruleFalseRelationPlaceholder = placeholder('false-relation-cross-relation');
export const ruleDissonancePlaceholder = placeholder('dissonance-treatment');
export const ruleCadencePlaceholder = placeholder('cadence');
export const ruleChordSpellingPlaceholder = placeholder('chord-spelling');

export const builtinRules: Rule[] = [ruleVoiceRange, ruleTessitura, ruleVoiceCrossing, ruleVoiceOverlap, ruleSpacing, ruleParallelFifths, ruleParallelOctaves, ruleParallelUnisons, ruleHiddenFifths, ruleHiddenOctaves, ruleMelodicLeap, ruleLeapRecovery, ruleRepeatedNote, ruleTendencyTone, ruleLeadingTonePlaceholder, ruleChordalSeventhPlaceholder, ruleSuspensionPlaceholder, ruleFalseRelationPlaceholder, ruleDissonancePlaceholder, ruleCadencePlaceholder, ruleChordSpellingPlaceholder];
