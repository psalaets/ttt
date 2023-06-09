import { Server, Origins } from "boardgame.io/server";
import { ticTacToe } from "../game/tic-tac-toe";

const server = Server({
  games: [ticTacToe],
  // db: new DbConnector(),
  origins: [
    // Allow your game site to connect.
    process.env.UI_URL,
    // Allow localhost to connect, except when NODE_ENV is 'production'.
    Origins.LOCALHOST_IN_DEVELOPMENT
  ]
    // Discard unpopulated origins
    .filter((url): url is NonNullable<string> => !!url),
});

const port = 8080;
server.run(port, () => {
  console.log(`Server running on ${port}`);
});
