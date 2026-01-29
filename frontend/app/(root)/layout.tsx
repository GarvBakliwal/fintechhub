import MobileNav from "@/components/MobileNav";
import MobileFloatingNav from "@/components/MobileFloatingNav";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex h-screen w-full font-inter">
      {/* Desktop Sidebar */}
      <Sidebar />

      <div className="flex size-full flex-col relative">
        {/* Top Header */}
        <header className="root-layout">
          <div className="flex items-center gap-2">
            <Image src="/icons/logo.svg" width={30} height={30} alt="logo" />
            <span className="text-xl font-semibold text-black">
              FintechHub
            </span>
          </div>

          {/* <div className="ml-auto">
            <MobileNav />
          </div> */}
        </header>

        {/* Page Content */}
        <section className="flex-1 overflow-y-auto pb-24">
          {children}
        </section>

        {/* Bottom Floating Nav (Mobile only) */}
        <MobileFloatingNav />
      </div>
    </main>
  );
}