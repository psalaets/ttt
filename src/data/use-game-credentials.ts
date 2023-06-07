import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { gameCredentials } from './data-keys';

export function useGameCredentials() {
  return useSWR(gameCredentials(), () => getCredentials());
}

type TriggerArg<T> = {
  arg: T;
};

type AddGameCredentialsArg = TriggerArg<{
  matchId: string,
  playerId: string,
  credentials: string,
}>;

export function useAddGameCredentials() {
  return useSWRMutation(gameCredentials(), (_key: unknown, {arg}: AddGameCredentialsArg) => {
    return getCredentials()
      .then(c => setCredentials({
        ...c,
        [arg.matchId]: {
          playerId: arg.playerId,
          credentials: arg.credentials,
        }
      }));
  });
}

type RemoveGameCredentialsArg = TriggerArg<{
  matchId: string,
}>;

export function useRemoveGameCredentials() {
  return useSWRMutation(gameCredentials(), (_key: unknown, {arg}: RemoveGameCredentialsArg) => {
    return getCredentials()
      .then(c => {
        const copy = {...c};
        delete copy[arg.matchId];
        return setCredentials(copy);
      });
  });
}

type Credentials = Record<string, {playerId: string, credentials: string}>;

function getCredentials(): Promise<Credentials> {
  return new Promise((resolve, reject) => {
    try {
      const value = sessionStorage.getItem('ttt.game-credentials') ?? "{}";
      resolve(JSON.parse(value));
    } catch (e) {
      reject(e);
    }
  });
}

function setCredentials(creds: Credentials): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      sessionStorage.setItem('ttt.game-credentials', JSON.stringify(creds));
      resolve();
    } catch (e) {
      reject(e);
    }
  });
}
