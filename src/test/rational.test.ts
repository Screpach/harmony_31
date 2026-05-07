import { it, expect } from 'vitest';
import { normalizeRational, addR, subR, cmpR } from '../domain/duration/rational';
it('rational math',()=>{
  expect(normalizeRational({n:2,d:4})).toEqual({n:1,d:2});
  expect(addR({n:1,d:4},{n:1,d:4})).toEqual({n:1,d:2});
  expect(subR({n:3,d:4},{n:1,d:4})).toEqual({n:1,d:2});
  expect(cmpR({n:1,d:2},{n:2,d:3})).toBeLessThan(0);
});
