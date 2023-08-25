'use client';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

import { Plus, User } from 'lucide-react';

import {
  CheckoutTypes,
  PlayerActionTypes,
  usePlayersContext,
} from '@/context/players-context';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { cn } from '@/lib/utils';

const AddPlayer = () => {
  const [checkoutType, setCheckoutType] = useState<CheckoutTypes>(
    CheckoutTypes.DOUBLE_OUT
  );
  const [score, setScore] = useState<number>(501);
  const [name, setName] = useState<string>('');

  const [expandCard, setExpandCard] = useState<boolean>(false);
  const { dispatch } = usePlayersContext();

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

    setName('');
    setScore(501);
    setCheckoutType(CheckoutTypes.DOUBLE_OUT);
    setExpandCard(false);
  };

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    <Card
      className={cn(
        'cursor-pointer h-10 transition-all duration-500 ease-in-out overflow-hidden',
        expandCard ? 'h-52' : 'hover:bg-primary/10'
      )}
      onClick={() => setExpandCard(true)}
    >
      <CardContent>
        <div className="flex justify-center items-center text-sm p-2">
          Add player
          <Plus
            className={cn(
              'ml-2 h-5 w-5 transition-all ease-in-out duration-500',
              expandCard ? 'transform rotate-180' : ''
            )}
          />
        </div>
        <div
          className={cn(
            'mt-4 grid grid-rows-3 grid-flow-col gap-2',
            expandCard ? '' : 'hidden'
          )}
        >
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
              <SelectValue placeholder="501" />
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
              <SelectValue placeholder="Double Out" />
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
          <div className="flex justify-center items-center">
            <Plus />
            <User />
          </div>
          <Button
            disabled={!name}
            onClick={(e) => {
              e.stopPropagation();
              addPlayer();
            }}
          >
            Add
          </Button>
          <Button
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              setExpandCard(false);
            }}
          >
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AddPlayer;
