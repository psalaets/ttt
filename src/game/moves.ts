import type { GameState } from './state';
import { isCellEmpty } from './state';

import type { Move, MoveFn, LongFormMove, MoveMap } from 'boardgame.io';
import { INVALID_MOVE } from 'boardgame.io/core';

type MoveFirstParam = Parameters<MoveFn<GameState, {}>>[0];

export const moves = {
  markCell({G, playerID}: MoveFirstParam, cellIndex: number) {
    console.log(`Player ${playerID} is marking cell ${cellIndex}`);

    // ensure cell exists
    if (cellIndex < 0 && cellIndex >= G.cells.length) {
      return INVALID_MOVE;
    }

    // ensure cell not already marked
    if (!isCellEmpty(G.cells[cellIndex])) {
      return INVALID_MOVE;
    }

    G.cells[cellIndex] = playerID;
  }
} as const;

type ExtractMoveFn<
  G extends any,
  P extends Record<string, unknown>,
  T extends Move<G, P>
> = T extends LongFormMove<G, P> ? T['move'] : T;

// https://blog.e-mundo.de/post/typescript-tuple-trickery-utility-types-for-tuples/
type ShiftTuple<T extends any[]> = T extends [T[0], ...infer R] ? R : never;

type ExtractClientMoves<G extends any, P extends Record<string, unknown>, T extends MoveMap<G, P>> = {
  [C in keyof T]: (...param: ShiftTuple<Parameters<ExtractMoveFn<G, P, T[C]>>>) => ReturnType<ExtractMoveFn<G, P, T[C]>>;
}

export type ClientMoves = ExtractClientMoves<GameState, {}, typeof moves>;
