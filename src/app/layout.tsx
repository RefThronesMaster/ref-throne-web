import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AccountProvider } from "./AccountProvider";
import { Footer, Header } from "@/common/components";

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
      <AccountProvider>
        <body className={inter.className}>
          <main className="flex min-w-screen min-h-screen flex-col p-4 bg-black text-white chakra-petch-regular">
            <Header />
            {children}
            <Footer />
          </main>
        </body>
      </AccountProvider>
    </html>
  );
}
