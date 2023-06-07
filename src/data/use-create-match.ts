import useSWRMutation from 'swr/mutation'
import { lobbyClient } from "../client/lobby-client";
import { activeMatches } from './data-keys';
import { ticTacToe } from '../game/tic-tac-toe';

function createMatch() {
  return lobbyClient.createMatch(ticTacToe.name!, {
    numPlayers: 2
  });
}

export function useCreateMatch() {
  return useSWRMutation(activeMatches(), createMatch);
}
