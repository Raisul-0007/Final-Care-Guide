import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navber";
import Services from "@/components/Services";
import Statistics from "@/components/Statistics";


export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Statistics />
      </main>
      <Footer />
    </>
  );
}