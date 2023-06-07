import useSWR from "swr";
import { lobbyClient } from "../client/lobby-client";
import { ticTacToe } from "../game/tic-tac-toe";
import { activeMatches } from './data-keys';

export function useActiveMatches() {
  return useSWR(activeMatches(), () => lobbyClient.listMatches(ticTacToe.name!, {
    isGameover: false
  }));
}
