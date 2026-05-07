import { create } from 'zustand';
import { createEmptyProject, type ProjectDocument } from '../../domain/score/score';
interface AppState { project: ProjectDocument; selection?: string; undo: ProjectDocument[]; redo: ProjectDocument[]; setProject:(p:ProjectDocument)=>void }
export const useAppStore=create<AppState>((set)=>({project:createEmptyProject(),undo:[],redo:[],setProject:(p)=>set((s)=>({project:p,undo:[...s.undo,s.project],redo:[]}))}));
