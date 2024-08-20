import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function ClientLayout({children} : Readonly<{
  children: React.ReactNode;
}>){
    return (
      <>
        <Navbar />
        <main className="relative overflow-hidden mt-36">{children}</main>
        <Footer />
      </>
    );
}