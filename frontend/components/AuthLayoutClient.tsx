'use client';

import Image from "next/image";
import { usePathname } from "next/navigation";

export default function AuthLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isSignUp = pathname === "/sign-up";

  return (
    <main className="relative min-h-screen w-full font-inter overflow-hidden bg-[#f4f8fd]">

      {/* Desktop View with sliding animation */}
      <div className="hidden md:block relative w-full min-h-screen">
        {/* Form Container */}
        <section
          className={`absolute top-0 left-0 w-1/2 h-full bg-white flex justify-center items-center
          transition-transform duration-700 ease-in-out z-20 overflow-y-auto no-scrollbar
          ${isSignUp ? "translate-x-full" : "translate-x-0"}`}
        >
          <div className="w-full max-w-md px-8">
            {children}
          </div>
        </section>

        {/* Branding Image Container */}
        <aside
          className={`absolute top-0 left-0 w-1/2 h-full bg-[#f4f8fd]
          transition-transform duration-700 ease-in-out z-10
          ${isSignUp ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="relative w-full h-full overflow-hidden">
            <Image
              src="/icons/auth-image.png"
              alt="Auth image"
              fill
              priority
              className="object-cover transition-[object-position] duration-700"
              style={{ objectPosition: isSignUp ? "right" : "left" }}
            />
          </div>
        </aside>
      </div>

      {/* Mobile view */}
      <div className="md:hidden flex min-h-screen w-full justify-center items-center bg-white">
        <div className="w-full max-w-md px-4">
          {children}
        </div>
      </div>

    </main>
  );
}