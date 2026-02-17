import AuthLayoutClient from "@/components/AuthLayoutClient";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthLayoutClient>
      {children}
    </AuthLayoutClient>

  );
}