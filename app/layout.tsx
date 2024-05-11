import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar/Navbar";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="h-screen">
        <header>
          <Navbar />
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
