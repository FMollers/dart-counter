'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { usePlayersContext } from '@/context/players-context';

import { useState } from 'react';
import { cn } from '@/lib/utils';

import UpdatePlayer from './update-player';

const PlayerList = () => {
  const [expandedCardId, setExpandedCardId] = useState<string>('');
  const { state } = usePlayersContext();

  const handleExpandedCard = (playerId: string) => {
    setExpandedCardId(playerId);
  };

  return (
    <div className="grid grid-col-1 md:grid-cols-2 gap-4 w-full">
      {state.players.length > 0 ? (
        state.players.map((player) => (
          <Card
            className={cn(
              'overflow-hidden h-24 transition-all duration-700 ease-in-out cursor-pointer',
              expandedCardId === player.id ? 'h-80' : 'hover:bg-primary/10'
            )}
            key={player.id}
            onClick={() => setExpandedCardId(player.id)}
          >
            <CardContent>
              <div className="pt-8 grid grid-cols-3 gap-4">
                <div className="flex justify-start items-center">
                  <div className="text-2xl overflow-hidden">{player.name}</div>
                </div>
                <div className="flex justify-center items-center">
                  <Badge className="overflow-hidden">{player.score}</Badge>
                </div>
                <div className="flex justify-end items-center">
                  {player.checkoutType}
                </div>
              </div>
              {expandedCardId === player.id && (
                <UpdatePlayer
                  player={player}
                  expandedCardId={expandedCardId}
                  handleExpandedCard={handleExpandedCard}
                />
              )}
            </CardContent>
          </Card>
        ))
      ) : (
        <div className="flex justify-center">No players yet</div>
      )}
    </div>
  );
};

export default PlayerList;
