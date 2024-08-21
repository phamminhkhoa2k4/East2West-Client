import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Scroll from "@/components/Scroll";
import { ScrollArea } from "@/components/ui/scroll-area";

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
         <ScrollArea>{children}</ScrollArea>
      </body>
    </html>
  );
}