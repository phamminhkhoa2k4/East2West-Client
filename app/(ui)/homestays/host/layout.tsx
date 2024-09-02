

import { Toaster } from "@/components/ui/toaster";

export default function ClientLayout({children} : Readonly<{
  children: React.ReactNode;}>){
    return (
      <>
        {children}
        <Toaster/>
      </>
    );
}