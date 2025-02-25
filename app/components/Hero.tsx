"use client"

import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Navbar from "./Navbar";

export default function HeroSection() {
  const [images, setImages] = useState<{ url: string }[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Fetch blog images
    async function fetchImages() {
      const blog = await client.fetch(groq`*[_type=="gallery"]{images}`);
      const formattedImages = blog.map((item: any) =>
        item.images && item.images[0]
          ? { url: urlFor(item.images[0]).url() }
          : null
      ).filter(Boolean); // Remove null entries
      setImages(formattedImages);
    }
    fetchImages();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <>
   <Navbar />
    <div className="relative h-screen">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            currentIndex === index ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={image.url}
            alt="Carousel Image"
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-4">
          The night is young...
        </h1>
        <Link href="/shop" className="px-6 py-3 bg-transparent border border-white text-white rounded hover:bg-white hover:text-black transition">
            Browse our menu...
        </Link>
      </div>
    </div>
    </>
  );
}
