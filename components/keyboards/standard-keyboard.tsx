import { Button } from '@/components/ui/button';
import { Check, Delete, Undo } from 'lucide-react';
import { useState } from 'react';

interface StandardKeyboardProps {
  multiplier: number;
  undoThrows: () => void;
  makeThrow: (throwValue: number) => void;
}

const StandardKeyboard = ({
  multiplier,
  makeThrow,
  undoThrows,
}: StandardKeyboardProps) => {
  const [throwScore, setThrowScore] = useState<string>('');

  return (
    <div className="fixed bottom-0 w-full bg-secondary p-4 border-t-2 border-primary">
      <div className="grid grid-cols-2 gap-4 w-full">
        <div className="grid grid-rows-4 grid-cols-3 gap-4">
          <Button
            variant="default"
            className="col-span-1"
            onClick={() => setThrowScore(throwScore + throwScore + '1')}
          >
            1
          </Button>
          <Button
            variant="default"
            className="col-span-1"
            onClick={() => setThrowScore(throwScore + '2')}
          >
            2
          </Button>
          <Button
            variant="default"
            className="col-span-1"
            onClick={() => setThrowScore(throwScore + '3')}
          >
            3
          </Button>
          <Button
            variant="default"
            className="col-span-1"
            onClick={() => setThrowScore(throwScore + '4')}
          >
            4
          </Button>
          <Button
            variant="default"
            className="col-span-1"
            onClick={() => setThrowScore(throwScore + '5')}
          >
            5
          </Button>
          <Button
            variant="default"
            className="col-span-1"
            onClick={() => setThrowScore(throwScore + '6')}
          >
            6
          </Button>
          <Button
            variant="default"
            className="col-span-1"
            onClick={() => setThrowScore(throwScore + '7')}
          >
            7
          </Button>
          <Button
            variant="default"
            className="col-span-1"
            onClick={() => setThrowScore(throwScore + '8')}
          >
            8
          </Button>
          <Button
            variant="default"
            className="col-span-1"
            onClick={() => setThrowScore(throwScore + '9')}
          >
            9
          </Button>
          <Button
            disabled={multiplier !== 1}
            variant="default"
            className="col-start-2 col-span-1"
            onClick={() => setThrowScore(throwScore + '0')}
          >
            0
          </Button>
        </div>
        <div className="grid grid-rows-3 grid-cols-3 gap-4">
          <Button
            disabled
            className="row-span-2 col-span-2 flex justify-center items-center text-2xl overflow-hidden h-full rounded-lg"
          >
            {throwScore}
          </Button>
          <Button
            onClick={() => setThrowScore(throwScore.slice(0, -1))}
            className="row-span-2 col-span-1 h-full"
          >
            <Delete />
          </Button>
          <Button
            variant="destructive"
            onClick={undoThrows}
            className="col-span-3 text-xl"
          >
            <Undo />
          </Button>
          <Button
            variant="default"
            onClick={() => {
              makeThrow(+throwScore);
              setThrowScore('');
            }}
            className="col-span-3 text-xl text-white bg-green-500"
          >
            <Check />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StandardKeyboard;
