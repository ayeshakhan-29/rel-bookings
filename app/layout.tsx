import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "REL Bookings Dashboard",
  description: "Firebase-powered booking dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-100 text-gray-800">
        <header className="p-6 bg-white shadow-sm mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            📋 Bookings Dashboard
          </h1>
        </header>
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}
