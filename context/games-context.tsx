'use client';

import React, { createContext, useReducer, useContext } from 'react';
import { CheckoutTypes, Player } from './players-context';

export type Round = {
  roundNumber: number;
  roundWinnerId: string;
  players: Player[];
};

export type Game = {
  id: string;
  status: 'paused' | 'completed' | 'in progress';
  legsToWin: number;
  players: Player[];
  currentPlayerId: string;
  rounds: Round[];
};

export type DartThrow = {
  score: number;
  multiplier: 1 | 2 | 3;
  isBust: boolean;
};

type GamesState = {
  games: Game[];
};

const initialState: GamesState = {
  games: [],
};

export enum GameActionTypes {
  ADD_GAME = 'ADD_GAME',
  ADD_THROW = 'ADD_THROW',
  UNDO_THROWS = 'UNDO_THROWS',
  NEXT_PLAYER = 'NEXT_PLAYER',
  PREVIOUS_PLAYER = 'PREVIOUS_PLAYER',
  UPDATE_GAME = 'UPDATE_GAME',
  END_GAME = 'END_GAME',
  PAUSE_GAME = 'PAUSE_GAME',
  REVERT_LAST_ROUND = 'REVERT_LAST_ROUND',
  DELETE_GAME = 'DELETE_GAME',
}

export type AddGameAction = {
  type: GameActionTypes.ADD_GAME;
  payload: {
    game: Game;
  };
};

export type AddThrowAction = {
  type: GameActionTypes.ADD_THROW;
  payload: {
    gameId: string;
    player: Player;
  };
};

export type UndoThrowsAction = {
  type: GameActionTypes.UNDO_THROWS;
  payload: {
    gameId: string;
    playerId: string;
    lastThrowScore: number;
  };
};

export type NextPlayerAction = {
  type: GameActionTypes.NEXT_PLAYER;
  payload: {
    gameId: string;
    nextPlayerId: string;
    currentPlayerId: string;
  };
};

export type PreviousPlayerAction = {
  type: GameActionTypes.PREVIOUS_PLAYER;
  payload: {
    gameId: string;
    previousPlayerId: string;
    currentPlayerId: string;
  };
};

export type UpdateGameAction = {
  type: GameActionTypes.UPDATE_GAME;
  payload: {
    gameId: string;
    roundWinnerId: string;
    gameStatus: 'paused' | 'completed' | 'in progress';
  };
};

export type EndGameAction = {
  type: GameActionTypes.END_GAME;
  payload: {
    gameId: string;
  };
};

export type PauseGameAction = {
  type: GameActionTypes.PAUSE_GAME;
  payload: {
    gameId: string;
  };
};

export type DeleteGameAction = {
  type: GameActionTypes.DELETE_GAME;
  payload: {
    gameId: string;
  };
};

export type RevertLastRound = {
  type: GameActionTypes.REVERT_LAST_ROUND;
  payload: {
    gameId: string;
  };
};

export type GameAction =
  | AddGameAction
  | PauseGameAction
  | EndGameAction
  | DeleteGameAction
  | AddThrowAction
  | UndoThrowsAction
  | NextPlayerAction
  | PreviousPlayerAction
  | UpdateGameAction
  | RevertLastRound;

const gamesReducer = (state: GamesState, action: GameAction): GamesState => {
  switch (action.type) {
    case GameActionTypes.ADD_GAME:
      return {
        ...state,
        games: [...state.games, action.payload.game],
      };
    case GameActionTypes.PAUSE_GAME:
      return {
        ...state,
        games: state.games.map((game) =>
          game.id === action.payload.gameId
            ? {
                ...game,
                status: 'paused',
              }
            : game
        ),
      };
    case GameActionTypes.END_GAME:
      return {
        ...state,
        games: state.games.map((game) =>
          game.id === action.payload.gameId
            ? {
                ...game,
                status: 'completed',
              }
            : game
        ),
      };
    case GameActionTypes.DELETE_GAME:
      return {
        ...state,
        games: state.games.filter((game) => game.id !== action.payload.gameId),
      };
    case GameActionTypes.ADD_THROW:
      return {
        ...state,
        games: state.games.map((game) =>
          game.id === action.payload.gameId
            ? {
                ...game,
                players: game.players.map((player) =>
                  player.id === action.payload.player.id
                    ? {
                        ...player,
                        score: action.payload.player.score,
                        currentTurn: action.payload.player.currentTurn,
                      }
                    : player
                ),
              }
            : game
        ),
      };
    case GameActionTypes.UNDO_THROWS:
      return {
        ...state,
        games: state.games.map((game) =>
          game.id === action.payload.gameId
            ? {
                ...game,
                players: game.players.map((player) =>
                  player.id === action.payload.playerId
                    ? {
                        ...player,
                        currentTurn: player.currentTurn.slice(0, -1),
                        score:
                          player.currentTurn.length > 0 &&
                          player.currentTurn[player.currentTurn.length - 1]
                            .isBust
                            ? player.score
                            : player.score + action.payload.lastThrowScore,
                      }
                    : player
                ),
              }
            : game
        ),
      };

    case GameActionTypes.NEXT_PLAYER:
      return {
        ...state,
        games: state.games.map((game) =>
          game.id === action.payload.gameId
            ? {
                ...game,
                currentPlayerId: action.payload.nextPlayerId,
                players: game.players.map((player) =>
                  player.id === action.payload.nextPlayerId
                    ? {
                        ...player,
                        currentTurn:
                          player.currentTurn.length === 3 ||
                          player.currentTurn[player.currentTurn.length - 1]
                            ?.isBust
                            ? []
                            : player.currentTurn,
                        turnHistory:
                          player.currentTurn.length === 3 ||
                          player.currentTurn[player.currentTurn.length - 1]
                            ?.isBust
                            ? [...player.turnHistory, [...player.currentTurn]]
                            : player.turnHistory,
                      }
                    : player
                ),
              }
            : game
        ),
      };
    case GameActionTypes.PREVIOUS_PLAYER:
      return {
        ...state,
        games: state.games.map((game) =>
          game.id === action.payload.gameId
            ? {
                ...game,
                currentPlayerId: action.payload.previousPlayerId,
                players: game.players.map((player) => {
                  if (player.id === action.payload.previousPlayerId) {
                    const updatedPlayer = {
                      ...player,
                      currentTurn: player.currentTurn.slice(0, -1),
                      turnHistory: player.turnHistory,
                      score:
                        player.currentTurn.length > 0 &&
                        player.currentTurn[player.currentTurn.length - 1].isBust
                          ? player.score -
                            player.currentTurn
                              .slice(0, -1)
                              .reduce(
                                (total, throwObj) => total + throwObj.score,
                                0
                              )
                          : player.score +
                            player.currentTurn.slice(-1)[0].score,
                    };

                    return updatedPlayer;
                  } else if (player.id === action.payload.currentPlayerId) {
                    const updatedPlayer = {
                      ...player,
                      currentTurn:
                        player.currentTurn.length === 0
                          ? player.turnHistory.length > 0
                            ? [
                                ...player.turnHistory[
                                  player.turnHistory.length - 1
                                ],
                              ]
                            : []
                          : player.currentTurn,
                      turnHistory:
                        player.currentTurn.length === 3
                          ? [...player.turnHistory, [...player.currentTurn]]
                          : player.currentTurn.length === 0
                          ? player.turnHistory.slice(0, -1)
                          : player.turnHistory,
                    };

                    return updatedPlayer;
                  } else {
                    return player;
                  }
                }),
              }
            : game
        ),
      };
    case GameActionTypes.UPDATE_GAME:
      return {
        ...state,
        games: state.games.map((game) =>
          game.id === action.payload.gameId
            ? {
                ...game,
                rounds: [
                  ...game.rounds,
                  {
                    roundNumber: game.rounds.length,
                    roundWinnerId: action.payload.roundWinnerId,
                    players: game.players.map((player) =>
                      player.id === action.payload.roundWinnerId
                        ? { ...player, legsWon: player.legsWon + 1 }
                        : { ...player }
                    ),
                  },
                ],
                status: action.payload.gameStatus,
                currentPlayerId: game.players[0].id,
                players: game.players.map((player) => {
                  if (player.id === action.payload.roundWinnerId) {
                    return action.payload.gameStatus === 'completed'
                      ? { ...player, legsWon: player.legsWon + 1 }
                      : {
                          ...player,
                          turnHistory: [],
                          currentTurn: [],
                          score: player.initialScore,
                          legsWon: player.legsWon + 1,
                        };
                  } else {
                    return {
                      ...player,
                      score: player.initialScore,
                      turnHistory: [],
                      currentTurn: [],
                    };
                  }
                }),
              }
            : game
        ),
      };
    case GameActionTypes.REVERT_LAST_ROUND:
      return {
        ...state,
        games: state.games.map((game) =>
          game.id === action.payload.gameId
            ? {
                ...game,
                currentPlayerId:
                  game.rounds[game.rounds.length - 1].roundWinnerId,
                players: game.rounds[game.rounds.length - 1].players.map(
                  (player) =>
                    player.id ===
                    game.rounds[game.rounds.length - 1].roundWinnerId
                      ? { ...player, legsWon: player.legsWon - 1 }
                      : { ...player }
                ),
                rounds: game.rounds.slice(0, -1),
              }
            : game
        ),
      };
    default:
      return state;
  }
};

export const GamesContext = createContext<
  { state: GamesState; dispatch: React.Dispatch<GameAction> } | undefined
>(undefined);

export const GamesProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(gamesReducer, initialState);

  return (
    <GamesContext.Provider value={{ state, dispatch }}>
      {children}
    </GamesContext.Provider>
  );
};

export const useGamesContext = () => {
  const context = useContext(GamesContext);
  if (context === undefined) {
    throw new Error('useGamesContext must be used within a GamesProvider');
  }
  return context;
};
