'use client';

import { Button } from '@/components/ui/button';
import PlayerList from '@/components/ui/player-list';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Dices } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  Game,
  GameActionTypes,
  useGamesContext,
} from '@/context/games-context';
import { v4 as uuidv4 } from 'uuid';
import { usePlayersContext } from '@/context/players-context';

const HomePage = () => {
  const [legs, setLegs] = useState<number>(3);

  const { dispatch: gameDispatch } = useGamesContext();
  const { state: playerState } = usePlayersContext();
  const router = useRouter();
  const startGame = () => {
    const currentPlayer = playerState.players.at(0);

    if (currentPlayer) {
      const newGame: Game = {
        id: uuidv4(),
        legsToWin: legs,
        players: playerState.players,
        status: 'in progress',
        currentPlayerId: playerState.players[0].id,
      };

      gameDispatch({
        type: GameActionTypes.ADD_GAME,
        payload: newGame,
      });

      router.push(`/games/${newGame.id}`);
    } else {
      throw new Error('Failed to start game, current player is not found');
    }
  };

  // const randomizePlayers = () => {
  //   const players = [...state.players];
  //   for (let i = players.length - 1; i > 0; i--) {
  //     const j = Math.floor(Math.random() * (i + 1));
  //     [players[i], players[j]] = [players[j], players[i]];
  //   }

  //   const randomizedPlayers = players.map((player, index) => ({
  //     ...player,
  //     playersTurn: index === 0,
  //   }));

  //   dispatch({ type: 'RANDOMIZE_PLAYERS', players: randomizedPlayers });
  // };

  return (
    <div className="p-4 grid grid-col-1 gap-4 w-full">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Legs: {legs}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Legs</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            value={legs.toString()}
            onValueChange={(value) => setLegs(Number(value))}
          >
            <DropdownMenuRadioItem value="3">3</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="2">2</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="1">1</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <PlayerList />
      <Button variant="outline" onClick={() => console.log('randomize')}>
        <Dices className="mr-2 h-4 w-4" /> Randomize
      </Button>
      <Button onClick={startGame}>Start game</Button>
    </div>
  );
};

export default HomePage;
