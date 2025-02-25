import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ReactQuery } from "./components/ReactQuery";
import SessionProviderWrapper from "./components/SessionProviderWappe";




const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Nightclub Ordering App",
  description: "In-house ordering system for restaurants and bars.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQuery>
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      > 
      <SessionProviderWrapper>
        <div>
          {children}
          </div>
      </SessionProviderWrapper>    
      </body>
    </html>
    </ReactQuery>
  );
}
