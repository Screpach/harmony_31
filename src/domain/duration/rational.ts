export interface Rational { n: number; d: number }
const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : Math.abs(a) || 1);
export const normalizeRational = (r: Rational): Rational => {
  if (r.d === 0) throw new Error('Invalid duration denominator');
  const g = gcd(r.n, r.d);
  const s = r.d < 0 ? -1 : 1;
  return { n: (s * r.n) / g, d: (s * r.d) / g };
};
export const compareRational = (a: Rational, b: Rational) => a.n * b.d - b.n * a.d;
export const addRational = (a: Rational, b: Rational): Rational => normalizeRational({ n: a.n * b.d + b.n * a.d, d: a.d * b.d });
export const subtractRational = (a: Rational, b: Rational): Rational => normalizeRational({ n: a.n * b.d - b.n * a.d, d: a.d * b.d });
