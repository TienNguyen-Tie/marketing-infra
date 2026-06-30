import type { Metadata } from "next";
import ConditionalLayout from "@/components/ConditionalLayout";
import { auth } from "@/lib/auth";
import "./globals.css";

/*
 * VinaCapital primary typefaces — Helvetica Now (sans) + Georgia (serif).
 * Neither is a Google Font: Helvetica Now is licensed and falls back to the
 * system Helvetica/Arial stack named in the brand book; Georgia ships on every
 * platform. Both font stacks are defined as --font-sans / --font-serif in
 * globals.css, so no next/font wiring is needed here.
 */

export const metadata: Metadata = {
  title: "VinaCapital Marketing Knowledge Base",
  description: "Internal marketing intelligence tool for VinaCapital",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons+Round"
        />
      </head>
      <body>
        <ConditionalLayout session={session}>{children}</ConditionalLayout>
      </body>
    </html>
  );
}
