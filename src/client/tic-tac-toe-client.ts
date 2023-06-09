import { Client } from 'boardgame.io/client';
import { SocketIO } from 'boardgame.io/multiplayer'
import { ClientMoves, GameState, ticTacToe } from '../game/tic-tac-toe';
import { GAME_SERVER_URL } from './urls';

type GenericClient<T extends any> = ReturnType<typeof Client<T>>;

export type TicTacToeClient = GenericClient<GameState> & {
  moves: ClientMoves,
}
export type ClientState = ReturnType<TicTacToeClient['getState']>;

export function create(matchId: string, playerId: string, credentials: string) {
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

  return c as TicTacToeClient;
}
