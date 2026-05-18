import type { Metadata } from "next";
import { DM_Sans, IBM_Plex_Serif } from "next/font/google";
import ConditionalLayout from "@/components/ConditionalLayout";
import { auth } from "@/lib/auth";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-sans",
});

const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "Ecomobi Marketing Knowledge Base",
  description: "Internal knowledge-base tool for the Ecomobi marketing team",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en" className={`${dmSans.variable} ${ibmPlexSerif.variable}`}>
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
