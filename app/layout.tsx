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
        <main>{children}</main>
      </body>
    </html>
  );
}
