import MobileNav from "@/components/MobileNav";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex h-screen w-full font-inter">
      <Sidebar />

      <div className="flex size-full flex-col">
        <div className="root-layout">
          {/* Left side: Logo + Site name */}
          <div className="flex items-center gap-2">
            <Image src="/icons/logo.svg" width={30} height={30} alt="logo" />
            <span className="text-xl font-semibold text-black">FintechHub</span>
          </div>

          {/* Right side: Hamburger */}
          <div className="ml-auto">
            <MobileNav />
          </div>
        </div>

        {/* Page content */}
        {children}
      </div>
    </main>
  );
}