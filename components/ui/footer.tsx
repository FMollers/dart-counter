'use client';

import { cn } from '@/lib/utils';
import { Home, Users, Settings, BarChart3 } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

export const Footer = () => {
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
      icon: BarChart3,
      href: '/statistics',
      label: 'Statistics',
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
    <div className="fixed bottom-0 w-full py-2 items-center px-4 bg-secondary">
      <div className="flex space-x-4 h-full text-primary bg-secondary">
        {routes.map((route) => (
          <div
            onClick={() => router.push(route.href)}
            key={route.href}
            className={cn(
              'text-muted-foreground text-xs group flex p-3 w-full justify-center font-medium cursor-pointer hover:text-primary hover:bg-primary/10 rounded-lg transition',
              pathName === route.href && 'bg-primary/10 text-primary'
            )}
          >
            <div className="flex items-center">
              <route.icon className={cn('md:h-8 md:w-12', route.color)} />
              <div className="md:block md:text-lg hidden">{route.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
