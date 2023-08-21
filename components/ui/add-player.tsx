'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';

import {
  CheckoutTypes,
  PlayerActionTypes,
  usePlayersContext,
} from '@/context/players-context';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const AddPlayer = () => {
  const [checkoutType, setCheckoutType] = useState<CheckoutTypes>(
    CheckoutTypes.DOUBLE_OUT
  );
  const [dropdownPoints, setDropdownPoints] = useState<string>('501');
  const [score, setScore] = useState<number>(501);
  const [name, setName] = useState<string>('');
  const [error, setError] = useState<string>('');
  const { state, dispatch } = usePlayersContext();

  const addPlayer = () => {
    //TODO: Add zod for validation
    dispatch({
      type: PlayerActionTypes.ADD_PLAYER,
      payload: {
        id: uuidv4(),
        name,
        score,
        initialScore: score,
        legsWon: 0,
        checkoutType: CheckoutTypes.DOUBLE_OUT,
        currentTurn: [],
        turnHistory: [],
      },
    });
  };

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onPointsChange = (value: string) => {
    setScore(parseInt(value)); //TODO: Fix this
    setDropdownPoints(value);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus className="mr-2 h-4 w-4" />
          Add player
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New player</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="item-center">
            <DropdownMenu>
              <Input
                placeholder="Name"
                onChange={onNameChange}
                className="w-full"
              />
            </DropdownMenu>
          </div>
          <div className="item-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="w-full" variant="outline">
                  {checkoutType}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Check-Out Types</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                  value={checkoutType}
                  onValueChange={(value) =>
                    setCheckoutType(value as CheckoutTypes)
                  }
                >
                  <DropdownMenuRadioItem value={CheckoutTypes.DOUBLE_OUT}>
                    {CheckoutTypes.DOUBLE_OUT}
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value={CheckoutTypes.STRAIGHT_OUT}>
                    {CheckoutTypes.STRAIGHT_OUT}
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="item-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="w-full" variant="outline">
                  {dropdownPoints}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Points</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                  value={dropdownPoints}
                  onValueChange={(value) => onPointsChange(value)}
                >
                  <DropdownMenuRadioItem value="501">501</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="401">401</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="301">301</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="201">201</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="101">101</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <DialogFooter>
          <div className="text-red-500">{error}</div>
          <Button disabled={name.length <= 0} type="submit" onClick={addPlayer}>
            Add player
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddPlayer;
