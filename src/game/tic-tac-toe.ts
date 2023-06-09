import type { Game } from 'boardgame.io';
import type { GameState, CellValue } from './state';
import { isCellEmpty, initialState } from './state';
import { moves } from "./moves";

export type { GameState } from './state';
export type { ClientMoves } from './moves';

export const ticTacToe: Game<GameState> = {
  name: 'tic-tac-toe',
  setup: initialState,
  turn: {
    minMoves: 1,
    maxMoves: 1,
  },
  moves: moves,
  endIf({G, ctx}) {
    if (isVictory(G.cells)) {
      return {
        winner: ctx.currentPlayer,
      };
    }

    if (isDraw(G.cells)) {
      return {
        draw: true,
      };
    }
  }
};

function isVictory(cells: Array<CellValue>) {
  const winArrangements = [
    // horizontal
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    // vertical
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    // diagonal
    [0, 4, 8], [2, 4, 6]
  ];

  const allHaveSameMark = (cellValues: Array<CellValue>) => {
    return cellValues.every(val => !isCellEmpty(val))
      && new Set(cellValues).size === 1;
  };

  return winArrangements
    .map(indices => indices.map(index => cells[index]))
    .find(cellValues => allHaveSameMark(cellValues)) != null;
}

function isDraw(cellValues: Array<CellValue>) {
  return cellValues.every(c => !isCellEmpty(c));
}
