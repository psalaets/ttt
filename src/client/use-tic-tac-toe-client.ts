import { useEffect, useRef, useState } from 'react';
import { create as createClient, ClientState, TicTacToeClient } from './tic-tac-toe-client';

export function useTicTacToeClient(matchId: string, playerId: string | null, credentials: string | null) {
  const clientRef = useRef<TicTacToeClient | null>(null);
  const [clientState, setClientState] = useState<ClientState>();

  useEffect(() => {
    if (playerId && credentials) {
      const client = clientRef.current = createClient(matchId, playerId, credentials);

      // Connect and listen for state changes
      client.start();
      const unsub = client.subscribe(state => setClientState(state));

      return () => {
        unsub();
        client.stop();
      };
    }

  }, [clientRef, matchId, playerId, credentials]);

  return {
    client: clientRef.current,
    clientState: clientState ?? null,
  };
}
