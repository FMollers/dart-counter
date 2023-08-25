'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import { cn } from '@/lib/utils';
import {
  Game,
  GameActionTypes,
  useGamesContext,
} from '@/context/games-context';
import { useRouter } from 'next/navigation';

interface UpdateGameProps {
  game: Game;
  expandedCardId: string;
  handleExpandedCard: (gameId: string) => void;
}

const UpdateGame = ({
  game,
  expandedCardId,
  handleExpandedCard,
}: UpdateGameProps) => {
  const { dispatch } = useGamesContext();
  const router = useRouter();

  const navigateToGame = () => {
    if (game.status !== 'completed') {
      router.push(`/games/${game.id}`);
    }
  };
  const deleteGame = () => {
    dispatch({
      type: GameActionTypes.DELETE_GAME,
      payload: { gameId: game.id },
    });
  };

  return (
    <Card
      className={cn('mt-3', expandedCardId === game.id ? 'block' : 'hidden')}
    >
      <CardContent className="pt-6 grid grid-cols-4 gap-1">
        <Button
          className={game.status === 'completed' ? 'col-span-2' : ''}
          onClick={(e) => {
            e.stopPropagation();
            console.log('Show game info');
          }}
        >
          Info
        </Button>
        {game.status !== 'completed' && (
          <Button onClick={() => navigateToGame()}>Continue</Button>
        )}
        <Button
          variant="destructive"
          onClick={(e) => {
            e.stopPropagation();
            deleteGame();
          }}
        >
          Delete
        </Button>
        <Button
          variant="outline"
          onClick={(e) => {
            e.stopPropagation();
            handleExpandedCard('');
          }}
        >
          Cancel
        </Button>
      </CardContent>
    </Card>
  );
};

export default UpdateGame;
