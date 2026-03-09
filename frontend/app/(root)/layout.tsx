import MobileFloatingNav from "@/components/MobileFloatingNav";
import Sidebar from "@/components/Sidebar";
import Logout from "@/components/ui/logout";
import Image from "next/image";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex w-full font-inter">
      {/* Desktop Sidebar */}
      <Sidebar />

      <div className="flex flex-1 flex-col relative min-w-0">
        {/* Top Header */}
        <header className="root-layout">
          <div className="flex items-center gap-2">
            <Image src="/icons/logo.svg" width={30} height={30} alt="logo" />
            <span className="text-xl font-semibold text-black">
              FintechHub
            </span>
          </div>

          <Logout />

        </header>

        {/* Page Content */}
        <section className="flex-1 pb-[140px] md:pb-0">
          {children}
        </section>

        {/* Bottom Floating Nav (Mobile only) */}
        <MobileFloatingNav />
      </div>
    </main>
  );
}