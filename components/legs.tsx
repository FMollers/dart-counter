'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Button } from '@/components/ui/button';
import { Tally1, Tally2, Tally3, Tally4, Tally5 } from 'lucide-react';

interface LegsProps {
  legs: number;
  handleLegs: (legs: number) => void;
}

const Legs = ({ legs, handleLegs }: LegsProps) => {
  const getLegsIcon = () => {
    switch (legs) {
      case 1:
        return <Tally1 className="ml-2 h-5 w-5" />;
      case 2:
        return <Tally2 className="ml-2 h-5 w-5" />;
      case 3:
        return <Tally3 className="ml-2 h-5 w-5" />;
      case 4:
        return <Tally4 className="ml-2 h-5 w-5" />;
      case 5:
        return <Tally5 className="ml-2 h-5 w-5" />;
      default:
        return <div className="ml-2 h-5 w-5">{legs}</div>;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          Legs
          {getLegsIcon()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Legs</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={legs.toString()}
          onValueChange={(value) => handleLegs(Number(value))}
        >
          <DropdownMenuRadioItem value="1">1</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="2">2</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="3">3</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="4">4</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="5">5</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Legs;
