import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Undo } from 'lucide-react';

interface AdvancedKeyboardProps {
  multiplier: number;
  handleMultiplier: (multiplier: 1 | 2 | 3) => void;
  makeThrow: (throwValue: number) => void;
  undoThrows: () => void;
}

const AdvancedKeyboard = ({
  multiplier,
  handleMultiplier,
  makeThrow,
  undoThrows,
}: AdvancedKeyboardProps) => {
  return (
    <div className="fixed bottom-0 w-full bg-secondary p-4 border-t-2 border-primary">
      <div className="grid grid-cols-7 gap-4">
        <Button
          variant="default"
          className="col-span-1"
          onClick={() => makeThrow(1)}
        >
          1
        </Button>
        <Button
          variant="default"
          className="col-span-1"
          onClick={() => makeThrow(2)}
        >
          2
        </Button>
        <Button
          variant="default"
          className="col-span-1"
          onClick={() => makeThrow(3)}
        >
          3
        </Button>
        <Button
          variant="default"
          className="col-span-1"
          onClick={() => makeThrow(4)}
        >
          4
        </Button>
        <Button
          variant="default"
          className="col-span-1"
          onClick={() => makeThrow(5)}
        >
          5
        </Button>
        <Button
          variant="default"
          className="col-span-1"
          onClick={() => makeThrow(6)}
        >
          6
        </Button>
        <Button
          variant="default"
          className="col-span-1"
          onClick={() => makeThrow(7)}
        >
          7
        </Button>
        <Button
          variant="default"
          className="col-span-1"
          onClick={() => makeThrow(8)}
        >
          8
        </Button>
        <Button
          variant="default"
          className="col-span-1"
          onClick={() => makeThrow(9)}
        >
          9
        </Button>
        <Button
          variant="default"
          className="col-span-1"
          onClick={() => makeThrow(10)}
        >
          10
        </Button>
        <Button
          variant="default"
          className="col-span-1"
          onClick={() => makeThrow(11)}
        >
          11
        </Button>
        <Button
          variant="default"
          className="col-span-1"
          onClick={() => makeThrow(12)}
        >
          12
        </Button>
        <Button
          variant="default"
          className="col-span-1"
          onClick={() => makeThrow(13)}
        >
          13
        </Button>
        <Button
          variant="default"
          className="col-span-1"
          onClick={() => makeThrow(14)}
        >
          14
        </Button>
        <Button
          variant="default"
          className="col-span-1"
          onClick={() => makeThrow(15)}
        >
          15
        </Button>
        <Button
          variant="default"
          className="col-span-1"
          onClick={() => makeThrow(16)}
        >
          16
        </Button>
        <Button
          variant="default"
          className="col-span-1"
          onClick={() => makeThrow(17)}
        >
          17
        </Button>
        <Button
          variant="default"
          className="col-span-1"
          onClick={() => makeThrow(18)}
        >
          18
        </Button>
        <Button
          variant="default"
          className="col-span-1"
          onClick={() => makeThrow(19)}
        >
          19
        </Button>
        <Button
          variant="default"
          className="col-span-1"
          onClick={() => makeThrow(20)}
        >
          20
        </Button>
        <Button
          disabled={multiplier !== 1}
          variant="default"
          className="col-span-1"
          onClick={() => makeThrow(25)}
        >
          25
        </Button>
        <Button
          disabled={multiplier !== 1}
          variant="default"
          className="col-span-1"
          onClick={() => makeThrow(0)}
        >
          0
        </Button>
        <Button
          className={cn(
            'col-span-2 text-white px-5',
            multiplier === 2
              ? 'bg-green-500 hover:bg-green-300'
              : 'bg-yellow-500 hover:bg-yellow-400'
          )}
          onClick={() => handleMultiplier(2)}
        >
          DOUBLE
        </Button>
        <Button
          className={cn(
            'col-span-2 text-white',
            multiplier === 3
              ? 'bg-green-500 hover:bg-green-300'
              : 'bg-orange-400 hover:bg-orange-500'
          )}
          onClick={() => handleMultiplier(3)}
        >
          TRIPPLE
        </Button>
        <Button
          variant="destructive"
          onClick={undoThrows}
          className="col-span-2 text-xl"
        >
          <Undo />
        </Button>
      </div>
    </div>
  );
};

export default AdvancedKeyboard;
