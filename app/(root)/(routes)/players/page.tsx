'use client';

import PlayerList from '@/components/ui/player-list';
import { usePlayersContext } from '@/context/players-context';

const PlayersPage = () => {
  const { state, dispatch } = usePlayersContext();

  return (
    <div className="p-4 flex justify-center">
      <PlayerList />
    </div>
  );
};

export default PlayersPage;
