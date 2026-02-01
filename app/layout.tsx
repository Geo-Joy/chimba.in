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
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta property="al:android:url" content="https://www.youtube.com/@ChimbanumChimbiyum" />
        <meta property="al:android:package" content="com.google.android.youtube" />
        <meta property="al:android:app_name" content="YouTube" />
        <meta property="al:ios:url" content="vnd.youtube://www.youtube.com/@ChimbanumChimbiyum" />
        <meta property="al:ios:app_store_id" content="544007664" />
        <meta property="al:ios:app_name" content="YouTube" />
        <meta property="al:web:url" content="https://www.youtube.com/@ChimbanumChimbiyum" />
      </head>
      <body>{children}</body>
    </html>
  );
}
