'use client';

import { Button } from '@/components/ui/button';
import { Undo } from 'lucide-react';

const NumberPad = () => {
  return (
    <div className="fixed w-full md:bottom-20 md:p-2 bottom-16 p-2">
      <div className="grid grid-cols-7 gap-4">
        <Button variant="secondary" className="col-span-1">
          1
        </Button>
        <Button variant="secondary" className="col-span-1">
          2
        </Button>
        <Button variant="secondary" className="col-span-1">
          3
        </Button>
        <Button variant="secondary" className="col-span-1">
          4
        </Button>
        <Button variant="secondary" className="col-span-1">
          5
        </Button>
        <Button variant="secondary" className="col-span-1">
          6
        </Button>
        <Button variant="secondary" className="col-span-1">
          7
        </Button>
        <Button variant="secondary" className="col-span-1">
          8
        </Button>
        <Button variant="secondary" className="col-span-1">
          9
        </Button>
        <Button variant="secondary" className="col-span-1">
          10
        </Button>
        <Button variant="secondary" className="col-span-1">
          11
        </Button>
        <Button variant="secondary" className="col-span-1">
          12
        </Button>
        <Button variant="secondary" className="col-span-1">
          13
        </Button>
        <Button variant="secondary" className="col-span-1">
          14
        </Button>
        <Button variant="secondary" className="col-span-1">
          15
        </Button>
        <Button variant="secondary" className="col-span-1">
          16
        </Button>
        <Button variant="secondary" className="col-span-1">
          17
        </Button>
        <Button variant="secondary" className="col-span-1">
          18
        </Button>
        <Button variant="secondary" className="col-span-1">
          19
        </Button>
        <Button variant="secondary" className="col-span-1">
          20
        </Button>
        <Button variant="secondary" className="col-span-1">
          25
        </Button>
        <Button variant="secondary" className="col-span-1">
          0
        </Button>
        <Button className="col-span-2 focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 px-5 dark:focus:ring-yellow-900">
          DOUBLE
        </Button>
        <Button className="col-span-2 focus:outline-none text-white bg-orange-400 hover:bg-orange-500 focus:ring-4 focus:ring-orange-300 px-5 dark:focus:ring-orange-900">
          TRIPPLE
        </Button>
        <Button variant="destructive" className="col-span-2 text-xl">
          <Undo />
        </Button>
      </div>
    </div>
  );
};

export default NumberPad;
