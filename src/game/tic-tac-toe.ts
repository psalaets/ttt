import type { Game, MoveFn, MoveMap } from 'boardgame.io';
import { INVALID_MOVE } from 'boardgame.io/core';

type CellValue = string | null;
export type GameState = {
  cells: Array<CellValue>
};
export type TicTacToeMoves = MoveMap<GameState>;

const moves: TicTacToeMoves = {
  markCell({G, playerID}, cellIndex: number) {
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
}

const EMPTY_CELL: CellValue = null;
export const ticTacToe: Game<GameState> = {
  name: 'tic-tac-toe',
  setup: () => {
    return {
      cells: [
        EMPTY_CELL, EMPTY_CELL, EMPTY_CELL,
        EMPTY_CELL, EMPTY_CELL, EMPTY_CELL,
        EMPTY_CELL, EMPTY_CELL, EMPTY_CELL,
      ]
    };
  },
  turn: {
    minMoves: 1,
    maxMoves: 1,
  },
  moves,
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

function isCellEmpty(cellValue: CellValue) {
  return cellValue === EMPTY_CELL;
}
