'use client';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { sidebarLinks } from '@/constants';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useGlobalStore } from '@/store/globalStore';

const MobileNav = () => {
  const pathname = usePathname();
  const router = useRouter();
  const user = useGlobalStore((state) => state.user);
  const logout = useGlobalStore((state) => state.logout);

  const handleLogOut = () => {
    logout?.();
    localStorage.removeItem('token');
    router.push('/sign-in');
  };

  return (
    <section className="w-full max-w-[264px]">
      <Sheet>
        <SheetTrigger asChild>
          <button>
            <Image
              src="/icons/hamburger.svg"
              width={30}
              height={30}
              alt="menu"
              className="cursor-pointer"
            />
          </button>
        </SheetTrigger>

        <SheetContent
          side="left"
          className="border-none bg-white pt-6"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 mb-6">
            <Image
              src="/icons/logo.svg"
              width={34}
              height={34}
              alt="FintechHub logo"
            />
            <h1 className="text-2xl font-ibm-plex-serif font-bold text-black-1">
              FintechHub
            </h1>
          </Link>

          {/* Profile Section */}
          <div className="flex flex-col gap-3 mb-6 px-2">
            <div className="w-14 h-14 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xl font-semibold shadow-md border-2 border-white mx-auto">
              {user?.firstName?.[0] || 'U'}
            </div>

            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col">
                <h1 className="text-base font-semibold text-black-1 truncate">
                  {user?.firstName || 'Guest'}
                </h1>
                <p className="text-sm text-gray-600 truncate">
                  {user?.email || 'guest@example.com'}
                </p>
              </div>

              <button
                onClick={handleLogOut}
                className="ml-4 shrink-0"
              >
                <Image src="/icons/logout.svg" width={24} height={24} alt="Logout" />
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-300 w-full mb-4" />

          {/* Navigation Links */}
          <nav className="flex flex-col gap-4 flex-1 overflow-y-auto">
            {sidebarLinks.map((item) => {
              const isActive =
                pathname === item.route || pathname.startsWith(`${item.route}/`);

              return (
                <SheetClose asChild key={item.route}>
                  <Link
                    href={item.route}
                    className={cn(
                      'flex items-center gap-3 px-4 py-2 rounded-md transition-all hover:bg-gray-100',
                      {
                        'bg-bank-gradient text-white': isActive,
                      }
                    )}
                  >
                    <Image
                      src={item.imgURL}
                      alt={item.label}
                      width={20}
                      height={20}
                      className={cn({
                        'brightness-[3] invert-0': isActive,
                      })}
                    />
                    <span
                      className={cn('text-base font-medium', {
                        'text-white': isActive,
                        'text-black-2': !isActive,
                      })}
                    >
                      {item.label}
                    </span>
                  </Link>
                </SheetClose>
              );
            })}
          </nav>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;