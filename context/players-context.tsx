'use client';

import React, { createContext, useReducer, useContext } from 'react';
import { DartThrow } from './games-context';

export type Player = {
  id: string;
  name: string;
  score: number;
  initialScore: number;
  legsWon: number;
  checkoutType: CheckoutTypes.DOUBLE_OUT | CheckoutTypes.STRAIGHT_OUT;
  currentTurn: DartThrow[];
  turnHistory: DartThrow[][];
};

export type PlayersState = {
  players: Player[];
};

export enum CheckoutTypes {
  DOUBLE_OUT = 'Double Out',
  STRAIGHT_OUT = 'Straight Out',
}

export enum PlayerActionTypes {
  ADD_PLAYER = 'ADD_PLAYER',
  REMOVE_PLAYER = 'REMOVE_PLAYER',
  UPDATE_PLAYER = 'UPDATE_PLAYER',
}

const initialState: PlayersState = {
  players: [],
};

export type AddPlayerAction = {
  type: PlayerActionTypes.ADD_PLAYER;
  payload: Player;
};

export type RemovePlayerAction = {
  type: PlayerActionTypes.REMOVE_PLAYER;
  payload: {
    playerId: string;
  };
};

export type UpdatePlayerAction = {
  type: PlayerActionTypes.UPDATE_PLAYER;
  payload: {
    playerId: string;
    score: number;
    checkoutType: CheckoutTypes.DOUBLE_OUT | CheckoutTypes.STRAIGHT_OUT;
    name: string;
  };
};

export type PlayerAction =
  | AddPlayerAction
  | RemovePlayerAction
  | UpdatePlayerAction;

const playersReducer = (
  state: PlayersState,
  action: PlayerAction
): PlayersState => {
  switch (action.type) {
    case PlayerActionTypes.ADD_PLAYER:
      return {
        ...state,
        players: [...state.players, action.payload],
      };
    case PlayerActionTypes.REMOVE_PLAYER:
      return {
        ...state,
        players: state.players.filter(
          (player) => player.id !== action.payload.playerId
        ),
      };
    case PlayerActionTypes.UPDATE_PLAYER:
      return {
        ...state,
        players: state.players.map((player) =>
          player.id === action.payload.playerId
            ? {
                ...player,
                score: action.payload.score,
                initialScore: action.payload.score,
                checkoutType: action.payload.checkoutType,
                name: action.payload.name,
              }
            : player
        ),
      };
    default:
      return state;
  }
};

export const PlayersContext = createContext<
  { state: PlayersState; dispatch: React.Dispatch<PlayerAction> } | undefined
>(undefined);

export const PlayersProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(playersReducer, initialState);

  return (
    <PlayersContext.Provider value={{ state, dispatch }}>
      {children}
    </PlayersContext.Provider>
  );
};

export const usePlayersContext = () => {
  const context = useContext(PlayersContext);
  if (context === undefined) {
    throw new Error('usePlayersContext must be used within a PlayersProvider');
  }
  return context;
};
