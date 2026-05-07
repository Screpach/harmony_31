import React from 'react';
import { useAppStore } from '../../state/stores/appStore';
import { parsePitch31, frequencyOfPitch31 } from '../../domain/pitch/pitch31';
export function App(){
 const project=useAppStore(s=>s.project);
 const a4=parsePitch31('A4');
 return <main><h1>31-EDO SATB Scaffold</h1><p>Measures: {project.score.measures.length}</p><p>A4 Hz (31-EDO model): {frequencyOfPitch31(a4).toFixed(2)}</p></main>;
}
