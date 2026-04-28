"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ImageCarousel({ images }) {
  const [index, setIndex] = useState(0);

  const next = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prev = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full h-64 overflow-hidden rounded-xl mb-6">

      <AnimatePresence mode="wait">
        <motion.img
          key={index}
          src={images[index]}
          className="w-full h-64 object-cover"

          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}

          transition={{ duration: 0.5 }}
        />
      </AnimatePresence>

      {/* LEFT BUTTON */}
    <button
  onClick={prev}
  style={{ cursor: "pointer" }}   // 🔥 FORCE cursor
  className="absolute left-4 top-1/2 -translate-y-1/2 z-50 
             bg-white/90 backdrop-blur-md p-2 rounded-full shadow 
             hover:scale-110 transition"
>
  <HiArrowLongLeft className="text-xl text-black" />
</button>

      {/* RIGHT BUTTON */}
    <button
  onClick={next}
  style={{ cursor: "pointer" }}   // 🔥 FORCE cursor
  className="absolute right-4 top-1/2 -translate-y-1/2 z-50 
             bg-white/90 backdrop-blur-md p-2 rounded-full shadow 
             hover:scale-110 transition"
>
  <HiArrowLongRight className="text-xl text-black" />
</button>

    </div>
  );
}