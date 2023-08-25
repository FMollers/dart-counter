'use client';

import AddPlayer from '@/components/add-player';
import PlayerList from '@/components/player-list';

const PlayersPage = () => {
  return (
    <div className="flex justify-center">
      <PlayerList />
      <div className="fixed bottom-0 w-full p-2 bg-secondary rounded-tl-sm rounded-tr-sm">
        <AddPlayer />
      </div>
    </div>
  );
};

export default PlayersPage;
