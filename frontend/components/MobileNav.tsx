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
          {/* Logo and Title Removed */}

          {/* Profile Section with Bottom Fade */}
          <div className="relative mb-6 overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 w-full h-full">
              <Image
                src="/icons/gradient-mesh.svg"
                alt="Profile Background"
                layout="fill"
                objectFit="cover"
              />
            </div>

            {/* Soft blur overlay */}
            <div className="absolute inset-0 bg-white/30 backdrop-blur-md" />

            {/* Bottom fade mask */}
            <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-white to-transparent z-20" />

            {/* Profile Content */}
            <div className="relative z-10 flex flex-col gap-3 px-4 py-6">
              <div className="w-14 h-14 rounded-full bg-white text-blue-600 flex items-center justify-center text-xl font-semibold shadow-md border-4 border-gray-100 mx-auto">
                {user?.firstName?.[0] || 'U'}
              </div>

              <div className="flex items-center justify-between w-full">
                <div className="flex flex-col text-black">
                  <h1 className="text-base font-semibold truncate">
                    {user?.firstName || 'Guest'}
                  </h1>
                  <p className="text-sm truncate">{user?.email || 'guest@example.com'}</p>
                </div>

                <button onClick={handleLogOut} className="ml-4 shrink-0">
                  <Image
                    src="/icons/logout.svg"
                    width={24}
                    height={24}
                    alt="Logout"
                    className="opacity-70"
                  />
                </button>
              </div>
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