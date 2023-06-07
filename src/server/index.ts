import { Server, Origins } from "boardgame.io/server";
import { ticTacToe } from "../game/tic-tac-toe";

const server = Server({
  games: [ticTacToe],
  // db: new DbConnector(),
  origins: [
    // Allow your game site to connect.
    // 'https://www.mygame.domain',
    // Allow localhost to connect, except when NODE_ENV is 'production'.
    Origins.LOCALHOST_IN_DEVELOPMENT
  ],
});

const port = 8080;
server.run(port, () => {
  console.log(`Server running on ${port}`);
});
