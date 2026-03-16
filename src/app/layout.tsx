import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Awesome UI Library",
  description: "UI design reverse-engineering references",
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
