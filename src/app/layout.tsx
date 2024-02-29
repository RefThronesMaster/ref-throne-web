import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "./MyAccountProvider";
import { Footer, Header } from "@/components/common";
import React from "react";
import Error from "./error";
import { ErrorBoundary } from "react-error-boundary";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RefThrone",
  description: "Throne of Referral",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-w-screen min-h-screen justify-center bg-black text-white chakra-petch-regular">
          <main className="flex flex-col w-full max-w-[1280px] p-4">
            <AppProvider>
              <Header />
              <ErrorBoundary fallback={<Error />}>{children}</ErrorBoundary>
              <Footer />
            </AppProvider>
          </main>
        </div>
      </body>
    </html>
  );
}
