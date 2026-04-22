import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import StoreProvider from "./StoreProvider"; // ✅ ADD THIS

export const metadata = {
  title: "GoCart",
  description: "Ecommerce App",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <StoreProvider>
            {children}
          </StoreProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}