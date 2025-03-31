import MobileNav from "@/components/MobileNav";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let loggedIn;

  try {
    // Fetch user data from the JSON file
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/user-data.json`);
    const data = await response.json();

    // Assuming the JSON contains user data
    loggedIn = data.user;

    if (!loggedIn) {
      redirect('/sign-in');
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    redirect('/sign-in');
  }

  return (
    <main className="flex h-screen w-full font-inter">
      <Sidebar user={loggedIn} />

      <div className="flex size-full flex-col">
        <div className="root-layout">
          <Image src="/icons/logo.svg" width={30} height={30} alt="logo" />
          <div>
            <MobileNav user={loggedIn} />
          </div>
        </div>
        {children}
      </div>
    </main>
  );
}
