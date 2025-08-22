"use client";
import { useEffect, useState } from "react";
import Navbar from "./components/navbar";
import Hero from "./components/hero";
import About from "./components/about";
import Order from "./components/order";
import Venue from "./components/venue";
import Gallery from "./components/gallery";
import Footer from "./components/footer";
import Loader from "./utils/loader";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      // add tiny delay to smooth transition
      setTimeout(() => setLoading(false), 500);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => window.removeEventListener("load", handleLoad);
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Navbar />
          <Hero />
          <About />
          <Order />
          <Venue />
          <Gallery />
          <Footer />
        </>
      )}
    </>
  );
}
