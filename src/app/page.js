import Image from "next/image";
import Navbar from "./components/navbar";
import Hero from "./components/hero";
import About from "./components/about";
import Order from "./components/order";
import Venue from "./components/venue";
import Gallery from "./components/gallery";
import Footer from "./components/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Order />
      <Venue />
      <Gallery />
      <Footer />
      <div className=""></div>
    </>
  );
}
