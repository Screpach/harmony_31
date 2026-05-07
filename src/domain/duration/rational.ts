export interface Rational { n:number; d:number }
export const normalizeRational=(r:Rational):Rational=>{const g=(a:number,b:number):number=>b?g(b,a%b):Math.abs(a)||1;const k=g(r.n,r.d);const s=r.d<0?-1:1;return{n:s*r.n/k,d:s*r.d/k}};
export const addR=(a:Rational,b:Rational)=>normalizeRational({n:a.n*b.d+b.n*a.d,d:a.d*b.d});
export const subR=(a:Rational,b:Rational)=>normalizeRational({n:a.n*b.d-b.n*a.d,d:a.d*b.d});
export const cmpR=(a:Rational,b:Rational)=>a.n*b.d-b.n*a.d;
