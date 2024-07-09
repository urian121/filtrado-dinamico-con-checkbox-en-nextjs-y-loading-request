import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Filtrado dinamico con checkbox en Next.js",
  description:
    "Aprende a crear un Filtrado dinamico con checkbox en Next.js y haciendo uso del paquete loading-request",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
