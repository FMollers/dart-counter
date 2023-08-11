'use client';

import { Keyboard } from 'lucide-react';
import { ModeToggle } from '@/components/ui/mode-toggle';

export const Navbar = () => {
  return (
    <div className="fixed w-full flex justify-between item-center py-3 px-4 bg-secondary">
      <div className="flex items-center">
        <h1 className="md:block">
          <div className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            Dart counter
          </div>
        </h1>
      </div>
      <ModeToggle />
    </div>
  );
};
