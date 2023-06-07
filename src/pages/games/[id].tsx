import Head from 'next/head'
import { Inter } from 'next/font/google'
import { useRouter } from 'next/router';
import styles from '@/styles/Home.module.css';
import { useTicTacToeClient } from '@/client/use-tic-tac-toe-client';
import { ParsedUrlQuery } from 'querystring';
import { useGameCredentials } from '@/data/use-game-credentials';
import { Board } from '@/components/Board';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] })

export default function Game() {
  const router = useRouter();

  const matchId = stringValue(router.query, 'id');
  const {data: gameCredentials} = useGameCredentials();

  const creds = gameCredentials && gameCredentials[matchId];
  const {client, clientState} = useTicTacToeClient(
    matchId,
    creds ? creds.playerId : null,
    creds ? creds.credentials : null
  );

  return (
    <>
      <Head>
        <title>Game {matchId}</title>
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <h1>Game {matchId}</h1>
        <Link href={'/games'}>Back to lobby</Link>
        {!(clientState || client) && <div>Loading...</div>}
        {clientState && client &&
          <Board
            G={clientState.G}
            ctx={clientState.ctx}
            moves={client.moves}
            playerId={client.playerID ?? ''}
          />}
      </main>
    </>
  );
}

function stringValue(query: ParsedUrlQuery, paramName: string): string {
  const value = query[paramName];
  if (typeof value === 'string') {
    return value;
  } else if (Array.isArray(value)) {
    return value[0];
  } else {
    throw new Error(`No ${paramName} found`);
  }
}
