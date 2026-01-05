import Header from "./components/Header";

export default function HereglegchLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <Header />
      <main>{children}</main>
    </div>
  );
}

