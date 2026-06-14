import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Agent OS — Mission Control",
  description: "Personal AI Operating System Dashboard",
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
