'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  DartThrow,
  Game,
  GameActionTypes,
  useGamesContext,
} from '@/context/games-context';
import { Player } from '@/context/players-context';
import { cn } from '@/lib/utils';
import { CircleSlash2, Crosshair, Undo } from 'lucide-react';
import { useEffect, useState } from 'react';

interface GameClientProps {
  game: Game;
}

const GameClient = ({ game }: GameClientProps) => {
  const [multiplier, setMultiplier] = useState<1 | 2 | 3>(1);
  const { state, dispatch } = useGamesContext();

  const calculateThrowScore = (
    throwValue: number,
    multiplier: 1 | 2 | 3
  ): number => {
    return throwValue * multiplier;
  };

  const makeThrow = (throwValue: number) => {
    const score = calculateThrowScore(throwValue, multiplier);
    let currentPlayer = game.players.find(
      (player) => player.id === game.currentPlayerId
    );

    if (currentPlayer) {
      const dartThrow: DartThrow = {
        score,
        multiplier,
        isBust: currentPlayer.score - score < 0 ? true : false,
      };

      const updatedPlayer: Player = {
        ...currentPlayer,
        currentTurn: [...currentPlayer.currentTurn, dartThrow],
        score: currentPlayer.score - score,
      };

      if (updatedPlayer.score < 0) {
        const currentTurnPoints = calculateCurrentTurnPoints(
          updatedPlayer.currentTurn
        );
        updatedPlayer.score += currentTurnPoints;
      }

      dispatch({
        type: GameActionTypes.ADD_THROW,
        payload: {
          player: updatedPlayer,
          gameId: game.id,
        },
      });

      if (updatedPlayer.score === 0) {
        dispatch({
          type: GameActionTypes.UPDATE_GAME,
          payload: {
            gameId: game.id,
            gameStatus:
              updatedPlayer.legsWon + 1 === game.legsToWin
                ? 'completed'
                : 'in progress',
            roundWinnerId: updatedPlayer.id,
          },
        });
      } else {
        if (updatedPlayer.currentTurn.length === 3 || dartThrow.isBust) {
          const nextPlayer = getNextPlayer(currentPlayer);

          dispatch({
            type: GameActionTypes.NEXT_PLAYER,
            payload: {
              currentPlayerId: updatedPlayer.id,
              gameId: game.id,
              nextPlayerId: nextPlayer.id,
            },
          });
        }
      }
    }

    setMultiplier(1);
  };

  const undoThrows = () => {
    const currentPlayer = game.players.find(
      (player) => player.id === game.currentPlayerId
    );

    if (currentPlayer) {
      const lastThrowScore = currentPlayer.currentTurn.at(-1)?.score;

      if (lastThrowScore) {
        dispatch({
          type: GameActionTypes.UNDO_THROWS,
          payload: {
            gameId: game.id,
            playerId: currentPlayer.id,
            lastThrowScore,
          },
        });
      } else {
        const previousPlayer = getPreviousPlayer(currentPlayer);

        if (
          previousPlayer.currentTurn.length === 3 ||
          previousPlayer.currentTurn.at(-1)?.isBust
        ) {
          dispatch({
            type: GameActionTypes.PREVIOUS_PLAYER,
            payload: {
              currentPlayerId: currentPlayer.id,
              gameId: game.id,
              previousPlayerId: previousPlayer.id,
            },
          });
        }
      }
    }
  };

  const getPreviousPlayer = (currentPlayer: Player) => {
    const currentPlayerIndex = game.players.findIndex(
      (player) => player.id === currentPlayer.id
    );

    const previousPlayerIndex =
      (currentPlayerIndex - 1 + game.players.length) % game.players.length;
    const previousPlayer = game.players[previousPlayerIndex];

    return previousPlayer;
  };

  const getNextPlayer = (currentPlayer: Player) => {
    const currentPlayerIndex = game.players.findIndex(
      (player) => player.id === currentPlayer.id
    );
    const nextPlayerIndex = (currentPlayerIndex + 1) % game.players.length;
    const nextPlayer = game.players[nextPlayerIndex];

    return nextPlayer;
  };

  const calculateAveragePoints = (throws: DartThrow[]): number => {
    //FIX TO MANY DECIMALS SHOWING AND INCLUDE TURNHISTORY
    const validThrows = throws.filter((dartThrow) => dartThrow.score > 0);

    if (validThrows.length === 0) {
      return 0;
    }

    const totalPoints = validThrows.reduce(
      (total, dartThrow) => total + dartThrow.score,
      0
    );
    const average = totalPoints / validThrows.length;

    return average;
  };

  const calculateTotalDartsThrown = (
    currentTurn: DartThrow[],
    turnHistory: DartThrow[][]
  ) => {
    const totalCurrentTurnDarts = currentTurn.length;
    const totalPreviousTurnsDarts = turnHistory.reduce(
      (total, turn) => total + turn.length,
      0
    );
    const totalDartsThrown = totalCurrentTurnDarts + totalPreviousTurnsDarts;
    return totalDartsThrown;
  };

  const calculateCurrentTurnPoints = (currentTurn: DartThrow[]): number => {
    const totalPoints = currentTurn.reduce(
      (total, dartThrow) => total + dartThrow.score,
      0
    );
    return totalPoints;
  };

  const handleMultiplier = (multiplier: 1 | 2 | 3) => {
    setMultiplier((prev) => (prev === multiplier ? 1 : multiplier));
  };

  useEffect(() => {
    if (game.status === 'completed') {
      console.log(game.status);
    }
  }, [game.status]);

  return (
    <>
      <div className="w-full p-2 grid gap-4 py-4">
        {game.status}
        {game.players.map((player) => (
          <Card
            key={player.id}
            className={cn(
              'w-full border-l-8',
              game.currentPlayerId === player.id
                ? 'border-l-green-500'
                : 'border-l-primary'
            )}
          >
            <CardContent className="pt-6 grid grid-cols-3 gap-4">
              <div>
                <div
                  className={cn(
                    'text-3xl',
                    player.score <= 170 && 'text-green-500'
                  )}
                >
                  {player.score < 0 ? 0 : player.score}
                </div>
                <div className="overflow-hidden">{player.name}</div>
                <Badge className="overflow-hidden">{player.initialScore}</Badge>
              </div>
              <div className="grid grid-cols-3 gap-6 items-center">
                {player.currentTurn.length ? (
                  player.currentTurn.map((turn, index) => (
                    <Button
                      key={index}
                      disabled
                      variant="secondary"
                      className={cn(
                        'flex justify-center items-center',
                        player.currentTurn.some((turn) => turn.isBust)
                          ? 'bg-red-400'
                          : ''
                      )}
                    >
                      {turn.score}
                    </Button>
                  ))
                ) : (
                  <>
                    <Button disabled variant="secondary"></Button>
                    <Button disabled variant="secondary"></Button>
                    <Button disabled variant="secondary"></Button>
                  </>
                )}
                <Button
                  disabled
                  variant="ghost"
                  className="col-span-3 flex justify-center"
                >
                  {calculateCurrentTurnPoints(player.currentTurn)}
                </Button>
              </div>
              <div className="grid grid-rows-3 gap-2 items-center">
                <div className="flex justify-end">
                  {player.legsWon}/{game.legsToWin}
                </div>
                <div className="flex justify-end">
                  {calculateAveragePoints(player.currentTurn)}
                  <CircleSlash2 className="ml-2" />
                </div>
                <div className="flex justify-end">
                  {calculateTotalDartsThrown(
                    player.currentTurn,
                    player.turnHistory
                  )}
                  <Crosshair className="ml-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="fixed w-full md:bottom-20 md:p-2 bottom-16 p-2 bg-secondary">
        <div className="grid grid-cols-7 gap-4">
          <Button
            variant="default"
            className="col-span-1"
            onClick={() => makeThrow(1)}
          >
            1
          </Button>
          <Button
            variant="default"
            className="col-span-1"
            onClick={() => makeThrow(2)}
          >
            2
          </Button>
          <Button
            variant="default"
            className="col-span-1"
            onClick={() => makeThrow(3)}
          >
            3
          </Button>
          <Button
            variant="default"
            className="col-span-1"
            onClick={() => makeThrow(4)}
          >
            4
          </Button>
          <Button
            variant="default"
            className="col-span-1"
            onClick={() => makeThrow(5)}
          >
            5
          </Button>
          <Button
            variant="default"
            className="col-span-1"
            onClick={() => makeThrow(6)}
          >
            6
          </Button>
          <Button
            variant="default"
            className="col-span-1"
            onClick={() => makeThrow(7)}
          >
            7
          </Button>
          <Button
            variant="default"
            className="col-span-1"
            onClick={() => makeThrow(8)}
          >
            8
          </Button>
          <Button
            variant="default"
            className="col-span-1"
            onClick={() => makeThrow(9)}
          >
            9
          </Button>
          <Button
            variant="default"
            className="col-span-1"
            onClick={() => makeThrow(10)}
          >
            10
          </Button>
          <Button
            variant="default"
            className="col-span-1"
            onClick={() => makeThrow(11)}
          >
            11
          </Button>
          <Button
            variant="default"
            className="col-span-1"
            onClick={() => makeThrow(12)}
          >
            12
          </Button>
          <Button
            variant="default"
            className="col-span-1"
            onClick={() => makeThrow(13)}
          >
            13
          </Button>
          <Button
            variant="default"
            className="col-span-1"
            onClick={() => makeThrow(14)}
          >
            14
          </Button>
          <Button
            variant="default"
            className="col-span-1"
            onClick={() => makeThrow(15)}
          >
            15
          </Button>
          <Button
            variant="default"
            className="col-span-1"
            onClick={() => makeThrow(16)}
          >
            16
          </Button>
          <Button
            variant="default"
            className="col-span-1"
            onClick={() => makeThrow(17)}
          >
            17
          </Button>
          <Button
            variant="default"
            className="col-span-1"
            onClick={() => makeThrow(18)}
          >
            18
          </Button>
          <Button
            variant="default"
            className="col-span-1"
            onClick={() => makeThrow(19)}
          >
            19
          </Button>
          <Button
            variant="default"
            className="col-span-1"
            onClick={() => makeThrow(20)}
          >
            20
          </Button>
          <Button
            disabled={multiplier !== 1}
            variant="default"
            className="col-span-1"
            onClick={() => makeThrow(25)}
          >
            25
          </Button>
          <Button
            disabled={multiplier !== 1}
            variant="default"
            className="col-span-1"
            onClick={() => makeThrow(0)}
          >
            0
          </Button>
          <Button
            className={cn(
              'col-span-2 text-white px-5',
              multiplier === 2
                ? 'bg-green-500 hover:bg-green-300'
                : 'bg-yellow-500 hover:bg-yellow-400'
            )}
            onClick={() => handleMultiplier(2)}
          >
            DOUBLE
          </Button>
          <Button
            className={cn(
              'col-span-2 text-white',
              multiplier === 3
                ? 'bg-green-500 hover:bg-green-300'
                : 'bg-orange-400 hover:bg-orange-500'
            )}
            onClick={() => handleMultiplier(3)}
          >
            TRIPPLE
          </Button>
          <Button
            variant="destructive"
            onClick={undoThrows}
            className="col-span-2 text-xl"
          >
            <Undo />
          </Button>
        </div>
      </div>
    </>
  );
};

export default GameClient;
