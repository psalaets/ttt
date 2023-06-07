import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useActiveMatches } from '@/data/use-active-matches'
import { useCreateMatch } from '@/data/use-create-match'
import type { LobbyAPI } from 'boardgame.io';
import { useJoinMatch } from '@/data/use-join-match'

const inter = Inter({ subsets: ['latin'] })

export default function Lobby() {
  return (
    <>
      <Head>
        <title>Games</title>
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <LobbyToolbar />
        <MatchList />
      </main>
    </>
  )
}

type LobbyToolbarProps = {};

function LobbyToolbar(props: LobbyToolbarProps) {
  const { trigger: create } = useCreateMatch();

  return (
    <div>
      <button onClick={() => create()}>Create Game</button>
    </div>
  );
}

type MatchListProps = {};

function MatchList(props: MatchListProps) {
  const { data, error, isLoading } = useActiveMatches();

  if (error) {
    return (
      <div>Error: {error.message}</div>
    );
  }

  if (isLoading) {
    return (
      <div>Loading...</div>
    );
  }

  return (
    <div>
      <ul>
        {data?.matches.map(m => <li key={m.matchID}><MatchDetails match={m} /></li>)}
      </ul>
    </div>
  );
}

type MatchDetailsProps = {
  match: LobbyAPI.Match
};

function MatchDetails(props: MatchDetailsProps) {
  const match = props.match;
  const { trigger: join } = useJoinMatch(match.matchID);

  const totalSlots = match.players.length;
  const openSlots = match.players.filter(p => !p.name).length;

  return (
    <div>
      <div>
        {match.matchID} ({totalSlots - openSlots} / {totalSlots} players)
      </div>
      <div>
        <button onClick={() => join({playerName: 'Bob-' + Math.random()})}>
          Join
        </button>
      </div>
    </div>
  );
}
