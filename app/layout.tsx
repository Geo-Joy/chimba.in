import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chimba.in - ChimbanumChimbiyum",
  description: "Kids entertainment channel - ChimbanumChimbiyum",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
