'use client';

import { sidebarLinks } from '@/constants';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Footer from './Footer';
import { SiderbarProps } from '@/types';

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <section className="sidebar flex flex-col h-full">
      {/* Logo Section */}
      <Link href="/" className="mb-12 cursor-pointer flex items-center gap-2">
        <Image
          src="/icons/logo.svg"
          width={34}
          height={34}
          alt="FintechHub logo"
          className="size-[24px] max-xl:size-14"
        />
        <h1 className="sidebar-logo">FintechHub</h1>
      </Link>

      {/* Sidebar Links */}
      <nav className="flex flex-col gap-4 flex-1">
        {sidebarLinks.map((item) => {
          const isActive =
            pathname === item.route || pathname.startsWith(`${item.route}/`);

          return (
            <Link
              href={item.route}
              key={item.label}
              className={cn(
                'sidebar-link flex items-center gap-3 rounded px-4 py-2 transition',
                { 'bg-bank-gradient': isActive }
              )}
            >
              <div className="relative size-6">
                <Image
                  src={item.imgURL}
                  alt={item.label}
                  fill
                  className={cn({
                    'brightness-[3] invert-0': isActive,
                  })}
                />
              </div>
              <p className={cn('sidebar-label', { '!text-white': isActive })}>
                {item.label}
              </p>
            </Link>
          );
        })}
      </nav>

      {/* Footer Section */}
      <Footer />
    </section>
  );
};

export default Sidebar;