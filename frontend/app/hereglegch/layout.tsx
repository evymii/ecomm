import Header from "./components/Header";
import { CartProvider } from "./contexts/CartContext";
import { FavoritesProvider } from "./contexts/FavoritesContext";

export default function HereglegchLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CartProvider>
      <FavoritesProvider>
        <div className="min-h-screen bg-[#F3F4F4] overflow-x-hidden">
          <Header />
          <main>{children}</main>
        </div>
      </FavoritesProvider>
    </CartProvider>
  );
}

