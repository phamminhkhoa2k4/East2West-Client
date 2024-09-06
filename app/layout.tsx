import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { HostProvider } from "@/store/Hostcontext";
import { LoadingProvider } from "@/store/loadingContext";
import { SearchHomestayProvider } from "@/store/HomestaySearchContext";
import { HomestaysProvider } from "@/store/HomestaysContext";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "East2West",
  description: "East2West Tours and Travel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <HostProvider>
          <LoadingProvider>
            <HomestaysProvider>{children}</HomestaysProvider>
          </LoadingProvider>
        </HostProvider>
      </body>
    </html>
  );
}