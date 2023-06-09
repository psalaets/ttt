import { Game } from 'boardgame.io';

export type CellValue = string | null;
const EMPTY_CELL: CellValue = null;

export type GameState = {
  cells: Array<CellValue>
};

export const initialState: Game<GameState>['setup'] = () => {
  return {
    cells: [
      EMPTY_CELL, EMPTY_CELL, EMPTY_CELL,
      EMPTY_CELL, EMPTY_CELL, EMPTY_CELL,
      EMPTY_CELL, EMPTY_CELL, EMPTY_CELL,
    ]
  };
};

export function isCellEmpty(cellValue: CellValue) {
  return cellValue === EMPTY_CELL;
}
