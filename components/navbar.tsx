'use client';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { Menu } from 'lucide-react';

import Sidebar from '@/components/sidebar';

export const Navbar = () => {
  return (
    <div className="fixed w-full z-50 flex justify-between items-center py-6 px-4 border-primary/10 bg-secondary h-12">
      <div className="flex items-center">
        <Sheet>
          <SheetTrigger className="pr-4">
            <Menu />
          </SheetTrigger>
          <SheetContent side="left" className="p-0 bg-secondary pt-10 w-72">
            <Sidebar />
          </SheetContent>
        </Sheet>
      </div>
      <div className="flex items-center gap-x-3">
        <ModeToggle />
      </div>
    </div>
  );
};
