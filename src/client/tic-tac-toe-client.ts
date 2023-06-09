import { Client } from 'boardgame.io/client';
import { SocketIO } from 'boardgame.io/multiplayer'
import { GameState, ticTacToe } from '../game/tic-tac-toe';
import { GAME_SERVER_URL } from './settings';

export type TicTacToeClient = ReturnType<typeof Client<GameState>>;
export type ClientState = ReturnType<TicTacToeClient['getState']>;

export function create(matchId: string, playerId: string, credentials: string): TicTacToeClient {
  const c = Client({
    game: ticTacToe,
    numPlayers: 2,
    multiplayer: SocketIO({
      server: GAME_SERVER_URL,
    }),
    matchID: matchId,
    playerID: playerId,
    credentials,
  });

  return c;
}
