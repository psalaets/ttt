import { useRouter } from 'next/router';
import useSWRMutation from 'swr/mutation';
import { match } from "./data-keys";
import { lobbyClient } from "../client/lobby-client";
import { ticTacToe } from '../game/tic-tac-toe';
import { useAddGameCredentials } from './use-game-credentials';

type TriggerArg<T> = {
  arg: T;
};

type JoinTriggerArg = TriggerArg<{
  playerName: string,
}>;

export function useJoinMatch(matchId: string) {
  function joinMatch(_key: unknown, { arg }: JoinTriggerArg) {
    return lobbyClient.joinMatch(ticTacToe.name!, matchId, {
      playerName: arg.playerName
    });
  }

  const { trigger: storeCredentials } = useAddGameCredentials();

  const router = useRouter();

  return useSWRMutation(() => match(matchId), joinMatch, {
    onSuccess(data, key, config) {
      storeCredentials({
        matchId,
        playerId: data.playerID,
        credentials: data.playerCredentials,
      }).then(() => {
        router.push('/games/' + matchId);
      })
    },
  });
}
