<<<<<<< HEAD
=======
"use client";
import "jsvectormap/dist/css/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import React, { useEffect, useState } from "react";
import Loader from "@/components/common/Loader";

>>>>>>> aa0544e38407cf1589e599ba818920f672357525
export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
<<<<<<< HEAD
  return (
    <>
    
    </>
  )
=======
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  // const pathname = usePathname();

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);
  return (
    <>
      <div suppressHydrationWarning={true}>
        {loading ? <Loader /> : children}
      </div>
    </>
  );
>>>>>>> aa0544e38407cf1589e599ba818920f672357525
}
