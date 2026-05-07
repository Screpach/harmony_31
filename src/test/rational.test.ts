import { it, expect } from 'vitest';
import { normalizeRational, addRational, subtractRational, compareRational } from '../domain/duration/rational';
it('rational math',()=>{
  expect(normalizeRational({n:2,d:4})).toEqual({n:1,d:2});
  expect(addRational({n:1,d:4},{n:1,d:4})).toEqual({n:1,d:2});
  expect(subtractRational({n:3,d:4},{n:1,d:4})).toEqual({n:1,d:2});
  expect(compareRational({n:1,d:2},{n:2,d:3})).toBeLessThan(0);
});
