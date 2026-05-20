import { CartProvider } from "@/context/CartContext";
import "./globals.css";

export const metadata = {
  title: "IT Legend - Online Courses",
  description: "Learn programming from the best",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
