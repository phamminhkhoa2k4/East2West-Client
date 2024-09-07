import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { HostProvider } from "@/store/Hostcontext";
import { LoadingProvider } from "@/store/loadingContext";
import { HomestaysProvider } from "@/store/HomestaysContext";
import { UserProvider } from "@/store/UserContext";
import { MessageProvider } from "@/store/MessageCotext";

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
    <html lang="en" className="!bg-white">
      <body className={`${inter.className}`}>
        <HostProvider>
          <LoadingProvider>
            <UserProvider>
              <MessageProvider>
                <HomestaysProvider>{children}</HomestaysProvider>
              </MessageProvider>
            </UserProvider>
          </LoadingProvider>
        </HostProvider>
      </body>
    </html>
  );
}
