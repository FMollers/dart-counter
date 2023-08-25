'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

import PlayerList from '@/components//player-list';
import AddPlayer from '@/components/add-player';
import Legs from '@/components/legs';

import { Dices } from 'lucide-react';
import { cn } from '@/lib/utils';

import { Player, usePlayersContext } from '@/context/players-context';
import {
  Game,
  GameActionTypes,
  useGamesContext,
} from '@/context/games-context';

import { v4 as uuidv4 } from 'uuid';

const HomePage = () => {
  const { dispatch: gameDispatch } = useGamesContext();
  const { state: playerState } = usePlayersContext();

  const router = useRouter();

  const [legs, setLegs] = useState<number>(3);
  const [randomize, setRandomize] = useState<boolean>(false);

  const randomizePlayerOrder = (): Player[] => {
    const shuffledPlayers: Player[] = [...playerState.players];
    for (let i = shuffledPlayers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledPlayers[i], shuffledPlayers[j]] = [
        shuffledPlayers[j],
        shuffledPlayers[i],
      ];
    }

    return shuffledPlayers;
  };

  const handleLegs = (legs: number) => {
    setLegs(legs);
  };

  const startGame = () => {
    const shuffledPlayers = randomize
      ? randomizePlayerOrder()
      : playerState.players;

    const newGame: Game = {
      id: uuidv4(),
      legsToWin: legs,
      players: shuffledPlayers,
      status: 'in progress',
      currentPlayerId: shuffledPlayers[0].id,
      rounds: [],
    };

    gameDispatch({
      type: GameActionTypes.ADD_GAME,
      payload: { game: newGame },
    });

    router.push(`/games/${newGame.id}`);
  };

  return (
    <div className="p-2 mt-4">
      <PlayerList />
      <div className="fixed bottom-0 w-full mb-2">
        <AddPlayer />
        <div className="grid grid-col-1 md:grid-cols-2 gap-4 mt-4">
          <Button
            variant={randomize ? 'default' : 'outline'}
            onClick={() => setRandomize(!randomize)}
          >
            Randomize
            <Dices
              className={cn(
                'ml-2 h-5 w-5 transition-all ease-in-out duration-500',
                randomize ? 'transform rotate-180' : ''
              )}
            />
          </Button>
          <Legs legs={legs} handleLegs={handleLegs} />
        </div>
        <Button
          disabled={playerState.players.length < 1}
          className="mt-4 w-full"
          onClick={startGame}
        >
          Start game
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
