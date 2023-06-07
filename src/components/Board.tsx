import type { CSSProperties } from "react";
import type { Ctx } from "boardgame.io";
import type { ClientMoves } from '@/client/tic-tac-toe-client';
import type { GameState } from '@/game/tic-tac-toe';

export type BoardProps = {
  G: GameState,
  moves: ClientMoves,
  ctx: Ctx,
  playerId: string,
};

export function Board({ ctx, G, moves, playerId }: BoardProps) {
  const onClick = (id: number) => moves.markCell(id);

  const cellStyle: CSSProperties = {
    border: '1px solid #555',
    width: '50px',
    height: '50px',
    lineHeight: '50px',
    textAlign: 'center',
  };

  let tbody = [];
  for (let i = 0; i < 3; i++) {
    let cells = [];
    for (let j = 0; j < 3; j++) {
      const id = 3 * i + j;
      cells.push(
        <td key={id}>
          {G.cells[id] ? (
            <div style={cellStyle}>{gameSymbol(G.cells[id])}</div>
          ) : (
            <button style={cellStyle} onClick={() => onClick(id)} />
          )}
        </td>
      );
    }
    tbody.push(<tr key={i}>{cells}</tr>);
  }

  return (
    <div>
      {ctx.currentPlayer === playerId ? `Your turn - place an ${gameSymbol(playerId)}` : 'Opponent\'s turn...'}
      <table id="board">
        <tbody>{tbody}</tbody>
      </table>
      {renderOutcome(ctx, playerId)}
      <pre>
        {JSON.stringify(ctx, null, 2)}
      </pre>
    </div>
  );
}

function renderOutcome(ctx: Ctx, playerId: string) {
  if (ctx.gameover) {
    if (ctx.gameover.winner != undefined) {
      return <div id="winner">You {ctx.gameover.winner === playerId ? 'Win!' : 'Lose!'}</div>
    } else {
      return <div id="winner">Draw!</div>;
    }
  } else {
    return null;
  }
}

function gameSymbol(playerId: string | null): 'X' | '0' | '' {
  return playerId === '0'
    ? '0'
    : playerId === '1'
    ? 'X'
    : '';
}
