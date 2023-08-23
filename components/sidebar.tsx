'use client';

import { Home, Users, Settings, Gamepad2 } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

import { cn } from '@/lib/utils';

const Sidebar = () => {
  const pathName = usePathname();
  const router = useRouter();

  const routes = [
    {
      icon: Home,
      href: '/',
      label: 'Home',
      color: 'text-green-500',
    },
    {
      icon: Users,
      href: '/players',
      label: 'Players',
      color: 'text-emerald-500',
    },
    {
      icon: Gamepad2,
      href: '/games',
      label: 'Games',
      color: 'text-orange-500',
    },
    {
      icon: Settings,
      href: '/settings',
      label: 'Settings',
      color: 'text-pink-500',
    },
  ];

  return (
    <div className="space-y-4 flex flex-col h-full text-primary bg-secondary">
      <div className="p-8 flex justify-start">
        <div className="space-y-8">
          {routes.map((route) => (
            <div
              onClick={() => router.push(route.href)}
              key={route.href}
              className={cn(
                'group flex p-4 w-full cursor-pointer hover:text-primary/5 rounded-lg transition',
                pathName === route.href && 'bg-primary/10 text-primary'
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn('h-10 w-10 mr-4', route.color)} />
                {route.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
