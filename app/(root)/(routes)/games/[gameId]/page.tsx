'use client';

import { redirect } from 'next/navigation';
import GameClient from './components/client';
import { useGamesContext } from '@/context/games-context';

//TODO: SHOULD BE SERVER CLIENT SINCE DATA SHOULD BE FETCHED FROM DATABASE

interface GameIdPageProps {
  params: {
    gameId: string;
  };
}

const GameIdPage = ({ params }: GameIdPageProps) => {
  const { state } = useGamesContext();

  const game = state.games.find((game) => game.id === params.gameId);

  if (!game) {
    return redirect('/');
  }

  return <GameClient game={game} />;
};

export default GameIdPage;
