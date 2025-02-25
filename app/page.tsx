
import Link from "next/link";
import Shop from "./shop/page";
import Cashier from "./cashier/page";
import HeroSection from "./components/Hero";

export default function Home() {
  const images = [
    { url: "/path-to-image-1.jpg" },
    { url: "/path-to-image-2.jpg" },
    { url: "/path-to-image-3.jpg" },
  ];
  return (
    <>
  <HeroSection />
    </>
  );
}
