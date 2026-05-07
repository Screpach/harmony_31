import type { ProjectDocument } from '../../domain/score/score';
export const exportProjectJson=(p:ProjectDocument)=>JSON.stringify(p);
export const importProjectJson=(s:string):ProjectDocument=>JSON.parse(s) as ProjectDocument;
