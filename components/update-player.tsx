import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import {
  CheckoutTypes,
  Player,
  PlayerActionTypes,
  usePlayersContext,
} from '@/context/players-context';
import { useState } from 'react';

interface UpdatePlayerProps {
  player: Player;
  expandedCardId: string;
  handleExpandedCard: (playerId: string) => void;
}

const UpdatePlayer = ({
  player,
  expandedCardId,
  handleExpandedCard,
}: UpdatePlayerProps) => {
  const [checkoutType, setCheckoutType] = useState<CheckoutTypes>(
    player.checkoutType
  );
  const [score, setScore] = useState<number>(player.score);
  const [name, setName] = useState<string>(player.name);
  const { dispatch } = usePlayersContext();

  const updatePlayer = () => {
    dispatch({
      type: PlayerActionTypes.UPDATE_PLAYER,
      payload: {
        playerId: player.id,
        score,
        checkoutType,
        name,
      },
    });

    handleExpandedCard('');
  };

  const removePlayer = (playerId: string) => {
    dispatch({
      type: PlayerActionTypes.REMOVE_PLAYER,
      payload: { playerId },
    });
  };

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    <Card
      className={cn('mt-6', expandedCardId === player.id ? 'block' : 'hidden')}
    >
      <CardContent className="pt-6 grid grid-rows-3 grid-flow-col gap-4">
        <Input
          placeholder="Name"
          value={name}
          onChange={onNameChange}
          className="w-full"
        />
        <Select
          value={score.toString()}
          onValueChange={(value) => setScore(+value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={player.score} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Points</SelectLabel>
              <SelectItem value="501">501</SelectItem>
              <SelectItem value="401">401</SelectItem>
              <SelectItem value="301">301</SelectItem>
              <SelectItem value="201">201</SelectItem>
              <SelectItem value="101">101</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select
          value={checkoutType}
          onValueChange={(value) => setCheckoutType(value as CheckoutTypes)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={player.checkoutType} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Checkout type</SelectLabel>
              <SelectItem value={CheckoutTypes.DOUBLE_OUT}>
                {CheckoutTypes.DOUBLE_OUT}
              </SelectItem>
              <SelectItem value={CheckoutTypes.STRAIGHT_OUT}>
                {CheckoutTypes.STRAIGHT_OUT}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            updatePlayer();
          }}
        >
          Update
        </Button>
        <Button
          variant="destructive"
          onClick={(e) => {
            e.stopPropagation();
            removePlayer(player.id);
          }}
        >
          Delete
        </Button>
        <Button
          variant="outline"
          onClick={(e) => {
            e.stopPropagation();
            handleExpandedCard('');
          }}
        >
          Cancel
        </Button>
      </CardContent>
    </Card>
  );
};

export default UpdatePlayer;
