'use client';

import { Card, CardContent } from '@/components/ui/card';

import { cn } from '@/lib/utils';

import { Game, useGamesContext } from '@/context/games-context';
import { useRouter } from 'next/navigation';

const GamesPage = () => {
  const router = useRouter();
  const { state } = useGamesContext();

  const getGameStatusColor = (
    gameStatus: 'paused' | 'completed' | 'in progress'
  ) => {
    switch (gameStatus) {
      case 'paused':
        return 'border-l-orange-500';
      case 'completed':
        return 'border-l-green-500';
      case 'in progress':
        return 'border-l-primary';
    }
  };

  const navigateToGame = (game: Game) => {
    if (game.status !== 'completed') {
      router.push(`/games/${game.id}`);
    }
  };

  return (
    <div className="h-full p-2 space-y-2 w-full">
      <h1 className="text-2xl flex justify-center">Games</h1>
      {state.games.length > 0 ? (
        state.games.map((game) => (
          <Card
            key={game.id}
            onClick={() => navigateToGame(game)}
            className={cn(
              'w-full border-l-8',
              getGameStatusColor(game.status),
              game.status !== 'completed'
                ? 'cursor-pointer hover:bg-primary/10'
                : ''
            )}
          >
            <CardContent>
              <div className="pt-6 grid items-center grid-cols-5">
                <p className="font-bold">Players</p>
                <p className="font-bold">Score</p>
                <p className="font-bold">Legs</p>
                <p className="font-bold">Checkout Type</p>
                <p className="font-bold">Average</p>
              </div>
              <div
                className={cn(
                  'grid pt-6 gap-4 items-center',
                  `grid-rows-${game.players.length}`
                )}
              >
                {game.players.map((player) => (
                  <div key={player.id} className="grid grid-cols-5">
                    <p>{player.name}</p>
                    <p>{player.score}</p>
                    <p>
                      {player.legsWon}/{game.legsToWin}
                    </p>
                    <p>{player.checkoutType}</p>
                    <p></p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <div className="flex justify-center">No games to display</div>
      )}
    </div>
  );
};

export default GamesPage;
