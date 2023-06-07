/**
 * All matches
 */
const matches = ['matches'] as const;

/**
 * Active matches
 */
export const activeMatches = () => [...matches, 'list', {active: true}] as const;

/**
 * One specific match
 *
 * @param matchId
 */
export const match = (matchId: string) => [...matches, matchId] as const;

/**
 * Player id and credentials for matches the player has joined
 */
export const gameCredentials = () => ['game-credentials'] as const;
