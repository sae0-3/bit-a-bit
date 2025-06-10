import { BadRequestException, Injectable } from '@nestjs/common';

import { TransformSequenceDto } from './dto/transform.sequence.dto';

@Injectable()
export class PatternFunctionsService {
  private readonly patterns = {
    mirror: (seq: Array<string | number>) => [...seq].reverse(),

    rotate_left: (seq: Array<string | number>) =>
      seq.length > 0 ? [...seq.slice(1), seq[0]] : seq,

    rotate_right: (seq: Array<string | number>) =>
      seq.length > 0 ? [seq[seq.length - 1], ...seq.slice(0, -1)] : seq,

    swap_ends: (seq: Array<string | number>) => {
      if (seq.length >= 2) {
        const newSeq = [...seq];
        [newSeq[0], newSeq[newSeq.length - 1]] = [
          newSeq[newSeq.length - 1],
          newSeq[0],
        ];
        return newSeq;
      }
      return seq;
    },

    alternate_flip: (seq: Array<string | number>) =>
      seq.map((val, i) => (i % 2 === 0 ? val : seq[i - 1])),

    swap_adjacent: (seq: Array<string | number>) => {
      const newSeq = [...seq];
      for (let i = 0; i < newSeq.length - 1; i += 2) {
        [newSeq[i], newSeq[i + 1]] = [newSeq[i + 1], newSeq[i]];
      }
      return newSeq;
    },

    zero_middle: (seq: Array<string | number>) => {
      const newSeq = [...seq];
      const mid = Math.floor(newSeq.length / 2);
      if (newSeq.length % 2 === 0) {
        newSeq[mid - 1] = 0;
        newSeq[mid] = 0;
      } else {
        newSeq[mid] = 0;
      }
      return newSeq;
    },

    center_to_ends: (seq: Array<string | number>) => {
      if (seq.length === 0) return seq;
      const newSeq = [...seq];
      const centerIndex = Math.floor(newSeq.length / 2);
      const center = newSeq.splice(centerIndex, 1)[0];
      return [center, ...newSeq, center];
    },

    ends_to_center: (seq: Array<string | number>) => {
      if (seq.length < 2) return seq;
      const newSeq = [...seq];
      const first = newSeq.shift()!;
      const last = newSeq.pop()!;
      const middleIndex = Math.floor(newSeq.length / 2);
      return [
        ...newSeq.slice(0, middleIndex),
        first,
        last,
        ...newSeq.slice(middleIndex),
      ];
    },

    swap_last_left: (seq: Array<string | number>) => {
      const newSeq = [...seq];
      if (newSeq.length < 2) return newSeq;
      const lastIndex = newSeq.length - 1;
      [newSeq[lastIndex], newSeq[lastIndex - 1]] = [
        newSeq[lastIndex - 1],
        newSeq[lastIndex],
      ];
      return newSeq;
    },

    swap_first_right: (seq: Array<string | number>) => {
      const newSeq = [...seq];
      if (newSeq.length < 2) return newSeq;
      [newSeq[0], newSeq[1]] = [newSeq[1], newSeq[0]];
      return newSeq;
    },
  };

  getFunctionByCode(
    code: string,
  ): ((seq: Array<string | number>) => Array<string | number>) | null {
    return this.patterns[code as keyof typeof this.patterns] ?? null;
  }

  isValidCode(code: string): boolean {
    return Object.hasOwn(this.patterns, code);
  }

  getAvailableCodes(): string[] {
    return Object.keys(this.patterns);
  }

  transformSequence(data: TransformSequenceDto): Array<string | number> {
    const { sequence, path } = data;
    let baseSequence = [...sequence];

    for (const code of path) {
      const fn = this.getFunctionByCode(code);
      if (!fn) {
        throw new BadRequestException(`Patrón desconocido: ${code}`);
      }

      baseSequence = fn(baseSequence);
    }

    return baseSequence;
  }
}
