export const GAME_SERVER_URL = process.env.SERVER_URL;

if (!GAME_SERVER_URL) {
  throw new Error('Environment variable SERVER_URL must be set');
}

export const LOBBY_URL = GAME_SERVER_URL;

export const UI_URL = process.env.UI_URL;
