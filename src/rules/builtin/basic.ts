import type { Rule } from '../core/types';
export const builtinRules: Rule[] = [
 {id:'voice-range',run:()=>({violations:[]})},
 {id:'tessitura-warning',run:()=>({violations:[]})},
 {id:'voice-crossing',run:()=>({violations:[]})},
 {id:'voice-overlap',run:()=>({violations:[]})},
 {id:'adjacent-spacing',run:()=>({violations:[]})},
 {id:'parallel-perfects',run:()=>({violations:[]})},
 {id:'direct-hidden-perfects',run:()=>({violations:[]})},
 {id:'melodic-leap-limit',run:()=>({violations:[]})},
 {id:'leap-recovery',run:()=>({violations:[]})},
 {id:'unresolved-leading-tone',run:()=>({violations:[{ruleId:'unresolved-leading-tone',message:'placeholder',tag:'awaiting-style-rule-pack'}]})},
 {id:'chordal-seventh-resolution',run:()=>({violations:[{ruleId:'chordal-seventh-resolution',message:'placeholder',tag:'awaiting-source-validation'}]})},
 {id:'false-relation',run:()=>({violations:[{ruleId:'false-relation',message:'placeholder',tag:'awaiting-source-validation'}]})},
 {id:'suspension-lifecycle',run:()=>({violations:[{ruleId:'suspension-lifecycle',message:'placeholder',tag:'awaiting-style-rule-pack'}]})}
];
