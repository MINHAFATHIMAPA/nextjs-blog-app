"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiArrowLongLeft, HiArrowLongRight } from "react-icons/hi2";
import Image from "next/image";

export default function ImageCarousel({ images = [] }) {
  const [index, setIndex] = useState(0);

  if (!images || images.length === 0) return null;

  const next = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prev = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full h-64 mb-6">

      {/* IMAGE */}
      <AnimatePresence mode="wait">
       <motion.div
  key={index}
  className="relative w-full h-64"
  initial={{ x: 300, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  exit={{ x: -300, opacity: 0 }}
  transition={{ duration: 0.5 }}
>
  <Image
    src={images[index]}
    alt="carousel"
    fill
    className="object-cover rounded-xl"
    priority
  />
</motion.div>
      </AnimatePresence>

      {/* LEFT */}
      <button
        onClick={prev}
        style={{
          position: "absolute",
          left: "10px",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 9999,
          background: "white",
          padding: "8px",
          borderRadius: "50%",
        }}
      >
        <HiArrowLongLeft size={20} />
      </button>

      {/* RIGHT */}
      <button
        onClick={next}
        style={{
          position: "absolute",
          right: "10px",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 9999,
          background: "white",
          padding: "8px",
          borderRadius: "50%",
        }}
      >
        <HiArrowLongRight size={20} />
      </button>

    </div>
  );
}