"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isSignUp = pathname === "/sign-up";

  return (
    <main
      className={`flex min-h-screen w-full font-inter ${
        isSignUp ? "flex-row-reverse" : "flex-row"
      }`}
    >
      {/* Auth Form Section */}
      <section className="flex w-full md:w-1/2 justify-center items-center bg-[#f4f8fd]">
        <div className="w-full max-w-md flex flex-col justify-center items-center px-4 sm:px-8">
          {children}
        </div>
      </section>
      {/* Image Section - hidden on mobile */}
      <aside className="hidden md:flex w-1/2 justify-center items-center bg-[#f4f8fd]">
        <div className="flex justify-center items-center w-full h-full">
          <div className="relative bg-white rounded-2xl shadow-2xl border-2 border-gray-200 p-4 max-w-[480px] w-[75%] h-[75%] flex justify-center items-center">
            <Image
              src="/icons/auth-image.png"
              alt="Auth image"
              fill
              className="rounded-xl object-contain p-2"
              priority
              style={{ background: "#fff" }}
            />
          </div>
        </div>
      </aside>
    </main>
  );
}
