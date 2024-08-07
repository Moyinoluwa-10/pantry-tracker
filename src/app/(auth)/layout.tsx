export default function InviteeOnboardingAuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen grid items-center p-5 py-10">
      <div className="bg-[#f0f0f0] w-full max-w-7xl h-full max-h-[900px] mx-auto px-5 py-10 grid items-center rounded-lg">
        <div className="flex flex-col items-center gap-8 w-full max-w-96 mx-auto">
          {children}
        </div>
      </div>
    </main>
  );
}
