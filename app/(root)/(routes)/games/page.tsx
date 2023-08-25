'use client';

import { Card, CardContent } from '@/components/ui/card';

import { cn } from '@/lib/utils';

import { useGamesContext } from '@/context/games-context';
import { useState } from 'react';
import UpdateGame from '@/components/update-game';

const GamesPage = () => {
  const { state } = useGamesContext();

  const [expandedCardId, setExpandedCardId] = useState<string>('');

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

  const handleExpandedCard = (gameId: string) => {
    setExpandedCardId(gameId);
  };

  return (
    <div className="h-full p-2 space-y-2 w-full">
      <h1 className="text-2xl flex justify-center">GAMES</h1>
      {state.games.length > 0 ? (
        state.games.map((game) => (
          <Card
            key={game.id}
            onClick={() => setExpandedCardId(game.id)}
            className={cn(
              'border-l-8 cursor-pointer',
              expandedCardId === game.id ? '' : 'hover:bg-primary/10',
              getGameStatusColor(game.status)
            )}
          >
            <CardContent>
              <div className="pt-4 grid grid-cols-4">
                <p>Player</p>
                <p>Score</p>
                <p>Legs</p>
                <p>Checkout Type</p>
              </div>
              <div
                className={cn(
                  'grid pt-4 gap-2 items-center',
                  `grid-rows-${game.players.length}`
                )}
              >
                {game.players.map((player) => (
                  <div key={player.id} className="grid grid-cols-4">
                    <p>{player.name}</p>
                    <p>{player.score}</p>
                    <p>
                      {player.legsWon}/{game.legsToWin}
                    </p>
                    <p>{player.checkoutType}</p>
                  </div>
                ))}
              </div>
              {expandedCardId === game.id && (
                <UpdateGame
                  game={game}
                  expandedCardId={expandedCardId}
                  handleExpandedCard={handleExpandedCard}
                />
              )}
            </CardContent>
          </Card>
        ))
      ) : (
        <div className="flex justify-center items-center">
          No games to display
        </div>
      )}
    </div>
  );
};

export default GamesPage;
