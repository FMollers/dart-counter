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
  // Add more action types as needed
}

const initialState: PlayersState = {
  players: [
    {
      id: 'f7a1dd3f-d2d6-450d-9aea-5f074a54b750',
      name: 'Filip',
      checkoutType: CheckoutTypes.STRAIGHT_OUT,
      currentTurn: [],
      legsWon: 0,
      score: 401,
      initialScore: 401,
      turnHistory: [],
    },
    {
      id: '49b9b576-2987-41a3-bc5a-fe5b4a4f1ddb',
      name: 'Kalle',
      checkoutType: CheckoutTypes.DOUBLE_OUT,
      currentTurn: [],
      legsWon: 0,
      score: 501,
      initialScore: 501,
      turnHistory: [],
    },
    {
      id: '87b3b912-8321-42y3-bt5i-fe3b4a4f1ddb',
      name: 'Emma',
      checkoutType: CheckoutTypes.STRAIGHT_OUT,
      currentTurn: [],
      legsWon: 0,
      score: 301,
      initialScore: 301,
      turnHistory: [],
    },
  ],
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
