import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function ClientLayout({children} : Readonly<{
  children: React.ReactNode;
}>){
<<<<<<< HEAD
    return (
      <>
        <Navbar />
        <main className="relative overflow-hidden mt-36">{children}</main>
=======

    return (
      <>
        <Navbar />
        <main className="relative overflow-hidden ">{children}</main>
>>>>>>> aa0544e38407cf1589e599ba818920f672357525
        <Footer />
      </>
    );
}