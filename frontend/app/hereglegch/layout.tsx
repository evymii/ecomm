import Header from "./components/Header";
import { CartProvider } from "./contexts/CartContext";

export default function HereglegchLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CartProvider>
      <div className="min-h-screen bg-[#F3F4F4] overflow-x-hidden">
        <Header />
        <main>{children}</main>
      </div>
    </CartProvider>
  );
}

