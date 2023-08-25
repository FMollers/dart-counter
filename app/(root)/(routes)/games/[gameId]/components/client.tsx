'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import { CircleSlash2, Crosshair, Keyboard, Tally5 } from 'lucide-react';

import { cn } from '@/lib/utils';

import {
  DartThrow,
  Game,
  GameActionTypes,
  useGamesContext,
} from '@/context/games-context';
import { Player } from '@/context/players-context';

import { useEffect, useState } from 'react';
import StandardKeyboard from '@/components/keyboards/standard-keyboard';
import AdvancedKeyboard from '@/components/keyboards/advanced-keyboard';

interface GameClientProps {
  game: Game;
}

//MOVE TO ENUM FOLDER?
enum KeyboardTypes {
  STANDARD = 'STANDARD',
  ADVANCED = 'ADVANCED',
}

const GameClient = ({ game }: GameClientProps) => {
  const [multiplier, setMultiplier] = useState<1 | 2 | 3>(1);
  const [winner, setWinner] = useState<Player>();

  const [keyboardType, setKeyboardType] = useState<KeyboardTypes>(
    KeyboardTypes.ADVANCED
  );

  const { dispatch } = useGamesContext();

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
      //HANDLE DOUBLE OUT SCENARIO

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

      if (lastThrowScore !== undefined) {
        dispatch({
          type: GameActionTypes.UNDO_THROWS,
          payload: {
            gameId: game.id,
            playerId: currentPlayer.id,
            lastThrowScore,
          },
        });
      } else {
        if (
          game.players.every((player) => player.currentTurn.length < 1) &&
          game.rounds.length > 0
        ) {
          dispatch({
            type: GameActionTypes.REVERT_LAST_ROUND,
            payload: { gameId: game.id },
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
                gameId: game.id,
                currentPlayerId: currentPlayer.id,
                previousPlayerId: previousPlayer.id,
              },
            });
          }
        }
      }
    }
  };

  const getPreviousPlayer = (currentPlayer: Player): Player => {
    const currentPlayerIndex = game.players.findIndex(
      (player) => player.id === currentPlayer.id
    );

    const previousPlayerIndex =
      (currentPlayerIndex - 1 + game.players.length) % game.players.length;
    const previousPlayer = game.players[previousPlayerIndex];

    return previousPlayer;
  };

  const getNextPlayer = (currentPlayer: Player): Player => {
    const currentPlayerIndex = game.players.findIndex(
      (player) => player.id === currentPlayer.id
    );
    const nextPlayerIndex = (currentPlayerIndex + 1) % game.players.length;
    const nextPlayer = game.players[nextPlayerIndex];

    return nextPlayer;
  };

  const calculateAveragePoints = (
    throws: DartThrow[],
    turnHistory: DartThrow[][]
  ): string => {
    const allThrows = [...(turnHistory ? turnHistory.flat() : []), ...throws];

    if (allThrows.length === 0) {
      return '0';
    }

    const totalPoints = allThrows.reduce(
      (total, dartThrow) => total + dartThrow.score,
      0
    );

    const totalDartsThrown = allThrows.length;
    const average = (totalPoints / totalDartsThrown) * 3;

    return average.toFixed(2);
  };

  const calculateTotalDartsThrown = (
    currentTurn: DartThrow[],
    turnHistory: DartThrow[][]
  ): number => {
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

  const handleKeyboardSwitch = () => {
    setMultiplier(1);
    setKeyboardType((prev) =>
      prev === KeyboardTypes.ADVANCED
        ? KeyboardTypes.STANDARD
        : KeyboardTypes.ADVANCED
    );
  };

  useEffect(() => {
    if (game.status === 'completed') {
      const dartWinner = game.players.find(
        (player) => player.legsWon === game.legsToWin
      );
      if (dartWinner) {
        setWinner(dartWinner);
      }
    }
  }, [game.status]);

  return (
    <div>
      {winner ? (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          <h1 className="flex justify-center text-2xl">WINNER</h1>
          <Card>
            <CardContent className="pt-6 grid grid-cols-3 gap-4">
              <div>
                <div
                  className={cn(
                    'text-3xl',
                    winner.score <= 170 && 'text-green-500'
                  )}
                >
                  {winner.score < 0 ? 0 : winner.score}
                </div>
                <div className="overflow-hidden">{winner.name}</div>
                <Badge className="overflow-hidden">{winner.initialScore}</Badge>
              </div>
              <div className="flex justify-center items-center text-3xl">
                {winner.checkoutType}
              </div>
              <div className="grid grid-rows-3 gap-2 items-center">
                <div className="flex justify-end">
                  {winner.legsWon}/{game.legsToWin}
                  <Tally5 className="ml-2" />
                </div>
                <div className="flex justify-end">
                  {calculateAveragePoints(
                    winner.currentTurn,
                    winner.turnHistory
                  )}
                  <CircleSlash2 className="ml-2" />
                </div>
                <div className="flex justify-end">
                  {calculateTotalDartsThrown(
                    winner.currentTurn,
                    winner.turnHistory
                  )}
                  <Crosshair className="ml-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 p-4 mb-72">
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
              <CardContent className="pt-6 grid grid-cols-4 gap-4">
                <div className="col-span-1">
                  <div
                    className={cn(
                      'text-2xl',
                      player.score <= 170 && 'text-green-500'
                    )}
                  >
                    {player.score}
                  </div>
                  <div className="overflow-hidden">{player.name}</div>
                </div>
                <div className="col-span-2">
                  <div className="grid grid-cols-3 gap-1 items-center">
                    {[...Array(3)].map((_, index) => (
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
                        {player.currentTurn.length > index
                          ? player.currentTurn[index].score
                          : ''}
                      </Button>
                    ))}
                    <Button
                      disabled
                      variant="ghost"
                      className="col-span-3 flex justify-center"
                    >
                      {calculateCurrentTurnPoints(player.currentTurn)}
                    </Button>
                  </div>
                </div>
                <div className="col-span-1">
                  <div className="grid grid-rows-3 gap-2 items-center">
                    <div className="flex justify-end">
                      {player.legsWon}/{game.legsToWin}
                      <Tally5 className="ml-2" />
                    </div>
                    <div className="flex justify-end">
                      {calculateAveragePoints(
                        player.currentTurn,
                        player.turnHistory
                      )}
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
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      <Button
        onClick={handleKeyboardSwitch}
        variant="secondary"
        className="fixed bottom-52 right-4 z-50 rounded-b-none hover:text-secondary hover:bg-primary"
      >
        <Keyboard />
      </Button>
      {keyboardType === KeyboardTypes.STANDARD ? (
        <StandardKeyboard
          multiplier={multiplier}
          makeThrow={makeThrow}
          undoThrows={undoThrows}
        />
      ) : (
        <AdvancedKeyboard
          multiplier={multiplier}
          handleMultiplier={handleMultiplier}
          makeThrow={makeThrow}
          undoThrows={undoThrows}
        />
      )}
    </div>
  );
};

export default GameClient;
