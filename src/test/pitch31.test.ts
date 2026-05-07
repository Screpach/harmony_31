import { describe,it,expect } from 'vitest';
import { parsePitch31, pitchClassStep31, absoluteStep31, frequencyOfPitch31 } from '../domain/pitch/pitch31';

describe('pitch31',()=>{
  it('preserves spelling distinction',()=>{
    expect(parsePitch31('C#4').accidental.steps).not.toBe(parsePitch31('Db4').accidental.steps);
    expect(pitchClassStep31(parsePitch31('C#4'))).not.toBe(pitchClassStep31(parsePitch31('Db4')));
  });
  it('octave transposition adds 31 absolute steps',()=>{
    expect(absoluteStep31(parsePitch31('C4'))+31).toBe(absoluteStep31(parsePitch31('C5')));
  });
  it('frequency doubles per octave',()=>{
    const c4 = frequencyOfPitch31(parsePitch31('C4'));
    const c5 = frequencyOfPitch31(parsePitch31('C5'));
    expect(c5/c4).toBeCloseTo(2, 6);
  });
  it('rejects invalid',()=>{ expect(()=>parsePitch31('H#4')).toThrow();});
});
