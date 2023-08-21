'use client';

import React, { createContext, useReducer, useContext } from 'react';
import { Player } from './players-context';

export type Game = {
  id: string;
  status: 'paused' | 'completed' | 'in progress';
  legsToWin: number;
  players: Player[];
  currentPlayerId: string;
};

export type DartThrow = {
  score: number;
  multiplier: 1 | 2 | 3;
  isBust: boolean;
};

export type GamesState = {
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
}

export type AddGameAction = {
  type: GameActionTypes.ADD_GAME;
  payload: Game;
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

export type GameAction =
  | AddGameAction
  | AddThrowAction
  | UndoThrowsAction
  | NextPlayerAction
  | PreviousPlayerAction
  | UpdateGameAction
  | EndGameAction;

const gamesReducer = (state: GamesState, action: GameAction): GamesState => {
  switch (action.type) {
    case GameActionTypes.ADD_GAME:
      return {
        ...state,
        games: [...state.games, action.payload],
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
                          player.currentTurn.length === 3
                            ? []
                            : player.currentTurn,
                        turnHistory:
                          player.currentTurn.length === 3
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
                status: action.payload.gameStatus,
                currentPlayerId: game.players[0].id,
                players: game.players.map((player) =>
                  player.id === action.payload.roundWinnerId
                    ? {
                        ...player,
                        currentTurn: [],
                        turnHistory: [],
                        score: player.initialScore,
                        legsWon: player.legsWon + 1,
                      }
                    : {
                        ...player,
                        score: player.initialScore,
                        currentTurn: [],
                        turnHistory: [],
                      }
                ),
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
