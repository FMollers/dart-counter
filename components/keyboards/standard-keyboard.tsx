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

  const handleNumberPress = (number: string) => {
    if (/^[0-9]$/.test(number)) {
      setThrowScore((prevValue) => prevValue + number);
    }
  };

  const handleConfirm = () => {
    makeThrow(parseInt(throwScore !== '' ? throwScore : '0'));
    setThrowScore('');
  };

  return (
    <div className="fixed bottom-0 w-full bg-secondary p-2 pb-4">
      <div className="grid grid-cols-2 gap-3 w-full">
        <div className="grid grid-rows-4 grid-cols-3 gap-2">
          <Button
            variant="default"
            className="col-span-1"
            onClick={() => handleNumberPress('1')}
          >
            1
          </Button>
          <Button
            variant="default"
            className="col-span-1"
            onClick={() => handleNumberPress('2')}
          >
            2
          </Button>
          <Button
            variant="default"
            className="col-span-1"
            onClick={() => handleNumberPress('3')}
          >
            3
          </Button>
          <Button
            variant="default"
            className="col-span-1"
            onClick={() => handleNumberPress('4')}
          >
            4
          </Button>
          <Button
            variant="default"
            className="col-span-1"
            onClick={() => handleNumberPress('5')}
          >
            5
          </Button>
          <Button
            variant="default"
            className="col-span-1"
            onClick={() => handleNumberPress('6')}
          >
            6
          </Button>
          <Button
            variant="default"
            className="col-span-1"
            onClick={() => handleNumberPress('7')}
          >
            7
          </Button>
          <Button
            variant="default"
            className="col-span-1"
            onClick={() => handleNumberPress('8')}
          >
            8
          </Button>
          <Button
            variant="default"
            className="col-span-1"
            onClick={() => handleNumberPress('9')}
          >
            9
          </Button>
          <Button
            disabled={multiplier !== 1}
            variant="default"
            className="col-start-2 col-span-1"
            onClick={() => handleNumberPress('0')}
          >
            0
          </Button>
        </div>
        <div className="grid grid-rows-2 grid-cols-2 gap-2">
          <Button
            variant="ghost"
            onClick={() => setThrowScore(throwScore.slice(0, -1))}
            className="row-span-1 col-span-2 text-primary hover:text-destructive text-2xl overflow-hidden flex justify-between h-full bg-transparent border-4 border-dotted border-primary"
          >
            {throwScore}
            {throwScore && <Delete />}
          </Button>
          <Button
            variant="destructive"
            onClick={undoThrows}
            className="row-span-2 col-span-1 text-xl h-full"
          >
            <Undo />
          </Button>
          <Button
            variant="default"
            onClick={() => {
              handleConfirm();
              setThrowScore('');
            }}
            className="row-span-2 col-span-1 text-xl h-full text-white bg-green-500 hover:bg-green-400"
          >
            <Check />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StandardKeyboard;
