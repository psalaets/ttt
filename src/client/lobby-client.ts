import { LobbyClient } from 'boardgame.io/client';
import { LOBBY_URL } from './settings';

export const lobbyClient = new LobbyClient({
  server: LOBBY_URL,
});
