'use client';

import React, { createContext, useReducer } from 'react';

// export type Turn = {
//   firstDart?: number;
//   secondDart?: number;
//   thirdDart?: number;
//   endingRoundPoints?: number;
//   bust?: boolean;
// };

// export type Player = {
//   name: string;
//   points: number;
//   currentTurn: number;
//   turns: Turn[];
//   legs: number;
//   checkoutType: string;
//   playersTurn: boolean;
// };

// type State = {
//   legs: number;
//   gameStarted: boolean;
//   randomOrder: boolean;
//   players: Player[];
// };

// type Action = {
//   type: string;
//   player: Player;
//   players: Player[];
//   legs: number;
//   gameStarted: boolean;
//   randomOrder: boolean;
// };

// const initialState: State = {
//   legs: 3,
//   gameStarted: false,
//   randomOrder: false, //??
//   players: [
//     {
//       name: 'Filip',
//       points: 101,
//       currentTurn: 0,
//       legs: 0,
//       turns: [],
//       checkoutType: 'SO',
//       playersTurn: true,
//     },
//     {
//       name: 'Kalle',
//       points: 101,
//       currentTurn: 0,
//       legs: 0,
//       turns: [],
//       checkoutType: 'DO',
//       playersTurn: false,
//     },
//     {
//       name: 'Petter',
//       points: 101,
//       currentTurn: 0,
//       legs: 0,
//       turns: [],
//       checkoutType: 'SO',
//       playersTurn: false,
//     },
//   ],
// };

//NEW

type GameTest = {
  id: string;
  status: 'paused' | 'completed' | 'in progress';
  legsToWin: number;
  players: PlayerTest[];
};

type PlayerTest = {
  id: string;
  name: string;
  score: number;
  legsWon: number;
};

type LegTest = {
  id: string;
  number: number;
  winnerId: string | null;
  throws: ThrowTest[];
};

type ThrowTest = {
  id: string;
  playerId: string;
  score: number;
  multiplier: 1 | 2 | 3;
};

export interface DartAppState {
  games: GameTest[];
}

export enum ActionTypes {
  ADD_GAME = 'ADD_GAME',
  ADD_PLAYER = 'ADD_PLAYER',
  UPDATE_PLAYER_SCORE = 'UPDATE_PLAYER_SCORE',
  // ... add more action types as needed
}

export interface AddGameAction {
  type: ActionTypes.ADD_GAME;
  payload: {
    game: GameTest;
  };
}

export interface AddPlayerAction {
  type: ActionTypes.ADD_PLAYER;
  payload: {
    gameId: string;
    player: PlayerTest;
  };
}

export interface UpdatePlayerScoreAction {
  type: ActionTypes.UPDATE_PLAYER_SCORE; // Use the action type here
  payload: {
    gameId: string;
    playerId: string;
    newScore: number;
  };
}

export type DartAction =
  | AddGameAction
  | AddPlayerAction
  | UpdatePlayerScoreAction;

//ACTION TYPES
const ADD_GAME = 'ADD_GAME';
const ADD_PLAYER = 'ADD_PLAYER';
const UPDATE_PLAYER_SCORE = 'UPDATE_PLAYER_SCORE';

const initialState: DartAppState = {
  games: [
    {
      id: '1',
      legsToWin: 3,
      players: [],
      status: 'in progress',
    },
  ],
};

const DartContext = createContext<
  { state: DartAppState; dispatch: React.Dispatch<DartAction> } | undefined
>(undefined);

const dartReducer = (state: DartAppState, action: DartAction) => {
  switch (action.type) {
    case ADD_GAME:
      return {
        ...state,
        games: [...state.games, action.payload.game],
      };
    case ADD_PLAYER:
      // Find the game by ID and update its players array
      return {
        ...state,
        games: state.games.map((game) =>
          game.id === action.payload.gameId
            ? {
                ...game,
                players: [...game.players, action.payload.player],
              }
            : game
        ),
      };
    case UPDATE_PLAYER_SCORE:
      // Find the game and player by IDs and update the score
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
                        score: action.payload.newScore,
                      }
                    : player
                ),
              }
            : game
        ),
      };
    // ... Handle more cases for other actions
    default:
      return state;
  }
  // switch (action.type) {
  //   case 'ADD_PLAYER':
  //     return {
  //       ...state,
  //       players: [...state.players, action.player],
  //     };
  //   case 'REMOVE_PLAYER':
  //     return {
  //       ...state,
  //       players: state.players.filter(
  //         (player) => player.name !== action.player.name
  //       ),
  //     };
  //   case 'UPDATE_PLAYER':
  //     return {
  //       ...state,
  //       players: state.players.map((player) => {
  //         if (action.player.name === player.name) {
  //           return {
  //             ...player,
  //             points: action.player.points,
  //             checkoutType: action.player.checkoutType,
  //           };
  //         }
  //         return player;
  //       }),
  //     };
  //   case 'UPDATE_PLAYER_POINTS':
  //     return {
  //       ...state,
  //       players: state.players.map((player) => {
  //         if (action.player.name === player.name) {
  //           return {
  //             ...player,
  //             points: action.player.points,
  //             currentTurn: action.player.currentTurn,
  //             turns: action.player.turns,
  //           };
  //         }
  //         return player;
  //       }),
  //     };
  //   case 'UPDATE_LEGS':
  //     return {
  //       ...state,
  //       legs: action.legs,
  //     };
  //   case 'UPDATE_GAME_STATE':
  //     return {
  //       ...state,
  //       gameStarted: action.gameStarted,
  //     };
  //   case 'RANDOMIZE_PLAYERS':
  //     return {
  //       ...state,
  //       players: action.players,
  //     };
  //   case 'SET_STARTING_PLAYER':
  //     return {
  //       ...state,
  //       players: state.players.map((player) => {
  //         if (action.player.name === player.name) {
  //           return {
  //             ...player,
  //             playersTurn: true,
  //           };
  //         }
  //         return player;
  //       }),
  //     };
  //   case 'UPDATE_PLAYER_TURN':
  //     return {
  //       ...state,
  //       players: action.players,
  //     };
  //   case 'UPDATE_ALL_PLAYER_DATA':
  //     return { ...state, players: action.players };
  //   default:
  //     return state;
  // }
};

export const DartProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(dartReducer, initialState);

  return (
    <DartContext.Provider value={{ state, dispatch }}>
      {children}
    </DartContext.Provider>
  );
};

export const useDartContext = () => {
  const context = React.useContext(DartContext);
  if (context === undefined) {
    throw new Error('useDartContext must be used within a DartProvider');
  }
  return context;
};
