import { gfMul, EXP } from "./gf256";

function generatorPoly(degree: number): number[] {
  let poly = [1];
  for (let i = 0; i < degree; i++) {
    const next: number[] = [];
    for (let j = 0; j < poly.length; j++) {
      next[j] = gfMul(poly[j], EXP[i]);
    }
    poly = poly.concat(0).map((v, j) => v ^ (next[j - 1] ?? 0));
  }
  return poly;
}

export function reedSolomon(data: number[], ecLen = 7): number[] {
  const gen = generatorPoly(ecLen);
  const ec = new Array(ecLen).fill(0);

  for (const d of data) {
    const factor = d ^ ec[0];
    ec.shift();
    ec.push(0);
    for (let i = 0; i < ecLen; i++) {
      ec[i] ^= gfMul(gen[i], factor);
    }
  }
  return ec;
}
