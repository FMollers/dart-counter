'use client';

import { Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  usePlayersContext,
  PlayerActionTypes,
} from '@/context/players-context';
import UpdatePlayer from './update-player';
import AddPlayer from './add-player';

const PlayerList = () => {
  const { state, dispatch } = usePlayersContext();

  const removePlayer = (id: string) => {
    dispatch({
      type: PlayerActionTypes.REMOVE_PLAYER,
      payload: { playerId: id },
    });
  };

  return (
    <div className="grid gap-4 w-full">
      {state.players.length > 0 ? (
        state.players.map((player) => (
          <Card key={player.id}>
            <CardContent className="pt-6 grid grid-cols-3 gap-4">
              <div>
                <div className="text-2xl overflow-hidden">{player.name}</div>
                <Badge className="overflow-hidden">{player.score}</Badge>
              </div>
              <div className="flex justify-center items-center">
                {player.checkoutType}
              </div>
              <div className="grid grid-cols-1 gap-2 items-center">
                <div className="flex justify-end">
                  <Trash2
                    className="cursor-pointer text-red-800"
                    onClick={() => removePlayer(player.id)}
                  />
                </div>
                <div className="flex justify-end">
                  <UpdatePlayer player={player} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <div className="flex justify-center">No players yet</div>
      )}
      <AddPlayer />
    </div>
  );
};

export default PlayerList;
